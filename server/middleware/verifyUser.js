// import jwt from "jsonwebtoken";
// import { createError } from "../error.js";

// export const verifyToken = async (req, res, next) => {
//   try {
//     if (!req.headers.authorization) {
//       return next(createError(401, "You are not authenticated!"));
//     }
//     console.log(req.headers.authorization);
//     const token = req.headers.authorization.split(" ")[1];
//     console.log(token);
//     if (!token) return next(createError(401, "You are not authenticated!"));
//     const decode = jwt.verify(token, process.env.JWT);
//     console.log(decode);
//     req.user = decode;
//     return next();
//   } catch (err) {
//     next(err);
//   }
// };

import jwt from "jsonwebtoken";
import { createError } from "../error.js";

export const verifyToken = (req, res, next) => {
  try {
    const authHeader = req.headers.authorization;
    console.log(authHeader);
    if (!authHeader) {
      return next(createError(401, "Authorization header is missing!"));
    }
    const tokenParts = authHeader.split(" ");
    if (tokenParts[0] !== "Bearer" || tokenParts.length !== 2) {
      return next(createError(401, "Authorization format is 'Bearer <token>'"));
    }
    const token = tokenParts[1];
    const decoded = jwt.verify(token, process.env.JWT); // Changed to JWT_SECRET for clarity
    req.user = decoded;
    next();
  } catch (err) {
    if (err.name === "JsonWebTokenError") {
      return next(createError(401, "Invalid Token"));
    } else if (err.name === "TokenExpiredError") {
      return next(createError(401, "Token has expired"));
    }
    // Log the error or handle other types of JWT errors
    next(createError(500, "Failed to authenticate token"));
  }
};
