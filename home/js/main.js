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

let favoriteArray = [];
let movieId = 0;

function displayMovies(movies) {
    moviesContainer.innerHTML = "";
    
    movies.forEach((movie) => {
        movieId++;
        const movieCard = document.createElement("div");
        movieCard.classList.add("movie-card");
        
        const posterPath = movie.poster_path
        ? `https://image.tmdb.org/t/p/w500${movie.poster_path}`
        : "no-image-available.jpg"; 
        
        movieCard.innerHTML += `
        <img class="movie-poster" src="${posterPath}" alt="${movie.title}">
        <h3>${movie.title}</h3>
        <p>Release Date: ${movie.release_date}</p>
        <div class="favoriteButton" id="redButton-${movieId}" onclick="changeColor(this)"><svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-heart-fill" viewBox="0 0 16 16">
        <path fill-rule="evenodd" d="M8 1.314C12.438-3.248 23.534 4.735 8 15-7.534 4.736 3.562-3.248 8 1.314z"/>
        </svg> </div>
        `;

        favoriteArray.push(movieCard.innerHTML);
        moviesContainer.appendChild(movieCard);
        createPagination();
    });
    console.log(favoriteArray);
    localStorage.setItem("favoriteArray", JSON.stringify(favoriteArray));
}

function changeColor (button){
        if(button.style.color !== "red"){
            button.style= "color: red";
        }else{
            button.style= "color: black";
        } 
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
