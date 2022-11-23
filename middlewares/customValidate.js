const customValidate = (req, res, next) => {
  console.log("Custom validate was called");
  if(req.body.title === null || req.body.body === null) {
    console.log("Blog Post invalid");
    return res.redirect("/posts/new");
  }
  next();
};

module.exports = customValidate;