const emailRegex = /^\S+@\S+\.\S+$/

const normalizeEmail = async (req, res, next) => {
  if (req.body?.email && typeof req.body.email === "string") {
    req.body.email = req.body.email.trim().toLowerCase();
  }
  next() 
}

const validatemail = async(req,res,next) => {
    const {email} = req.body || {}
    if(email && !emailRegex.test(email)){
        return res.status(400).json({msg:"Please enter a valid email"})
    }
    next()
}

export default {emailRegex,normalizeEmail,validatemail}