import app from "./app.js";

//All server functionality to be initialized here
async function bootServer(PORT) {
  return app.listen(PORT, () => {
    console.log(`Server is up on http://localhost:${PORT}`);
  });
}

const PORT = process.env.PORT || 3000;

void bootServer(PORT);
