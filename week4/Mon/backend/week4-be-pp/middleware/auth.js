const auth = (req, res, next) => {
  if (req.query.admin === "true") {
    return next()
  } else {
    return res.status(403).json({ message: "Forbidden: Admin access required" });
  }
}

module.exports = auth;