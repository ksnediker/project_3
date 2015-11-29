// $(document).ready(function(){
	var $getKeyName = null;
	var arr = [];
	var changeData = [];
	var id = null;
	var form = null;
	var question = null;
	var keyValues = [];
	var barGraphLabels = [];

	var renderFirstTemplate = function() {
		
		var source = $("#first-template").html();
		var template = Handlebars.compile(source);
		
		$.ajax('http://localhost:3000/surveys').done( function(data){
				
	  		
	   		$.each((data[0][form].answers[0]), function(index, value){
	   				arr.push(index);
	   		});
	   		console.log(data[0][form]);
	   		console.log(question);
	   		var context = {
	   				title: data[0][form, question], 
	   				body: arr
	   		};

	   		// console.log(data[0][form].answers[0]);
				$('#modal').show();
	   		id = data[0]._id;
	   		$('.entry').empty()
	   		$('#form-container').append(template(context));
	   		$('#submit-answer').click(function(){
					for (var k = 0; k < arr.length; k++) {
						if (form === "form3") {
							keyValues.push(data[0][form].answers[0][arr[k]]);
							barGraphLabels = arr;
						}
						if ($( '#' + k ).is(':checked')){
							var $getKeyName = $( '#' + k ).val()
							data[0][form].answers[0][$getKeyName] = data[0][form].answers[0][$getKeyName] + 1
							changeData.push(data[0][form].answers[0])
						}
					}
					console.log(keyValues)
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

	var thirdQuestion = function() {
		currentForm(3);
		currentQuestion(3);
		renderFirstTemplate();
	}

	var fourthQuestion = function() {
		currentForm(4);
		currentQuestion(4);
		renderFirstTemplate();
	}

	var fifthQuestion = function() {
		currentForm(5);
		currentQuestion(5);
		renderFirstTemplate();
	}

	var sixthQuestion = function() {
		currentForm(6);
		currentQuestion(6);
		renderFirstTemplate();
	}

	// var seventhQuestion = function() {
	// 	console.log("Hello");
	// 	currentForm(7);
	// 	currentQuestion(7);
	// 	renderFirstTemplate();
	// }

	// var eigthQuestion = function() {
	// 	currentForm(8);
	// 	currentQuestion(8);
	// 	renderFirstTemplate();
	// }

	// var ninthQuestion = function() {
	// 	currentForm(9);
	// 	currentQuestion(9);
	// 	renderFirstTemplate();
	// }

	// var tenthQuestion = function() {
	// 	currentForm(10);
	// 	currentQuestion(10);
	// 	renderFirstTemplate();
	// }

	var chartRender = function() {
		$('#chart-container').show();
		$('#modal').toggle('fold');

		$.ajax('http://localhost:3000/surveys').done( function(data){

			if (form === "form3") {
				makeBarChart();
			} else {


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
					"width": "100%",
					"text-shadow": "white 1px 1px"
				}).append("<h3>     " + answerNames[d] + ":  " + pieValue + "</h3>");;
			}

			var pieOptions = {
			  segmentShowStroke : true,
			 	segmentStrokeColor: "rgb(48,48,48)",
			  animateScale : true,
			}

			$('#chart-container').prepend("<canvas id='show-chart'></canvas>");
	   	var $showChart = $('#show-chart').get(0).getContext("2d");
			var newChart = new Chart($showChart).Pie(pieData, pieOptions);
			$('#show-chart').append(newChart).css({
				"display": "inline",
				"top": "50",
				"right": "400"
			});
		}
		});
		arr = [];
	};

	
	var makeBarChart = function() {
		
		var data = {
    	labels: barGraphLabels,
	    datasets: [
	      {
	        label: "My First dataset",
	        fillColor: "rgb(255, 179, 71)",
	        strokeColor: "rgb(255, 179, 71)",
	        highlightFill: "rgba(149, 43, 29, .4)",
	        highlightStroke: "rgba(149, 43, 29, .4)",
	        data: keyValues
	      }
   	  ]
		};

		console.log(data)

		var barOptions = {
			scaleBeginAtZero : true
		}
		$('#chart-container').prepend("<canvas id='show-chart'></canvas>");
	   	var $showChart = $('#show-chart').get(0).getContext("2d");
			var newChart = new Chart($showChart).Bar(data, barOptions);
			$('#show-chart').append(newChart).css({
				"display": "inline",
				"top": "50",
				"right": "400"
			});
	}

	$('#submit-email').click(function(){
		// if (!document.cookie) {
			$('#modal').toggle("fold")
			$('#form-container').show();
			$('#sign-up-form').hide();
			userSignup();	
			firstQuestion();
		// }	else {
		// 	console.log("You've taken survey");
		// }
	})

	$('#second-question').click(function(){
		$('#chart-container').toggle( "fold" );
		$('canvas').remove();
		$('#legend-list').empty();
  	$('#second-question').hide();
  	$('#third-question').show();
  	secondQuestion();
	})

	$('#third-question').click(function(){
		$('#chart-container').toggle( "fold" );
		$('canvas').remove();
		$('#legend-list').empty();
  	$('#third-question').hide();
  	$('#fourth-question').show();
  	thirdQuestion();
	});

	$('#fourth-question').click(function(){
		$('#chart-container').toggle( "fold" );
		$('canvas').remove();
		$('#legend-list').empty();
  	$('#fourth-question').hide();
  	$('#fifth-question').show();
  	fourthQuestion();
	});

	$('#fifth-question').click(function(){
		$('#chart-container').toggle( "fold" );
		$('canvas').remove();
		$('#legend-list').empty();
  	$('#fifth-question').hide();
  	$('#sixth-question').show();
  	fifthQuestion();
	});

	$('#sixth-question').click(function(){
		$('#chart-container').toggle( "fold" );
		$('canvas').remove();
		$('#legend-list').empty();
  	$('#sixth-question').hide();
  	// $('#seventh-question').show();
  	sixthQuestion();
	});

	// $('#seventh-question').click(function(){
	// 	$('#chart-container').toggle( "fold" );
	// 	$('canvas').remove();
	// 	$('#legend-list').empty();
 //  	$('#seventh-question').hide();
 //  	$('#eigth-question').show();
 //  	seventhQuestion();
	// });

	// $('#eigth-question').click(function(){
	// 	$('#chart-container').toggle( "fold" );
	// 	$('canvas').remove();
	// 	$('#legend-list').empty();
 //  	$('#eigth-question').hide();
 //  	$('#ninth-question').show();
 //  	eigthQuestion();
	// });

	// $('#ninth-question').click(function(){
	// 	$('#chart-container').toggle( "fold" );
	// 	$('canvas').remove();
	// 	$('#legend-list').empty();
 //  	$('#ninth-question').hide();
 //  	$('#tenth-question').show();
 //  	ninthQuestion();
	// });

	// $('#tenth-question').click(function(){
	// 	$('#chart-container').toggle( "fold" );
	// 	$('canvas').remove();
	// 	$('#legend-list').empty();
 //  	$('#tenth-question').hide();
 //  	tenthQuestion();
	// });

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

	var userSignup = function(){
    console.log("click")
    var emailInput = $("#user-email").val();
    var user = {
      email: emailInput,
    };
    // ajax post call to create the user
    $.post("/users", user );
    console.log(user);
  };

// });

