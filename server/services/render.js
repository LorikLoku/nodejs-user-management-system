const axios = require("axios");

exports.homeRoutes = (req, res) => {      //renderimi i Home Root
  // Make a get request to /api/users
  axios
    .get("http://localhost:3000/api/users")
    .then(function (response) {
      res.render("index", { users: response.data });  //shfaqja e te dhenave te users ne index root
    })
    .catch((err) => {
      res.send(err);
    });
};

exports.add_user = (req, res) => {        //renderimi i add users root
  res.render("add_user");
};

exports.update_user = (req, res) => {     //renderimi i update user root (shfaq userin specifik varesisht id)
  axios
    .get("http://localhost:3000/api/users", { params: { id: req.query.id } })
    .then(function (userdata) {
      res.render("update_user", { user: userdata.data });
    })
    .catch((err) => {
      res.send(err);
    });
};