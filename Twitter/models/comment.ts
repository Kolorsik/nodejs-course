import { injectable } from 'inversify';
import IPost from '../interfaces/IPost';
import IUser from '../interfaces/IUser';
import { Schema } from 'mongoose';

@injectable()
export class CommentModel {
  constructor(
    public text: string,
    public userId: Schema.Types.ObjectId | string | IUser,
    public postId: Schema.Types.ObjectId | string | IPost,
    public userLogin: string,
    public date?: Date,
    public _id?: string,
    public image?: string,
  ) { }
}