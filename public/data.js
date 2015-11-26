$('document').ready( function () {




// ajax call to get the data in survey2, copied below

// var jsonData;

// $.ajax('http://localhost:3000/surveys').done( function(data){
// 	jsonData = data;
// });


var jsonData = {
    title: 'GA Survey',
     form1 : {
      question: "Which gender do you most closely identify with?",
      answers : [{"Male": 35}, {"Female": 38},{"LGBTQ": 10}, {"Rather not disclose" : 10}]
      },
    form2 : {
      question: "What is your age?",
      answers : [ {"18-24": 30}, {"25-29": 25}, {"30-34": 15}, {"35-39": 13},{"40-44": 10}, {"45+": 10}]
    },

    form3 : {
      question: "How many GA courses have you taken including this one?",
      answers: [{"1": 31}, {"2-3": 35},{"4-5": 33},{"More than 5": 44} ]
    },
    form4 : {
      question: "What industry were you in prior to WDI?",
      answers: [{"Healthcare": 15}, {"Finance": 15},{"Consulting": 17 }, {"Consulting": 20}, {"Technology" : 30}, {"Real Estate": 7}, {"Education" : 10}, {"Hospitality" : 4}, {"Student" : 10}, {"Other" : 18}]
    },

    form5 : {
      question: "What would be your ideal position after WDI?",
      answers: [{"Full Stack Developer": 5}, {"Front-end Developer": 15},{"Back-end Developer": 10}, {"Software Engineer": 8}, {"Database Administrator": 9}, {"Other": 5} ]
    },

     form6 : {
      question: "What would be your ideal position after WDI?",
      answers: [{"The course is as difficult as I expected it to be": 15}, {"The course is more difficult that I expected it to be": 25},{"The course is less difficult that I expected it to be": 9}]
    },

      form6 : {
      question: "Which of the following most closely represents your feelings on the difficulties of the course compared to your expectations?",
      answers: [{"0-24th percentile": 5}, {"25-49th percentile": 15},{"50-74th percentile": 27}, {"75-100th percentile":28}]
    },
    form7: {
      question: " Compared to the rest of the class, which percentile would you place yourself into in terms of your programming skills and abilities?",
      answers: [{"0-24th percentile" : 17}, {"25-49th percentile" :26}, {"50-74th percentile":28},{"75-100th percentile":25}]
    },
    form8: {
      question: "What is your favorite stack?", 
      answers: [{"Ruby on Rails" : 30}, { "MEAN" : 20 }, {"Python - Django" : 10}]
    },
    form9: {
      question:" Is it pronounced 'Gif' or 'Jif'?",
      answers: [{"Gif" : 18 }, { "Jif" : 28}, {"Nobody cares": 5}]
    },
    form10: {
      question: "Marvel or DC?",
      answers: [{ "Marvel": 4 }, {"DC" : 5}, {"Nobody cares" :46}]
    },
    form11: {
      question: "Dogs or cats?",
      answers: [{ "Dogs" : 5 }, {"Cats" :5}, {"Piglets" : 28}]

    }

  };

console.log(jsonData);



var firstValue = jsonData.form1.answers[0].Male;
var secondValue = jsonData.form1.answers[1].Female;
var thirdValue = jsonData.form1.answers[2].LGBTQ;


var pieData = [
                {

                    value: firstValue,
                    color:"#878BB6"
                },
                {
                    value : secondValue,
                    color : "#4ACAB4"
                },
                {
                    value: thirdValue,
                    color : "#FF8153"
                }
                
                //     value: jsonData[0].form1.answers[0].Rather not disclose,
                //     color : "#FFEA88"
                // }
            ];


    var pieOptions = {
                 segmentShowStroke : false,
                 animateScale : true
            }

var gender = document.getElementById("first_Question").getContext("2d");

var myNewChart = new Chart(gender).Pie(pieData, pieOptions);



});




