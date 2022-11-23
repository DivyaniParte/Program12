const bcrypt = require("bcrypt");
const User = require("../models/User");

module.exports = (req, res) => {
  const { username, password } = req.body;

  User.findOne({ username: username }, (err, user) => {
    if (user) {
      bcrypt.compare(password, user.password, (error, same) => {
        if (same) {
          req.session.userId = user._id;
          res.redirect("/");
        } else {
          res.redirect("/auth/login");
        }
      });
    } else {
      res.redirect("/auth/login");
    }
  });
};

// module.exports = async (req,res) => {
//     const {username, password} = req.body;

//     let user = await User.findOne({ username });

//         if(user) {
//             let isSame = await bcrypt.compare(password, user.password)
//                 if(isSame) {
//                     res.redirect("/")
//                 } else {
//                     res.redirect("/auth/login");
//                 }
//         } else {
//             res.redirect("/auth/login");
//         }
// }
