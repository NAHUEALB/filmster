const express = require('express')
const UsuarioModel = require('../models/usuario')
const router = express.Router()

router.get('/', function (req, res) {
	UsuarioModel.getAll().then((usuarios) =>
		res.status(200).send(usuarios)
	).catch(_ => res.status(500).send('Error al obtener los usuarios'))
})

router.post('/', function (req, res) {
	UsuarioModel.create(req.body).then((data) =>
		res.status(201).send(data)
	).catch(_ => res.status(500).send(_))
})

router.get('/:id', function (req, res) {
	UsuarioModel.get(req.params.id).then((usuario) => {
		if (usuario == null) {
			res.status(404).send('El usuario ' + req.params.id + ' no fue encontrado')
		} else
			res.status(200).send(usuario)
	}).catch(_ => res.status(500).send('Error al obtener usuario'))
})

router.delete('/:id', function(req,res) {
	UsuarioModel.remove(req.params.id).then((isRemoved) => {
		if (isRemoved == null) 
			res.status(404).send('El usuario ' + req.params.id + ' no fue encontrado')	
	else
			res.status(200).send()
	})
})

router.put('/:id', function (req, res) {
	UsuarioModel.update(req.params.id, req.body).then((usuario) => {
		if (usuario == null) {
			res.status(404).send('El usuario ' + req.params.id + ' no fue encontrado')
		} else
			res.status(200).send(usuario)
	}).catch(_ => res.status(500).send('Error al obtener usuario'))
})

router.delete('/:id', function (req, res) {
	UsuarioModel.delete(req.params.id).then((usuario) => {
		if (usuario == null) {
			res.status(404).send('El usuario ' + req.params.id + ' no fue encontrado')
		} else
			res.status(200).send('El usuario ' + req.params.id + ' se borró exitosamente')
	}).catch(_ => res.status(500).send('Error al borrar usuario'))
})

module.exports = router
