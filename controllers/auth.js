const User = require("../models/user");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const config = require("../config/auth.config");

exports.postsignup = (req, res, next) => {
  const Email = req.body.email;
  const Password = req.body.password;

  const user = new User({
    email: Email,
    password: bcrypt.hashSync(Password, 8)
  });

  User.findOne({email:Email})
  .then((person)=>{
    if(person)
    {
      res.status(200).send({message:"User already present!"});
      return;
    }
    user.save((err, user) => {
      if (err) {
        res.status(500).send({ message: err });
        return;
      }
      res.status(200).send({ message: "User signed up" });
  })
  });
};

exports.login = (req, res, next) => {
  User.findOne({
    userName: req.body.uname
  }).exec((err, user) => {
    if (err) {
      res.status(500).send({ message: err });
      return;
    }
    if (!user) {
      return res.status(200).send({ message: "User not found" });
    }

    var passwordIsValid = bcrypt.compareSync(req.body.password, user.password);
    if (!passwordIsValid) {
      return res.status(200).send({
        accessToken: null,
        message: "Invalid Password!"
      });
    }

    var token = jwt.sign({ id: user.id }, config.secret, {
      expiresIn: 86400
    });
    res.status(200).send({
      message:"User logged in!",
      id: user._id,
      username: user.Email,
      accessToken: token
    });
  });
};
