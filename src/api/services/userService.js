import { db } from "../../config/firebaseConfig.js";
import { AegeanError } from "../middlewares/errorHandler.js";

// Might cut this feature out for now, as it is currently
// not planned to search the users collection
export const fetchAllUsers = async () => {
  console.log("UNIMPLEMENTED: Fetch all users paginated from the database");

  return { msg: "FAU" };
};

/**
 *
 * @param {*} userId
 * @returns
 */
export const fetchAUser = async (userId) => {
  try {
    // Dont sen d all the data back
    const snapshot = await db.collection("user").doc(userId).get();

    const userData = snapshot.data();

    // Only send the data that is needed
    const user = {
      name: userData.name,
      campus: userData.campus,
      about: userData.campus,
    };

    return user;
  } catch (error) {
    console.error(error);

    throw new AegeanError("Failed to fetch user profile", 500);
  }
};

// This has to be paginated
/**
 *
 * @param {*} userId
 * @param {*} lastDocId - id used as a cursor for pagination
 * @returns
 */
export const fetchUserSavedBlogs = async (userId, lastDocId) => {
  if (lastDocId == undefined) {
    try {
      const snapshot = await db
        .collection("user")
        .doc(userId)
        .collection("savedBlogs")
        .orderBy("postDate")
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

  try {
    const snapshot = await db
      .collection("user")
      .doc(userId)
      .collection("savedBlogs")
      .orderBy("postDate")
      .limit(5)
      .startAfter(lastDocId)
      .get();

    const result = snapshot.docs.map((doc) => ({
      id: doc.id,
      ...doc.data(),
    }));

    return result;
  } catch (error) {
    throw new AegeanError("Failed to fetch users saved blogs", 500);
  }
};

// The userData param is still undefined on how it is to be passed
/**
 *
 * @param {*} userData - contains all necessary data in object format for creating a user
 * @returns
 */
export const createUser = async (userData) => {
  console.log("UNIMPLEMENTED: Create the user in the db from the param data");

  try {
    const newUserRef = await db.collection("user").add(userData);

    return newUserRef.id;
  } catch (error) {
    console.error(error);

    throw new AegeanError("Failed to create user profile", 500);
  }
};

export const fetchAUserByEmail = async (userEmail) => {
  try {
    const snapshot = await db
      .collection("user")
      .where("email", "==", userEmail)
      .get();

    return snapshot[0].data();
  } catch (error) {
    console.error(error);

    throw new AegeanError("Failed to fetch user by email", 500);
  }
};

// Each email should be unique
// Maybe change the name, this service function returns the requested
// users id and hash
/**
 *
 * @param {*} email
 * @returns
 */
export const validateUserCredentials = async (email) => {
  try {
    const snapshot = await db
      .collection("user")
      .where("email", "==", email)
      .get();

    // Process user data
    const userData = snapshot.docs[0].data();

    // TODO: Hash the current password with the salt from the data, and them compare
    // with the hashed password. ( Moved to controller layer )
    const userCredentials = { id: snapshot.docs[0].id, hash: userData.hash };

    return userCredentials;
  } catch (error) {
    throw new AegeanError("Couldn't verify email or password", 500);
  }
};
