const startServer = require('../../server/src/index.js');
const fetch = require('node-fetch');
const MovieModels = require('../../server/src/models/movie.js');

let server, baseURL;

beforeAll(async () => {
    server = await startServer();
    baseURL = `http://localhost:${server.address().port}/api/v1`
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

// test/3
test('Se debería eliminar una película por API', async () => {
	
    const URL = `${baseURL}/movies/`;
	
	//Creo una película de prueba
	const movieData = {
        title: 'Back to the Future Part III',
        description: 'Enjoying a peaceable existence in 1885, Doctor Emmet Brown is about to be killed by Buford "Mad Dog" Tannen. Marty McFly travels back in time to save his friend.',
        year: 1990,
        runtime: 118,
        country: 'United States',
        language: 'English',
        genres: ['Adventure', 'Comedy', 'Science Fiction'],
        directors: ['Robert Zemeckis'],
        writers: ['Robert Zemeckis', 'Bob Gale']
    };
	
	// Se crea la película y se guarda en movie
    const movie = await fetch(URL, {
				  method: 'post',
				  body:    JSON.stringify({title:movieData.name,description:movieData.plot,year:movieData.year,
						   runtime:movieData.runtime,country:movieData.country,language:movieData.language,
						   genres:movieData.generes,writers:movieData.writers,directors:movieData.directors})
    })	;
	
	// La elimino
	await fetch(URL+movie.id, { method: 'delete' });	
	
	//Trato de recuperarla después de eliminarla
	const deleted = await fetch(URL+movie.id, { method: 'get' });

    expect(deleted).toEqual(expect.arrayContaining([]));
});

test('Se debería reflejar en la base de datos la pelicula agregada', async () =>
{
	const URL = `${baseURL}/movies`;
	 const movie = {
        name: 'piratas del caribe',
        plot: 'Pelicula graciosa y de accion',
        year: '2005',
        country: 'England',
        runtime: '11',
        language: 'England',
        generes: 'Comedy, accion',
        writers: 'Pepe',
        directors: 'pipo'
    }
	function create(movie) {fetch(URL, {
        method: 'post',
       body:    JSON.stringify({title:movie.name,description:movie.plot,year:anio,
       	runtime:movie.runtime,country:movie.country,language:movie.language,
       	genres:movie.generes,writers:movie.writers,directors:movie.directors})
    })	
	}

	const result= function getAll() {
    return fetch('/api/v1/movies')
        .then(result => result.json())
		}

  expect(movie.title).toBe(result.title);

});