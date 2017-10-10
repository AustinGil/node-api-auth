const JWT = require('jsonwebtoken')
const User = require('../models/User')
const { JWT_SECRET } = require('../config/index')

signToken = ((user) => {
	// Creates JWT token for user
	return JWT.sign({
		iss: 'ApiAuth', // issuer
		sub: user.id, // subject
		iat: new Date().getTime(), // issued at
		exp: new Date().setDate(new Date().getDate() + 1) // expiration
	}, JWT_SECRET)
})

module.exports = {
	signUp: async (req, res, next) => {
		console.log('UsersController.signup() called')

		const { email, password } = req.value.body;
		const foundUser = await User.findOne({ email })
		if (foundUser) {
			return res.status(403).json({ error: 'Email is already in use' })
		}

		const newUser = new User({ email, password })
		await newUser.save()

		// Creates the new user token when signed up
		const token = signToken(newUser)

		res.status(200).json({ token })
	},

	signIn: async (req, res, next) => {

		// Creates the new user token when signed in
		const token = signToken(req.user)
		res.status(200).json({ token })
	},

	// Secret route for users that have been authenticated
	secret: async (req, res, next) => {
		res.json({ secret: "resource" });
	}
}