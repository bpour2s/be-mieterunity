
import express from 'express';
import db from './db/db.js';
import app from './app.js';
import chalk from 'chalk';



const port = process.env.PORT || 8000;

// mongoose.connect(process.env.MONGO_URI, { dbName: 'unityConnect' })

let server;

db()
  .then(() => {
    server = app.listen(port, () => console.log(chalk.bgGreen(` Personal Library API listening on port ${port}... `)));
  })
  .catch((err) => {
    console.log(chalk.red(err.message));
    process.exit(1);
  });

process.on('uncaughtException', (err) => {
  console.log('UNCAUGHT EXCEPTION! Shutting down...');
  console.log(err.name, err.message);
  server.close(() => {
    process.exit(1);
  });
});

process.on('unhandledRejection', (err) => {
  console.log('UNHANDLED REJECTION');
  console.log(err.name, err.message);
  server.close(() => {
    process.exit(1);
  });
});

process.on('SIGTERM', () => {
  console.log('SIGTERM signal received: closing HTTP server');
  server.close(() => {
    console.log('HTTP server closed');
  });
});