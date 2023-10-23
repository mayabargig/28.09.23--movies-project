const apiKey = "be93d2314b628d913609d274fc1bdf70";
const singleMovieContainer = document.getElementById("movieDetails");

function fetchSingleMovie(movieId) {
    let url = `https://api.themoviedb.org/3/movie/${movieId}?api_key=${apiKey}&language=en-US`;
    
    fetch(url)
    .then((response) => response.json())
    .then((data) => {
        const movieDetails = data;
        console.log(movieDetails);
        displaySingleMovie(movieDetails);
    })
    .catch((error) => console.error("Error fetching movie details:", error));

    let url1 = `https://api.themoviedb.org/3/movie/${movieId}/credits?api_key=${apiKey}&language=en-US`;

    fetch(url1)
       .then((response) => response.json())
       .then((data) => {
           const castDetails = data;
           console.log(castDetails);
           fetchSingleMovieCast(castDetails);
       })
       .catch((error) => console.error("Error fetching movie details:", error));
}

function displaySingleMovie(movieDetails) {
    singleMovieContainer.innerHTML = "";
    
    const posterPath = movieDetails.poster_path
    ? `https://image.tmdb.org/t/p/w500${movieDetails.poster_path}`
    : "no-image-available.jpg";
    
    const movieCard = document.createElement("div");
    movieCard.classList.add("movie-card");
    
    movieCard.innerHTML = `
    <img class="movie-poster" src="${posterPath}" alt="${movieDetails.title}">
    <h3>${movieDetails.title}</h3>
    <p>Release Date: ${movieDetails.release_date}</p>
    <ul id="castList"><h4>Actors Name:</h4></ul>`;
    
    singleMovieContainer.appendChild(movieCard);
}

function fetchSingleMovieCast(castDetails) {
    const castArray = castDetails.cast;
    console.log(castArray);
    const castList = document.getElementById("castList");
    
    castArray.forEach((actor) => {
        let actorsArray = actor.name
        castList.innerHTML += `<li>${actorsArray}</li>`
    });
}    

const searchButton = document.getElementById("searchButton");
const movieIdInput = document.getElementById("movieId");

searchButton.addEventListener("click", () => {
    const movieId = movieIdInput.value;
    if (movieId) {
        fetchSingleMovie(movieId);
    } else {
        alert("Please enter a valid Movie ID.");
    }
});


