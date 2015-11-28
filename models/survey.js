var mongoose = require('mongoose');

var AnswerSchema = new mongoose.Schema({
	title: String
});

var SurveySchema = new mongoose.Schema({
		title: String,
		// questions: [ QuestionSchema]
		question1: String,
		form1 : {
			answers: []
		},
		question2: String,
		form2: {
			answers: []
		},
		question3: String,
		form3: {
			answers: []
		}

});

		// question1: {
		// 	answer1: Number,
		// 	answer2: Number
		// },
		// question2: {
		// 	answer1: Number,
		// 	answer2: Number
		// }


// had to create a custom method just for this data structure
SurveySchema.statics.findAndModify = function (query, sort, doc, options, callback) {
  return this.collection.findAndModify(query, sort, doc, options, callback);
};

var Survey = mongoose.model('Survey', SurveySchema);
module.exports = Survey;

