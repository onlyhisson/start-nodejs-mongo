import "@babel/polyfill";
import dotenv from "dotenv";
import "./db";
import app from "./app";

dotenv.config();  // .env 파일에서 변수를 load

import "./models/Video";
import "./models/Comment";
import "./models/Posts";
import "./models/User";

const PORT = process.env.PORT || 3100;

const handleListening = () =>
  console.log(`✅  Listening on: http://localhost:${PORT}`);

app.listen(PORT, handleListening);
