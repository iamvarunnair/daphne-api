const db = require("./../db");

const recipeAll = "SELECT * FROM recipe";

const dao_get_recipe = () =>
  new Promise((resolve, reject) => {
    db.query(recipeAll, (err, results) => {
      if (err) {
        console.error("Error fetching users:", err);
        reject("Error fetching users");
        return;
      }
      resolve(results);
    });
  });

module.exports = {
  dao_get_recipe,
};
