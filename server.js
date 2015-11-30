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

  // console.log(req.body)

  var newData = {};
  var form = "";

  for(var i in req.body) {
    // i is key name of object
    // req.body[i] is key value
    if ((i === "form1") || (i === "form2") || (i === "form3") || (i === "form4") || (i === "form5") || (i === "form6")) {
      form = i;
    //   delete req.body[form]
  }


    // console.log(form)
    var changeVal = JSON.parse(req.body[i]);
    var targetKey = i;
    newData[i] = changeVal;
  };

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





