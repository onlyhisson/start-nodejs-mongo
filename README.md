Start Node JS
=============


Version Info
-------------
*CentOS Linux release 7.7.1908 (Core)*

*Node JS  v12.12.0*

*Mongo    v4.0.16*

*Pm2      v3.5.1*


### 소스복사
$ cd 상위경로

직접 복사

or 

cd 상위경로

$ git clone https://github.com/onlyhisson/start-nodejs-mongo.git


### 환경 설정 파일 
$ cd 상위경로/start-nodejs-mongo

$ vi .env

아래의 내용으로 편집 

```
# Global
NODE_ENV="development"
COOKIE_SECRET="CookieSecret"
PORT="3100"

# MongoDB Config Setting
MONGO_URL="mongodb://호스트명:포트번호/DB명"
```

### Node Module install
$ npm install

### 프로그램 실행
$ npm run-script start   
or   
$ pm2 start --interpreter babel-node init.js --name startNode


### 브라우저 
http://아이피:3100


## 소스 설명
![Alt text](/public/images/project/src_tree.png)   

[/controllers][controllers_link]   

[controllers_link]: https://github.com/onlyhisson/start-nodejs-mongo/blob/master/public/documents/controllers.md   

[/models][models_link]   

[models_link]: https://github.com/onlyhisson/start-nodejs-mongo/blob/master/public/documents/models.md   

/public : javascript, images, css 등의 자원   

[/routers][routers_link]   

[routers_link]: https://github.com/onlyhisson/start-nodejs-mongo/blob/master/public/documents/routers.md 

/view : View 페이지   

app.js : application 설정   
db.js : mongodb 연결 설정   
init.js : 프로그램 실행 파일, 내부적으로 application 설정과 db연결 설정을 한다.   
middlewares.js : 특정 uri를 통해 실행될 함수를 실행하기 전 처리 함수, 세션 유무, 모든 요청에 대한 응답시 공통적으로 들어갈 데이터 첨부 등    
passport.js : 로그인 처리 함수 설정   
routes.js : 요청 uri 와 실행될 함수 매핑
