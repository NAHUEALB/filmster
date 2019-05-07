function getAll() {
    return fetch('/api/v1/movies')
        .then(result => result.json())
}

function create(movie) {
  const anio=movie.year.getFullYear()
fetch('/api/v1/movies', {
        method: 'post',
        body:    JSON.stringify({title:movie.name,description:movie.plot,year:anio,runtime:movie.runtime,country:movie.country,language:movie.language,genres:movie.generes,writers:movie.writers,directors:movie.directors}),
        headers: { 	'Accept': 'application/json',
        			'Content-Type': 'application/json' },
    })
    .then(res => res.json())
    .then(json => console.log(json));
}

function editar(movie) {
fetch('/api/v1/movies/'+movie.id, {
        method: 'put',
        body:    JSON.stringify({title:movie.name,description:movie.plot,year:movie.year,runtime:movie.runtime,country:movie.country,language:movie.language,genres:movie.generes,writers:movie.writers,directors:movie.directors}),
        headers: { 	'Accept': 'application/json',
        			'Content-Type': 'application/json' },
    })
}

function get(id) {
    return fetch('/api/v1/movies'+id)
        .then(result => result.json())
}


export default {
    getAll,
    create,
	editar
}
