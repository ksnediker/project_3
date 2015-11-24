var mongoose = require('mongoose');

var AnswerSchema = new mongoose.Schema({
	title: String
});

var SurveySchema = new mongoose.Schema({
	title: String,
	form1 : {
		question: String,
		answers : []
	},
	form2 : {
		question: String,
		answers : []
	},
	form3 : {
		question: String,
		answers : []
	},
	form4 : {
		question: String,
		answers : []
	},
	form5 : {
		question: String,
		answers : []
	},
	form6 : {
		question: String,
		answers : []
	},
	form7 : {
		question: String,
		answers : []
	},
	form8 : {
		question: String,
		answers : []
	},
	form9 : {
		question: String,
		answers : []
	},
	form10 : {
		question: String,
		answers : []
	},
	form11 : {
		question: String,
		answers : []
	}
});


// DEMOGRAPHICS

// 1.    Which gender do you most closely identify with?
// -    Male
// -    Female
// -    Prefer not to answer

// 2.    Age
// -    18-24
// -    25-29
// -    30-34
// -    35-39
// -    40-44
// -    45+


// GA/WDI ASSESSMENT

// 3.    How many GA courses have you taken including this one?
// -    1
// -    2-3
// -    4-5
// -    More than 5

// 4.    What industry were you in prior to WDI?
// -    Healthcare
// -    Finance
// -    Consulting
// -    Technology
// -    Real estate
// -    Education
// -    Food services / Hospitality
// -    Student
// -    Other

// 5.    What would be your ideal position after WDI?
// -    Full Stack Developer
// -    Front-end Developer
// -    Back-end Developer
// -    Software Engineer
// -    Database Administrator
// -    Other

// 6.     Which of the following most closely represents your feelings on the difficulties of the course compared to your expectations.
// -    The course is as difficult as I expected it to be
// -    The course is more difficult that I expected it to be
// -    The course is less difficult that I expected it to be


// INDIVIDUAL PERFORMANCE ASSESSMENT

// 7.    Compared to the rest of the class, which percentile would you place yourself into in terms of your programming skills and abilities?
// -    0-24th percentile
// -    25-49th percentile
// -    50-74th percentile
// -    75-100th percentile

// 8.    Which stack is better?
// -    Ruby on Rails
// -    MEAN

// FUN SECTION

// 9.    Is it pronounced "Gif" or "Jif"?
// -    Gif
// -    Jif
// -    Nobody cares

// 10.     Marvel or DC?
// -    Marvel
// -    DC
// -    Nobody cares

// 11.     Dogs or cats?
// -    Dogs
// -    Cats
// -    Nobody cares


// CLASS QUESTIONS (BONUS: DRAG AND DROP AVATARS)

// 12.    Most likely to end up in prison

// 13.    Most likely to start a successful company

// 14.    Most likely to survive the zombie apocalypse

// 15.     Most likely to date a celebrity


// OPEN ENDED

// 16.     TBD






// had to create a custom method just for this data structure
SurveySchema.statics.findAndModify = function (query, sort, doc, options, callback) {
  return this.collection.findAndModify(query, sort, doc, options, callback);
};

var Survey = mongoose.model('Survey', SurveySchema);
module.exports = Survey;

