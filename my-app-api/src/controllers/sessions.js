const MicroService = require('../services/microserv')

module.exports = {
    // Função de login do usuario
    async login(req, res) {
        const { email, password } = req.body;

        const response = await new Promise((resolve, reject) => {
            MicroService.loginUser({user: { email, password }}, (err, response) => {
                err ? reject(err) : resolve(response)
            })
        })
        return res.json(response)
    }
}