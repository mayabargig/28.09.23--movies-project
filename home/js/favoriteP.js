const favoriteMovies = JSON.parse(localStorage.getItem("favoriteArray"));

function displayFavoriteMovies() {
    const movieCard = document.createElement("div");
    movieCard.classList.add("movie-card");
    
    moviesContainer.innerHTML = "";
    
    if (favoriteMovies.length === 0) {
        moviesContainer.innerHTML += "<p>You haven't added any favorite movies yet.</p>";
    } else {
        favoriteMovies.forEach((movie) => {
                    movieCard.innerHTML += movie;
                    moviesContainer.appendChild(movieCard);
                });
            }
        }

        displayFavoriteMovies();

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
