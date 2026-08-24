const adminOnly = (req, res, next) => {
    //we got req.user from validatUser Middelware
    if (req.user?.role === "admin") {
    return next();
    }
    return res.status(403).json({ success: false, message: "Admin access required" })
  }

export default adminOnly