const passport = require('passport');
const JwtStrategy = require('passport-jwt').Strategy;
const { ExtractJwt } = require('passport-jwt');
const LocalStrategy = require('passport-local').Strategy;
const { JWT_SECRET } = require('./config/index');
const User = require('./models/User');

// Set up new JWT strategy 
passport.use(new JwtStrategy({
	jwtFromRequest: ExtractJwt.fromHeader('authorization'), // Token sent in each request and will be extracted from the headers. 
	secretOrKey: JWT_SECRET
}, async (payload, done) => {
	try {
		// Validate we have the right user
		const user = User.findById(payload.sub);

		if (!user) {
			return done(null, false)
		}

		done(null, user);
	} catch (err) {
		done(err, false)
	}
}))

// Set up new Local strategy 
passport.use(new LocalStrategy({
	usernameField: 'email' // Assign username to the email
}, async (email, password, done) => {
	try {
		// First check if there is a user with that email
		const user = await User.findOne({ email })

		if (!user) {
			return done(null, false)
		}

		// Next check if the user's password is valid
		const isMatch = await user.isValidPassword(password)

		if (!isMatch) {
			return done(null, false)
		}

		done(null, user)

	} catch (error) {
		done(error, false)
	}

}))