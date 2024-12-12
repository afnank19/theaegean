import { CronJob } from "cron";
import { db } from "../config/firebaseConfig.js";

const CRON_SCHEDULE = "0 */3 * * *";

const cycleNewsInDb = async () => {
  const deletionSuccessful = await deleteExistingNews();

  if (!deletionSuccessful) {
    console.log("Previous news deletion failed");
    return;
  }

  const news = await getNews();
  if (news === null) {
    console.log("Failure in fetching news");
    return;
  }
  addNewsToDb(news);
};

async function getNews() {
  try {
    const response = await fetch(
      `https://api.nytimes.com/svc/topstories/v2/world.json?api-key=${process.env.NYTIMES_ACCESS}`
    );

    if (!response.ok) {
      throw new Error("Problem fetching news");
    }

    const data = await response.json();

    // TODO: Make this into a function
    const news = [];
    for (let i = 0; i < 3; i++) {
      const articleMetaData = {
        title: data.results[i].title,
        abstract: data.results[i].abstract,
        url: data.results[i].url,
      };

      news.push(articleMetaData);
    }

    console.log(news);
    return news;
  } catch (error) {
    console.log(error);
    return null;
  }
}

async function deleteExistingNews() {
  try {
    // Should return three documents in data
    const snapshot = await db.collection("news").get();

    if (snapshot.empty) {
      return true;
    }

    const deletePromises = [];
    snapshot.forEach((doc) => {
      deletePromises.push(doc.ref.delete());
    });

    await Promise.all(deletePromises);

    return true;
  } catch (error) {
    console.log(error);
    return false;
  }
}

async function addNewsToDb(news) {
  try {
    const newsDocument = { news: news };

    const snapshot = await db.collection("news").add(newsDocument);

    return "Added news document";
  } catch (error) {
    return "failed to add news document";
  }
}

export const newsJob = new CronJob(CRON_SCHEDULE, cycleNewsInDb);
