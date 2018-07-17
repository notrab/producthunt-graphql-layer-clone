const {
  generateHash,
  compareHash,
  signUserToken,
  isEmailValid
} = require('../../utils')
const {
  InvalidEmailFormat,
  EmailExistsError,
  InvalidPassword
} = require('../../errors/auth')

module.exports = {
  async register(_, { email, ...args }, ctx) {
    if (!isEmailValid(email)) throw new InvalidEmailFormat()
    const password = await generateHash(args.password)

    const exists = await ctx.db.exists.User({ email })
    if (exists) {
      throw new EmailExistsError()
    }

    const user = await ctx.db.mutation.createUser({
      data: {
        ...args,
        email: email.toLowerCase(),
        password
      }
    })

    return {
      token: await signUserToken(user.id)
    }
  },

  async login(_, { email, password }, ctx) {
    if (!isEmailValid(email)) throw new InvalidEmailFormat()

    const user = await ctx.db.query.user({ where: { email } })

    if (!user) {
      throw new InvalidPassword()
    }

    const valid = await compareHash(password, user.password)

    if (!valid) {
      throw new InvalidPassword()
    }

    return {
      token: await signUserToken(user.id)
    }
  }
}
