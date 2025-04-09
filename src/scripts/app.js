"use strict";

const form = document.querySelector("#form");
const searchField = document.querySelector("#searchField");
const searchButton = document.querySelector("#searchButton");
const resultsList = document.querySelector("#resultsList");
const errorMessage = document.querySelector("#error");
const resultsCount = document.querySelector("#resultsCount");
const prevButton = document.querySelector("#prevButton");
const nextButton = document.querySelector("#nextButton");

form.addEventListener("submit", (event) => {
  event.preventDefault();
  let searchValue = searchField.value;
  fetch(`https://web.mayfly.ovh/proxy/moviev2.php?endpoint=search/movie&query=${searchValue}`)
    .then((response) => {
      return response.json();
    })
    .then((data) => {
      // console.log(data);
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
    displayMovieName.innerText = movie.original_title;
    displayPoster.setAttribute("src", `https://image.tmdb.org/t/p/w500/${movie.poster_path}`);
    displayMovie.appendChild(displayPoster);
    displayMovie.appendChild(displayMovieName);
    resultsList.appendChild(displayMovie);
  }); 

  // prevButton.addEventListener("click", (prev) => {
  //   let value = query.page;
  //   resultsList.innerHTML = "";
  //   displayQuery(value);
  //   prev.value--; 
  //   console.log(value);
  // })
  // nextButton.addEventListener("click", (next) => {
  //   let value = query.page;
  //   resultsList.innerHTML = "";
  //   displayQuery(value);
  //   next.value++;
  //   console.log(value);
  // })
}
