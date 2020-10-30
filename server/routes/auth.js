const Router = require('@koa/router')

const { runValidation } = require('../validators')
const { userSignupValidator } = require('../validators/auth')
const { signup } = require('../controllers/auth')

const router = new Router({ prefix: '/auth' })

router.post('/signup', userSignupValidator, runValidation, signup)

module.exports = router
