const User = require("../models/User");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const JWT_SECRET = process.env.JWTSECRET;
const { validationResult } = require("express-validator");

exports.createUser = async (req, res) => {
  // [
  //     body("name", "Enter a valid name").isLength({ min: 3 }),
  //     body("email", "Enter a valid email").isEmail(),
  //     body("password", "Enter a valid password").isLength({ min: 5 }),
  //   ],
  let user = new User({
    name: req.body.name,
  });
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }
  // user.save();
  // console.log(req.body);
  try {
    const salt = await bcrypt.genSalt(10);
    const secPass = bcrypt.hashSync(req.body.password, salt);
    const newUser = new User({
      name: req.body.name,
      email: req.body.email,
      password: secPass,
    });
    newUser
      .save()
      .then((user) => {
        const data = {
          user: newUser.id,
        };
        const authToken = jwt.sign(data, JWT_SECRET);
        let success = true;
        res.json({ success, authToken });
      })
      .catch((err) => {
        // console.error(error.message);
        console.log(err.message);
        res.json({
          error: "Please enter unqiue value",
          Error: "True",
          message: err.message,
        });
      });
  } catch (err) {
    res.status(500).send("Server Error || Please check your code");
    console.log(err.message);
  }
};

exports.loginUser = async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() }); //array is the list of post method's first parameter [body()...]
  }
  const { email, password } = req.body;
  try {
    let user = await User.findOne({ email });
    if (!user) {
      return res
        .status(400)
        .json({ error: "Please enter a valid credentials" });
    }
    //Password compare with hashed ones
    const comparePassword = await bcrypt.compare(password, user.password);
    if (!comparePassword) {
      return res
        .status(400)
        .json({ error: "Please enter a valid credentials" });
    }
    const data = {
      user: {
        id: user.id,
      },
    };
    const authToken = jwt.sign(data, JWT_SECRET);
    let success = true;
    res.json({ success, authToken });
    // For verification || remove these line up to catch
  } catch (err) {
    res.status(500).send("Server Error || Please check your code");
    console.log(err.message);
  }
};

exports.getUser = async (req, res) => {
  console.log("GetUser is running");
  try {
    const userId = req.user.id;
    const user = await User.findById(userId).select("-password");
    res.status(200).send(user);
  } catch (error) {
    res.status(401).json({ msg: "Not authorized to access this information" });
  }
};
