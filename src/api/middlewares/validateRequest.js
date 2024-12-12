// const supportedMethods = ["post", "put", "patch", "delete"];

import { AegeanError } from "./errorHandler.js";

export const validateRequest = (schema) => {
  return (req, res, next) => {
    // const method = req.method.toLowerCase();

    // if (!supportedMethods.includes(method)) {
    //   return next();
    // }
    const { error, value } = schema.validate(req.body);

    if (error) {
      // Throw an error here;
      // Probably pass it to error middleware
      const err = new AegeanError(
        "Missing options for the current action",
        400
      );
      return next(err);

      // Temporary
      // return res.status(400).json({ msg: "Invalid body" });
    }

    req.body = value;

    return next();
  };
};
