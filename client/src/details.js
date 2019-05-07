const movieService = require('./api/movie.mjs');


function cargar() {
	
	//En esta variable se guarda todo el contenido de la barra de busqueda
	var id = decodeURIComponent(window.location.search);
	//Acá obtengo toda la id
	id = id.substring(1);
   alert(id);
   movieService.get(id);
	// const data = movieService.get(id);
	alert(data.id);
	document.getElementById("title").innerHTML=data.title;
}

