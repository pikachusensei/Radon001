import mongoose from "mongoose";

const UserSchema = mongoose.Schema(
  {
    FirstName: {
      type: String,
      required: true,
    },
    LastName: {
      type: String,
      required: true,
    },
    University: {
      type: String,
      required: true,
    },
    GraduationYear: {
      type: String,
      required: true,
    },
    Email: {
      type: String,
      required: true,
      unique: true, // Add unique to avoid duplicates
    },
    Password: {
      type: String,
      required: true,
    },
    confirmPassword: {
      type: String,
    },
    profileImage: {
      type: String,
    },
    role: {
      type: String,
      enum: ["user", "admin"], // restrict values to these two roles
      default: "user", // default role is 'user'
    },
    verificationToken: {
      type: String,
    },
    verified: {
      type: Boolean,
      default: false,
    },
    resetToken: { type: String },
    resetTokenExpiry: { type: Date },
  },
  { timestamps: true }
);

const User = mongoose.model("User", UserSchema);
export default User;
