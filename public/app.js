$(document).ready(function(){
	// our favorite mutants
	var $getKeyName = null;
	var arr = [];
	var changeData = [];
	var id = null;
	var form = null;
	var question = null;
	var keyValues = [];
	var barGraphLabels = [];
	var wordCloud = null;
	var inputWords = null;
	var splitArr = null;
	var radarValues = [];
  var radarLabels = [];

	var renderFirstTemplate = function() {
		changeData = [];
		var renderArr = [];
		var source = $("#first-template").html();
		var template = Handlebars.compile(source);
		var tempArr = [];
		
		$.ajax('/surveys').done( function(data){
				
				if (form === "form6") {
					wordCloud = data[0][form].answers[0];
					$('#word-cloud-question').show();
					$('#submit-cloud').click(function(){
						inputWords = $('#submit-words').val();
						var lowerWords = inputWords.toLowerCase();
						splitArr = lowerWords.split(" ");
						pushToCloud(splitArr)
						changeData.push(wordCloud)
						if (!(form in changeData[0])) {
							var newKey = form;
							changeData[0][newKey] = 1;
						}
						$('#word-cloud-question').toggle("fold");
						$('#chart-container').remove();
						$('.word-cloud').toggle("fold");
						updateData();
					})
					
					
				} else {
	  		
			   		$.each((data[0][form].answers[0]), function(index, value){
			   				arr.push(index);
			   		});

			   		for (var m = 0; m < arr.length; m ++) {
			   			renderArr.push(arr[m].replace("_", " "));
			   		}

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
								if (form === "form3") {
									keyValues.push(data[0][form].answers[0][arr[k]]);
									barGraphLabels = renderArr;
								} else if ( form === "form4") {
									radarValues.push(data[0][form].answers[0][arr[k]]);
      						radarLabels = renderArr;
								}
								if ($( '#' + k ).is(':checked')){

									var $getKeyName = arr[k];
									data[0][form].answers[0][$getKeyName] = data[0][form].answers[0][$getKeyName] + 1
									changeData.push(data[0][form].answers[0])
								}
							}								
								if (!(form in changeData[0])) {
									var newKey = form;
									changeData[0][newKey] = 1;
								} 							
						updateData();
					});
		   		}
	    });
	}

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

	var getWordCloud = function() {
		currentForm(6);
		renderFirstTemplate();
	}

	var chartRender = function() {
		$('#chart-container').show();
		$('#modal').toggle('fold');

		$.ajax('/surveys').done( function(data){

			if (form === "form3") {
				makeBarChart();
			} else if (form === "form4") {
      		makeRadarChart();
        }
      else {

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
	        label: "Bar Chart",
	        fillColor: "rgb(255, 179, 71)",
	        strokeColor: "rgb(255, 179, 71)",
	        highlightFill: "rgba(149, 43, 29, .4)",
	        highlightStroke: "rgba(149, 43, 29, .4)",
	        data: keyValues
	      }
   	  ]
		};

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

	var makeRadarChart = function() {

    var data = {
      labels: radarLabels,
      datasets: [
	        {
	          label: "Radar Chart",
	          fillColor: "rgb(255, 179, 71)",
	          strokeColor: "rgb(255, 179, 71)",
	          highlightFill: "rgba(149, 43, 29, .4)",
	          highlightStroke: "rgba(149, 43, 29, .4)",
	          data: radarValues
	        }
        ]
      };
       
       var barOptions = {
          scaleBeginAtZero : true
        }

        $('#chart-container').prepend("<canvas id='show-chart'></canvas>");
          var $showChart = $('#show-chart').get(0).getContext("2d");
          var newChart = new Chart($showChart).Radar(data, barOptions);
          $('#show-chart').append(newChart).css({
            "display": "inline",
            "top": "50",
            "right": "400"
          });
  }

	$('#submit-email').click(function(){
		if (!document.cookie) {
			$('#modal').toggle("fold")
			$('#form-container').show();
			$('#sign-up-form').hide();
			userSignup();	
			firstQuestion();
		}	else {
			console.log("You've taken survey");
		}
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
  	$('#word-cloud-question').show();
  	getWordCloud();
	});


	var updateData = function() {

		$.ajax({
			url: "/surveys/" + id,
			method: "PUT",
			data: changeData[0]
		});
			if (form === "form6") {
				 delete wordCloud[form];
				 renderWordCloud();
			} else {
					chartRender();
			}							
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
    var emailInput = $("#user-email").val();
    var user = {
      email: emailInput,
    };
    // ajax post call to create the user
    $.post("/users", user );
    console.log(user);
  };

	var pushToCloud = function(array) {

		for (var i = 0; i < array.length; i++) {	
			var newKey = array[i].toLowerCase();
			if (!(newKey in wordCloud)) {
				wordCloud[newKey] = 1;
			} else if (array[i] in wordCloud) {
				wordCloud[array[i]] = wordCloud[array[i]] + 1
			}
		};
	};

	var randomNumber = function(){
		var random = Math.floor(Math.random() * 85);
		return random + '%';
	};


	var renderWordCloud = function() {
		var sortedKeyValue = Object.keys(wordCloud).sort(function(a, b) {return -(wordCloud[a] - wordCloud[b])});
		console.log(sortedKeyValue)
		for (var x = 0; x < 6; x++) {
			$('.word-cloud').append("<h" + (x + 1) + ">" + sortedKeyValue[x] + "</h" + (x + 1) + ">");
		};

		for (var k = 6; k < sortedKeyValue.length; k++) {
			$('.word-cloud').append('<p>');
		};
		
		$('.word-cloud').find('p').each(function (num) {
		  $(this).append( sortedKeyValue[num + 6]).css({
		    'position': 'absolute', 
		    'top': randomNumber,
		 		'left': randomNumber,
		  });;
		});

	};


});

