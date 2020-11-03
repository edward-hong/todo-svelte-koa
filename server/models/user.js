const dynamoose = require('dynamoose')
const crypto = require('crypto')

const userSchema = new dynamoose.Schema(
  {
    name: {
      type: String,
      trim: true,
      required: true,
      max: 32,
    },
    email: {
      type: String,
      trim: true,
      required: true,
      unique: true,
      lowercase: true,
      hashKey: true,
    },
    hashedPassword: {
      type: String,
      required: true,
    },
    salt: String,
    resetPasswordLink: {
      data: String,
      default: '',
    },
  },
  { timestamps: true },
)

// userSchema
//   .virtual('password')
//   .set(function (password) {
//     this._password = password
//     this.salt = this.makeSalt()
//     this.hashedPassword = this.encryptPassword(password)
//   })
//   .get(function () {
//     return this._password
//   })

userSchema.methods = {
  authenticate: function (plainText) {
    return this.encryptPassword(plainText) === this.hashedPassword
  },

  encryptPassword: function (password) {
    if (!password) return ''
    try {
      return crypto.createHmac('sha1', this.salt).update(password).digest('hex')
    } catch (err) {
      return ''
    }
  },

  makeSalt: function () {
    return Math.round(new Date().valueOf() * Math.random()) + ''
  },
}

module.exports = dynamoose.model('User', userSchema)
