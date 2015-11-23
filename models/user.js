var mongoose = require('mongoose');

var AnswerSchema = new mongoose.Schema({
	title: String,
})

var UserSchema = new mongoose.Schema({
	email: String,
	first_name: String,
	// answers: [AnswerSchema]
})

var User = mongoose.model('User', UserSchema);
module.exports = User;
