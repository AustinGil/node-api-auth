const mongoose = require('mongoose')
const bcrypt = require('bcryptjs')

const userSchema = new mongoose.Schema({
	email: {
		type: String,
		required: true,
		unique: true,
		lowercase: true
	},
	password: {
		type: String,
		required: true
	}
})

userSchema.pre('save', async function (next) {
	try {
		const salt = await bcrypt.genSalt(10);
		const passwordHash = await bcrypt.hash(this.password, salt);
		this.password = passwordHash;
		next();
	} catch (err) {
		next(err)
	}
})

userSchema.methods.isValidPassword = await function (newPassword) {
	try {
		return await bcrypt.compare(newPassword, this.password)
	} catch (err) {
		throw new Error(err)
	}
}

module.exports = mongoose.model('User', userSchema)