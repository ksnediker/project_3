// ==================================================
//  Using Chart.js to make some nice pie charts :) 
// ==================================================

// ajax call to get the data in survey
$.ajax('http://localhost:3000/surveys').done( function(data){

	var genderFirstValue = data[0].form1.answers[0].Male;
	var genderSecondValue = data[0].form1.answers[1].Female;
	var genderThirdValue = data[0].form1.answers[2].LGBTQ;
	var genderFourthValue = data[0].form1.answers[3].Undisclosed;

	var genderPieData = [
	                {

	                    value: genderFirstValue,
	                    color:"#878BB6",
	                    label: "Male"
	                },
	                {
	                    value : genderSecondValue,
	                    color : "#4ACAB4",
	                    label: "Female"
	                },
	                {
	                    value: genderThirdValue,
	                    color : "#FF8153",
	                    label: "LGBTQ"
	                },
	                {
	                    value: genderFourthValue,
	                    color : "#FFEA88",
	                    label: "Undisclosed"
	                }
	            ];

	    var pieOptions = {
	                 segmentShowStroke : false,
	                 animateScale : true
	            }

	var gender = document.getElementById("gender").getContext("2d");
	// generates gender chart
	var newGenderChart = new Chart(gender).Pie(genderPieData, pieOptions);
		// /// data for age pie chart
	var ageFirstValue = data[0].form2.answers[0].Eighteen_to_Twenty_Four;
	var ageSecondValue = data[0].form2.answers[1].Twenty_Five_to_Twenty_Nine;
	var ageThirdValue = data[0].form2.answers[2].Thirty_to_Thirty_Four;
	var ageFourthValue = data[0].form2.answers[3].Thirty_Five_to_Thirty_Nine;
	var ageFifthValue = data[0].form2.answers[4].Forty_to_Forty_Four;
	var ageSixthValue = data[0].form2.answers[5].Forty_Five_plus;
	 
	var agePieData = [
	                {

	                    value: ageFirstValue,
	                    color:"#878BB6",
	                    label: "18-24" // we need strings in the keys to access values
	                    							// but we can render them as numerical labels :)	
	                },
	                {
	                    value : ageSecondValue,
	                    color : "#4ACAB4",
	                    label: "25-29"
	                },
	                {
	                    value: ageThirdValue,
	                    color : "#FF8153",
	                    label: "30-34"
	                },
	                {
	                    value: ageFourthValue,
	                    color : "#FFEA88",
	                    label: "35-39"
	                },
	                {
	                    value: ageFifthValue,
	                    color : "#FF00FF",
	                    label: "40-45"
	                },
	                {
	                    value: ageSixthValue,
	                    color : "#7FFFD4",
	                    label: "45+"
	                }
	            ];

	    var agePieOptions = {
	                 segmentShowStroke : false,
	                 animateScale : true
	            }

	var age = document.getElementById("age").getContext("2d");
	// generates age chart
	var newAgeChart = new Chart(age).Pie(agePieData, agePieOptions);

	/// data for GA Courses chart
	var coursesFirstValue = data[0].form3.answers[0].One;
	var coursesSecondValue = data[0].form3.answers[1].Two_or_Three;
	var coursesThirdValue = data[0].form3.answers[2].Four_or_Five;
	var coursesFourthValue = data[0].form3.answers[3].Five_plus;

	var coursesPieData = [
	                {

	                    value: coursesFirstValue,
	                    color:"#878BB6",
	                    label: "1" // we need strings in the keys to access values
	                    							// but we can render them as numerical labels :)	
	                },
	                {
	                    value : coursesSecondValue,
	                    color : "#4ACAB4",
	                    label: "2-3"
	                },
	                {
	                    value: coursesThirdValue,
	                    color : "#FF8153",
	                    label: "4-5"
	                },
	                {
	                    value: coursesFourthValue,
	                    color : "#FFEA88",
	                    label: "5+"
	                }
	            ];

	    var coursesPieOptions = {
	                 segmentShowStroke : false,
	                 animateScale : true
	            }

	var courses = document.getElementById("courses").getContext("2d");
	// generates age chart
	var newAgeChart = new Chart(courses).Pie(coursesPieData, coursesPieOptions);

	// data for experience pie chart
	var experienceFirstValue = data[0].form4.answers[0].Healthcare;
	var experienceSecondValue = data[0].form4.answers[1].Finance;
	var experienceThirdValue = data[0].form4.answers[2].Consulting;
	var experienceFourthValue = data[0].form4.answers[3].Technology;
	var experienceFifthValue = data[0].form4.answers[4].Real_Estate;
	var experienceSixthValue = data[0].form4.answers[5].Education;
	var experienceSeventhValue = data[0].form4.answers[6].Hospitality;
	var experienceEighthValue = data[0].form4.answers[7].Student;
	var experienceNinthValue = data[0].form4.answers[8].Other;

	var experiencePieData = [
                {
                    value : experienceFirstValue,
                    color:"#878BB6",
                    label: "Healthcare" // we need strings in the keys to access values
                    							// but we can render them as numerical labels :)	
                },
                {
                    value : experienceSecondValue,
                    color : "#4ACAB4",
                    label: "Finance"
                },
                {
                    value : experienceThirdValue,
                    color : "#FF8153",
                    label: "Consulting"
                },
                {
                    value : experienceFourthValue,
                    color : "#FFEA88",
                    label: "Technology"
                },
                 {
                    value : experienceFifthValue,
                    color : "#FF00FF",
                    label: "Real Estate"
                },
                 {
                    value : experienceSixthValue,
                    color : "#FFEA88",
                    label: "Education"
                },
                 {
                    value: experienceSeventhValue,
                    color : "#87CEFA",
                    label: "Hospitality"
                },
                 {
                    value: experienceEighthValue,
                    color : "#ADD8E6",
                    label: "Student"
                },
                   {
                    value: experienceNinthValue,
                    color : "#FF69B4",
                    label: "Other"
                } 
            ];

    var experiencePieOptions = {
                 segmentShowStroke : false,
                 animateScale : true
            }

	var experience = document.getElementById("experience").getContext("2d");
	// generates age chart
	var newExperienceChart = new Chart(experience).Pie(experiencePieData, experiencePieOptions);



	// new line chart for form 5

	var positionData = {
	
		labels: [ Object.keys(data[0].form5.answers[0]), Object.keys(data[0].form5.answers[1]), Object.keys(data[0].form5.answers[2]), Object.keys(data[0].form5.answers[3]), Object.keys(data[0].form5.answers[4]), Object.keys(data[0].form5.answers[5])],
		 datasets: [{
                    fillColor : "rgba(172,194,132,0.4)",
                    strokeColor : "#ACC26D",
                    pointColor : "#fff",
                    pointStrokeColor : "#9DB86D",
                    data : [data[0].form5.answers[0].Full_Stack_Developer, data[0].form5.answers[1].Front_end_Developer, data[0].form5.answers[2].Back_end_Developer, data[0].form5.answers[3].Software_Engineer, data[0].form5.answers[4].Database_Administrator, data[0].form5.answers[5].Other]
                }
                ]
         }


   var positions = document.getElementById('positions').getContext('2d');
            // draw line chart
            new Chart(positions).Line(positionData);





});




