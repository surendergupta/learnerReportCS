const mongoose = require('mongoose')

const facultySchema = mongoose.Schema({
    userId: {
		type: Number
	},
	username: {
		type: String,
		require: true
	},
	email: {
		type: String,
		require: true
	},
	fullname: {
		type: String,
		require: true
	},
	phoneNo: {
		type: String,
		require: true
	},
	userImage: {
		type: String
	},
	password: {
		type: String,
		require:true
	},
	department: {
		type: String
	},
	skills: {
		type: String
	},
	about: {
		type: String
	},
	accountCreated: {
		type: Date
	},
	userType: {
		type: String,
		//default: "faculty"
	}

})

/* Model */
const facultyLogin = new mongoose.model('facultyInfo', facultySchema)
module.exports = facultyLogin;