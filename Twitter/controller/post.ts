import {
controller, httpGet, httpPost
} from 'inversify-express-utils';
import { inject } from 'inversify';
import * as fs from 'fs';
import { Request, Response } from 'express';
import TYPES from '../constant/types';
import { isValidObjectId } from 'mongoose';
import { authMiddleware } from '../middlewares/authMiddleware';
import { BaseController } from './BaseController';
import { PostModel } from '../models/post';
import { UploadedFile } from 'express-fileupload';
import { PostService } from '../service/post';
import { userMiddleware } from '../middlewares/userMiddleware';
import { CommentService } from '../service/comment';

@controller('/post')
export class PostController extends BaseController {

  constructor( @inject(TYPES.PostService) private postService: PostService, @inject(TYPES.CommentService) private commentService: CommentService) { 
    super();
  }

  @httpGet('/new', authMiddleware())
  public addPostGet(req: Request, res: Response) {
    return this.render(res, 'addPost', {user: req.user});
  }

  @httpPost('/new', authMiddleware())
  public async addPostPost(req: Request, res: Response) {
    let post: PostModel = {text: req.body.text, tags: [], userId: req.user._id, userLogin: req.user.login};
    post.text.split(' ').forEach(el => {
      if (el[0] === '#') {
        post.tags.push(el.substr(1));
      }
    })

    if (req.files) {
      const file: UploadedFile = req.files.photo as UploadedFile;
      const fileName: string = `${file.md5}.${file.mimetype.split('/')[1]}`
      file.mv('./static/uploads/' + fileName, (err) => {
        if (err) console.log(err);
      })
      post.image = fileName;
    }

    await this.postService.addPost(post);
    res.redirect('/');
  }

  @httpGet('/:id', userMiddleware())
  public async getPostGet(req: Request, res: Response) {
    const {id} = req.params;
    if (!isValidObjectId(id)) {
      res.redirect('/');
    }
    const post = await this.postService.getPostById(id);
    const comments = await this.commentService.getCommentsByPostId(id);

    return this.render(res, 'post', {title: 'Пост', user: req.user, post, comments});

  }

  @httpGet('/:id/edit', authMiddleware())
  public async editPostGet(req: Request, res: Response) {
    const {id} = req.params;
    if (!isValidObjectId(id)) {
      res.redirect('/');
    }
    const post: PostModel = await this.postService.getPostById(id);
    if (post.userId != req.user._id) {
      res.redirect('/');
    }
    return this.render(res, 'editPost', {title: 'Изменение поста', post, user: req.user})
  }

  @httpGet('/:id/delete', authMiddleware())
  public async deletePostPost(req: Request, res: Response) {
    if (!isValidObjectId(req.params.id)) {
      res.redirect('/');
    }
    const post = await this.postService.getPostById(req.params.id);
    if (post.userId != req.user._id) {
      res.redirect('/');
    }

    if (post.image) {
        await fs.unlink('./static/uploads/' + post.image, (err) => {
          if (err) console.log(err);
      })
    }
    await this.postService.deletePostById(req.params.id);
    await this.commentService.deleteCommentsByPostId(post._id);
    res.redirect('/');
  }

  @httpPost('/:id/edit', authMiddleware())
  public async editPostPost(req: Request, res: Response) {
    if (!isValidObjectId(req.params.id)) {
      res.redirect('/');
    }
    const oldPost = await this.postService.getPostById(req.params.id);
    let post: PostModel = {text: req.body.text, tags: [], userId: req.user._id, userLogin: req.user.login};
    post.text.split(' ').forEach(el => {
      if (el[0] === '#') {
        post.tags.push(el.substr(1));
      }
    })

    if (req.files) {
        await fs.unlink('./static/uploads/' + oldPost.image, (err) => {
          if (err) console.log(err);
      })

      const file: UploadedFile = req.files.photo as UploadedFile;
      const fileName: string = `${file.md5}.${file.mimetype.split('/')[1]}`
      file.mv('./static/uploads/' + fileName, (err) => {
        if (err) console.log(err);
      })
      post.image = fileName;
    }

    await this.postService.updatePostById(req.params.id, post);
    res.redirect('/');
  }

}