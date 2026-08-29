import jwt from "jsonwebtoken";
import User from "../models/User.js";

export const ValidateUser = async (req, res, next) => {
  const authHeader = req.headers.authorization;

  if (authHeader && authHeader.startsWith("Bearer ")) {
    const token = authHeader.split(" ")[1];

    try {
      //get the user id with decoded object that contains id/iat/exp
      const decoded = jwt.verify(token, process.env.JWT_SECRET);
      //will returns a full mongoose user document except password  
      req.user = await User.findById(decoded.id).select("-password");
      if (!req.user) {
        return res.status(401).json({ success: false, message: "User no longer exists" });
      }

      return next();
    } catch (e) {
      return res.status(401).json({ success: false, message: "Not authorized, token failed" });
    }
  }

  return res.status(401).json({ success: false, message: "Not authorized, no token" });
};

export default ValidateUser