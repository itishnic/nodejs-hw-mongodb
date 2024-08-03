// src/index.js
import { initMongoConnection } from "./db/db.js";
import { startServer } from "./server.js";

const bootstrap = async () => {
  await initMongoConnection();
  startServer();
};

bootstrap();
