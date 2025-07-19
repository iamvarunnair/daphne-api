const db = require("./../db");

const recipeAll = "SELECT * FROM recipe";

const recipeRand =
  "SELECT * FROM recipe where recipe_id not in (?) ORDER BY RAND() LIMIT 1";

const dao_get_recipe = () =>
  new Promise((resolve, reject) => {
    db.query(recipeAll, (err, results) => {
      if (err) {
        console.error("Error fetching", err);
        reject("Error fetching");
        return;
      }
      resolve(results);
    });
  });

const dao_get_recipe_rand = () =>
  new Promise((resolve, reject) => {
    db.query(recipeRand, (err, results) => {
      if (err) {
        console.error("Error fetching", err);
        reject("Error fetching");
        return;
      }
      resolve(results);
    });
  });

module.exports = {
  dao_get_recipe,
};
