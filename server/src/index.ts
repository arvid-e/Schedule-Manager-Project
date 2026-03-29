import { gracefulShutdown, startServer } from "./server";

process.on('SIGINT', gracefulShutdown);
process.on('SIGTERM', gracefulShutdown);

startServer();
