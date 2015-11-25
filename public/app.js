
$('Submit').click(function(){

});


$.ajax('http://localhost:3000/survey').done( function(data){
    for (var i= 0; i < data.length; i ++){
    		var a= 1
    		console.log(data[0].form11.answers[i].Dogs);
        };
});

var firstRender = function() {
	$('#form-container').empty();
	var source = $("#first-template").html();
	var template = Handlebars.compile(source);

	var context = {title: "My New Post", body: "This is my first post!"};
	$('#form-container').append(template(context));
};

var secondRender = function() {
	$('#form-container-two').empty();
	var source = $('#second-template').html();
	var template = Handlebars.compile(source);

	var context = {title: "Testing my second post", body: "This is my second test, deal with it!"};
	$('#form-container-two').append(template(context));
};

$('#submit-email').click(function(){
	$('#sign-up-form').hide();
	firstRender();
	$('#form-container').show();
	$('#modal').show()
})

