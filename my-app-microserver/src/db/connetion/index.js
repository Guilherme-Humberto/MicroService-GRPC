const mongoose = require('mongoose');
require('dotenv/config')

mongoose.connect(process.env.MONGODB_CONNECTION, {
    useNewUrlParser: true,
    useUnifiedTopology: true
})
.then(() => console.log("Conectado ao banco"))
.catch(err => console.log(`Erro ao conectar ao banco ${err}`));
