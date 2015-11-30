// sample survey
// var Survey = mongoose.model('Survey', SurveySchema);
// module.exports = Survey;

var survey1 = new Survey({

    title: 'GA Survey',
    question1: "Which gender do you most closely identify with?",
    form1 : {
      answers : {"Male": 0, "Female": 0,"LGBTQ": 0, "Undisclosed" : 10}
      },
    question2: "What is your age?",
    form2 : {
      answers : {"Under 18": 1, "18-24": 30, "25-29": 25, "30-34": 15, "35-39": 13, "40-44": 10, "45+": 10}
    },
    question3: "How many GA courses have you taken including this one?",
    form3 : {
      answers: {"One": 31, "Two or Three": 35, "Four or Five": 33, "Five plus": 44 }
    },
    question4: "What industry were you in prior to WDI?",
    form4 : {     
      answers: {"Healthcare": 15, "Finance": 15, "Consulting": 20, "Technology" : 30, "Real Estate": 7, "Education" : 10, "Hospitality" : 4, "Student" : 10, "Other" : 18}
    },
    question5: "What would be your ideal position after WDI?",
    form5 : {
      answers: {"Full Stack Developer": 5, "Front end Developer": 15, "Back end Developer": 10, "Software Engineer": 8, "Database Administrator": 9, "Other": 5}
    },
       question6: "Enter three words that sum up General Assembly to you",
       form6 : {
        answers: {"great": 1, "terrible": 1, "okay": 1}
       }
  });


survey1.save(function (err) {
  if (err) console.log(err);
  console.log(survey1.title + ' created');
})
