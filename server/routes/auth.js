const Router = require('@koa/router')

const { runValidation } = require('../validators')
const { userSignupValidator } = require('../validators/auth')
const { signup, accountActivation } = require('../controllers/auth')

const router = new Router({ prefix: '/auth' })

router.post('/signup', userSignupValidator, runValidation, signup)
router.post('/activation', accountActivation)

module.exports = router
