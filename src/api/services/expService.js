import { db, adm } from "../../config/firebaseConfig.js";

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
