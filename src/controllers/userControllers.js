const express = require('express');
const models = require('../models');

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
      if (users) {
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

module.exports = { editProfile }