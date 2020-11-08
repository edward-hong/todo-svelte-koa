exports.userSignupValidator = async (ctx, next) => {
  ctx.checkBody('name', 'Name is required').notEmpty()
  ctx.checkBody('email', 'Must be a valid email address').isEmail()
  ctx
    .checkBody('password', 'Password must be at least 6 characters long')
    .isLength({ min: 6 })

  await next()
}

exports.userSigninValidator = async (ctx, next) => {
  ctx.checkBody('email', 'Must be a valid email address').isEmail()
  ctx
    .checkBody('password', 'Password must be at least 6 characters long')
    .isLength({ min: 6 })

  await next()
}
