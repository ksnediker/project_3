// DEPENDENCIES

var express      = require('express'),
    mongoose     = require('mongoose'),
    bodyParser   = require('body-parser'),
    md5          = require('md5'),
    cookieParser = require('cookie-parser'),
    // jsCookie = require('js-cookie');
    port         = process.env.PORT || 3000;
    app          = express();
    mongoUri     = process.env.MONGOLAB_URI || 'mongodb://localhost/new_app';
// MIDDLEWARE
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static('public'));
app.use(cookieParser());
// app.use(jsCookie());

// DATABASE
// mongoose.connect('mongodb://localhost/new_app');

// LISTENER
app.listen(port);
console.log('===== Connecting to DB ... =====', mongoUri);
// var mongoUri =  process.env.MONGOLAB_URI || 'mongodb://localhost/new_app';
mongoose.connect(mongoUri);

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
  var form = "";

  // setting form key value as flag to identify what we are updating
  // loop through the object passed through ajax to find flag
  for(var i in req.body) {
    // i is key name of object
    // req.body[i] is key value
    if ((i === "form1") || (i === "form2") || (i === "form3") || (i === "form4") || (i === "form5") || (i === "form6")) {
      form = i;
    }

    //assigning variables value of key and key value so we can pass it through and update our database
    var changeVal = JSON.parse(req.body[i]);
    var targetKey = i;
    newData[i] = changeVal;
  };

  //delete flag before updating database
  delete newData[form];

  // console.log(req.body)
  Survey.findOneAndUpdate({_id: req.params.id}, { [form] : { answers:[  newData  ] } } , function(err, survey) {
      
  });
   

   
});

// surveys route
app.get('/surveys', function(req, res){

  // console.log("Are you working?")
  Survey.find().then(function(result){
    res.send(result);

  });
});

var survey1 = new Survey({

    title: 'GA Survey',
    question1: "Which gender do you most closely identify with?",
    form1 : {
      answers : {"Male": 0, "Female": 0,"LGBTQ": 0, "Undisclosed" : 0}
      },
    question2: "What is your age?",
    form2 : {
      answers : {"Under 18": 0, "18-24": 0, "25-29": 0, "30-34": 0, "35-39": 0, "40-44": 0, "45+": 0}
    },
    question3: "How many GA courses have you taken including this one?",
    form3 : {
      answers: {"One": 0, "Two or Three": 0, "Four or Five": 0, "Five plus": 0 }
    },
    question4: "What industry were you in prior to WDI?",
    form4 : {     
      answers: {"Healthcare": 0, "Finance": 0, "Consulting": 0, "Technology" : 0, "Real Estate": 0, "Education" : 0, "Hospitality" : 0, "Student" : 0, "Other" : 0}
    },
    question5: "What would be your ideal position after WDI?",
    form5 : {
      answers: {"Full Stack Developer": 0, "Front end Developer": 0, "Back end Developer": 0, "Software Engineer": 0, "Database Administrator": 0, "Other": 0}
    },
    question6: "Enter three words that sum up General Assembly to you",
    form6 : {
      answers: {"amazing": 1, "decent": 1, "alright": 1, "fun": 1, "boring": 1, "wack": 1}
    }
  });


survey1.save(function (err) {
  if (err) console.log(err);
  console.log(survey1.title + ' created');
})





