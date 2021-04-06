import 'reflect-metadata';
import { InversifyExpressServer } from 'inversify-express-utils';
import { Container } from 'inversify';
import { makeLoggerMiddleware } from 'inversify-logger-middleware';
import * as bodyParser from 'body-parser';
import * as express from 'express';
import * as path from 'path';
import * as cookieParser from 'cookie-parser';
import * as mongoose from 'mongoose';
import TYPES from './constant/types';
import * as fileUpload from 'express-fileupload';
import { UserService } from './service/user';
import { PostService } from './service/post';
import { MongoDBClient } from './utils/mongodb/client';
import * as Handlebars from 'handlebars';
import * as expressHandlebars from 'express-handlebars';
import { allowInsecurePrototypeAccess } from '@handlebars/allow-prototype-access';
import './controller/home';
import './controller/user';
import './controller/post';
import './controller/comment';
import { CommentService } from './service/comment';

// load everything needed to the Container
let container = new Container();

const handlebars = expressHandlebars.create({
  defaultLayout: 'main',
  extname: 'hbs',
  helpers: require('./utils/hbsHelpers'),
  handlebars: allowInsecurePrototypeAccess(Handlebars)
});

if (process.env.NODE_ENV === 'development') {
    let logger = makeLoggerMiddleware();
    container.applyMiddleware(logger);
}

container.bind<MongoDBClient>(TYPES.MongoDBClient).to(MongoDBClient);
container.bind<UserService>(TYPES.UserService).to(UserService);
container.bind<PostService>(TYPES.PostService).to(PostService);
container.bind<CommentService>(TYPES.CommentService).to(CommentService);

// start the server
let server = new InversifyExpressServer(container);
server.setConfig((app) => {

  app.engine('hbs', handlebars.engine);
  app.set('view engine', 'hbs');
  app.set('views', 'views');

  app.use(express.static(path.join(__dirname, 'static')))
  app.use(express.static(path.join(__dirname, 'uploads')))

  app.use(fileUpload());
  app.use(cookieParser());
  app.use(bodyParser.urlencoded({
    extended: true
  }));
  app.use(bodyParser.json());
});

let app = server.build();
app.listen(3000, async () => {
  await mongoose.connect('connection string mongodb', {useNewUrlParser: true, useUnifiedTopology: true, useFindAndModify: false});
  console.log('Server started on port 3000 :)');
});