const express = require('express');
const bodyParser = require('body-parser');

const app = express();
const port = process.env.PORT || 3000;


const movies = [
    {
        id: 1,
        title: 'The Shawshank Redemption',
        genre: 'Drama',
        director: 'Frank Darabont',
        year: 1994
    },
    {
        id: 2,
        title: 'The Godfather',
        genre: 'Crime',
        director: 'Francis Ford Coppola',
        year: 1972
    },
   
];

app.use(bodyParser.json());


app.get('/movies', (req, res) => {
    res.json(movies);
});


app.post('/movies', (req, res) => {
    const newMovie = req.body;
    newMovie.id = movies.length + 1; 
    movies.push(newMovie);
    res.json(newMovie);
});


app.put('/movies/:id', (req, res) => {
    const id = parseInt(req.params.id);
    const updatedMovie = req.body;
    const index = movies.findIndex(movie => movie.id === id);
    if (index !== -1) {
        movies[index] = { ...movies[index], ...updatedMovie };
        res.json(movies[index]);
    } else {
        res.status(404).json({ error: 'Фільм не знайдено' });
    }
});


app.delete('/movies/:id', (req, res) => {
    const id = parseInt(req.params.id);
    const index = movies.findIndex(movie => movie.id === id);
    if (index !== -1) {
        const deletedMovie = movies.splice(index, 1);
        res.json(deletedMovie[0]);
    } else {
        res.status(404).json({ error: 'Фільм не знайдено' });
    }
});


app.listen(port, () => {
    console.log(`Сервер запущено на порту ${port}`);
});
