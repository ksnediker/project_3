var mongoose = require('mongoose');

var AnswerSchema = new mongoose.Schema({
	answer: Number
});

var Answer = mongoose.model('Answer', AnswerSchema);
module.exports = Answer;