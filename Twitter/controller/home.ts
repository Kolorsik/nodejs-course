import { controller, httpGet } from 'inversify-express-utils';
import { Request, Response } from "express";
import TYPES from '../constant/types';
import { userMiddleware } from '../middlewares//userMiddleware';
import { BaseController } from './BaseController';
import { inject } from 'inversify';
import { PostService } from '../service/post';

@controller('/')
export class HomeController extends BaseController {

  constructor( @inject(TYPES.PostService) private postService: PostService) { 
    super();
  }

  @httpGet('/', userMiddleware())
  public async get(req: Request, res: Response): Promise<string> {
    let posts = await this.postService.getPosts();
    if (req.query.tag) {
      const tag: string = req.query.tag as string;
      posts = posts.filter(el => {
        return el.tags.includes(tag);
      })
    }
    return this.render(res, 'index', {title: 'Главная страница', user: req.user, posts});
  }
}
