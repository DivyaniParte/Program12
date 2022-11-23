const BlogPost = require("../models/BlogPost");

module.exports = async (req, res) => {
  const blogPosts = await BlogPost.find({}).populate('userid');
  console.log(req.session, 'sesion');
  res.render("index", { blogPosts });
};
