const mongoose = require('mongoose');
const BreakSchema = new mongoose.Schema({
    dateTime: String,
    type:String,
    breakNumber: String,
    userId:String //user that added this break
})

module.exports=mongoose.model('Break',BreakSchema);