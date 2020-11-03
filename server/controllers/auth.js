const jwt = require('jsonwebtoken')
const sgMail = require('@sendgrid/mail')

const User = require('../models/user')

sgMail.setApiKey(process.env.SENDGRID_KEY)

exports.signup = async (ctx) => {
  if (ctx.status === 200) {
    const { name, email, password } = ctx.request.body

    try {
      const foundUser = await User.get({ email })

      if (foundUser) {
        ctx.status = 400
        ctx.body = { error: 'Email is taken' }
      }

      const token = jwt.sign(
        { name, email, password },
        process.env.JWT_ACCOUNT_ACTIVATION,
        { expiresIn: '10m' },
      )

      const emailData = {
        from: process.env.EMAIL_FROM,
        to: email,
        subject: 'Account activation link',
        html: `
          <h1>Please use the following link to activate your account</h1>
          <p>${process.env.CLIENT_URL}/activate/${token}</p>
          <hr />
          <p>This email may contain sensitive information</p>
          <p>${process.env.CLIENT_URL}</p>
        `,
      }

      await sgMail.send(emailData)
      ctx.body = {
        message: `Email has been sent to ${email}. Follow the instructions to activate your account.`,
      }
    } catch (error) {
      console.log(error)
    }
  }
}
