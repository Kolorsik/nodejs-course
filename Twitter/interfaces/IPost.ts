import { Document, Schema } from 'mongoose';
import IUser from './IUser';
import IComment from './IComment';

export default interface IPost extends Document {
    _id?: string;
    text: string;
    image?: string;
    tags?: string [];
    userLogin?: string;
    userId: Schema.Types.ObjectId | string | IUser;
    comments?: Schema.Types.ObjectId[] | string[] | IComment[];
    date: Date;
}