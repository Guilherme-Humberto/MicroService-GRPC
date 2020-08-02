// Funções presentes no processor_messages.proto
const User = require('../db/schemas')

module.exports = {
    // Função para pegar usuario pelo id
    async getUserById (call, callback) {
        const { id } = call.request;

        const user = await User.findById(id);

        return callback(null, {user: {...user.toObject(), id: user._id, password: undefined}});
    },
    // Função de registro de usuarios
    async registerUser (call, callback) {
        const { username, email, password } = call.request.user;

        const user = await User.create({ username, email, password });
        return callback(null, {user: {...user.toObject(), id: user._id}});
    },
    // Função de login de usuarios
    async loginUser (call, callback) {
        const { email, password } = call.request.user

        const user = await User.findOne({ email });

        if(!user) {
            return callback({ error: "User not found" })
        }

        if(!await user.compareHash(password)) {
            return callback({ error: "Invalid password" })
        }

        return callback(null, {
            token: User.generateToken(user)
        })
    }
}