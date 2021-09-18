const express = require('express');
const models = require('../models');
const moment = require('moment');
const { Sequelize } = require('../models');
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

const getDetailAll = async (req, res) => {
  const now = moment()
  const createdAtStart = now.startOf('day').format().toString()
  const createdAtEnd = now.endOf('day').format().toString()
  try {
    const User = await models.User.findAll({
      attributes: { exclude: ['password'] },
    })
    await User.map(async (item) => {
      item.dataValues.test = 'fuck you'
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
      console.log(test.dataValues);
      item.dataValues.currentAbsen = test.dataValues
      return item
    })
      res.status(200).json({
        'status': '200',
        'messages': 'Get detail success',
        'data': User
      })
    console.log(User);
  } catch (e) {
    console.log(e);
  }
}

// const getDetailAll = (req, res) => {
//   const now = moment()
//   const createdAtStart = now.startOf('day').toString()
//   const createdAtEnd = now.endOf('day').toString()
//   models.User.findAll({
//     attributes: {exclude: ['password']},
//   })
//     .then((User) => {
//       console.log(User);
//       User.map((item) => {
//         // item.currentAbsen =  await models.Absen.findOne(
//         //   {
//         //     where: {
//         //       user_id: item.id,
//         //       // createdAt: {
//         //       //   [Op.between]: [createdAtStart, createdAtEnd]
//         //       // }
//         //     },
//         //     order: [
//         //       ['createdAt', 'DESC']
//         //     ]
//         //   }, {
//         //   attributes: {exclude: ['password']}
//         //   }
//         // )
//         return item
//       }).then (response => {
//         res.status(200).json({
//           'status': '200',
//           'messages': 'Get detail success',
//           'data': response
//         })
//       })
//     })
//     .catch((err) => {
//       res.status(500).json({
//         'status': 'ERROR',
//         'messages': err.message,
//         'data': null,
//       })
//     })
// }

// const changeStatus = (req, res) => {
//   const { status } = req.body
//   models.User.update({
//     status
//   },
//   {
//     where: {
//       id: req.userId
//     }
//   })
//   .then((User) => {
//     if (User) {
//       res.status(200).json({
//         'status': 'OK',
//         'messages': 'Data Berhasil di update'
//       })
//     } else {
//       res.status(400).json({
//         'status': '400',
//         'messages': 'Data tidak berhasil di update',
//         'data': {}
//       })
//     }
//   })
//   .catch((err) => {
//     res.status(500).json({
//       'status': 'ERROR',
//       'messages': err.message,
//       'data': null,
//     })
//   })
// }

module.exports = { editProfile, getDetailAll }