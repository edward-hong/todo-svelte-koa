const dynamoose = require('dynamoose')

const todoSchema = new dynamoose.Schema({
  todo: {
    type: String,
    required: true,
    hashKey: true,
  },
  completed: { type: Boolean, default: false },
  userEmail: {
    type: String,
    default: 'default',
    index: {
      global: true,
      project: true,
      name: 'userEmail-index',
    },
  },
})

module.exports = dynamoose.model('Todo', todoSchema)
