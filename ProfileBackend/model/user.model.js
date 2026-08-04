import mongoose from "mongoose";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

const userScheme = new mongoose.Schema({
  Name: {
    type: String,
    required: true,
    trim: true,
  },
  Email: {
    type: String,
    required: true,
    unique: true,
    trim: true,
  },
  Password: {
    type: String,
    required: true,
    minlength: 6,
  },
  Address: {
    type: String,
    required: true,
  },
  Phone: {
    type: String,
    required: true,
  },
  isVerified: {
    type: Boolean,
    default: false,
  },
  tokens: [
    {
      token: {
        type: String,
        required: true,
      },
    },
  ],
}, {
  timestamps: true,
});

userScheme.pre("save", async function () {
  if (this.isModified("Password")) {
    this.Password = await bcrypt.hash(this.Password, 10);
  }
});

userScheme.statics.findByCredentials = async function (Email, Password) {
  const user = await this.findOne({ Email });

  if (!user) {
    throw new Error("Invalid Email");
  }

  const isMatch = await bcrypt.compare(Password, user.Password);

  if (!isMatch) {
    throw new Error("Invalid Password");
  }

  return user;
};

userScheme.methods.generateAuthToken = async function () {
  const user = this;

  const token = jwt.sign(
    { _id: user._id.toString() },
    process.env.JWT_SECRET,
    { expiresIn: "7d" }
  );

  user.tokens.push({ token });

  await user.save();

  return token;
};

const modelUser = mongoose.model("user", userScheme);

export default modelUser;