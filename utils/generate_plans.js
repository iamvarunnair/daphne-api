const { calorieNeeds, totalCal } = require("./helpers");

const generatePlans = (
  email,
  gender,
  height_cm,
  weight_kg,
  activity_level,
  dietary_preference,
  health_goal
) => {
  // Gram to calorie = Fat*9, Protein*4, Card*4
  const calorieNeed = calorieNeeds(
    gender,
    height_cm,
    weight_kg,
    activity_level,
    health_goal
  );
  const meals = [];

  while(meals.sum((el) => totalCal(el.protein_g, el.carbs_g, el.fat_g)) < calorieNeed) {
    
    meals.push(meal);
  }
};

module.exports = {
  user_login_register,
};
