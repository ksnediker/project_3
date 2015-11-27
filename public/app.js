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
		// $('#form-container-two').empty();
		$('#form-container').hide();
		var source = $('#second-template').html();
		var template = Handlebars.compile(source);

		$.ajax('http://localhost:3000/surveys').done( function(data){

			var testing = Object.keys(data[0].form1.answers[0]);
			var genderPieData = [];


			for (var d = 0; d < testing.length; d++) {
				console.log(data[0].form1.answers[0][testing[d]])
				
				genderPieData.push( {value: data[0].form1.answers[0][testing[d]], color: getRandomColor(), label: testing[d]})
			}

			// var genderPieData = [
			// 		{value: data[0].form1.answers[0].Beagle,
			// 			color: getRandomColor(),
			// 			label: testing }
			// ]


			var pieOptions = {
			  segmentShowStroke : false,
			  animateScale : true
			}

			// var context = {
	  //  				title: data[0].question, 
	  //  				body: newGenderChart
	  //  	};


	   	var $showChart = $('#show-chart').get(0).getContext("2d");
			var newGenderChart = new Chart($showChart).Pie(genderPieData, pieOptions);
			$('#show-chart').append(newGenderChart);
		});
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
		secondRender();
	}

	function getRandomColor() {
    var letters = '0123456789ABCDEF'.split('');
    var color = '#';
    for (var i = 0; i < 6; i++ ) {
        color += letters[Math.floor(Math.random() * 16)];
    }
    return color;
	}


	// var secondRender = function() {
		
	// 	$('#form-container').hide();

	// 	$.ajax('http://localhost:3000/surveys').done( function(data){

	// 		var testing = Object.keys(data[0].form1.answers[0]);
	// 		// var genderPieData = [];

	// 		// for (var d = 0; d < Object.keys(data[0].form1.answers[0]); d++) {
	// 		// 	genderPieData.push( {value: data[0].form1.answers[0][testing], color: getRandomColor(), label: testing})
	// 		// }

	// 		var genderPieData = [
	// 				{value: data[0].form1.answers[0].Beagle,
	// 					color: getRandomColor(),
	// 					label: testing }
	// 		]

	// 		console.log(genderPieData)
	// 		var pieOptions = {
	// 		  segmentShowStroke : false,
	// 		  animateScale : true
	// 		}
	// 		console.log(genderPieData)
	//    	var gender = document.getElementById('gender').getContext("2d");
	// 		var newGenderChart = new Chart(gender).Pie(genderPieData, pieOptions);
	// 	});
	// };
// });

