const adminOnly = (req, res, next) => {
  if (req.user.role === "admin") {
    res.status(200).json({success: false, message: "Hello Admin!"})
    return next();
  }
  return res.status(403).json({ success: false, message: "Admin access required" });
};

export default adminOnly