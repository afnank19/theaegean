import { db, adm } from "../../config/firebaseConfig.js";
import { AegeanError } from "../utils/errorHandler.js";

export async function experimentingDoing() {
  try {
    const res = await db.collection("test").doc("ttw6dkpq5lwbcPDfFNFf").get();

    return res.data();
  } catch (error) {}

  return "DONE?";
}

export const addTestData = async (title) => {
  try {
    // Create a new document in the "tests" collection
    const newTest = {
      title,
      timestamp: adm.firestore.FieldValue.serverTimestamp(), // Set timestamp to current server time
    };

    const docRef = await db.collection("test").add(newTest);
  } catch (error) {}
};

export const throwErrorInSessionFunc = async () => {
  // if (true) {
  //   const error = new Error("bruh");
  //   error.status = 400;
  //   //throw error;
  //   // next(error);
  // }

  try {
    throw new AegeanError("Something went wrong ;(", 500);
  } catch (err) {
    throw err;
  }
};
