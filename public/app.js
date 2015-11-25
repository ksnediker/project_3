// $(document).ready(function(){
	var $getKeyName = null;
	var arr = [];
	var changeData = [];

	var firstRender = function() {
		$('#form-container').empty();
		var source = $("#first-template").html();
		var template = Handlebars.compile(source);
		
		$.ajax('http://localhost:3000/surveys').done( function(data){
	   		
			
				var context = {
	   				title: data[0].form1.question, 
	   				body: arr
	   			};
	   			
	   		// console.log(data[0].form1.answers.indexOf("Labrador"));
	   		// console.log(data[0].form1.answers[0])
	   			$.each(data[0].form1.answers, function(index, value){
	   				console.log(Object.keys(value)[0])
	   				arr.push(Object.keys(value)[0]);
	   			});
	   		$('#form-container').append(template(context));

	   		$('#submit-answer').click(function(){
					for (var k = 0; k < arr.length; k++) {
						if ($( '#' + k ).is(':checked')){
							var $getKeyName = $( '#' + k ).val()
							data[0].form1.answers[k][$getKeyName] = data[0].form1.answers[k][$getKeyName] + 1
							changeData.push(data[0].form1.answers[k])
							
						} else {
							changeData.push(data[0].form1.answers[k])
						}
					}
					updateData();
				});
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

	var updateData = function() {

		var newData = []
		// var answersArr = [];
		for (var b = 0; b < arr.length; b++) {			
			// answersArr.push($('#' + b).val());
				newData.push(JSON.stringify(changeData[b]));
				
			// 	console.log(getKeyName.val());
			}
		// }

		
		console.log(newData);
		// var surveyData = {
		
		// };

		$.ajax({
		url: "http://localhost:3000/surveys/56539900a8c24cf7980fc777",
		method: "PUT",
		data: newData
		});
	}

	
// });

// $('#1').is(':checked')