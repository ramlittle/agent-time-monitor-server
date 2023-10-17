const mongoose = require('mongoose');
const UserSchema = new mongoose.Schema({
    realName: String,
    americanName:  String,
    email:     String,
    password:  String,
    userType:  String,
    teamAssignment: String,   
});


module.exports = mongoose.model('User', UserSchema);
