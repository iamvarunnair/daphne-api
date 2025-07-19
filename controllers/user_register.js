const bcrypt = require("bcrypt");
const { calculateBMI } = require("../utils/helpers");
const {
  dao_check_user_exists,
  dao_create_user,
  dao_create_user_information,
} = require("../dao/user");
const jwt = require("jsonwebtoken");

const secret = process.env.AUTH_SECRET;

const user_login_register = async (req, res) => {
  const {
    email,
    password,
    dob,
    gender,
    height_cm,
    weight_kg,
    activity_level,
    dietary_preference,
    health_goal,
  } = req.body;
  try {
    // check if user exists
    // if yes, validate password
    // if no, create new user

    if (!email || !password) {
      res.status(400).send("Email and password are required.");
      return;
    }

    if (
      !dob ||
      !gender ||
      !height_cm ||
      !weight_kg ||
      !activity_level ||
      !dietary_preference ||
      !health_goal
    ) {
      // Login user
      const user = await dao_check_user_exists(email);
      if (!user || !user.length || user.length !== 1) {
        res.status(403).send("User or password is incorrect.");
        return;
      }

      const isPasswordValid = await bcrypt.compare(
        password,
        user[0].password_hash
      );
      if (!isPasswordValid) {
        res.status(403).send("User or password is incorrect.");
        return;
      }

      // Generate JWT token
      const token = jwt.sign({ email }, secret, {
        expiresIn: "12h",
      });
      res.json({ token });
    } else {
      // Register new user
      const bmi = calculateBMI(gender, height_cm, weight_kg, activity_level);
      const hashedPassword = await bcrypt.hash(password, 10);
      const user_id = await dao_create_user(email, hashedPassword);
      const userInfo = await dao_create_user_information(
        user_id,
        dob,
        gender,
        height_cm,
        weight_kg,
        activity_level,
        dietary_preference,
        health_goal,
        bmi
      );

      // Generate JWT token
      const token = jwt.sign({ email }, secret, {
        expiresIn: "12h",
      });
      res.json({ token });
    }
  } catch (err) {
    console.error(err);
    res.status(500).send("Unexpected error.");
  }
};

module.exports = {
  user_login_register,
};
