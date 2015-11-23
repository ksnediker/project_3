var mongoose = require('mongoose');

var AnswerSchema = new mongoose.Schema({
	title: String,
	user : { type: mongoose.Schema.Types.ObjectId, ref: 'User' }
})

var Answer = mongoose.model('Answer', AnswerSchema);
module.exports = Answer;
