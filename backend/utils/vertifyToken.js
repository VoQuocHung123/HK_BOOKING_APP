import jwt from "jsonwebtoken";
import { createError } from "../utils/error.js";

export const verifyToken = (req, res, next) => {
  const token = req.headers.token
  // const token = req.cookies.refresh_token;
  if (!token) {
    return next(createError(401, "You are not authenticated!"));
  }
  const accessToken = token.split(" ")[1]
  console.log(accessToken)
  jwt.verify(accessToken, process.env.JWT_ACCESS, (err, user) => {  
    if (err) return next(createError(403, "Token is not valid!"));
    req.user = user;
    next();
  });
};

export const verifyUser = (req, res, next) => {
  verifyToken(req, res, next, () => {
    if (req.user.id === req.params.id || req.user.isadmin) {
      console.log('abc')
      next();
    } else {
      return next(createError(403, "You are not authorized!"));
    }
  });
};

export const verifyAdmin = (req, res, next) => {
  verifyToken(req, res, next, () => {
    if (req.user.isadmin) {
      console.log('méo dc')
      next();
    } else {
      return next(createError(403, "You are not authorized!"));
    }
  });
};