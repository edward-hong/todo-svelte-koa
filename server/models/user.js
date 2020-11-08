const dynamoose = require('dynamoose')

const userSchema = new dynamoose.Schema(
  {
    id: String,
    name: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
    },
    hashedPassword: {
      type: String,
      required: true,
    },
    salt: String,
    resetPasswordLink: {
      type: String,
      default: '',
    },
  },
  { timestamps: true },
)

module.exports = dynamoose.model('User', userSchema)
