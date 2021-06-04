const requireAuth = (req, res, next) => {
  if (!req.isAuthenticated()) {
    return res
      .status(401)
      .json({ msg: "No authentication token. Authorization denied" });
  }
  next();
};

function checkNotAuthenticated(req, res, next) {
  if (req.isAuthenticated()) {
    return res.redirect("/");
  }
  next();
}

module.exports = { requireAuth, checkNotAuthenticated };
