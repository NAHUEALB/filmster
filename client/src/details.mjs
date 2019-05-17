import movieService from './api/movie.mjs'

	
//En esta variable se guarda todo el contenido de la barra de busqueda
var id = decodeURIComponent(window.location.search);

//Acá obtengo toda la id
id = id.substring(1);

if ( id == "" ) {
	
	alert('No se pasó id');
	
} else {
	
	const data = movieService.getById(id);

	//La función then ejecuta la función una vez obtuvo los datos
	//Si no se usa esto trae un objeto Promise y es más rebuscado
	//O sea, cuando cargue la data la pasa a esa función
	data.then(cargarCampos);

	function cargarCampos(data) {
		document.getElementById("title").innerHTML=data.title;
		document.getElementById("description").innerHTML=data.description;
		document.getElementById("director").innerHTML=data.directors;
		document.getElementById("writers").innerHTML=data.writers.join(); //Con Join() se pasa de array a String
		document.getElementById("genre").innerHTML=data.genres.join();
		document.getElementById("runtime").innerHTML=data.runtime;
		document.getElementById("language").innerHTML=data.language;
		document.getElementById("country").innerHTML=data.country;
		document.getElementById("year").innerHTML=data.year;
	}

}



