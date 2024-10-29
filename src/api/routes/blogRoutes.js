import express from "express";
import * as blogController from "../controllers/blogController.js";
import { validateRequest } from "../middlewares/validateRequest.js";
import { blogDataSchema } from "../utils/validationSchemas.js";

const router = express.Router();

// Always keep dynamic routes at the bottom!

// this represents the endpoint : /api/blogs
router
  .route("/")
  .get(blogController.getAllBlogs)
  .post(validateRequest(blogDataSchema), blogController.postBlog);

// this represents the enpoint : /api/blogs/:id
router
  .route("/:id")
  .get(blogController.getABlog)
  .delete(blogController.deleteABlog);

export default router;
