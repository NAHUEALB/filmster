import Table from './components/table.mjs'
import movieService from './api/movie.mjs'

// Inicializamos la tabla
window.table = Table('#movies', {
    header: [
        { label: 'Título', field: 'title' },
        { label: 'Descripción', field: 'description' },
        { label: 'Año', field: 'year' },
        { label: 'Pais', field: 'country' },
        { label: 'Duracion(min)', field: 'runtime' },
        {
            label: 'Guionistas',
            field: 'writers',
            render: function (data) { return data.join(', ') }
        }
    ],
    data: [],
    // Esta funcion se ejecuta cuando seleccionamos una pelicula
   onSelectedRow: function (row) {
	   
	   	if (table.getSelectedRows().length > 1) { 
	    //Si hay más de una película seleccionada deshabilita el botón
	    document.getElementById("editMovieBtn").disabled = true; 
		} else {
		document.getElementById("editMovieBtn").disabled = false; 
		}
	
    },
    // Esta funcion se ejecuta cuando deseleccionamos una pelicula
    onDeselectedRow: function () {
		
		//getSelectedRows() devuelve la lista de los chequeados
		if (table.getSelectedRows().length == 1) { 
		    //Si hay un solo botón seleccionado habilita el botón
			document.getElementById("editMovieBtn").disabled = false; 
		} else {
			document.getElementById("editMovieBtn").disabled = true; 
		}
			
    }
})

// Obtenemos todas las peliculas
movieService.getAll().then(table.update)

// Guardamos todas las referencias a elementos que vamos a
// necesitar
const $refs = {
    cancelModalBtn: document.querySelector('#cancelModalBtn'),
    saveMovieBtn: document.querySelector('#saveMovieBtn'),
    addMovieBtn: document.querySelector('#addMovieBtn'),
    closeModalBtn: document.querySelector('#closeModalBtn'),
	
	editMovieBtn: document.querySelector('#editMovieBtn'),
    closeModalEditarBtn: document.querySelector('#closeModalEditBtn'),
    cancelModalEditarBtn: document.querySelector('#cancelModalEditBtn'),
	saveEditMovieBtn: document.querySelector('#saveEditMovieBtn'),

    modal: document.querySelector('#modal'),
	
	//Feature#2.4 Acá referencio al form
	form: document.querySelector('#formNuevaPelicula'),
    movieName: document.querySelector('#movieName'),
    moviePlot: document.querySelector('#moviePlot'),
    movieReleaseDate: document.querySelector('#movieReleaseDate'),
    movieCountry: document.querySelector('#movieCountry'),
    movieRuntime: document.querySelector('#movieRuntime'),
    movieLanguage: document.querySelector('#movieLanguage'),
    movieGeneres: document.querySelector('#movieGeneres'),
    movieWriters: document.querySelector('#movieWriters'),
    movieDirectors: document.querySelector('#movieDirectors'),
	


	/* MODAL 2 PRUEBA EDITAR */
	modalEditar: document.querySelector('#modalEditar'),

    movieNameEdit: document.querySelector('#movieNameEdit'),
	moviePlotEdit: document.querySelector('#moviePlotEdit'),
	movieReleaseDateEdit: document.querySelector('#movieReleaseDateEdit'),
	movieCountryEdit: document.querySelector('#movieCountryEdit'),
    movieRuntimeEdit: document.querySelector('#movieRuntimeEdit'),
	movieLanguageEdit: document.querySelector('#movieLanguageEdit'),
	movieGenresEdit: document.querySelector('#movieGeneresEdit'),
	movieWritersEdit: document.querySelector('#movieWritersEdit'),
    movieDirectorsEdit: document.querySelector('#movieDirectorsEdit')
}

/*
 * Abre el modal
 */
function openModal() {
    $refs.modal.classList.add('is-active')
}

/*
 * Cierra el modal
 */
function closeModal() {
    $refs.modal.classList.remove('is-active');
	//Feature#2.4 Acá le aplicó un reset al form
	$refs.form.reset();
}

/*
 * Abre el modal_2
 */
function openModalEditar() {
	
	//Acá obtengo los datos de la película seleccionada
    const movieToEdit = {
		id: table.getSelectedRows()[0].id,
        name: table.getSelectedRows()[0].title,
        plot: table.getSelectedRows()[0].description,
        year: table.getSelectedRows()[0].year,
        country: table.getSelectedRows()[0].country,
        runtime: table.getSelectedRows()[0].runtime,
        language: table.getSelectedRows()[0].language,
        generes: table.getSelectedRows()[0].genres,
        writers: table.getSelectedRows()[0].writers,
        directors: table.getSelectedRows()[0].directors
    }	
	
//Acá lleno los campos con los datos de la película obtenida
$refs.movieNameEdit.value = movieToEdit.name;
$refs.moviePlotEdit.value = movieToEdit.plot;
$refs.movieReleaseDateEdit.value = movieToEdit.year;
$refs.movieCountryEdit.value = movieToEdit.country;
$refs.movieRuntimeEdit.value = movieToEdit.runtime;
$refs.movieLanguageEdit.value = movieToEdit.language;
$refs.movieGenresEdit.value = movieToEdit.generes.join(); //Con el Join convierto un Array a String
$refs.movieWritersEdit.value = movieToEdit.writers.join();
$refs.movieDirectorsEdit.value = movieToEdit.directors.join();

//Acá se abre el modal con los campos llenos
$refs.modalEditar.classList.add('is-active')

}

/*
 * Cierra el modal_2
 */
function closeModalEditar() {
    $refs.modalEditar.classList.remove('is-active')
}

function parseCSV(val) {
    return val.split(',').flatMap(v => v.split());
}

/*
 * Guarda una pelicula
 */
function saveMovie() {
    const movie = {
        name: $refs.movieName.value,
        plot: $refs.moviePlot.value,
        year: new Date($refs.movieReleaseDate.value),
        country: $refs.movieCountry.value,
        runtime: +$refs.movieRuntime.value,
        language: $refs.movieLanguage.value,
        generes: parseCSV($refs.movieGeneres.value),
        writers: parseCSV($refs.movieWriters.value),
        directors: parseCSV($refs.movieDirectors.value)
    }

    movieService.create(movie);
    location.reload();
}

function saveEditedMovie() {
    const movie = {
		
		id: table.getSelectedRows()[0].id,
        name: $refs.movieNameEdit.value,
        plot: $refs.moviePlotEdit.value,
        year: $refs.movieReleaseDateEdit.value,
        country: $refs.movieCountryEdit.value,
        runtime: +$refs.movieRuntimeEdit.value,
        language: $refs.movieLanguageEdit.value,
        generes: parseCSV($refs.movieGenresEdit.value),
        writers: parseCSV($refs.movieWritersEdit.value),
        directors: parseCSV($refs.movieDirectorsEdit.value)
    }

    movieService.editar(movie);
    location.reload();
}

// Levantamos los listeners de la app
$refs.addMovieBtn.addEventListener('click', openModal)
$refs.editMovieBtn.addEventListener('click', openModalEditar)
$refs.closeModalEditarBtn.addEventListener('click', closeModalEditar)
$refs.cancelModalEditarBtn.addEventListener('click', closeModalEditar)
$refs.saveEditMovieBtn.addEventListener('click', saveEditedMovie)
$refs.cancelModalBtn.addEventListener('click', closeModal)
$refs.closeModalBtn.addEventListener('click', closeModal)
$refs.saveMovieBtn.addEventListener('click', saveMovie)
