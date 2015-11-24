var firstRender = function() {
	$('#form-container').empty();
	var source = $("#first-template").html();
	var template = Handlebars.compile(source);
	
	$.ajax('http://localhost:3000/surveys').done( function(data){
   		
   			var arr = [];
		
			var context = {
   				title: data[0].form1.question, 
   				body: arr
   			};
   			
   			$.each(data[0].form1.answers, function(index, value){
   				console.log(Object.keys(value)[0])
   				arr.push(Object.keys(value)[0]);
   			});
		
		console.log(arr);
   		

   		$('#form-container').append(template(context));
   		console.log(data[0].form1.answers.length)
    });
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

