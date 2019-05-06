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
		
		document.getElementById("editMovieBtn").disabled = false;
		
    },
    // Esta funcion se ejecuta cuando deseleccionamos una pelicula
    onDeselectedRow: function () {
		
		//getSelectedRows() devuelve la lista de los chequeados
		if (table.getSelectedRows().length < 1) { 
		    //Si no hay ningún elemento chequeado que deshabilite el botón
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
    closeModalEditarBtn: document.querySelector('#closeModal2Btn'),
    cancelModalEditarBtn: document.querySelector('#cancelModal2Btn'),
	aceptModal2Btn: document.querySelector('#aceptModal2Btn'),

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

    movieName: document.querySelector('#movieName2'),
	 movieCountry: document.querySelector('#movieCountry2'),
    movieRuntime: document.querySelector('#movieRuntime2'),
    movieDirectors: document.querySelector('#movieDirectors2')
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

// Levantamos los listeners de la app
$refs.addMovieBtn.addEventListener('click', openModal)
$refs.editMovieBtn.addEventListener('click', openModalEditar)
$refs.closeModalEditarBtn.addEventListener('click', closeModalEditar)
$refs.cancelModalEditarBtn.addEventListener('click', closeModalEditar)
$refs.cancelModalBtn.addEventListener('click', closeModal)
$refs.closeModalBtn.addEventListener('click', closeModal)
$refs.saveMovieBtn.addEventListener('click', saveMovie)