// });


// given the following JSON object ---- accessed here as a variable or 
// through an AJAX call, also above:

// var jsonData = {
//     title: 'GA Survey',
//      form1 : {
//       question: "Which gender do you most closely identify with?",
//       answers : [{"Male": 35}, {"Female": 38},{"LGBTQ": 10}, {"Undisclosed" : 10}]
//       },
//     form2 : {
//       question: "What is your age?",
//       answers : [ {"Eighteen_to_Twenty_Four": 30}, {"Twenty_Five_to_Twenty_Nine": 25}, {"Thirty_to_Thirty_Four": 15}, {"Thirty_Five_to_Thirty_Nine": 13},{"Forty_to_Forty_Four": 10}, {"Forty_Five_plus": 10}]
//     },

//     form3 : {
//       question: "How many GA courses have you taken including this one?",
//       answers: [{"One": 31}, {"Two_or_Three": 35},{"Four_or_Five": 33},{"Five_plus": 44} ]
//     },
//     form4 : {
//       question: "What industry were you in prior to WDI?",
//       answers: [{"Healthcare": 15}, {"Finance": 15}, {"Consulting": 20}, {"Technology" : 30}, {"Real_Estate": 7}, {"Education" : 10}, {"Hospitality" : 4}, {"Student" : 10}, {"Other" : 18}]
//     },

//     form5 : {
//       question: "What would be your ideal position after WDI?",
//       answers: [{"Full_Stack_Developer": 5}, {"Front_end_Developer": 15},{"Back_end_Developer": 10}, {"Software_Engineer": 8}, {"Database_Administrator": 9}, {"Other": 5} ]
//     },

//      form6 : {
//       question: "How did WDI match your expectations?",
//       answers: [{"Class_is_as_difficult_as_I_expected": 15}, {"Class_is_more_difficult_than_I_expected": 25},{"Class_is_easier_than_I_expected": 9}]
//     },

//       form6 : {
//       question: "Compared to the rest of the class, which percentile would you place yourself into in terms of your programming skills and abilities?",
//       answers: [{"Bottom_Quarter": 5}, {"Second_Quarter": 15},{"Third_Quarter": 27}, {"Top_Quarter":28}]
//     },
//     form7: {
//       question: "What is your favorite stack?", 
//       answers: [{"Ruby_on_Rails" : 30}, { "MEAN" : 20 }, {"Python_Django" : 10}, {"Other": 5}]
//     },
//     form8: {
//       question:" Is it pronounced 'Gif' or 'Jif'?",
//       answers: [{"Gif" : 18 }, { "Jif" : 28}, {"Who_cares": 5}]
//     },
//     form9: {
//       question: "Marvel or DC?",
//       answers: [{ "Marvel": 4 }, {"DC" : 5}, {"Who_cares" :46}]
//     },
//     form10: {
//       question: "Dogs or cats?",
//       answers: [{ "Dogs" : 5 }, {"Cats" :5}, {"Piglets" : 28}]

//     }

//   };

// console.log(jsonData);
