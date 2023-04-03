const filmList = document.getElementById("films");
const filmTitle = document.getElementById("film-title");
const filmPoster = document.getElementById("film-poster");
const filmRuntime = document.getElementById("film-runtime");
const filmShowtime = document.getElementById("film-showtime");
const filmTickets = document.getElementById("film-tickets");
const filmDescription = document.getElementById("film-description");
const buyTicketBtn = document.getElementById("buy-ticket-btn");


// Fetching  films data and creating film list
fetch("http://localhost:3000/films")
    .then((response) => response.json())
    .then((films) => {
        films.forEach((film) => {
            const filmItem = document.createElement("li");
            filmItem.textContent = film.title;
            filmItem.classList.add("film", "item");
            filmItem.addEventListener("click", () => {
                displayFilmDetails(film.id);
            });
            filmList.appendChild(filmItem);
        });
        displayFilmDetails(films[0].id);
    });

// Fetching film details and updating film details section
function displayFilmDetails(filmId) {
    fetch(`http://localhost:3000/films/${filmId}`)
        .then((response) => response.json())
        .then((film) => {
            filmTitle.textContent = film.title;
            filmPoster.src = film.poster;
            filmRuntime.textContent = `Runtime: ${film.runtime} mins`;
            filmShowtime.textContent = `Showtime: ${film.showtime}`;
            const availableTickets = film.capacity - film.tickets_sold;
            filmTickets.textContent = `Tickets Available: ${availableTickets}`;
            filmDescription.textContent = film.description;
            buyTicketBtn.disabled = availableTickets === 0;
            buyTicketBtn.removeEventListener("click", buyTicketHandler);
            buyTicketBtn.addEventListener("click", buyTicketHandler);
        });
}


// Buy ticket handler function
function buyTicketHandler() {
    const availableTickets = parseInt(filmTickets.textContent.split(": ")[1]);
    if (availableTickets === 0) {
        alert("Sorry, this showing is sold out.");
        return;
    }
    const newAvailableTickets = availableTickets - 1;
    filmTickets.textContent = `Tickets Available: ${newAvailableTickets}`;
}

// Adding event listener 
buyTicketBtn.addEventListener("click", buyTicketHandler);







