// $(document).ready(function(){

	var arr = [];

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
							var getKeyName = $( '#' + k ).val()
							updateData();
							data[0].form1.answers[0].getKeyName = data[0].form1.answers[0].getKeyName + 1
							console.log(getKeyName)
							// var test = data[0].form1.answers[0]
							// console.log(test)
							// secondRender();
						}
					}
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

		var answersArr = [];
		for (var b = 0; b < arr.length; b++) {			
			answersArr.push($('#' + b).val());
				if ($( '#' + b ).is(':checked')){
				var getKeyName = $( '#' + b ).val()
				// console.log(getKeyName.val());
			}
		}
		

		var surveyData = {
		
		};

		// $.ajax({
		// url: "http://localhost:3000/surveys/" + test,
		// method: "PUT",
		// data: surveyData
		// }).done(getInstructors);
	}

	
// });

// $('#1').is(':checked')