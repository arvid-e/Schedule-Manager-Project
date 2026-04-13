import mongoose from "mongoose";
import { app } from "./app.js";
import { connectDB } from "./config/mongoose.js";

const port = 3000;
let server: any;

export const startServer = async () => {
  try {
    await connectDB();
    server = app.listen(port, () => {
      console.log(`Server running at http://localhost:${port}`);
      console.log(`Access API at http://localhost:${port}/api/v1`);
    });
  } catch (error) {
    console.log("Failed to start server: " + error);
  }
};

export const gracefulShutdown = async (signal: NodeJS.Signals) => {
  console.log(`\n${signal} signal received: Closing HTTP server.`);

  server.close(() => {
    console.log("HTTP server closed.");

    mongoose
      .disconnect()
      .then(() => {
        console.log("Mongoose connection disconnected.");
        process.exit(0);
      })
      .catch((err) => {
        console.error("Error disconnecting Mongoose:", err);
        process.exit(1);
      });
  });
};
