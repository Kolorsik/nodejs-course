import { inject, injectable } from 'inversify';
import { MongoDBClient } from '../utils/mongodb/client';
import { PostModel } from '../models/post';
import TYPES from '../constant/types';

@injectable()
export class PostService {
  private mongoClient: MongoDBClient;

  constructor(
    @inject(TYPES.MongoDBClient) mongoClient: MongoDBClient
  ) {
    this.mongoClient = mongoClient;
  }

  public async getPosts(): Promise<PostModel[]> {
    const posts: PostModel[] = await this.mongoClient.getPosts();
    return posts;
  }

  public async getPostById(id: string) {
    const post = await this.mongoClient.getPostById(id);
    return post;
  }

  public async addPost(_post: PostModel): Promise<PostModel> {
    const post = await this.mongoClient.addPost(_post);
    return post;
  }

  public async updatePostById(id: string, _post: PostModel) {
    const post = await this.mongoClient.updatePostById(id, _post);
    return post;
  }

  public async deletePostById(id: string) {
    const post = await this.mongoClient.deletePostById(id);
    return post;
  }
}
