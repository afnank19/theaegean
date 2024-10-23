import app from "./app.js";

//All server functionality to be initialized here
async function bootServer(PORT) {
  return app.listen(PORT, () => {
    console.log(process.env.FIREBASE_PROJECT_ID);
    console.log(`Server is up on http://localhost:${PORT}`);
  });
}

const PORT = process.env.PORT || 3000;

void bootServer(PORT);

// Command to start the server from the terminal is => node --env-file ./src/secrets/.env index.js (NodeJS 20+ req)
