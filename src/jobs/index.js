import { newsJob } from "./news.js";

export const initializeJobs = () => {
  newsJob.start();
};
