const API_KEY = '6a08ebdd525dc8b23ba51466c97df3d3';
const URL = `https://api.themoviedb.org/3/movie/popular?api_key=${API_KEY}&language=en-US&page=1`;

let allMovies = [];

fetch(URL)
  .then(response => response.json())
  .then(data => {
    allMovies = data.results;
    displayMovies(allMovies.slice(0, 4)); 
  })
  .catch(error => console.error('Error:', error));

document.getElementById('search-input').addEventListener('keypress', (event) => {
  if (event.key === 'Enter') {
    event.preventDefault(); 
    searchMovies();
  }
});

document.getElementById('search-button').addEventListener('click', searchMovies);

function searchMovies() {
  const query = document.getElementById('search-input').value.toLowerCase();
  const filteredMovies = allMovies.filter(movie =>
    movie.title.toLowerCase().includes(query)
  );
  displayMovies(filteredMovies);
}

function displayMovies(movies) {
  const movieContainer = document.getElementById('movie-container');
  movieContainer.innerHTML = ''; 
  movies.forEach(movie => {
    const card = createMovieCard(movie);
    movieContainer.appendChild(card);
  });
}

function createMovieCard(movie) {
  const card = document.createElement('div');
  card.className = 'movie-card';
  card.innerHTML = `
    <img src="https://image.tmdb.org/t/p/w500${movie.poster_path}" alt="${movie.title}">
    <h3>${movie.title}</h3>
    <p>${movie.overview}</p>
    <span>Rating: ${movie.vote_average}</span>
  `;
  card.addEventListener('click', () => alert(`Movie ID: ${movie.id}`));
  return card;
}
