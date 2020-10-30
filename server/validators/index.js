const util = require('util')

exports.runValidation = async (ctx, next) => {
  const errors = await ctx.validationErrors()

  if (errors) {
    ctx.body = `There have been validation errors: ${util.inspect(errors)}`
    ctx.status = 400
  } else {
    ctx.body = {
      urlparam: ctx.params.urlparam,
      getparam: ctx.params.getparam,
      postparam: ctx.params.postparam,
    }
  }

  await next()
}
