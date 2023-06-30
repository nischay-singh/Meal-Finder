const calorieRange = document.getElementById("calories");
const calorieDisplay = document.getElementById("calorie-display");

calorieRange.oninput = function () {
  if (calorieRange.value == 1250) {
    calorieDisplay.innerHTML = `Maximum Calories: <span class="calorie-value">No Limit</span>`;
  } else {
    calorieDisplay.innerHTML = `Maximum Calories: <span class="calorie-value">${calorieRange.value} Calories</span>`;
  }
};
