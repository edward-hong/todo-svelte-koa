const Router = require('@koa/router')

const { runValidation } = require('../validators')
const {
  userSignupValidator,
  userSigninValidator,
} = require('../validators/auth')
const { signup, signin, accountActivation } = require('../controllers/auth')

const router = new Router({ prefix: '/auth' })

router.post('/signup', userSignupValidator, runValidation, signup)
router.post('/signin', userSigninValidator, runValidation, signin)
router.post('/activation', accountActivation)

module.exports = router
