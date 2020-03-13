import express from "express";
import expressLayouts from 'express-ejs-layouts';
import morgan from "morgan";                // logger
import helmet from "helmet";                // 보안 취약점 방지
import cookiePaser from "cookie-parser";    // cookie 를 다루기 위해 필요 
import bodyParser from "body-parser";       // body 로부터 데이터 접근 가능
import passport from "passport";
import mongoose from "mongoose";
import session from "express-session";
import path from "path";
import flash from "express-flash";
import MongoStore from "connect-mongo";
import { localsMiddleware } from './middlewares';
import routes from "./routes";
import userRouter from "./routers/userRouter";
import videoRouter from "./routers/videoRouter";
import globalRouter from "./routers/globalRouter";
import apiRouter from "./routers/apiRouter";

import "./passport";
import postsRouter from './routers/postsRouter';

const app = express(); // express를 실행해서 변수 참조
const CokieStore = MongoStore(session);

app.use(helmet());                                  // application 보안
app.set('view engine', 'ejs');                      // 템플릿 설정
app.set('views', path.join(__dirname, 'views'));    // view 경로

// express-ejs-layouts setting
app.set('layout', 'layouts/main');      // default layout
app.set('layout extractScripts', true);
app.use(expressLayouts);

app.use('/public', express.static(__dirname + '/public', {}));
app.use('/images', express.static(__dirname + '/public/images', {}));
app.use('/assets', express.static(__dirname + '/public/assets', {}));

app.use(cookiePaser());
app.use(bodyParser.json());                         // 데이터 전송시 서버가 json 인 것을 알도록
app.use(bodyParser.urlencoded({ extended: true })); // request 정보에서 form이나 json 형태의 body를 검사
app.use(morgan("dev"));

app.use(
    session({
      secret: process.env.COOKIE_SECRET,
      resave: true,
      saveUninitialized: false,
      store: new CokieStore({ mongooseConnection: mongoose.connection })
    })
  );
app.use(flash()); // 내부적으로 session을 사용하기 때문에 session 아래에 미들웨어 사용

app.use(passport.initialize());
app.use(passport.session());

app.use(localsMiddleware);
app.use(routes.home, globalRouter);
app.use(routes.users, userRouter);
app.use(routes.posts, postsRouter);
app.use(routes.videos, videoRouter);
app.use(routes.api, apiRouter);

export default app;