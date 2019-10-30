const mongoose = require('mongoose');
const SubscriberSchema = new mongoose.Schema({
    name:{
        type:String,
        required:true
    },
    subscribedToChannel:{
        type:String,
        required:true
    },
    subscribeDate:{
        type:Date,
        required:true,
        default:Date.now
    }
},
    {timestamp:true}
)

module.exports = mongoose.model('Subscriber',SubscriberSchema);