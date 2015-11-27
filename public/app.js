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
	   			
	   		
	   			$.each((data[0].form1.answers[0]), function(index, value){
	   				arr.push(index);
	   				// console.log(value)
	   				// arr.push(index)
	   			});
	   			// console.log(arr)
	   		$('#form-container').append(template(context));

	   		$('#submit-answer').click(function(){
					for (var k = 0; k < arr.length; k++) {
						if ($( '#' + k ).is(':checked')){
							var $getKeyName = $( '#' + k ).val()
							data[0].form1.answers[0][$getKeyName] = data[0].form1.answers[0][$getKeyName] + 1
							changeData.push(data[0].form1.answers[0])
							// console.log(data[0].form1.answers[0])						
						} 
					}
					// console.log(data[0].form1.answers[0]);
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

		console.log(changeData[0])
		
		$.ajax({
		url: "http://localhost:3000/surveys/565653d01caac206644a9d5f",
		method: "PUT",
		data: changeData[0]
		});
	}

	
// });

