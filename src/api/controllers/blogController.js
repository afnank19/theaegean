import { AegeanError } from "../middlewares/errorHandler.js";
import * as blogService from "../services/blogService.js";

export const getAllBlogs = async (req, res, next) => {
  try {
    const lastDocId = req.query.lastDocId; // Another way could using page=0 in the query and making it undefined then
    // LastDocId can either be undefined or have a value
    // If undefined, we still call the service because that is the first request
    // GET requests have no body thus no body validation middleware checks

    const searchQuery = req.query.search;
    const filter = req.query.filter;

    const result = await blogService.fetchAllBlogs(
      lastDocId,
      searchQuery,
      filter
    );

    res.json(result);
  } catch (error) {
    next(error);
  }
};

export const postBlog = async (req, res, next) => {
  try {
    // This could be made simpler by having blogMeta be a nested JS Obj
    // in the request itself. But this works too for now, and doesn't hurt readability
    const { author, content, imgUrl, school, teaser, timeToRead, title } =
      req.body;

    const blogContent = content;
    const blogMeta = {
      author,
      imgUrl,
      school,
      teaser,
      timeToRead,
      title,
    };

    // This needs to take blogContent, blogMeta parameter
    const result = await blogService.addBlogData(blogContent, blogMeta);

    res.json(result);
  } catch (error) {
    next(error);
  }
};

export const getABlog = async (req, res, next) => {
  try {
    // This if should never be true because we have a GET req for /blogs
    // without the id but in case.
    if (!req.params.id) {
      throw new AegeanError("Missing params, check your request", 400);
    }
    const blogContentId = req.params.id;

    const result = await blogService.fetchBlogContent(blogContentId);

    res.json(result);
  } catch (error) {
    next(error);
  }
};

export const deleteABlog = async (req, res, next) => {
  try {
    const blogMetaId = req.params.id;
    const { blogContentId } = req.body;

    const result = await blogService.deleteBlogData(blogMetaId, blogContentId);
    res.json(result);
  } catch (error) {
    next(error);
  }
};
