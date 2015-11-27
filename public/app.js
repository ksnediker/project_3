// $(document).ready(function(){
	var $getKeyName = null;
	var arr = [];
	var changeData = [];
	var id = null;

	var firstRender = function() {
		
		$('#form-container').empty();
		var source = $("#first-template").html();
		var template = Handlebars.compile(source);
		
		$.ajax('http://localhost:3000/surveys').done( function(data){
	   		
				var context = {
	   				title: data[0].question, 
	   				body: arr
	   			};
	  
	   			$.each((data[0].form1.answers[0]), function(index, value){
	   				arr.push(index);
	   			});
	   			
	   		id = data[0]._id;
	   		$('#form-container').append(template(context));
	   		$('#submit-answer').click(function(){

					for (var k = 0; k < arr.length; k++) {
						if ($( '#' + k ).is(':checked')){
							var $getKeyName = $( '#' + k ).val()
							data[0].form1.answers[0][$getKeyName] = data[0].form1.answers[0][$getKeyName] + 1
							changeData.push(data[0].form1.answers[0])													
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
		console.log(changeData[0])
		$.ajax({
		url: "http://localhost:3000/surveys/" + id,
		method: "PUT",
		data: changeData[0]
		});
	}

	
// });

