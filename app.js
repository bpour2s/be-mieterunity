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

const app = express();
const morganFormat = ":method :url :status :response-time ms";

app.use(cors());

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

app.use("*", (req, res, next) => {
  next(new ErrorResponse(`Cannot find ${req.originalUrl}`, 404));
});

app.use(errorHandler);

export default app;
