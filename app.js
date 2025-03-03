import express from "express";
import cors from "cors";
import morgan from "morgan";
import logger from "./utils/logger.js";

import errorHandler from "./utils/errorHandler.js";
import ErrorResponse from "./utils/ErrorResponse.js";

import userRouter from "./routes/userRouter.js";
import roleRouter from "./routes/roleRouter.js";
import messageRouter from "./routes/massageRouter.js";
import categoryRouter from "./routes/categoryRouter.js";
import addressRouter from "./routes/addressRouter.js";
import reactionRouter from "./routes/reactionRouter.js";
import fileRouter from "./routes/fileRouter.js";
import threadRouter from "./routes/threadRouter.js";

const app = express();
const morganFormat = ":method :url :status :response-time ms";

const allowedOrigins = [
  "http://localhost:5174",
  "http://localhost:5173",
  "http://localhost:5172",
  // "https://personal-library-3k8z.onrender.com",
];

app.use(
  cors({
    origin: (origin, cb) => {
      console.log("Origin:", origin);
      if (!origin || allowedOrigins.includes(origin)) cb(null, true);
      else cb(new Error("Not allowed by CORS"));
    },
    credentials: true,
  })
);

app.use(
  morgan(morganFormat, {
    stream: {
      write: (message) => {
        const logObject = {
          method: message.split(" ")[0],
          url: message.split(" ")[1],
          status: message.split(" ")[2],
          responseTime: message.split(" ")[3],
        };
        logger.info(JSON.stringify(logObject));
      },
    },
  })
);

app.use(express.json());

app.use("/users", userRouter);
app.use("/roles", roleRouter);
app.use("/messages", messageRouter);
app.use("/categories", categoryRouter);
app.use("/addresses", addressRouter);
app.use("/reactions", reactionRouter);
app.use("/files", fileRouter);
app.use("/threads", threadRouter);

app.use("*", (req, res, next) => {
  next(new ErrorResponse(`Cannot find ${req.originalUrl}`, 404));
});

app.use(errorHandler);

export default app;
