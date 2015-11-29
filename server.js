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
mongoose.connect('mongodb://localhost/new_app');

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

  console.log(user)
  console.log(user.id)
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

// post answers to survey
app.put ( '/surveys/:id', function(req,res){  
  
  var newData = {};
  console.log("Hello")
  console.log(req.body)
  for(var i in req.body) {
    // console.log(i);
    var changeVal = JSON.parse(req.body[i]);
    var targetKey = i;
    newData[i] = changeVal;
  };

  Survey.findOneAndUpdate({_id: req.params.id}, { form1 : { answers:[  newData  ] } } , function(err, survey) {
      
  });
   

   
});

// surveys route
app.get('/surveys', function(req, res){

  Survey.find().then(function(result){
    res.send(result);

  });
});

// sample survey

// var survey1 = new Survey({

//     title: 'GA Survey',
//     question1: "Which gender do you most closely identify with?",
//     form1 : {
//       answers : {"Male": 0, "Female": 0,"LGBTQ": 0, "Undisclosed" : 10}
//       },
//     question2: "What is your age?",
//     form2 : {
//       answers : {"Under 18": 1, "18-24": 30, "25-29": 25, "30-34": 15, "35-39": 13, "40-44": 10, "45+": 10}
//     },
//     question3: "How many GA courses have you taken including this one?",
//     form3 : {
//       answers: {"One": 31, "Two or Three": 35, "Four or Five": 33, "Five plus": 44 }
//     },
//     question4: "What industry were you in prior to WDI?",
//     form4 : {     
//       answers: {"Healthcare": 15, "Finance": 15, "Consulting": 20, "Technology" : 30, "Real Estate": 7, "Education" : 10, "Hospitality" : 4, "Student" : 10, "Other" : 18}
//     },
//     question5: "What would be your ideal position after WDI?",
//     form5 : {
//       answers: {"Full Stack Developer": 5, "Front end Developer": 15, "Back end Developer": 10, "Software Engineer": 8, "Database Administrator": 9, "Other": 5}
//     },
//     question6: "How did WDI match your expectations?",
//     form6 : {
//       answers: {"Easy Peezy": 15, "Kinda Hard": 25, "Whatever": 9}
//     },
//     question7: "What is your favorite stack?",
//     form7: { 
//       answers: {"Ruby_on_Rails" : 30,  "MEAN" : 20, "Python_Django" : 10, "Other": 5}
//     },
//     question8: "Is it pronounced 'Gif' or 'Jif'?",
//     form8: {
//       answers: {"Gif" : 18, "Jif" : 28, "Who cares": 5}
//     },
//     question9: "Marvel or DC?",
//     form9: {
//       answers: { "Marvel": 4, "DC" : 5, "Who cares" : 0}
//     },
//     question10: "Dogs or cats?",
//     form10: {
//       answers: { "Dogs" : 5, "Cats" :5, "Piglets" : 28}
//     }

//   });


// survey1.save(function (err) {
//   if (err) console.log(err);
//   console.log(survey1.title + ' created');
// })




