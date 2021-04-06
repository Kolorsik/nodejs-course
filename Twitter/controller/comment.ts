import { controller, httpPost } from 'inversify-express-utils';
import { Request, Response } from "express";
import TYPES from '../constant/types';
import { BaseController } from './BaseController';
import { inject } from 'inversify';
import { CommentService } from '../service/comment';
import { authMiddleware } from '../middlewares/authMiddleware';
import { CommentModel } from '../models/comment';

@controller('/comment')
export class СommentController extends BaseController {

  constructor( @inject(TYPES.CommentService) private commentService: CommentService) { 
    super();
  }

  @httpPost('/', authMiddleware())
  public async addCommentPost(req: Request, res: Response) {
    let comment: CommentModel = {text: req.body.text, userId: req.user._id, postId: req.body.postId, userLogin: req.user.login};
    await this.commentService.addComment(comment);
    res.redirect(`/post/${req.body.postId}`);
  }
}
