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
//     }
    // form4 : {
    //   question: "What industry were you in prior to WDI?",
    //   answers: [{"Healthcare": 15}, {"Finance": 15}, {"Consulting": 20}, {"Technology" : 30}, {"Real_Estate": 7}, {"Education" : 10}, {"Hospitality" : 4}, {"Student" : 10}, {"Other" : 18}]
    // },

    // form5 : {
    //   question: "What would be your ideal position after WDI?",
    //   answers: [{"Full_Stack_Developer": 5}, {"Front_end_Developer": 15},{"Back_end_Developer": 10}, {"Software_Engineer": 8}, {"Database_Administrator": 9}, {"Other": 5} ]
    // },

    //  form6 : {
    //   question: "How did WDI match your expectations?",
    //   answers: [{"Class_is_as_difficult_as_I_expected": 15}, {"Class_is_more_difficult_than_I_expected": 25},{"Class_is_easier_than_I_expected": 9}]
    // },

    //   form6 : {
    //   question: "Compared to the rest of the class, which percentile would you place yourself into in terms of your programming skills and abilities?",
    //   answers: [{"Bottom_Quarter": 5}, {"Second_Quarter": 15},{"Third_Quarter": 27}, {"Top_Quarter":28}]
    // },
    // form7: {
    //   question: "What is your favorite stack?", 
    //   answers: [{"Ruby_on_Rails" : 30}, { "MEAN" : 20 }, {"Python_Django" : 10}, {"Other": 5}]
    // },
    // form8: {
    //   question:" Is it pronounced 'Gif' or 'Jif'?",
    //   answers: [{"Gif" : 18 }, { "Jif" : 28}, {"Who_cares": 5}]
    // },
    // form9: {
    //   question: "Marvel or DC?",
    //   answers: [{ "Marvel": 4 }, {"DC" : 5}, {"Who_cares" :46}]
    // },
    // form10: {
    //   question: "Dogs or cats?",
    //   answers: [{ "Dogs" : 5 }, {"Cats" :5}, {"Piglets" : 28}]

    // }

//   });


// survey1.save(function (err) {
//   if (err) console.log(err);
//   console.log(survey1.title + ' created');
// })




