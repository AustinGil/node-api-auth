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