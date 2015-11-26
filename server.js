// DEPENDENCIES

var express      = require('express'),
    mongoose     = require('mongoose'),
    bodyParser   = require('body-parser'),
    md5          = require('md5'),
    cookieParser = require('cookie-parser'),
    // jsCookie = require('js-cookie');
    port         = process.env.PORT || 3000;
    app          = express();

// MIDDLEWARE
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static('public'));
app.use(cookieParser());
// app.use(jsCookie());

// DATABASE
mongoose.connect('mongodb://localhost/project_3');

// LISTENER
app.listen(port);

// Models
var Survey = require('./models/survey');
var User = require('./models/user');

// post users -- works
// creates answers and assigns them a cookie upon
// starting a 'session'
app.post('/users', function(req,res){
  var user = new User({
     email: req.body.email,
  });

  user.save(function(err) {
    if (err){
      console.log(err);
      res.statusCode = 503;
    }else{
      //set cookie as part of the response,
      // passing the name of the value and assigning it
      // to the user as arguments for the function
      res.cookie("loggedinId", user.id);

      // send back response with all the info
      // described above
      res.send({
        email: user.email,
        created_at : user.created_at
      });
    }
  });

});

app.get( '/'

  )

// update survey values
app.put ( '/survey', function(req,res){  
  var survey = Survey.find();
  var answer = req.body.value;
  var value = survey[0].form1.answers[0].Dogs ++;




  });
// post answers to survey
app.put ( '/surveys/:id', function(req,res){  
  // console.log(req.body)
  for(var i in req.body) {
   
    Survey.findOneAndUpdate(
      {_id: req.params.id},
      {i: req.body[i]},
      {upsert: true},
      function(err, survey) {
        res.send(survey);
        console.log(survey)
        // console.log(survey.form1.answers[1]);
      
    })
  
  // console.log(thing)
  // console.log(req.body[thing]);
  // Survey.findOneAndUpdate( {_id: req.params.id}, req.body, function(err, survey) {
    // res.send(survey);
    
  };
});

// surveys route to check it
app.get('/surveys', function(req, res){
  Survey.find().then(function(result){
    res.send(result);

  });
});



// var survey2 = new Survey({
//     title: 'GA Survey',
//      form1 : {
//       question: "Which gender do you most closely identify with?",
//       answers : [{"Male": 35}, {"Female": 38},{"LGBTQ": 10}, {"Rather not disclose" : 10}]
//       },
//     form2 : {
//       question: "What is your age?",
//       answers : [ {"18-24": 30}, {"25-29": 25}, {"30-34": 15}, {"35-39": 13},{"40-44": 10}, {"45+": 10}]
//     },

//     form3 : {
//       question: "How many GA courses have you taken including this one?",
//       answers: [{"1": 31}, {"2-3": 35},{"4-5": 33},{"More than 5": 44} ]
//     },
//     form4 : {
//       question: "What industry were you in prior to WDI?",
//       answers: [{"Healthcare": 15}, {"Finance": 15},{"Consulting": 17 }, {"Consulting": 20}, {"Technology" : 30}, {"Real Estate": 7}, {"Education" : 10}, {"Hospitality" : 4}, {"Student" : 10}, {"Other" : 18}]
//     },

//     form5 : {
//       question: "What would be your ideal position after WDI?",
//       answers: [{"Full Stack Developer": 5}, {"Front-end Developer": 15},{"Back-end Developer": 10}, {"Software Engineer": 8}, {"Database Administrator": 9}, {"Other": 5} ]
//     },

//      form6 : {
//       question: "What would be your ideal position after WDI?",
//       answers: [{"The course is as difficult as I expected it to be": 15}, {"The course is more difficult that I expected it to be": 25},{"The course is less difficult that I expected it to be": 9}]
//     },

