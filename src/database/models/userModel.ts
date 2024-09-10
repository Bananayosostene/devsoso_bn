import mongoose, { Document, Model, Schema } from "mongoose";

// Define the UserAttributes interface
export interface UserAttributes {
  username: string;
  email: string;
  password: string;
  role: string;
  profileImage?: string;
}

// Extend Document while omitting '_id' from UserAttributes
export interface UserDocument extends Omit<UserAttributes, '_id'>, Document {}

// Define the user schema
const userSchema: Schema<UserDocument> = new mongoose.Schema({
  username: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
    validate: {
      validator: (value: string) => /\S+@\S+\.\S+/.test(value),
      message: (props) => `${props.value} is not a valid email address!`,
    },
  },
  password: {
    type: String,
    required: false,
    select: false,
  },
  role: {
    type: String,
    default: "user",
  },
  profileImage: {
    type: String,
    required: false,
  },
});

// Create the model
const UserModel: Model<UserDocument> = mongoose.model<UserDocument>("User", userSchema);

export default UserModel;
