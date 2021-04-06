import { injectable } from 'inversify';
import User from '../../schemas/User';
import Post from '../../schemas/Post';
import Comment from '../../schemas/Comment';
import { UserModel } from '../../models/user';
import { PostModel } from '../../models/post';
import { CommentModel } from '../../models/comment';

@injectable()
export class MongoDBClient {

  public async getUsers(): Promise<UserModel[]> {
    const users: UserModel[] = await User.find();
    return users;
  }

  public async addUser(_user: UserModel): Promise<UserModel> {
    const user = new User(_user);
    await user.save();
    return user;
  }

  public async getUserByEmail(email: string): Promise<UserModel> {
    const user = await User.findOne({email});
    return user;
  }

  public async getUserById(id: string): Promise<UserModel> {
    const user: UserModel = await User.findOne({_id: id});
    return user;
  }

  public async getPosts(): Promise<PostModel[]> {
    const posts: PostModel[] = await Post.find();
    return posts;
  }

  public async getPostById(id: string) {
    const post = await Post.findOne({_id: id});
    return post;
  }

  public async addPost(_post: PostModel) {
    const post = new Post(_post);
    await post.save();
    return post;
  }

  public async updatePostById(id: string, _post: PostModel) {
    const post = await Post.findByIdAndUpdate(id, _post);
    return post;
  }

  public async deletePostById(id: string) {
    const post = await Post.findOneAndDelete({_id: id});
    return post;
  }

  public async addComment(_comment: CommentModel) {
    const comment = new Comment(_comment);
    await comment.save();
    return comment;
  }

  public async deleteCommentsByPostId(id: string) {
    const comments = await Comment.deleteMany({postId: id});
    return comments;
  }

  public async updateCommentById(id: string, _comment: CommentModel) {
    const comment = await Comment.findByIdAndUpdate(id, _comment);
    return comment;
  }

  public async getCommentsByPostId(postId: string) {
    const comments = await Comment.find({postId})
    return comments;
  }

  public async deleteCommentById(id: string) {
    const comment = await Comment.findOneAndDelete({_id: id});
    return comment;
  }
}
