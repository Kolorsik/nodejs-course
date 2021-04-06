import { injectable } from 'inversify';
import IComment from '../interfaces/IComment';
import IUser from '../interfaces/IUser';
import { Schema } from 'mongoose';

@injectable()
export class PostModel {
  constructor(
    public text: string,
    public userId?: Schema.Types.ObjectId | string | IUser,
    public userLogin?: string,
    public date?: Date,
    public tags?: string[],
    public comments?: Schema.Types.ObjectId[] | string[] | IComment[],
    public _id?: string,
    public image?: string,
  ) { }
}