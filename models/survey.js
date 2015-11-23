var mongoose = require('mongoose');
var User = mongoose.model('User', UserSchema);


var SurveySchema = new mongoose.Schema({
	users: [UserSchema]
})

var User = mongoose.model('User', UserSchema);
module.exports = User;
