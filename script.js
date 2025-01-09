const searchBtn = document.getElementById("searchBtn");
const searchInput = document.getElementById("searchInput");
const mealResults = document.getElementById("mealResults");

searchBtn.addEventListener("click", fetchMeals);

async function fetchMeals() {
  const query = searchInput.value.trim();
  if (!query) {
    alert("Please enter a search term");
    return;
  }

  const apiUrl = `https://www.themealdb.com/api/json/v1/1/search.php?s=${query}`;

  try {
    const response = await fetch(apiUrl);
    const data = await response.json();

    if (!data.meals) {
      mealResults.innerHTML = "<p class='text-center'>No meals found. Try another search.</p>";
      return;
    }

    renderMeals(data.meals);
  } catch (error) {
    console.error("Error fetching data:", error);
    mealResults.innerHTML = "<p class='text-center'>There was an error fetching meals. Try again later.</p>";
  }
}

function renderMeals(meals) {
  mealResults.innerHTML = ""; // Clear previous results

  const maxDisplay = 5;
  const initialMeals = meals.slice(0, maxDisplay);

  
  initialMeals.forEach((meal) => {
    mealResults.appendChild(createMealCard(meal));
  });

  if (meals.length > maxDisplay) {
    const showAllBtn = document.createElement("div");
    showAllBtn.classList.add("show-all-btn");
    showAllBtn.innerHTML = '<button class="btn btn-success">SHOW ALL</button>';
    showAllBtn.addEventListener("click", () => {
      const remainingMeals = meals.slice(maxDisplay);
      remainingMeals.forEach((meal) => {
        mealResults.appendChild(createMealCard(meal));
      });
      showAllBtn.remove();
    });
    mealResults.appendChild(showAllBtn);
  }
}

function createMealCard(meal) {
  const mealCol = document.createElement("div");
  mealCol.classList.add("col-md-4");

  mealCol.innerHTML = `
    <div class="card meal-card">
      <img src="${meal.strMealThumb}" class="card-img-top" alt="${meal.strMeal}">
      <div class="card-body">
        <h5 class="card-title">${meal.strMeal}</h5>
        <p class="card-text"><strong>ID:</strong> ${meal.idMeal}</p>
        <p class="card-text">${meal.strInstructions.substring(0, 100)}...</p>
      </div>
    </div>
  `;

  return mealCol;
}
