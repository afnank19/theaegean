import express from "express";
import * as blogController from "../controllers/blogController.js";

const router = express.Router();

// this represents the endpoint : /api/blogs
router.route("/").get(blogController.getAllBlogs).post(blogController.postBlog);

// this represents the enpoint : /api/blogs/:id
router
  .route("/:id")
  .get(blogController.getABlog)
  .delete(blogController.deleteABlog);

export default router;
