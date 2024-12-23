import { adm, db } from "../../config/firebaseConfig.js";
import { AegeanError } from "../middlewares/errorHandler.js";
// IMPORTANT REFACTOR:
// When creating the blog, also set title, author, date, and Time to read
// in the blog content collection [ ]

// TODO: Impl service for fetching using search, or for users [ X ]
// TODO: Add constant strings instead of literals while querying collections
export const fetchAllBlogs = async (lastDocId, searchQuery, filter) => {
  // Replace test with blogMeta
  if (lastDocId == undefined) {
    try {
      let result;
      if (searchQuery != undefined && filter != undefined) {
        // Query for search term and filter
        const snapshot = await db
          .collection("blogMeta")
          .where("title", ">=", searchQuery)
          .where("tag", "==", filter)
          .limit(5)
          .get();

        result = snapshotMapToResult(snapshot);
        return result;
      }

      if (searchQuery != undefined) {
        const snapshot = await db
          .collection("blogMeta")
          .where("title", ">=", searchQuery)
          .limit(5)
          .get();

        result = snapshotMapToResult(snapshot);
        return result;
      }

      if (filter != undefined) {
        const snapshot = await db
          .collection("blogMeta")
          .where("tag", "==", filter)
          .orderBy("postDate", "desc")
          .limit(5)
          .get();

        // if (snapshot.empty) {
        //   return {};
        // }

        result = snapshotMapToResult(snapshot);
        return result;
      }

      const snapshot = await db
        .collection("blogMeta")
        .orderBy("postDate", "desc")
        .limit(5)
        .get();

      result = snapshotMapToResult(snapshot);
      return result;
    } catch (error) {
      console.error(error);
      throw new AegeanError("Error fetching blogs for search", 500);
    }
  }
  const lastDocSnap = await db.collection("blogMeta").doc(lastDocId).get();

  // Repitition, could be function in a helpers file in utils folder.

  try {
    let result;
    if (searchQuery != undefined && filter != undefined) {
      // Query for search term and filter
      const snapshot = await db
        .collection("blogMeta")
        .where("title", ">=", searchQuery)
        .where("tag", "==", filter)
        .limit(5)
        .startAfter(lastDocSnap)
        .get();

      result = snapshotMapToResult(snapshot);
      console.log(result);
      return result;
    }

    if (searchQuery != undefined) {
      const snapshot = await db
        .collection("blogMeta")
        .where("title", ">=", searchQuery)
        .limit(5)
        .startAfter(lastDocSnap)
        .get();

      result = snapshotMapToResult(snapshot);
      return result;
    }

    if (filter != undefined) {
      const snapshot = await db
        .collection("blogMeta")
        .where("tag", "==", filter)
        .orderBy("postDate", "desc")
        .limit(5)
        .startAfter(lastDocSnap)
        .get();

      result = snapshotMapToResult(snapshot);
      return result;
    }

    const snapshot = await db
      .collection("blogMeta")
      .orderBy("postDate", "desc")
      .limit(5)
      .startAfter(lastDocSnap)
      .get();

    result = snapshotMapToResult(snapshot);
    return result;
  } catch (error) {
    throw new AegeanError("Error fetching blogs for search", 500);
  }
};

function snapshotMapToResult(snapshot) {
  const result = snapshot.docs.map((doc) => ({
    id: doc.id,
    ...doc.data(),
  }));

  return result;
}

// Data in the func name refers to both the
// Content and the metadata
export const addBlogData = async (blogContent, blogMeta) => {
  let newBlogContentRef = "";

  // this creates a document in the content collection
  // which is referred by the meta collection.
  try {
    let blogData = {
      title: blogMeta.title,
      author: blogMeta.author,
      timeToRead: blogMeta.timeToRead,
      displayDate: blogMeta.displayDate,
      content: blogContent,
      imgUrl: blogMeta.imgUrl,
    };

    //blogContent = { blogMetaData, blogContent };
    console.log(blogData);

    const newDocRef = await db.collection("blogContent").add(blogData);

    newBlogContentRef = newDocRef.id;
  } catch (error) {
    // If error occurs here, we return and not add the blogMeta
    // inform the user
    console.log(error);

    throw new AegeanError("Error adding blog content", 500);
  }

  // This attempts to create the meta document for the collection
  try {
    const postDate = adm.firestore.FieldValue.serverTimestamp();
    blogMeta = { ...blogMeta, blogRef: newBlogContentRef, postDate: postDate };
    const newDocRef = await db.collection("blogMeta").add(blogMeta);

    return { message: "Successfully Posted" };
  } catch (error) {
    // If this catch runs, delete the recently created blogContent document
    console.log(error);

    const res = await db
      .collection("blogContent")
      .doc(newBlogContentRef)
      .delete();

    throw new AegeanError("Error adding blog metadata, please try again", 500);
  }
};

export const fetchBlogContent = async (blogRef) => {
  try {
    const snapshot = await db.collection("blogContent").doc(blogRef).get();

    if (!snapshot.exists) {
      throw new AegeanError("No Blog found", 500);
    }

    return snapshot.data();
  } catch (error) {
    throw new AegeanError("Failed to fetch blog content", 500);
  }
};

//TODO: Refactor to use batch deletes [X]
export const deleteBlogData = async (blogMetaId, blogContentId) => {
  const batch = db.batch();

  const delContentRef = db.collection("blogContent").doc(blogContentId);
  batch.delete(delContentRef);

  const delMetaRef = db.collection("blogMeta").doc(blogMetaId);
  batch.delete(delMetaRef);
  try {
    await batch.commit();

    return { message: "Delete operation successful" };
  } catch (error) {
    console.error(error);

    throw new AegeanError("Error deleting blog data", 500);
  }
};

export const fetchUserBlogs = async (userId, lastDocId) => {
  if (lastDocId == undefined) {
    try {
      const snapshot = await db
        .collection("blogMeta")
        .where("authorId", "==", userId)
        .orderBy("postDate", "desc")
        .limit(5)
        .get();

      const result = snapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));

      return result;
    } catch (error) {
      throw new AegeanError("Failed to fetch users saved blogs", 500);
    }
  }

  const lastDocSnap = await db.collection("blogMeta").doc(lastDocId).get();

  try {
    const snapshot = await db
      .collection("blogMeta")
      .where("authorId", "==", userId)
      .orderBy("postDate", "desc")
      .limit(5)
      .startAfter(lastDocSnap)
      .get();

    if (snapshot.empty) {
      return [];
    }

    const result = snapshot.docs.map((doc) => ({
      id: doc.id,
      ...doc.data(),
    }));

    return result;
  } catch (error) {
    throw new AegeanError("Failed to fetch blogs posted by user", 500);
  }
};
