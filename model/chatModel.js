const { Timestamp } = require('mongodb');
const mongoose = require('mongoose');

const chatSchema = new mongoose.Schema({
    sender_id:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'User'
    },
    receiver_id:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'User'
    },
    message:{
        type:String,
        require:true
    }
},
{Timestamp:true}
);

module.exports = mongoose.model('chat',chatSchema);