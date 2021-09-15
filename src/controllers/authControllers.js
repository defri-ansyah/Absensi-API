const express = require('express');
const helpers = require('../helpers/help')
const models = require('../models');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const login = (req, res) => {
  const { email, password } = req.body
  models.User.findOne(
    {
      where: {
        email
      }
    })
    .then((User) => {
      if (User === null) {
        bcrypt.genSalt(10, function (err, salt) {
          bcrypt.hash(password, salt, function (err, hash) {
            models.User.create({
              email,
              password: hash
            })
              .then((user) => {
                if (user) {
                  res.status(200).json({
                    'status': 'OK',
                    'messages': 'User berhasil ditambahkan, silahkan login kembali',
                  })
                }
              })
              .catch((err) => {
                res.status(400).json({
                  'status': 400,
                  'messages': err.message,
                  'data': {},
                })
              })
          })
        })
      } else {
      isPassword = bcrypt.compareSync(password, User.dataValues.password)
      if (!isPassword) {
        res.status(400).json({
          'status': 'ERROR',
          'messages': 'Wrong Password',
          'data': {},
        })
      } else {
        User.password = undefined
        jwt.sign({ id: User.id, email: User.email }, process.env.SECRET_KEY, { expiresIn: '24h' }, function (err, token) {
          res.status(200).json({
            'status': 'OK',
            'messages': 'User berhasil login',
            'data': User,
            'token': token
          })
        })
      }
    }
    })

    .catch((err) => {
      res.status(500).json({
        'status': 'ERROR',
        'messages': err.message,
        'data': null,
      })
    })
}

module.exports = { login }
