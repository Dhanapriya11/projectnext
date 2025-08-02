import mongoose from "mongoose";

const UserSchema = new mongoose.Schema({
  email: { type: String, required: true, unique: true },
  password: { type: String }, // optional for GitHub
  name: String,
  username: { type: String, unique: true, sparse: true }, // sparse allows multiple null values
  image: String,
}, { timestamps: true });

export default mongoose.models.User || mongoose.model("User", UserSchema);
