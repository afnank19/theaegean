import { db } from "../../config/firebaseConfig.js";

// Might cut this feature out for now, as it is currently
// not planned to search the users collection
export const fetchAllUsers = async () => {
  console.log("UNIMPLEMENTED: Fetch all users paginated from the database");

  return { msg: "FAU" };
};

export const fetchAUser = async (userId) => {
  console.log("UNIMPLEMENTED: Fetch a user from the database with the UserId");

  try {
    const snapshot = await db.collection("user").doc(userId).get();

    return snapshot.data();
  } catch (error) {
    console.error(error);

    return { msg: "Failed to fetch user from db" };
  }
};

export const createUser = async (userData) => {
  console.log("UNIMPLEMENTED: Create the user in the db from the param data");

  try {
    const newUserRef = await db.collection("user").add(userData);

    return newUserRef.id;
  } catch (error) {
    console.error(error);

    return { msg: "error creating user in db" };
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

    return { msg: "Failed to fetch user from db" };
  }
};
