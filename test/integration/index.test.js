const startServer = require('../../server/src/index.js')
const fetch = require('node-fetch');
const MovieModels = require('../../server/src/models/movie.js')

let server, baseURL;

beforeAll(async () => {
    server = await startServer();
    baseURL = `http://localhost:${server.address().port}/api/v1`
    await MovieModels.Movie.sync({ force: true });
})

afterAll(() => {
    server.close()
})

test('Se debería iniciar la aplicación sin películas', async () => {
    const URL = `${baseURL}/movies`;
    const req = await fetch(URL);
    const movies = await req.json();
    expect(movies.length).toBe(0);
});

test('Se debería reflejar en la base de datos la pelicula agregada', async () =>
{
	 const movie = {
        title: 'Back to the Future',
        description: 'Marty McFly, a 17-year-old high school student, is accidentally sent thirty years into the past in a time-traveling DeLorean invented by his close friend, the maverick scientist Doc Brown.',
        year: 1985,
        runtime: 116,
        country: 'United States',
        language: 'English',
        genres: ['Adventure', 'Comedy', 'Science Fiction'],
        directors: ['Robert Zemeckis'],
        writers: ['Robert Zemeckis', 'Bob Gale']
    };
    const movieCreated= await MovieModels.create(movie);
    const result = await MovieModels.getAll();

  expect(result[0].title).toBe(movie.title);
  expect(result[0].description).toBe(movie.description);
  expect(result[0].year).toBe(movie.year);
  expect(result[0].runtime).toBe(movie.runtime);
  expect(result[0].country).toBe(movie.country);
  expect(result[0].language).toBe(movie.language);
  expect(result[0].genres).toEqual(movie.genres);
  expect(result[0].writers).toEqual(movie.writers);
  expect(result[0].directors).toEqual(movie.directors);

});