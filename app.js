require("dotenv").config();
const express = require("express");
const bcrypt = require("bcrypt");
const db = require("./db");
const { get_recipe } = require("./controllers/recipe");
const { dao_check_user_exists, dao_create_user } = require("./dao/user");
const { user_login_register } = require("./controllers/user_register");

const app = express();
const port = 3000;

app.use(express.json());

app.post("/try", async (req, res) => {
  try {
    const { email, password } = req.body;

    // Hash the password
    // const hashedPassword = await bcrypt.hash(password, 10);
    // const result = await dao_check_user_exists(email, hashedPassword);
    const user = await dao_check_user_exists(email);

    const isPasswordValid = await bcrypt.compare(password, user[0].password_hash);
    res.json({ result: user, isPasswordValid });
  } catch (err) {
    console.error(err);
    res.status(500).send("Unexpected error.");
  }
});

app.get("/recipe/list", get_recipe);

app.post("/user/register", user_login_register);

app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`);
});
