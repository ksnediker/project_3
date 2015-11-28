$(document).ready(function(){
	var $getKeyName = null;
	var arr = [];
	var changeData = [];
	var id = null;
	var form = null;
	var question = null;

	var renderFirstTemplate = function() {
		
		var source = $("#first-template").html();
		var template = Handlebars.compile(source);
		
		$.ajax('http://localhost:3000/surveys').done( function(data){
				
	  		
	   		$.each((data[0][form].answers[0]), function(index, value){
	   				arr.push(index);
	   		});
	   		console.log(question)
	   		var context = {
	   				title: data[0][form, question], 
	   				body: arr
	   		};

				$('#modal').show();
	   		id = data[0]._id;
	   		$('.entry').empty()
	   		$('#form-container').append(template(context));
	   		$('#submit-answer').click(function(){

					for (var k = 0; k < arr.length; k++) {
						if ($( '#' + k ).is(':checked')){
							var $getKeyName = $( '#' + k ).val()
							data[0][form].answers[0][$getKeyName] = data[0][form].answers[0][$getKeyName] + 1
							changeData.push(data[0][form].answers[0])													
						} 
					}
					updateData();
				});
	    });
	}

	// var renderSecondTemplate = function() {
	// 	var source = $("#second-template").html();
	// 	var template = Handlebars.compile(source);
		
	// 	$.ajax('http://localhost:3000/surveys').done( function(data){

			
	//   		console.log(form)
	//   		console.log((data[0][form].question))
	// 			var context = {
	//    				title: data[0][form].question, 
	//    				body: arr
	//    			};
	  			
	//    		$.each((data[0][form].answers[0]), function(index, value){
	//    				arr.push(index);
	//    		});
	// 			$('#modal').show();
	//    		id = data[0]._id;

	//    		$('#form-container').append(template(context));
	//    		$('#submit-answer').click(function(){

	// 				for (var k = 0; k < arr.length; k++) {
	// 					if ($( '#' + k ).is(':checked')){
	// 						var $getKeyName = $( '#' + k ).val()
	// 						data[0][form].answers[0][$getKeyName] = data[0][form].answers[0][$getKeyName] + 1
	// 						changeData.push(data[0][form].answers[0])													
	// 					} 
	// 				}
	// 				$('#form-container').empty();
	// 				updateData();
	// 			});
	//     });
	// }

	var currentForm = function( number ) {
    return form = "form" + number;
	}

	var currentQuestion = function( number ) {
    return question = "question" + number;
	}

	var currentTemplate = function(temp) {
		return template = "#" + temp + "-template"
	}

	var firstQuestion = function() {
		currentForm(1);
		currentQuestion(1);
		renderFirstTemplate();
	};

	var secondQuestion = function() {
		currentForm(2);
		currentQuestion(2);
		renderFirstTemplate();
	};

	var chartRender = function() {
		$('#chart-container').show();
		$('#modal').toggle('fold');
		arr = [];

		$.ajax('http://localhost:3000/surveys').done( function(data){

			var answerNames = Object.keys(data[0][form].answers[0]);
			var pieData = [];


			for (var d = 0; d < answerNames.length; d++) {
				
				var pieValue = data[0][form].answers[0][answerNames[d]]

				pieData.push({
					value: pieValue, 
					color: getRandomColor(), 
					label: answerNames[d]
				})

				var legendColor = pieData[d].color;

				$('#legend-list').append("<li class='block' id='block" + d + "'></li>");
				$('#block' + d).css({
					"background-color": legendColor,
					"height": "10%",
					"width": "10%",
				}).append("<h3>     " + answerNames[d] + ":  " + pieValue + "</h3>");;
			}

			var pieOptions = {
			  segmentShowStroke : true,
			  animateScale : true,
			}

			$('#chart-container').prepend("<canvas id='show-chart'></canvas>");
	   	var $showChart = $('#show-chart').get(0).getContext("2d");
			var newChart = new Chart($showChart).Pie(pieData, pieOptions);
			$('#show-chart').append(newChart);
		});
	};

	$('#submit-email').click(function(){
		$('#sign-up-form').hide();
		firstQuestion();
		$('#form-container').show();
		$('#modal').show()
	})

	$('#next-question').click(function(){
		$('canvas').remove();
		// $('#legend').empty();
  	$('#chart-container').toggle( "fold" );
  	// $('#chart-container').empty();
  	secondQuestion();
	})

	var updateData = function() {

		$.ajax({
		url: "http://localhost:3000/surveys/" + id,
		method: "PUT",
		data: changeData[0]
		});
		chartRender();
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
});

