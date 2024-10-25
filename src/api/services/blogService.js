import { db } from "../../config/firebaseConfig.js";

// TODO: Implemenet pagination
export const fetchAllBlogs = async (lastDocId) => {
  // Replace test with blogMeta
  if (lastDocId == undefined) {
    const snapshot = await db
      .collection("blogMeta")
      .orderBy("postDate")
      .limit(5)
      .get();

    const result = snapshot.docs.map((doc) => ({
      id: doc.id,
      ...doc.data(),
    }));

    return result;
  }
  const lastDocSnap = await db.collection("test").doc(lastDocId).get();

  // Repitition, could be function in a helpers file in utils folder.
  const snapshot = await db
    .collection("blogMeta")
    .orderBy("postDate")
    .limit(5)
    .startAfter(lastDocSnap)
    .get();

  const result = snapshot.docs.map((doc) => ({
    id: doc.id,
    ...doc.data(),
  }));

  return result;
};

export const fetchBlogContent = async (blogContentId) => {
  console.log("UNIMPLEMENTED: Fetch a blog when clicked");

  try {
    const snapshot = await db
      .collection("blogContent")
      .doc(blogContentId)
      .get();

    return snapshot.data();
  } catch (error) {
    console.log(error);
  }

  return { msg: "ERR" };
};

// Data in the func name refers to both the
// Content and the metadata
// TODO: Refactor to use batch writes
export const addBlogData = async (blogContent, blogMeta) => {
  const newBlogContentRef = "";
  try {
    const newDocRef = await db.collection("blogContent").add(blogContent);

    newBlogContentRef = newDocRef.id;
  } catch (error) {
    // If error occurs here, we return and not add the blogMeta
    // inform the user

    console.log(error);

    return { msg: "error posting blog content" };
  }

  try {
    blogMeta = { ...blogMeta, blogRef: newBlogContentRef };
    const newDocRef = await db.collection("blogMeta").add(blogMeta);

    return { msg: "Successfully Posted" };
  } catch (error) {
    // If this catch runs, delete the recently created blogContent document
    console.log(error);

    return { msg: "error posting blog meta" };
  }
};

//TODO: Refactor to use batch deletes
export const deleteBlogData = async (blogMetaId, blogContentId) => {
  console.log(
    "UNIMPLEMENTED: Delete blog content from the db along with the metadata"
  );

  // Get blog contentId from blogMeta object
  try {
    // const { blogContentId } = blogMeta;
    const delDocRef = await db
      .collection("blogContent")
      .doc(blogContentId)
      .delete();
  } catch (error) {
    // If error occurs here, return early and inform user
    console.log(error);

    return { msg: "error deleting" };
  }

  try {
    // const { blogMetaId } = blogMeta;

    const delDocRef = await db.collection("blogMeta").doc(blogMetaId).delete();

    return { msg: "Deleted Successfully" };
  } catch (error) {
    console.log(error);
  }
  return { msg: "DBD" };
};
