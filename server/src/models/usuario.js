const Sequelize = require('sequelize')

const db = require('../db.js')

const Usuario = db.define('Usuario', {
	// attributes
	alias: {
		type: Sequelize.STRING,
		allowNull: false
	},
	nombre: {
		type: Sequelize.STRING
	},
	apellido: {
		type: Sequelize.STRING
	},
	password: {
		type: Sequelize.STRING
	}
}, { tableName: 'Usuario' })

const getAllUsuarios = () => Usuario.findAll()

const createUsuario = (data) => Usuario.create(data)

const getUsuario = (id) => Usuario.findOne({where: {id: id}})

const updateUsuario = (id, data) => {
	return Usuario.findOne({where: {id: id}}).then(usuario => {
		if (usuario != null) {
			return usuario.update(data)
		}
		return null
	})	
}

const deleteUsuario = (id) => {
	return Usuario.findOne({where: {id: id}}).then(usuario => {
		if (usuario != null) {
			return usuario.destroy()
		}
		return null
	})	
}

const UsuarioModel = {
	Usuario: Usuario,
	getAll: getAllUsuarios,
	create: createUsuario,
	get: getUsuario,
	update: updateUsuario,
	delete: deleteUsuario
}

module.exports = UsuarioModel