//       form6 : {
//       question: "Which of the following most closely represents your feelings on the difficulties of the course compared to your expectations?",
//       answers: [{"0-24th percentile": 5}, {"25-49th percentile": 15},{"50-74th percentile": 27}, {"75-100th percentile":28}]
//     },
//     form7: {
//       question: " Compared to the rest of the class, which percentile would you place yourself into in terms of your programming skills and abilities?",
//       answers: [{"0-24th percentile" : 17}, {"25-49th percentile" :26}, {"50-74th percentile":28},{"75-100th percentile":25}]
//     },
//     form8: {
//       question: "What is your favorite stack?", 
//       answers: [{"Ruby on Rails" : 30}, { "MEAN" : 20 }, {"Python - Django" : 10}]
//     },
//     form9: {
//       question:" Is it pronounced 'Gif' or 'Jif'?",
//       answers: [{"Gif" : 18 }, { "Jif" : 28}, {"Nobody cares": 5}]
//     },
//     form10: {
//       question: "Marvel or DC?",
//       answers: [{ "Marvel": 4 }, {"DC" : 5}, {"Nobody cares" :46}]
//     },
//     form11: {
//       question: "Dogs or cats?",
//       answers: [{ "Dogs" : 5 }, {"Cats" :5}, {"Piglets" : 28}]

//     }

//   });



// var survey1 = new Survey({
//     title: 'GA Survey',
//      form1 : {
//       question: "Which gender do you most closely identify with?",
//       answers : [{"Male": 0}, {"Female": 0},{"LGBTQ": 0}, {"Rather not disclose" : 0}]
//       },
//     form2 : {
//       question: "What is your age?",
//       answers : [ {"18-24": 0}, {"25-29": 0}, {"30-34": 0}, {"35-39": 0},{"40-44": 0}, {"45+": 0}]
//     },

//     form3 : {
//       question: "How many GA courses have you taken including this one?",
//       answers: [{"1": 0}, {"2-3": 0},{"4-5": 0},{"More than 5": 0} ]
//     },
//     form4 : {
//       question: "What industry were you in prior to WDI?",
//       answers: [{"Healthcare": 0}, {"Finance": 0},{"Consulting": 0}, {"Consulting": 0}, {"Technology" : 0}, {"Real Estate": 0}, {"Education" : 0}, {"Hospitality" : 0}, {"Student" : 0}, {"Other" : 0}]
//     },

//     form5 : {
//       question: "What would be your ideal position after WDI?",
//       answers: [{"Full Stack Developer": 0}, {"Front-end Developer": 0},{"Back-end Developer": 0}, {"Software Engineer": 0}, {"Database Administrator": 0}, {"Other": 0} ]
//     },

//      form6 : {
//       question: "What would be your ideal position after WDI?",
//       answers: [{"The course is as difficult as I expected it to be": 0}, {"The course is more difficult that I expected it to be": 0},{"The course is less difficult that I expected it to be": 0}]
//     },

//       form6 : {
//       question: "Which of the following most closely represents your feelings on the difficulties of the course compared to your expectations?",
//       answers: [{"0-24th percentile": 0}, {"25-49th percentile": 0},{"50-74th percentile": 0}, {"75-100th percentile":0}]
//     },
//     form7: {
//       question: " Compared to the rest of the class, which percentile would you place yourself into in terms of your programming skills and abilities?",
//       answers: [{"0-24th percentile" : 0}, {"25-49th percentile" :0}, {"50-74th percentile":0},{"75-100th percentile":0}]
//     },
//     form8: {
//       question: "What is your favorite stack?", 
//       answers: [{"Ruby on Rails" : 0}, { "MEAN" : 0 }, {"Python - Django" : 0}]
//     },
//     form9: {
//       question:" Is it pronounced 'Gif' or 'Jif'?",
//       answers: [{"Gif" : 0 }, { "Jif" : 0}, {"Nobody cares": 0}]
//     },
//     form10: {
//       question: "Marvel or DC?",
//       answers: [{ "Marvel": 0 }, {"DC" : 0}, {"Nobody cares" :0}]
//     },
//     form11: {
//       question: "Dogs or cats?",
//       answers: [{ "Dogs" :0 }, {"Cats" :0}, {"Piglets" : 0}]

//     }

//   });


// sample survey
// var survey1 = new Survey({
//     title: 'Our Dog Survey',
//     form1 : {
//       question: "What is your favorite dog?",
//       answers: [{Labrador: 1}, {Beagle: 1},{Poodle: 1}]
//     }
// });

// survey2.save(function (err) {
//   if (err) console.log(err);
//   console.log(survey2.title + ' created');
// })

// 
// CLASS QUESTIONS (BONUS: DRAG AND DROP AVATARS)

// 12.    Most likely to end up in prison

// 13.    Most likely to start a successful company

// 14.    Most likely to survive the zombie apocalypse

// 15.     Most likely to date a celebrity


// OPEN ENDED

// 16.     TBD






