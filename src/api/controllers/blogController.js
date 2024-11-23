import { AegeanError } from "../middlewares/errorHandler.js";
import * as blogService from "../services/blogService.js";

/**
 * Can have lastDocId, searchQuery, filter or not. Fetches the blogs from the service
 * @param {*} req - Express request object
 * @param {*} res - Express response object
 * @param {*} next - The next middleware function, call with error if an error occurs
 */
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

/**
 * Takes required blog data from the body, authorizes the user based upon the token,
 * packages content into blogContent and blogMeta and calls the service with those params
 *
 * @param {*} req.body - contains all the strings related to posting a blog
 * @param {*} res - express response object
 * @param {*} next - middleware function, call on error
 */
export const postBlog = async (req, res, next) => {
  try {
    // This could be made simpler by having blogMeta be a nested JS Obj
    // in the request itself. But this works too for now, and doesn't hurt readability
    const {
      author,
      authorId,
      content,
      imgUrl,
      school,
      teaser,
      timeToRead,
      title,
      postDate,
    } = req.body;

    const tknId = req.id;
    // This shouldnt happen
    if (tknId == undefined) {
      throw new AegeanError("Something went wrong, auth failed", 500);
    }

    if (tknId != authorId) {
      throw new AegeanError("Unauthorized action attempted", 401);
    }

    const blogContent = content;
    const blogMeta = {
      author,
      authorId,
      imgUrl,
      school,
      teaser,
      timeToRead,
      title,
      postDate,
    };

    // This needs to take blogContent, blogMeta parameter
    const result = await blogService.addBlogData(blogContent, blogMeta);

    res.json(result);
  } catch (error) {
    next(error);
  }
};

/**
 * This takes an id parameter from the route which is the blogContentId, call the blog
 * service on it, and returns the result
 *
 * @param {*} req.params.id - Blog content reference id from the parameters of route
 * @param {*} res - express response object
 * @param {*} next - middleware functions to call on error
 */
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

// TODO: decode jwt and compare id with blog's author id
// This will probably need fetching
// Create a service to fetch a single blog's meta content only

/**
 * This takes the "blog" id from the params, fetches the blog meta with that id
 * compares the author id with the id from the token, and calls the delete blog
 * service if authorized
 *
 * @param {*} req.params.id
 * @param {*} res
 * @param {*} next
 */
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
