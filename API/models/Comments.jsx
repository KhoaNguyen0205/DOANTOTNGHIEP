const mongodb = require('mongodb');
const { default: mongoose } = require('mongoose');

const commetnSchema = new mongoose.Schema({

    user:{ type:mongoose.Schema.Types.ObjectId,ref:'User'},
    productId: {type: mongoose.Schema.Types.ObjectId,ref:'Product'},
    rate:{
        type: Number,
        require: true,
    },
    content:{
        type: String,
        require: true,
    },
    image:{
        type: [String],
    }
}, {
    timestamps:true,
})
const CommentModel = mongoose.model('Comment', commetnSchema);

module.exports = CommentModel;