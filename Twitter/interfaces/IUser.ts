import { Document, Schema } from 'mongoose';
import IComment from './IComment';
import IPost from './IPost';

export default interface IUser extends Document {
    _id?: string;
    email: string;
    login: string;
    password: string;
    posts?: Schema.Types.ObjectId[] | string[] | IPost[];
    comments?: Schema.Types.ObjectId[] | string[] | IComment[];
}