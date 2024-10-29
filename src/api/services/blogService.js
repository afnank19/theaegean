import { db } from "../../config/firebaseConfig.js";

// TODO: Impl service for fetching using search, or for users

// TODO: Implemenet pagination [X]
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
export const addBlogData = async (blogContent, blogMeta) => {
  const newBlogContentRef = "";

  // this creates a document in the content collection
  // which is referred by the meta collection.
  try {
    const newDocRef = await db.collection("blogContent").add(blogContent);

    newBlogContentRef = newDocRef.id;
  } catch (error) {
    // If error occurs here, we return and not add the blogMeta
    // inform the user

    throw error;
  }

  // This attempts to create the meta document for the collection
  try {
    blogMeta = { ...blogMeta, blogRef: newBlogContentRef };
    const newDocRef = await db.collection("blogMeta").add(blogMeta);

    return { msg: "Successfully Posted" };
  } catch (error) {
    // If this catch runs, delete the recently created blogContent document
    console.log(error);

    const res = await db
      .collection("blogContent")
      .doc(newBlogContentRef)
      .delete();

    return { msg: "error posting blog meta" };
  }
};

//TODO: Refactor to use batch deletes
export const deleteBlogData = async (blogMetaId, blogContentId) => {
  console.log(
    "UNIMPLEMENTED: Delete blog content from the db along with the metadata"
  );

  const batch = db.batch();

  const delContentRef = db.collection("blogContent").doc(blogContentId);
  batch.delete(delContentRef);

  const delMetaRef = db.collection("blogMeta").doc(blogMetaId);
  batch.delete(delMetaRef);
  try {
    await batch.commit();

    return { msg: "DELETED" };
  } catch (error) {
    console.error(error);

    return { msg: "ERROR" };
  }
};
