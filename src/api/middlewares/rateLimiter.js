import rateLimit from "express-rate-limit";

const RATE_LIMIT_WINDOW = 1000;
const message = {
  message: "Too many requests, please try again a little later",
};

export const basicLimiter = rateLimit({
  windowMs: RATE_LIMIT_WINDOW,
  limit: 3,
  legacyHeaders: false,
  message: message,
});

export const heavyLimit = rateLimit({
  windowMs: RATE_LIMIT_WINDOW,
  limit: 1,
  legacyHeaders: false,
  message: message,
});
