import { db } from "../../config/firebaseConfig.js";

export async function experimentingDoing() {
  try {
    const res = await db.collection("test").doc("ttw6dkpq5lwbcPDfFNFf").get();

    return res.data();
  } catch (error) {}

  return "DONE?";
}
