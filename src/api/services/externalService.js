import { db } from "../../config/firebaseConfig.js";
import { AegeanError } from "../middlewares/errorHandler.js";

/**
 * This gets all the documents in the NEWS collection
 * but news will always have 1 document containing an array of 3 objects
 *
 * @returns An array containing 3 objects of News
 */
export const fetchWorldNews = async () => {
  try {
    const snapshot = await db.collection("news").get();

    if (snapshot.empty) {
      throw new Error("No news in snapshot");
    }

    // Snapshot should always contain 1 document
    return snapshot.docs[0].data();
  } catch (error) {
    throw new AegeanError("No news returned", 500);
  }
};
