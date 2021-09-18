const express = require('express');
const models = require('../models');
const moment = require('moment');
const { Sequelize } = require('../models');
const user = require('../models/user');
const Op = Sequelize.Op;

const editProfile = (req, res) => {
  const { fullname, divisi } = req.body;
  models.User.update({
    fullname,
    divisi
  },
    {
      where: {
        id: req.userId
      }
    }
  )
    .then((User) => {
      User.password = undefined
      if (User) {
        res.status(200).json({
          'status': 'OK',
          'messages': 'Data Berhasil di update'
        })
      } else {
        res.status(400).json({
          'status': '400',
          'messages': 'Data tidak berhasil di update',
          'data': {}
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

const homePage = async (req, res) => {
  const now = moment()
  const createdAtStart = now.startOf('day').format().toString()
  const createdAtEnd = now.endOf('day').format().toString()
  try {
    const User = await models.User.findAll({
      attributes: { exclude: ['password'] },
    })
    const response = await User.map(async (item) => {
      const test = await models.Absen.findOne(
        {
          where: {
            user_id: item.id,
            createdAt: {
              [Op.between]: [createdAtStart, createdAtEnd]
            }
          },
          order: [
            ['createdAt', 'DESC']
          ]
        }, {
        attributes: { exclude: ['password'] }
      }
      )
      item.dataValues.currentAbsen = test.dataValues
      return item
    })
    Promise.all(response)
      .then((results) => {
        res.status(200).json({
          'status': '200',
          'messages': 'Get detail success',
          'data': results
        })
      })
      .catch((err) => {
        res.status(500).json({
          'status': 'ERROR',
          'messages': err.message,
          'data': null,
        })
      })
  } catch (e) {
    console.log(e);
  }
}

const detailUser = (req, res) => {
  models.User.findOne(
    {
      attributes: { exclude: ['password'] },
      where: {
        id: req.params.userId
      }
    }
  )
    .then(async (User) => {
      const Absen = await models.Absen.findAll(
        {
          where: {
            user_id: req.params.userId
          },
          order: [
            ['createdAt', 'DESC']
          ]
        }
      )
      if (User) {
        Promise.all(Absen)
          .then((history) => {
            User.dataValues.history = history
            res.status(200).json({
              'status': 'OK',
              'messages': 'Berhasil mendapatkan data',
              'data': User
            })
          })
      } else {
        res.status(400).json({
          'status': '400',
          'messages': 'Tidak berhasil mendapatkan data',
          'data': {}
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

module.exports = { editProfile, homePage, detailUser }