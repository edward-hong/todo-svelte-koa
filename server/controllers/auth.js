const jwt = require('jsonwebtoken')
const sgMail = require('@sendgrid/mail')
const crypto = require('crypto')

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
      } else {
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
      }
    } catch (err) {
      ctx.body = { error: err }
    }
  }
}

exports.signin = async (ctx) => {
  if (ctx.status === 200) {
    const { email, password } = ctx.request.body

    try {
      const foundUser = await User.get({ email })

      if (!foundUser) {
        ctx.status = 400
        ctx.body = {
          error: 'User with that email does not exist. Please signup',
        }
      } else {
        ctx.body = foundUser

        const hashedPassword = crypto
          .createHmac('sha1', foundUser.salt)
          .update(password)
          .digest('hex')

        if (hashedPassword !== foundUser.hashedPassword) {
          ctx.status = 400
          ctx.body = {
            error: 'Email and password do not match',
          }
        } else {
          const token = jwt.sign(
            { email: foundUser.email },
            process.env.JWT_SECRET,
            { expiresIn: '7d' },
          )
          ctx.body = {
            token,
            user: { name: foundUser.name, email: foundUser.email },
          }
        }
      }
    } catch (err) {
      ctx.body = { error: err }
    }
  }
}

exports.accountActivation = async (ctx) => {
  const { token } = ctx.request.body

  if (token) {
    try {
      jwt.verify(token, process.env.JWT_ACCOUNT_ACTIVATION)

      const { name, email, password } = jwt.decode(token)

      const salt = Math.round(new Date().valueOf() * Math.random()) + ''

      const hashedPassword = crypto
        .createHmac('sha1', salt)
        .update(password)
        .digest('hex')

      const newUser = new User({ name, email, salt, hashedPassword })

      await newUser.save()
      ctx.status = 200
      ctx.body = { message: 'Signup success. Please signin' }
    } catch (err) {
      ctx.body = {
        error: err,
      }
    }
  }
}

exports.forgot = async (ctx) => {
  const { email } = ctx.request.body

  try {
    const foundUser = await User.get({ email })

    if (!foundUser) {
      ctx.status = 400
      ctx.body = { error: 'User with that email does not exist' }
    } else {
      const token = jwt.sign(
        { _id: foundUser._id },
        process.env.JWT_RESET_PASSWORD,
        { expiresIn: '10m' },
      )

      const emailData = {
        from: process.env.EMAIL_FROM,
        to: email,
        subject: 'Password Reset Link',
        html: `
          <h1>Please use the following link to reset your password</h1>
          <p>${process.env.CLIENT_URL}/reset/${token}</p>
          <hr />
          <p>This email may contain sensitive information</p>
          <p>${process.env.CLIENT_URL}</p>
        `,
      }

      await User.update({ email, resetPasswordLink: token })
      await sgMail.send(emailData)

      ctx.body = {
        message: `Email has been sent to ${email}. Follow the instructions to reset your password.`,
      }
    }
  } catch (err) {
    ctx.body = { error: err }
  }
}

exports.reset = async (ctx) => {
  const { resetPasswordLink, newPassword } = ctx.request.body

  if (resetPasswordLink !== 'default') {
    jwt.verify(
      resetPasswordLink,
      process.env.JWT_RESET_PASSWORD,
      async (err, decoded) => {
        if (err) {
          ctx.status = 400
          return (ctx.body = {
            error: 'Expired link. Try again',
          })
        }
        try {
          const [foundUser] = await User.query('resetPasswordLink')
            .eq(resetPasswordLink)
            .using('resetPasswordLink-index')
            .all()
            .exec()

          if (!foundUser) {
            ctx.status = 400
            ctx.body = {
              error: 'Could not find user with reset password link',
            }
          } else {
            const hashedPassword = crypto
              .createHmac('sha1', foundUser.salt)
              .update(newPassword)
              .digest('hex')

            foundUser.hashedPassword = hashedPassword
            foundUser.resetPasswordLink = 'default'

            await foundUser.save()

            ctx.body = {
              message: 'Great! Now you can login with your new password',
            }
          }
        } catch (err) {
          console.log(err)
          ctx.body = { error: err }
        }
      },
    )
  }
}
