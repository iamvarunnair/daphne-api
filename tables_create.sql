-- CREATE DATABASE daphne_v1;

select * from recipe;

-- USERS TABLE
CREATE TABLE user (
    user_id INT AUTO_INCREMENT PRIMARY KEY,
    email VARCHAR(255) NOT NULL UNIQUE,
    password_hash VARCHAR(255) NOT NULL
);

-- USERS INFORMATION TABLE (history-preserving)
CREATE TABLE user_information (
    user_info_id INT AUTO_INCREMENT PRIMARY KEY,
    user_id INT NOT NULL,
    dob DATE,
    gender ENUM('male', 'female', 'other'),
    height_cm DECIMAL(5,2),
    weight_kg DECIMAL(5,2),
    activity_level DECIMAL(2,1), -- 1.2 to 1.9
    dietary_preference VARCHAR(100),
    health_goal VARCHAR(255),
    bmi DECIMAL(5,2),
    status ENUM('active', 'inactive') DEFAULT 'active',
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (user_id) REFERENCES user(user_id)
);

CREATE TABLE recipe (
	recipe_id int NOT NULL AUTO_INCREMENT,
    diet_type VARCHAR(50) NOT NULL,
    recipe_name VARCHAR(255) NOT NULL,
    cuisine_type VARCHAR(50),
    protein_g DECIMAL(10,2),
    carbs_g DECIMAL(10,2),
    fat_g DECIMAL(10,2),
    extraction_day DATE,
    extraction_time TIME,
    PRIMARY KEY (recipe_id)
);

-- DIET PLAN TABLE
CREATE TABLE diet_plan (
    plan_id INT AUTO_INCREMENT PRIMARY KEY,
    user_id INT NOT NULL,
    status ENUM('active', 'inactive') DEFAULT 'active',
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    system_generated BOOLEAN DEFAULT TRUE,
    FOREIGN KEY (user_id) REFERENCES user(user_id)
);

-- MAPPING DIET PLAN TO RECIPES
CREATE TABLE diet_plan_recipe (
    map_id INT AUTO_INCREMENT PRIMARY KEY,
    plan_id INT NOT NULL,
    recipe_id INT NOT NULL,
    period ENUM('breakfast', 'lunch', 'dinner', 'snack') NOT NULL,
    FOREIGN KEY (plan_id) REFERENCES diet_plan(plan_id),
    FOREIGN KEY (recipe_id) REFERENCES recipe(recipe_id)
);

