import { inject, injectable } from 'inversify';
import { MongoDBClient } from '../utils/mongodb/client';
import TYPES from '../constant/types';
import { CommentModel } from '../models/comment';

@injectable()
export class CommentService {
  private mongoClient: MongoDBClient;

  constructor(
    @inject(TYPES.MongoDBClient) mongoClient: MongoDBClient
  ) {
    this.mongoClient = mongoClient;
  }

  public async getCommentsByPostId(postId: string) {
    const comments = await this.mongoClient.getCommentsByPostId(postId);
    return comments;
  }

  public async deleteCommentsByPostId(id: string) {
    const comments = await this.mongoClient.deleteCommentsByPostId(id);
    return comments;
  }

  public async addComment(_comment: CommentModel) {
    const comment = await this.mongoClient.addComment(_comment);
    return comment;
  }

  public async updateComment(id: string, _comment: CommentModel) {
    const comment = await this.mongoClient.updateCommentById(id, _comment);
    return comment;
  }

  public async deleteCommentById(id: string) {
    const comment = await this.mongoClient.deleteCommentById(id);
    return comment;
  }
}
