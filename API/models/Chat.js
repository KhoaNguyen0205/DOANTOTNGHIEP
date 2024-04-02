const { default: mongoose, mongo } = require("mongoose");
const{Timestamp} = require("mongodb");

const chatSchema = new mongoose.Schema({

    sender: {type: mongoose.Schema.Types.ObjectId, ref: 'User'},
    receiver: {type: mongoose.Schema.Types.ObjectId, ref: 'User'},
    content: String,

},
{
    timestamps: true,
});

const Chat = mongoose.model('Chat', chatSchema);

module.exports = Chat;