// Get existing data from localStorage or initialize empty data
let workouts = JSON.parse(localStorage.getItem('workouts')) || [];
let fitnessGoal = JSON.parse(localStorage.getItem('fitnessGoal')) || { type: '', duration: 0 };

function setGoal() {
  const goalType = document.getElementById("goal-type").value;
  const goalDuration = parseInt(document.getElementById("goal-duration").value);

  if (goalType && goalDuration) {
    fitnessGoal = { type: goalType, duration: goalDuration };
    localStorage.setItem('fitnessGoal', JSON.stringify(fitnessGoal));
    document.getElementById("goal-status").textContent = `Goal: ${goalType} for ${goalDuration} minutes`;
  }
}

function logWorkout() {
  const exerciseType = document.getElementById("exercise-type").value;
  const duration = parseInt(document.getElementById("duration").value);
  const caloriesBurned = parseInt(document.getElementById("calories-burned").value);

  if (exerciseType && duration && caloriesBurned) {
    const workout = { exerciseType, duration, caloriesBurned };
    workouts.push(workout);
    localStorage.setItem('workouts', JSON.stringify(workouts));

    // Update workout history
    updateHistory();
    updateProgress();
  }
}

function updateHistory() {
  const historyList = document.getElementById("history-list");
  historyList.innerHTML = '';

  workouts.forEach((workout, index) => {
    const listItem = document.createElement('li');
    listItem.textContent = `${workout.exerciseType} - ${workout.duration} min - ${workout.caloriesBurned} calories`;
    historyList.appendChild(listItem);
  });
}

function updateProgress() {
  const totalWorkouts = workouts.length;
  const totalCalories = workouts.reduce((sum, workout) => sum + workout.caloriesBurned, 0);

  document.getElementById("total-workouts").textContent = totalWorkouts;
  document.getElementById("total-calories").textContent = totalCalories;

  // Check if goal is met
  if (fitnessGoal.type && totalWorkouts > 0) {
    const lastWorkout = workouts[workouts.length - 1];
    const goalStatus = lastWorkout.exerciseType.toLowerCase() === fitnessGoal.type.toLowerCase() &&
      lastWorkout.duration >= fitnessGoal.duration ? 'Goal Achieved!' : 'Keep Going!';
    document.getElementById("goal-status").textContent = `Goal Status: ${goalStatus}`;
  }
}

// Initialize the app by loading history and progress
updateHistory();
updateProgress();
