import app from "./app.js";
import { initializeJobs } from "./src/jobs/index.js";

//All server functionality to be initialized here
async function bootServer(PORT) {
  console.log("BOOTING SERVER");

  console.log("Starting Cron jobs");
  initializeJobs();
  console.log("Jobs running");

  return app.listen(PORT, () => {
    console.log(process.env.FIREBASE_PROJECT_ID);
    console.log(`Server is up on ${PORT}`);
  });
}

const PORT = process.env.PORT || 3000;

void bootServer(PORT);

// Command to start the server from the terminal is => node --env-file ./src/secrets/.env index.js (NodeJS 20+ req)
