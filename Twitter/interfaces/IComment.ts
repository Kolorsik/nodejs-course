import { Document, Schema } from 'mongoose';
import IUser from './IUser';
import IPost from './IPost';

export default interface IComment extends Document {
    _id?: string;
    text: string;
    image?: string;
    userId: Schema.Types.ObjectId | string | IUser;
    postId: Schema.Types.ObjectId | string | IPost;
    userLogin: string;
    date: Date;
}