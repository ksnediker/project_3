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

  for(var i in req.body) {
    // console.log(i);
    var changeVal = JSON.parse(req.body[i]);
    var targetKey = i;
    newData[i] = changeVal;
    console.log(newData);
  };

  Survey.findOneAndUpdate({_id: req.params.id}, { form1 : { answers:[  newData  ] } } , function(err, survey) {
      // console.log(survey.form1.answers)
  });
   

   
});

// surveys route
app.get('/surveys', function(req, res){

  Survey.find().then(function(result){
    res.send(result);

  });
});

// var survey1 = new Survey({
//     title: 'Our Dog Survey',
//     form1 : {
//       question: "What is your favorite dog?",
//       answers: {Labrador: 0, Beagle: 0, Poodle: 0}
//     }
// });

// survey1.save(function (err) {
//   if (err) console.log(err);
//   console.log(survey1.title + ' created');
// })




