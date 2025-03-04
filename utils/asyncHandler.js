export default function asyncHandler(controller) {
  return (req, res, next) => {
    res.set("Pragma", "no-cache");
    res.set("Cache-Control", "no-cache");
    res.set("Expires", "0");
    res.set("ETag", null);
    res.setHeader("Cache-Control", "no-store");
    controller(req, res, next).catch((error) => {
      next(error);
    });
  };
}
