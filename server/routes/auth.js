const Router = require('@koa/router')

const { runValidation } = require('../validators')
const {
  userSignupValidator,
  userSigninValidator,
  forgotPasswordValidator,
  resetPasswordValidator,
} = require('../validators/auth')
const {
  signup,
  signin,
  accountActivation,
  forgot,
  reset,
} = require('../controllers/auth')

const router = new Router({ prefix: '/auth' })

router.post('/signup', userSignupValidator, runValidation, signup)
router.post('/signin', userSigninValidator, runValidation, signin)
router.post('/activation', accountActivation)
router.put('/forgot', forgotPasswordValidator, runValidation, forgot)
router.put('/reset', resetPasswordValidator, runValidation, reset)

module.exports = router
