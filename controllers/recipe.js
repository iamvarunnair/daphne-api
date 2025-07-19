const { dao_get_recipe } = require("../dao/recipe");

const get_recipe = (req, res) => {
  dao_get_recipe()
    .then((results) => {
      res.json(results);
    })
    .catch((err) => {
      res.status(500).send(err);
    });
};

module.exports = {
  get_recipe,
};
