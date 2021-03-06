require('dotenv').config()
const Koa = require('koa')
const dynamoose = require('dynamoose')
const cors = require('@koa/cors')
const bodyParser = require('koa-bodyparser')
const koaValidator = require('koa-async-validator')

const authRouter = require('./routes/auth')
const todoRouter = require('./routes/todo')
const errorHandler = require('./middlewares/error')

dynamoose.aws.sdk.config.update({
  region: 'ap-northeast-1',
  accessKeyId: process.env.AWS_KEY,
  secretAccessKey: process.env.AWS_SECRET,
  endpoint: 'https://dynamodb.ap-northeast-1.amazonaws.com',
})

const app = new Koa()

app.use(errorHandler)

app.use(cors())
app.use(bodyParser())
app.use(koaValidator())
app.use(authRouter.routes())
app.use(authRouter.allowedMethods())
app.use(todoRouter.routes())
app.use(todoRouter.allowedMethods())

const PORT = process.env.PORT || 5000

app.listen(PORT, () => {
  console.log(`API is running on port ${PORT}`)
})
