const rateLimit = require("express-rate-limit");

const apiLimiter = rateLimit({
  windowMs: 15 * 60 * 1000,//every 15min
  max: 1000,               //maximum of attempts in 15min 
  standardHeaders: true,   //some infos like RateLimit-Remaining:995 / RateLimit-Reset: 1718976000 
  legacyHeaders: false,
  message: { message: "Too many requests, please try again later" }//msg if limit is reached 
}); 

const authLimiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 10,
  standardHeaders: true,
  legacyHeaders: false,
  message: { message: "Too many auth attempts, please try again later" }
});

module.exports = { apiLimiter, authLimiter };