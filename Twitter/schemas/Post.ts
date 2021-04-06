import {Schema, model} from 'mongoose';
import IPost from '../interfaces/IPost';

const postSchema = new Schema({
    text: {
        type: String,
        required: true
    },
    image: {
        type: String
    },
    tags: [
        {
            type: String
        }
    ],
    userLogin: {
        type: String
    },
    userId: {
        type: Schema.Types.ObjectId,
        ref: 'User'
    },
    comments: [
        {
            type: Schema.Types.ObjectId,
            ref: 'Comment'
        }
    ],
    date: {
        type: Date,
        default: Date.now
    }
})

export default model<IPost>('Post', postSchema);