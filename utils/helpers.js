const calculateBMR = (gender, height_cm, weight_kg, activity_level) => {
  /* 
    Men: BMR = 10W + 6.25H - 5A + 5
    Women: BMR = 10W + 6.25H - 5A - 161
    */
  if (!gender || !height_cm || !weight_kg || !activity_level) {
    throw new Error("All parameters are required");
  }
  if (gender === "women") {
    return Math.round(
      10 * weight_kg + 6.25 * height_cm - 5 * activity_level - 161
    );
  } else {
    return Math.round(
      10 * weight_kg + 6.25 * height_cm - 5 * activity_level + 5
    );
  }
};

// calculates calorie needs based on BMR and health goal
const calorieNeeds = (
  gender,
  height_cm,
  weight_kg,
  activity_level,
  health_goal
) => {
  if (!health_goal) {
    throw new Error("Health goal is required");
  }
  if (health_goal === "weight_gain") {
    return calculateBMR(gender, height_cm, weight_kg, activity_level) + 500;
  }
  if (health_goal === "weight_loss") {
    return calculateBMR(gender, height_cm, weight_kg, activity_level) - 500;
  }
  return calculateBMR(gender, height_cm, weight_kg, activity_level);
};

// BMI helps to tell if a person is under weight, over weight, fit
const calculateBMI = (weight_kg, height_cm) =>
  weight_kg / Math.sqrt(height_cm / 100);

const totalCal = (protein_g, carbs_g, fat_g) => {
  return protein_g * 4 + carbs_g * 4 + fat_g * 9;
};

module.exports = { calculateBMI, calorieNeeds, calculateBMI, totalCal };
