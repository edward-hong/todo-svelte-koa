const dynamoose = require('dynamoose')

const userSchema = new dynamoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
      hashKey: true,
    },
    hashedPassword: {
      type: String,
      required: true,
    },
    salt: String,
    resetPasswordLink: {
      type: String,
      default: 'default',
      index: {
        global: true,
        project: true,
        name: 'resetPasswordLink-index',
      },
    },
  },
  { timestamps: true },
)

module.exports = dynamoose.model('User', userSchema)
