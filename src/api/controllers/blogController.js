import * as blogService from "../services/blogService.js";

export const getAllBlogs = async (req, res) => {
  const lastDocId = req.body.lastDocId; // Another way could using page=0 in the query and making it undefined then

  const result = await blogService.fetchAllBlogs(lastDocId);

  res.json(result);
};

export const postBlog = async (req, res) => {
  console.log("UNIMPLEMENTED: Post a blog");

  // This needs to take blogRefID parameter
  const result = await blogService.addBlogData();

  res.json(result);
};

export const getABlog = async (req, res) => {
  const blogContentId = req.params.id;

  const result = await blogService.fetchBlogContent(blogContentId);

  res.json(result);
};

export const deleteABlog = async (req, res) => {
  console.log("UNIMPLEMENTED: Delete a blog with a specific ID");
  const blogMetaId = req.params.id;
  const { blogContentId } = req.body;

  // This needs to take blogRefID parameter
  const result = await blogService.deleteBlogData(blogMetaId, blogContentId);

  res.json(result);
};
