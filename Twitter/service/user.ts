import { inject, injectable } from 'inversify';
import { MongoDBClient } from '../utils/mongodb/client';
import { UserModel } from '../models/user';
import TYPES from '../constant/types';

@injectable()
export class UserService {
  private mongoClient: MongoDBClient;

  constructor(
    @inject(TYPES.MongoDBClient) mongoClient: MongoDBClient
  ) {
    this.mongoClient = mongoClient;
  }

  public async getUsers(): Promise<UserModel[]> {
    const users: UserModel[] = await this.mongoClient.getUsers();
    return users;
  }

  public async getUserById(id: string) {
    const user = await this.mongoClient.getUserById(id);
    return user;
  }

  public async getUserByEmail(email: string): Promise<UserModel> {
    const user: UserModel = await this.mongoClient.getUserByEmail(email);
    return user;
  }

  public async addUser(_user: UserModel): Promise<UserModel> {
    const user = await this.mongoClient.addUser(_user);
    return user;
  }
}
