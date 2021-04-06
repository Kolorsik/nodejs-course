import { injectable } from 'inversify';
import IPost from '../interfaces/IPost';
import IComment from '../interfaces/IComment';
import { Schema } from 'mongoose';

@injectable()
export class UserModel {
  constructor(
    public email: string,
    public login: string,
    public password: string,
    public posts?: Schema.Types.ObjectId[] | string[] | IPost[],
    public comments?: Schema.Types.ObjectId[] | string[] | IComment[],
    public _id?: string,
  ) { }
}