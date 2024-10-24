import { db } from "../../config/firebaseConfig.js";

export const fetchAllBlogs = () => {
  console.log(
    "UNIMPLEMENTED: Fetch blogs(metadata) from the db for the homepage"
  );
  return { msg: "FAB" };
};

export const fetchBlogContent = () => {
  console.log("UNIMPLEMENTED: Fetch a blog when clicked");
  return { msg: "FB" };
};

// Data in the func name refers to both the
// Content and the metadata
export const addBlogData = () => {
  console.log(
    "UNIMPLEMENTED: Add blog metadata to the meta collection and blog content to the blogContent collection"
  );
  return { msg: "ABD" };
};

export const deleteBlogData = () => {
  console.log(
    "UNIMPLEMENTED: Delete blog content from the db along with the metadata"
  );
  return { msg: "DBD" };
};
