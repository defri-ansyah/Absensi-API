const express = require('express');
const helpers = require('../helpers/help')
const models = require('../models');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const getAllUser = async (req, res) => {
  const user = await models.users.findAll({});
  res.status(200).send({
    status: 200,
    message: 'Berhasil get data user',
    data: user
  });
};

const createUser = (req, res) => {
  const { fullname, email, password } = req.body
  models.User.findOne({
    where: {
      email: email
    }
  })
    .then((cekEmail) => {
      if (cekEmail != null) {
        res.status(409).json({ 'messages': 'email is already in use' })
      }
      else {
        bcrypt.genSalt(10, function (err, salt) {
          bcrypt.hash(password, salt, function (err, hash) {
            models.User.create({
              fullname,
              email,
              password: hash
            })
              .then((user) => {
                if (user) {
                  res.status(200).json({
                    'status': 'OK',
                    'messages': 'User berhasil ditambahkan',
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
      }
    })
    .catch((err) => {
      res.status(500).json({
        'status': 'ERROR',
        'messages': err.message,
        'data': {},
      })
    })
}

const login = (req, res) => {
  const { email, password } = req.body
  models.users.findOne(
    {
      where: {
        email
      }
    })
    .then((users) => {
      if (users === null) {
        res.status(404).json({
          'status': 'ERROR',
          'messages': 'user not found',
          'data': {},
        })
      }
      isPassword = bcrypt.compareSync(password, users.dataValues.password)
      if (!isPassword) {
        res.status(400).json({
          'status': 'ERROR',
          'messages': 'Wrong Password',
          'data': {},
        })
      } else {
        users.password = undefined
        jwt.sign({ id: users.id, email: users.email, role: users.role }, process.env.SECRET_KEY, { expiresIn: '24h' }, function (err, token) {
          res.status(200).json({
            'status': 'OK',
            'messages': 'User berhasil login',
            'data': users,
            'token': token
          })
        })
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

module.exports = { login, getAllUser, createUser }
