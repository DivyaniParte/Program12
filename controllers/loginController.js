

module.exports = async (req, res) => {
  try {
    res.render("login");
  } catch (e) {
    console.log(e);
  }
};
