const express = require('express');
const models = require('../models');
const moment = require('moment');
const { Sequelize } = require('../models');
const Op = Sequelize.Op;

const getAttendance = (req, res) => {
  const now = moment()
  const createdAtStart = now.startOf('day').format().toString()
  const createdAtEnd = now.endOf('day').format().toString()
  models.Absen.findOne(
    {
      where: {
        user_id: req.userId,
        createdAt: {
          [Op.between]: [createdAtStart, createdAtEnd]
        }
      },
      order: [
        ['createdAt', 'DESC']
      ]
    }, {
    attributes: {exclude: ['password']}
    }
  )
    .then((User) => {
      User.password = undefined
        res.status(200).json({
          'status': '200',
          'messages': 'Get detail success',
          'data': User
        })
    })
    .catch((err) => {
      res.status(500).json({
        'status': 'ERROR',
        'messages': err.message,
        'data': null,
      })
    })
}

const createAttendance = (req, res) => {
  const { status } = req.body;
  models.Absen.create({
    user_id : req.userId,
    status
  })
    .then((Absen) => {
      if (Absen) {
        res.status(200).json({
          'status': 'OK',
          'messages': 'Data Berhasil di buat'
        })
      } else {
        res.status(400).json({
          'status': '400',
          'messages': 'Data tidak berhasil di buat',
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

module.exports = { getAttendance, createAttendance }
