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

  const URL = `${baseURL}/movies/`;

	 const movieData = {
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
     const movie = await fetch(URL, {
          method: 'post',
          body:    JSON.stringify({title:movieData.name,description:movieData.plot,year:movieData.year,
               runtime:movieData.runtime,country:movieData.country,language:movieData.language,
               genres:movieData.generes,writers:movieData.writers,directors:movieData.directors})
    })  ;
    const movies = await fetch(URL);
    const result = movies.json();

  expect(result.title).toBe(movie.title);
  expect(result.description).toBe(movie.description);
  expect(result.year).toBe(movie.year);
  expect(result.runtime).toBe(movie.runtime);
  expect(result.country).toBe(movie.country);
  expect(result.language).toBe(movie.language);
  expect(result.genres).toBe(movie.genres);
  expect(result.writers).toBe(movie.writers);
  expect(result.directors).toBe(movie.directors);

});