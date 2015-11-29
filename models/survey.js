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
		},
		question4: String,
		form4: {
			answers: []
		},
		question5: String,
		form5: {
			answers: []
		},
		question6: String,
		form6: {
			answers: []
		}
		// question7: String,
		// form7: {
		// 	answers: []
		// },
		// question8: String,
		// form8: {
		// 	answers: []
		// },
		// question9: String,
		// form9: {
		// 	answers: []
		// },
		// question10: String,
		// form10: {
		// 	answers: []
		// },
		// question11: String,
		// form11: {
		// 	answers: []
		// }
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

