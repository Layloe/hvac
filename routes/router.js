const express = require('express')
const router = express.Router()
const Appointment = require('../model/appointmentModels')
const path = require('path')

router.post('/schedule_service', async (rec, res) => {
    const {name, email, phone, date} = req.body

    try {
        const newAppointment = new Appointment({name, email, phone, date})
        await newAppointment.save()
        res.sendFile(path.join(__dirname, '../views/bookResults.html'))
    } catch (err) {
        console.log(err)
        res.sendFile(path.join(__dirname, '../views/bookError.html'))
    }
})

module.exports = router 