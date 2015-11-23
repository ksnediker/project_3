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

var survey1 = new Survey({
 		title: 'Our Survey',
		question1: {
			answer1: 0,
			answer2: 0
		},
		question2: {
			answer1: 0,
			answer2: 0
		},

});

survey1.save(function (err) {
	if (err) console.log(err);
	console.log(survey1.title + ' created');
})


// post answers to surveys
app.post ( '/answers', function(req,res){	 
  var survey = Survey.find();
  var answer = req.body.answer1;


    res.send(answer);
		// if (!err) console.log("Success!");
	});
});


app.get('/surveys', function(req, res){

	Survey.find().then(function(result){
    res.send(result);

	});
});

