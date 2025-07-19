const db = require("./../db");

const userExists = "SELECT * FROM user WHERE email = ?";

const userCreate = "INSERT INTO user (email, password_hash) VALUES (?, ?)";

const userInfoAllSetInactive =
  "UPDATE user_information SET status = 'inactive' WHERE user_id = @0";

const userInfoCreate =
  "INSERT INTO user_information (user_id, dob, gender, height_cm, weight_kg, activity_level, dietary_preference, health_goal, bmi, status) VALUES (?,?,?,?,?,?,?,?,?,?)";

const dao_check_user_exists = (email) =>
  new Promise((resolve, reject) => {
    // use of sql parametr to prevent injection
    db.query(userExists, [email], (err, results) => {
      if (err) {
        console.error("Error fetching:", err);
        reject("Error fetching");
        return;
      }
      // resolve(results && results.length && results.length === 1 ? true : false);
      resolve(results);
    });
  });

const dao_create_user = (email, password_hash) =>
  new Promise((resolve, reject) => {
    // use of sql parametr to prevent injection

    db.query(userCreate, [email, password_hash], (err, user) => {
      if (err) {
        console.error("Error fetching:", err);
        reject("Error fetching");
        return;
      }
      resolve(user.insertId);
    });
  });

const dao_create_user_information = (
  user_id,
  dob,
  gender,
  height_cm,
  weight_kg,
  activity_level,
  dietary_preference,
  health_goal,
  bmi
) =>
  new Promise((resolve, reject) => {
    db.query(userInfoAllSetInactive, [user_id], (err, _) => {
      if (err) {
        console.error("Error fetching:", err);
        reject("Error fetching");
        return;
      }

      db.query(
        userInfoAllSetInactive,
        [
          user_id,
          dob,
          gender,
          height_cm,
          weight_kg,
          activity_level,
          dietary_preference,
          health_goal,
          bmi,
          "active",
        ],
        (err, results) => {
          if (err) {
            console.error("Error fetching:", err);
            reject("Error fetching");
            return;
          }
          resolve(results);
        }
      );
    });
  });

module.exports = {
  dao_check_user_exists,
  dao_create_user,
  dao_create_user_information,
};
