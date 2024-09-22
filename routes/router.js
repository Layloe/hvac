const express = require('express')
const router = express.Router()
const Appointment = require('../model/appointmentModels')
const path = require('path')

router.post('/schedule_service', async (rec, res) => {
    const {name, email, phone, date} = req.body
})