import mongoose from "mongoose";
import passportLocalMongoose from "passport-local-mongoose";

// Schema 생성자를 사용해 스키마를 만든다.
const UserSchema = new mongoose.Schema({
  name: String,
  email: {
    type: String,   // 자료형
    required: true, // 필수
    unique: true    // 고유값
  },
  avatarUrl: String,
  facebookId: Number,
  githubId: Number,
  comments: [
    {
      type: mongoose.Schema.Types.ObjectId, // Comment 스키마의 코멘트 ObjectId가 set
      ref: "Comment"
    }
  ],
  videos: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Video"
    }
  ],
  createdAt: {
    type: Date,
    default: Date.now
  },
});

// plugin() : be provided to configure the hashing algorithm
UserSchema.plugin(passportLocalMongoose, { usernameField: "email" });

// 스키마와 몽고디비 컬렉션을 연결
// User => users 로 컬렉션을 생성
const model = mongoose.model("User", UserSchema); 

export default model;
