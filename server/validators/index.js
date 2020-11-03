exports.runValidation = async (ctx, next) => {
  const errors = await ctx.validationErrors()

  if (errors) {
    ctx.body = { error: errors[0].msg }
    ctx.status = 422
  } else {
    ctx.body = {
      urlparam: ctx.params.urlparam,
      getparam: ctx.params.getparam,
      postparam: ctx.params.postparam,
    }
  }

  await next()
}
