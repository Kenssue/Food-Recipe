// Logout function
function logout() {
  // Perform logout actions, e.g., clear session, redirect, etc.
  console.log("User logged out");
  window.location.href = "index.html"; // Redirect to the login page
}

// Add event listener to the logout button
document.getElementById("logoutButton").addEventListener("click", logout);

// Rest of your existing code remains unchanged
async function searchRecipes() {
  const query = document.getElementById("search-input").value;
  if (!query) {
    alert("Please enter a search term.");
    return;
  }

  const url = `https://www.themealdb.com/api/json/v1/1/search.php?s=${query}`;

  try {
    const response = await fetch(url);
    const data = await response.json();
    displayRecipes(data.meals);
  } catch (error) {
    console.error("Error fetching recipes:", error);
  }
}

function displayRecipes(recipes) {
  const resultsContainer = document.getElementById("recipe-results");
  resultsContainer.innerHTML = "";

  if (!recipes) {
    resultsContainer.innerHTML = "<p>No recipes found.</p>";
    return;
  }

  recipes.forEach(recipe => {
    const recipeCard = document.createElement("div");
    recipeCard.className = "recipe-card";
    recipeCard.innerHTML = `
      <h3>${recipe.strMeal}</h3>
      <img src="${recipe.strMealThumb}" alt="${recipe.strMeal}">
      <p><strong>Category:</strong> ${recipe.strCategory}</p>
      <p><strong>Area:</strong> ${recipe.strArea}</p>
    `;
    recipeCard.addEventListener("click", () => openModal(recipe));
    resultsContainer.appendChild(recipeCard);
  });
}

function openModal(recipe) {
  const modal = document.createElement("div");
  modal.className = "modal";
  modal.innerHTML = `
    <div class="modal-content">
      <span class="close-btn">&times;</span>
      <h2>${recipe.strMeal}</h2>
      <img src="${recipe.strMealThumb}" alt="${recipe.strMeal}">
      <p><strong>Category:</strong> ${recipe.strCategory}</p>
      <p><strong>Area:</strong> ${recipe.strArea}</p>
      <p><strong>Instructions:</strong> ${recipe.strInstructions}</p>
      <a href="${recipe.strYoutube}" target="_blank" class="youtube-link">Watch on YouTube</a>
    </div>
  `;

  modal.querySelector(".close-btn").addEventListener("click", () => {
    modal.remove();
  });

  modal.addEventListener("click", (e) => {
    if (e.target === modal) {
      modal.remove();
    }
  });

  document.body.appendChild(modal);
}

window.onload = () => {
  fetch("https://www.themealdb.com/api/json/v1/1/search.php?s=Arrabiata")
    .then(response => response.json())
    .then(data => displayRecipes(data.meals))
    .catch(error => console.error("Error loading default recipes:", error));
};