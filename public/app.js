console.log('check checking');

$("#submit-answer").click( function(){
	var answer = parseInt($("input[name='quantity'").val());	
	console.log(answer);
	

	$.ajax({
		url: "/survey",
		type: "PUT",
		data: answer,
		dataType: "number"
	});
	console.log(answer);

});


$.ajax('http://localhost:3000/surveys').done( function(data){
	// for (var i=0; i < data.lenght; i++) {
		console.log(  data[51].form1.question);
		console.log(  data[51].form1.answers[0].Labrador);

	// }
	});	
