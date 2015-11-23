
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
mongoose.connect('mongodb://localhost/test_app');

// LISTENER
app.listen(port);

// USER ROUTES

var User = require('./models/user');
var Answer = require('./models/answer');

// post answers

// this is for embedded objects
// app.post('/users/:id/answers', function(req,res){

app.post ( '/answers', function(req,res){	 
  var answerParameters={
    user: req.cookies.loggedinId,
    title: req.body.title
  }
  var answer = new Answer (answerParameters);
	answer.save(function(){
    res.send(answer);
		// if (!err) console.log("Success!");
	});
});

// post users -- works
// creates answers and assigns them a cookie upon
// starting a 'session'
app.post('/users', function(req,res){
	var user = new User({
     email: req.body.email,
     answers: req.body.answers
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
        id: user.id,
        first_name: user.first_name,
        email: user.email,
        answers: user.answers,
        created_at : user.created_at
      });
    }
  });

});

// get answers -- works
// returns answers as a JSON object at: http://localhost:3000/answers
// for testing purposes, we can consult this
// each answer is associated with a user ID;
app.get('/answers', function(req,res){
  Answer.find().then(function(result){
    res.send(result);
  });
})

// get single answer -- works
// displays a single answer
app.get( '/answers/:id', function(req,res){
  Answer.find( { _id: req.params.id  }).then(function(result){
    res.send(result);
  })
});

// delete answers via reference to their users -- works
app.post( '/deleteanswers/:user', function(req,res){
  Answer.remove({ user: req.params.user  } ).then(function(result){
    res.send(result);
  })
});

// get users -- works
// returns users as a JSON object at: http://localhost:3000/answers
// for testing purposes;
app.get('/users', function(req, res) {
		User.find().then(function(result) {
		res.send(result);
	});
});

// get single user -- works
// returns users as a JSON object at: http://localhost:3000/answers
// for testing purposes;
app.get( '/users/:id', function(req,res){
  User.find( { _id: req.params.id  }).then(function(result){
    res.send(result);
  })
});

// delete users
// this works
app.post( '/deleteusers/:id', function(req,res){
  User.remove({ _id: req.params.id  } ).then(function(result){
    res.send(result);
  })
});

// edit answers //
// still working on this :/ 
app.put('/editanswers/:user', function(req, res){
  // locate specific answer in db
  var title = req.body.title;
  var answer = Answer.find({user: req.params.user})
  console.log(title);
  console.log(answer);

  // answer.update({title: title});
  // // send back as response the updated answer
  //   res.send(answer);
  });

// ====================
// EXTRA STUFFS
// ====================

// We can scale this up but it provides basic functionality thus far