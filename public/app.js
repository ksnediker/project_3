// $('document').ready(function(){

		console.log('check checking');

		// user is a global variable
		var user = null;

		// Event listener to render new user form
		$(function(){
			var user;
			$('#sign-up-button').click( signupForm ); 
		});

		var signupForm = function(){
				//make form appear
		   	var source   = $("#template").html();
		    var template = Handlebars.compile( source );
		    var signupHtml = template();
		    $("#results").append( signupHtml );

		    $('#survey-start').click(userSignup);
		};

		var userSignup = function(){
			var emailInput = $("input[name='email']").val();
			var passwordInput = $("input[name='password']").val();
			var user = {
				email: emailInput,
			};
			// this is the ajax post call to create the user
			$.post("/users", user ).done(answerForm);
			console.log(user);
		};

		// each form that appears sets up the values for a new 'answer'
		// this form sends a POST request to create an answer that
		// is associated via reference to the current user (through a 
		// cookie assigned upon 'signup', ie upon starting the survey). 
		var answerForm = function(){
			var source   = $("#question-template").html();
			var template = Handlebars.compile( source );
			var questionHtml = template();
			$("body").append( questionHtml );
			// this click event triggers the function immediately below
			$('#submit-answer').click(submitAnswer);
		};

		// ========================================
		// Our basic API is a collection of answers submitted by users
		// works
		var submitAnswer = function() {
			// this function, associated with the 
			// 'submit-answer' button, creates an answer:
			var titleInput = $("input[name='question'").val();	
			var answer = {
				title: titleInput
			};
			$.post("/answers", answer ).done(editAnswerForm);
			console.log(answer);
		};


		// this button triggers the request immediately below it
		$("#delete-user").click(function(){
			console.log("click");
			deleteCurrentUser();
		});

		// hard-coded example of delete route
		var deleteCurrentUser = function(){
			var cookie = document.cookie;

			// =========== NOTE:
			// below is a really messed up way of extracting the id of the current user from document.cookie above (!!). I am SURE we can refactor this ( w a loop), but for the purposes of the basic basic basic delete route, it works!
			// ====================

			var id = cookie.charAt(11)+ cookie.charAt(12)+ cookie.charAt(13)+cookie.charAt(14)+cookie.charAt(15)+cookie.charAt(16)+cookie.charAt(17)+cookie.charAt(18)+cookie.charAt(19)+cookie.charAt(20)+cookie.charAt(21)+cookie.charAt(22)+cookie.charAt(23)+cookie.charAt(24)+cookie.charAt(25)+cookie.charAt(26)+cookie.charAt(27)+cookie.charAt(28)+cookie.charAt(29)+cookie.charAt(30)+cookie.charAt(31)+cookie.charAt(32)+cookie.charAt(33)+cookie.charAt(34);

			$.post('/deleteusers/'+id, user);
		}


		// this button triggers the request immediately below it

		$("#delete-answers").click(function(){
			console.log("click");
			deleteAnswers();
		});


		var deleteAnswers = function(){
			var cookie = document.cookie;
			// =========== NOTE:
			// repeats messed up procedure above, but ok for now
			// ====================
			var user = cookie.charAt(11)+ cookie.charAt(12)+ cookie.charAt(13)+cookie.charAt(14)+cookie.charAt(15)+cookie.charAt(16)+cookie.charAt(17)+cookie.charAt(18)+cookie.charAt(19)+cookie.charAt(20)+cookie.charAt(21)+cookie.charAt(22)+cookie.charAt(23)+cookie.charAt(24)+cookie.charAt(25)+cookie.charAt(26)+cookie.charAt(27)+cookie.charAt(28)+cookie.charAt(29)+cookie.charAt(30)+cookie.charAt(31)+cookie.charAt(32)+cookie.charAt(33)+cookie.charAt(34);

			$.post('/deleteanswers/'+user, user);
		}


// ======================================
// BASIC AUTHENTICATION
// ======================================

// Ends the current session by erasing user 
// cookies
// This can be scaled up by adding passwords, etc.
// ======================================
	$("#end-survey").click(function(){
		   Cookies.remove('loggedinId');
		   // restart DOM stuff to render the beginning of the 
		   // survey again;
		   $("#results").remove();
		});

		// ========================================
		// this is when we edit our answers
		// a form comes up that submits our updated answer
		// still working on this =====  :/ 
		var editAnswerForm = function() {

			var source   = $("#edit-question-template").html();
			var template = Handlebars.compile( source );
			var editQuestionHtml = template();
			$("body").append( editQuestionHtml );
			// this click event triggers the function immediately below
			$('#edit-answer').click(submitEdit);
		};

		var submitEdit = function(){

		var cookie = document.cookie;
		var user = cookie.charAt(11)+ cookie.charAt(12)+ cookie.charAt(13)+cookie.charAt(14)+cookie.charAt(15)+cookie.charAt(16)+cookie.charAt(17)+cookie.charAt(18)+cookie.charAt(19)+cookie.charAt(20)+cookie.charAt(21)+cookie.charAt(22)+cookie.charAt(23)+cookie.charAt(24)+cookie.charAt(25)+cookie.charAt(26)+cookie.charAt(27)+cookie.charAt(28)+cookie.charAt(29)+cookie.charAt(30)+cookie.charAt(31)+cookie.charAt(32)+cookie.charAt(33)+cookie.charAt(34);

			var title = $("input[name='edit-question'").val();	
			$.post('/editanswers/'+user, title);
		};

// ==================================
// ajax requests to render JSON data
// ==================================
// just one example	w answers
// uncomment to see
$.ajax('http://localhost:3000/answers').done( function(data){
	for (var i= 0; i < data.length; i ++){
		// we could add conditionals to only render certain things
		// for instance, the below loop only appends the answer "python"
		// to the DOM
		if (data[i].title === "python") { 
			$('body').append('<p>'+data[i].title+'</p>');
		};
	}

});	

// just one example w users

$.ajax('http://localhost:3000/users').done( function(data){
	for (var i= 0; i < data.length; i ++){
		// we could add conditionals to only render certain things
		// for instance, the below loop only appends the user "test5@test.com"
		// to the DOM
		if (data[i].email === "test5@test.com") {
			$('body').append('<p>'+data[i].email+'</p>');
		};
	};
});

