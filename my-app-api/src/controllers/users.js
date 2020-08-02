// importando as funcionalidades do arquivo de contrato
const MicroService = require('../services/microserv.js')

module.exports = {
    // Função de busca de usuarios pelo id
    async show(req, res) {
        const { id } = req.params;

        const response = await new Promise((resolve, reject) => {
            MicroService.getUserById({ id }, (err, response) => {
                err ? reject(err) : resolve(response)
            })
        });
        return res.json(response);
    },
    // Função de criação de usuarios
    async create(req, res) {
        const { username, email, password } = req.body;

        const response = await new Promise((resolve, reject) => {
            MicroService.registerUser({user: {username, email, password}}, (err, response) => {
                err ? reject(err) : resolve(response)
            })
        })
        return res.json(response);
    }
}