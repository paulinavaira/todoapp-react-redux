const passport = require('passport');
const jwtStrategy = require('passport-jwt').Strategy
const ExtractJwt = require('passport-jwt').ExtractJwt
const User = require('../components/users/model')

module.exports = passport.use(new jwtStrategy({
	jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
	secretOrKey: 'davidbowie'
}, (payload, done) => {
	User.findById(payload._doc._id)
		.then(user => {
			if (!user) return done(null, false)
			return done(null, user)
		})
		.catch(err => done(err, false))
}))
