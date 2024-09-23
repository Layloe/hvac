const express = require('express')
const router = express.Router()
const Appointment = require('../model/appointmentModels')
const path = require('path')
require('dotenv').config()

const {MailtrapTransport} = require('mailtrap')
const Nodemailer = require('nodemailer')

const TOKEN = process.env.MAIL_TOKEN

const transport = Nodemailer.createTransport(
    MailtrapTransport({
      token: TOKEN,
    })
  );
const sender = {
    address: "hello@demomailtrap.com",
    name: "Lozano Brothers HVAC site",
  };

router.post('/schedule_service', async (rec, res) => {
    const {name, email, phone, date} = req.body

    let scheduleEmailText = `We've received your request to schedule an appointment on ${date}. 
We'll give you a call at ${phone} to find a time that works for you.
Sincerely,
Lozano Brothers HVAC Team`

    try {
        const newAppointment = new Appointment({name, email, phone, date})
        await newAppointment.save()

        transport.sendMail({
    from: sender,
    to: email,
    subject: "HVAC Appointment Request",
    text: scheduleEmailText,
    category: "Integration Test",
  })

        res.sendFile(path.join(__dirname, '../views/bookResults.html'))
    } catch (err) {
        console.log(err)
        res.sendFile(path.join(__dirname, '../views/bookError.html'))
    }
})

module.exports = router 