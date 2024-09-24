const express = require('express')
const router = express.Router()
const Appointment = require('../model/appointmentModels')
const path = require('path')
const {MailtrapTransport} = require('mailtrap')
const Nodemailer = require('nodemailer')

require('dotenv').config()



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

router.post('/schedule_service', async (req, res) => {
    const { name, email, phone, date } = req.body;

    let scheduleEmailText = `We've received your request to schedule an appointment on ${date}. 
We'll give you a call at ${phone} to find a time that works for you.
Sincerely,
Lozano Brothers HVAC Team`

    try {
    const newAppointment = new Appointment({name, email, phone, date})
    await newAppointment.save()

    await transport.sendMail({
        from: sender,
        to: email,
        subject: "HVAC Appointment Request",
        text: scheduleEmailText,
        category: "Integration Test",
  })

    res.sendFile(path.join(__dirname, '../views/bookResult.html'))
    } catch (err) {
    console.log(err)
    res.sendFile(path.join(__dirname, '../views/bookError.html'))
    }
})

router.post('/request_quote', async (req, res) => {
  const { name, email, service, message } = req.body;

  let quoteEmailText = `Dear ${name},
We're honored that you're considering us for your ${service} needs!
One of our knowledgeable reps will email you at this address within one business day to hear more about how we can assist you.
For your records, your message to us is below:

${message}

Sincerely,
Lozano Brothers HVAC Team`

  try {
      transport.sendMail({
      from: sender,
      to: email,
      subject: "HVAC Quote Request",
      text: quoteEmailText,
      category: "Integration Test",
})

  res.sendFile(path.join(__dirname, '../views/bookResult.html'))
  } catch (err) {
  console.log(err)
  res.sendFile(path.join(__dirname, '../views/bookError.html'))
  }
})

module.exports = router 