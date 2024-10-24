import * as blogService from "../services/blogService.js";

export const getAllBlogs = async (req, res) => {
  console.log("UNIMPLEMENTED: Get all blogs on homepage");

  const result = blogService.fetchAllBlogs();

  res.json(result);
};

export const postBlog = async (req, res) => {
  console.log("UNIMPLEMENTED: Post a blog");

  // This needs to take userID parameter
  const result = blogService.addBlogData();

  res.json(result);
};

export const getABlog = async (req, res) => {
  console.log("UNIMPLEMENTED: Get a blog with a specific ID");

  const result = blogService.fetchBlogContent();

  res.json(result);
};

export const deleteABlog = async (req, res) => {
  console.log("UNIMPLEMENTED: Delete a blog with a specific ID");

  const result = blogService.deleteBlogData();

  res.json(result);
};
