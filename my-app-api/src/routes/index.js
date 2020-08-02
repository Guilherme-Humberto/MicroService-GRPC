const express = require('express')
const router = express.Router()

const implementationUsers = require('../controllers/users');
const implementationSessions = require('../controllers/sessions');

// Defindo as rotas e implementando as funções dos controllres
router.get('/users/:id', implementationUsers.show)
router.post('/create', implementationUsers.create)
router.post('/sessions', implementationSessions.login)

module.exports = router;
