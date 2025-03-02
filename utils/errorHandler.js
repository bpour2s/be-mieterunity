export default function errorHandler(err, req, res, next) {
  if (process.env.NODE_ENV === "development") {
    console.log("Error - ErrorHandler: ", err.stack);
  }

  res.status(err.statusCode || 500).json({ msg: err.message });
}
