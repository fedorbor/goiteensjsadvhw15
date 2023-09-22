function getMovies() {
    fetch('/movies') // Замініть URL на URL вашого сервера API
        .then(response => response.json())
        .then(data => {
            const tableBody = document.querySelector('#moviesTable tbody');
            tableBody.innerHTML = '';

            data.forEach(movie => {
                tableBody.innerHTML += `
                    <tr>
                        <td>${movie.id}</td>
                        <td>${movie.title}</td>
                        <td>${movie.genre}</td>
                        <td>${movie.director}</td>
                        <td>${movie.year}</td>
                        <td>
                            <button onclick="editMovie(${movie.id})">Редагувати</button>
                            <button onclick="deleteMovie(${movie.id})">Видалити</button>
                        </td>
                    </tr>
                `;
            });
        });
}

function addMovie(event) {
    event.preventDefault();

    const title = document.querySelector('#title').value;
    const genre = document.querySelector('#genre').value;
    const director = document.querySelector('#director').value;
    const year = document.querySelector('#year').value;

    const newMovie = {
        title,
        genre,
        director,
        year
    };

    fetch('/movies', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(newMovie)
    })
    .then(response => response.json())
    .then(() => {
        getMovies();
        document.querySelector('#addMovieForm').reset();
    });
}

function editMovie(id) {
    // Реалізуйте редагування фільму за його ідентифікатором тут
}

function deleteMovie(id) {
    fetch(`/movies/${id}`, {
        method: 'DELETE'
    })
    .then(() => {
        getMovies();
    });
}

getMovies();

document.querySelector('#addMovieForm').addEventListener('submit', addMovie);
