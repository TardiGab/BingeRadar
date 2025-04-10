"use strict";

const form = document.querySelector("#form");
const searchField = document.querySelector("#searchField");
const searchButton = document.querySelector("#searchButton");
const resultsList = document.querySelector("#resultsList");
const errorMessage = document.querySelector("#error");
const resultsCount = document.querySelector("#resultsCount");

form.addEventListener("submit", (event) => {
  event.preventDefault();
  let searchValue = searchField.value;
  fetch(`https://web.mayfly.ovh/proxy/moviev2.php?endpoint=search/movie&query=${searchValue}`)
    .then((response) => {
      return response.json();
    })
    .then((data) => {
      displayQuery(data);
    })
    .catch((error) => {
      console.error("Error fetching data:", error);
      errorMessage.innerText = "Film not found.";
    });
});

function displayQuery(query) {
  resultsCount.innerText = `Found ${query.total_results} results`;
  resultsList.innerHTML = "";
  query.results.forEach((movie) => {
    let displayMovie = document.createElement("li");
    let displayMovieName = document.createElement("h3");
    let displayPoster = document.createElement("img");
    displayMovie.setAttribute("data-movieid", movie.id);
    displayMovieName.innerText = movie.original_title;
    displayPoster.setAttribute("src", `https://image.tmdb.org/t/p/w500/${movie.poster_path}`);
    displayMovie.appendChild(displayPoster);
    displayMovie.appendChild(displayMovieName);
    resultsList.appendChild(displayMovie);
  }); 
};

resultsList.addEventListener("click", (e) => {
  const target = e.target;
  const li = target.closest("li");
  if (li) {
    console.log("Clic sur LI")
  }
})