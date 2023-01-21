import mongoose from "mongoose";
import bcrypt from "bcrypt";
const UserSchema = new mongoose.Schema(
  {
    firstName: {
      type: String,
      required: true,
      min: 2,
      max: 50,
    },
    lastName: {
      type: String,
      required: true,
      min: 2,
      max: 50,
    },
    email: {
      type: String,
      required: true,
      max: 50,
      unique: true,
    },
    password: {
      type: String,
      require: true,
      min: 5,
    },
    picturePath: {
      type: String,
      default: "",
    },
    friends: {
      type: Array,
      default: [],
    },
    location: {
      type: String,
    },

    occupation: {
      type: String,
    },

    viewedProfile: {
      type: Number,
    },
    impressions: {
      type: Number,
    },
  },
  { timestamps: true }
);

////encrypted Password before creating new user////
UserSchema.pre("save", async function (next) {
  if (!this.isModified("password")) {
    return next();
  }
  const salt = await bcrypt.genSalt(9);
  hashedPassword = await bcrypt.hash(this.password, salt);
  this.password = hashedPassword;
  next();
});
const User = mongoose.model("user", UserSchema);
export default User;
