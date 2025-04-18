console.log("Script loaded");

const searchForm = document.querySelector('#search-form');
const searchInput = document.querySelector('#search');
const resultsList = document.querySelector('#results');

searchForm.addEventListener('submit', (e) => {
  e.preventDefault();
  searchRecipes();
});

async function searchRecipes() {
  const searchValue = searchInput.value.trim();
  if (!searchValue) return;

  const response = await fetch(`https://www.themealdb.com/api/json/v1/1/search.php?s=${searchValue}`);
  const data = await response.json();

  if (!data.meals) {
    resultsList.innerHTML = `<p>No recipes found for "${searchValue}".</p>`;
    return;
  }

  displayRecipes(data.meals);
}

function displayRecipes(meals) {
  let html = '';
  meals.forEach((meal) => {
    html += `
      <div>
        <img src="${meal.strMealThumb}" alt="${meal.strMeal}">
        <h3>${meal.strMeal}</h3>
        <p><strong>Category:</strong> ${meal.strCategory}</p>
        <p><strong>Area:</strong> ${meal.strArea}</p>
        <a href="${meal.strSource || meal.strYoutube}" target="_blank">View Recipe</a>
      </div>
    `;
  });
  resultsList.innerHTML = html;
}
