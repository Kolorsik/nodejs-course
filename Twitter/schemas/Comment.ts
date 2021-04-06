import {Schema, model} from 'mongoose';
import IComment from '../interfaces/IComment';

const commentSchema = new Schema({
    text: {
        type: String,
        required: true
    },
    image: {
        type: String
    },
    userId: {
        type: Schema.Types.ObjectId,
        ref: 'User'
    },
    userLogin: {
        type: String
    },
    postId: {
        type: Schema.Types.ObjectId,
        ref: 'Post'
    },
    date: {
        type: Date,
        default: Date.now
    }
})

export default model<IComment>('Comment', commentSchema);