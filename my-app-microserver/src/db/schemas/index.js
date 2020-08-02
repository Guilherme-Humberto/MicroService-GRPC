const mongoose= require('mongoose');
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')

// Criação do Schema do usuario
const UserSchema = new mongoose.Schema({
    id: String,
    username: String,
    email: String,
    password: String
});

// Configuração de criptografia do password
UserSchema.pre('save', async function (next) {
    if(!this.isModified('password')) next();

    this.password = await bcrypt.hash(this.password, 8)
});

UserSchema.methods = {
    compareHash(hash) {
        return bcrypt.compare(hash, this.password)
    }
}

// troque 'teste' por authConfig.secret
UserSchema.statics = {
    generateToken({ id }) {
        return jwt.sign({ id }, 'teste', {
            expiresIn: 86400
        })
    }
}

module.exports = mongoose.model('User', UserSchema)