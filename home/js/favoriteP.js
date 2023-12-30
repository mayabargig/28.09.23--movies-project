

if (!favoriteArray || favoriteArray.length === 0) {
    moviesContainer.innerHTML = "<p>You haven't added any favorite movies yet.</p>";
} else {
    favoriteArray.forEach((movie) => {
        fetchFavoriteMovies(movie);
    });
};


function fetchFavoriteMovies(movieId) {
    let url = `https://api.themoviedb.org/3/movie/${movieId}?api_key=${apiKey}&language=en-US`;

    fetch(url)
        .then((response) => response.json())
        .then((data) => {
            const movieDetails = data;
            console.log(movieDetails);
            displayFavoriteMovies(movieDetails);
        })
        .catch((error) => console.error("Error fetching movie details:", error));
};


function displayFavoriteMovies(movie) {
    const posterPath = movie.poster_path
        ? `https://image.tmdb.org/t/p/w500${movie.poster_path}`
        : "no-image-available.jpg";
    const isLiked = favoriteArray.includes(movie.id + '');
    const heartClass = isLiked ? "fas fa-heart" : "far fa-heart";

    const movieCard = document.createElement("div");
    movieCard.classList.add("movie-card");

    movieCard.innerHTML += `
            <img class="movie-poster" src="${posterPath}" alt="${movie.title}">
            <h3>${movie.title}</h3>
            <p>Release Date: ${movie.release_date}</p>
            <i class="${heartClass}" id="${movie.id}" onclick="changeColor(this)"></i>`;

    moviesContainer.appendChild(movieCard);
};


/** TODO: fetch the api to get the movie by the id than push it after create the element */
// });

// const removeButtons = favoritesContainer.querySelectorAll(".remove-favorite-button");

// removeButtons.forEach((button) => {
//     button.addEventListener("click", function () {
//         const movieCard = button.closest(".movie-card");
//         const movieTitle = movieCard.querySelector("h3").textContent;

//         favoriteMovies = favoriteMovies.filter((movie) => movie.title !== movieTitle);

//         localStorage.setItem("favoriteMovies", JSON.stringify(favoriteMovies));

//         displayFavoriteMovies();
//     });
// });
