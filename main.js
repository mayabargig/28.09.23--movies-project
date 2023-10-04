const apiKey = "be93d2314b628d913609d274fc1bdf70";
const moviesContainer = document.getElementById("moviesContainer");
const popularitySelect = document.getElementById("popularitySelect");
const pagination = document.getElementById("pagination");

let currentPage = 1;

popularitySelect.addEventListener("change", fetchMovies);
pagination.addEventListener("click", handlePaginationClick);

function fetchMovies() {
    const popularity = popularitySelect.value;
    console.log(popularity);
    const url = `https://api.themoviedb.org/3/trending/movie/${popularity}?api_key=${apiKey}&language=en-US&page=${currentPage}`;
    
    fetch(url)
    .then((response) => response.json())
    .then((data) => {
        const movies = data.results;
        console.log(movies);
        displayMovies(movies);
    })
    .catch((error) => console.error("Error fetching movies:", error));
}

function displayMovies(movies) {
    moviesContainer.innerHTML = "";
    
    movies.forEach((movie) => {
        const movieCard = document.createElement("div");
        movieCard.classList.add("movie-card");
        
        const posterPath = movie.poster_path
        ? `https://image.tmdb.org/t/p/w500${movie.poster_path}`
        : "no-image-available.jpg"; 
        
        movieCard.innerHTML = `
        <img class="movie-poster" src="${posterPath}" alt="${movie.title}">
        <h3>${movie.title}</h3>
        <p>Release Date: ${movie.release_date}</p>
        `;
        
        moviesContainer.appendChild(movieCard);
        createPagination();
    });
}

function createPagination() {
    pagination.innerHTML ="";
    for (let i = 1; i <= 5; i++){
        const button = document.createElement("button");
        button.textContent = i;
        
        if(i === currentPage){
            button.classList.add("selected")
        }
        button.addEventListener("click", () => {
            currentPage = i;
            fetchMovies();
        });
        pagination.appendChild(button);
    }
}

function handlePaginationClick(event) {
    if (event.target.tagName === "BUTTON") {
        fetchMovies();
    }
}

fetchMovies();

