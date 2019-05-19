const MovieModel = require('./movie.js');
const UsuarioModel = require('./usuario.js');

async function createTables() {
    return MovieModel.Movie.sync();
}

async function createTableUsuario() {
    return UsuarioModel.Usuario.sync();
}

async function dropTables() {
    MovieModel.Movie.destroy({
        where: {}
    });
	
	UsuarioModel.Usuario.destroy({
        where: {}
    });
}

module.exports = {
    createTables,
	createTableUsuario,
    dropTables
}
