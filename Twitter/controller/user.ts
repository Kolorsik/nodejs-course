import {
  controller, httpGet, httpPost
} from 'inversify-express-utils';
import { inject } from 'inversify';
import { Request, Response } from 'express';
import { UserService } from '../service/user';
import TYPES from '../constant/types';
import * as bcrypt from 'bcryptjs';
import * as jwt from 'jsonwebtoken';
import { userMiddleware } from '../middlewares/userMiddleware';
import { isValidObjectId } from 'mongoose';
import { UserModel } from '../models/user';
import { BaseController } from './BaseController';

@controller('/user')
export class UserController extends BaseController {

  constructor( @inject(TYPES.UserService) private userService: UserService) { 
    super();
  }

  @httpGet('/logout')
  public logoutUserGet(req: Request, res: Response) {
    const {AuthToken} = req.cookies;
    if (AuthToken) {
      res.clearCookie('AuthToken');
    }
    res.redirect('/');
  }

  @httpGet('/register', userMiddleware())
  public registerUserGet(req: Request, res: Response): Promise<string> {
    if (req.user) {
      res.redirect('/');
    }
    return this.render(res, 'register', {title: 'Регистрация пользователя'});
  }

  @httpGet('/login', userMiddleware())
  public loginUserGet(req: Request, res: Response): Promise<string> {
    if (req.user) {
      res.redirect('/');
    }
    return this.render(res, 'login', {title: 'Авторизация пользователя'});
  }

  @httpPost('/login')
  public async loginUserPost(req: Request, res: Response) {
    const {email, password}: {email: string, password: string} = req.body;
    const user = await this.userService.getUserByEmail(email);
    if (user) {
      const validPass = await bcrypt.compare(password, user.password);
      if (validPass) {
        const token: string = jwt.sign({_id: user._id, email: user.email, login: user.login}, 'obtgvcdaolmqztrr');
        res.cookie('AuthToken', token);
        res.redirect('/');
      } else {
        return this.render(res, 'login', {title: 'Авторизация пользователя', email: email, loginError: 'Неправильная почта или пароль'});
      }
    } else {
      return this.render(res, 'login', {title: 'Авторизация пользователя', email: email, loginError: 'Неправильная почта или пароль'});
    }
  }

  @httpPost('/register')
  public async registerUserPost(req: Request, res: Response): Promise<string | void> {
    const user: UserModel = req.body;
    const checkUser: UserModel = await this.userService.getUserByEmail(user.email);
    if (checkUser) {
      return this.render(res, 'register', {email: user.email, login: user.login, registerError: 'Пользователь с такой электронной почтой уже есть в системе'});
    } else {
      const salt = await bcrypt.genSalt(10);
      user.password = await bcrypt.hash(user.password, salt);
      await this.userService.addUser(user);
      return res.redirect('/user/login');
    }
  }

  @httpGet('/:id', userMiddleware())
  public async getUserGet(req: Request, res: Response) {
    if (!isValidObjectId(req.params.id)) {
      return this.render(res, 'error', {user: req.user});
    }
    
    const user = await this.userService.getUserById(req.params.id);
    if (user) {
      return this.render(res, 'user', {userInfo: user});
    } else {
      return this.render(res, 'error', {title: 'Ошибка', user: req.user});
    }

  }
}
