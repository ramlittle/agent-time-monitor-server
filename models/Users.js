const mongoose = require('mongoose');
const UserSchema = new mongoose.Schema({
    realName: String,
    americanName:  String,
    email:     String,
    password:  String,
    role:  String,
    pictureLink: String,
    team: String,   
});


module.exports = mongoose.model('User', UserSchema);
