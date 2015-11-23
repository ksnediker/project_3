var mongoose = require('mongoose');

var SurveySchema = new mongoose.Schema({
		title: String,
		question1: {
			answer1: Number,
			answer2: Number
		},
		question2: {
			answer1: Number,
			answer2: Number
		}
});

var Survey = mongoose.model('Survey', SurveySchema);
module.exports = Survey;