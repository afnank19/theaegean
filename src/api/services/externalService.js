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

export const searchImages = async (query) => {
  try {
    const response = await fetch(
      `https://api.pexels.com/v1/search?query=${query}&per_page=9&orientation=landscape`,
      {
        headers: {
          Authorization: process.env.PX_ACCESS,
        },
      },
    );

    if (!response.ok) {
      throw new Error("Problem fetching images");
    }

    const data = await response.json();

    return data.photos;
  } catch (error) {
    throw new AegeanError("Could not fetch images", 500);
  }
};
