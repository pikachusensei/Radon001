import jwt from "jsonwebtoken";
import userModel from "../models/UserModel.js";

export const protect = async (req, res, next) => {
  try {
    let token;

    // Check for token in cookies or headers
    if (req.cookies?.token || req.headers.authorization?.startsWith("Bearer")) {
      token = req.cookies?.token || req.headers.authorization.split(" ")[1];

      const decoded = jwt.verify(token, process.env.JWT_SECRET);
      const user = await userModel.findById(decoded.id).select("-Password"); // exclude password

      if (!user) {
        return res.status(401).json({ message: "User not found" });
      }

      req.user = user; // attach user to request
      next();
    } else {
      res.status(401).json({ message: "Not authorized, token missing" });
    }
  } catch (error) {
    console.error("Protect middleware error:", error);
    res.status(401).json({ message: "Not authorized, token failed" });
  }
};
