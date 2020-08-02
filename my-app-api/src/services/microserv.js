const path = require('path')
const grpc = require('grpc');
const loaderConfig = require('../config/index')
const protoLoader = require('@grpc/proto-loader')

// Carregamento do arquivo do contrato
const packageDefinition = protoLoader.loadSync(
path.resolve(__dirname, '..' ,'pb', 'contract_client.proto'), 
    loaderConfig
);

const proto = grpc.loadPackageDefinition(packageDefinition);

// Conectando minha api com o Microserviço
// Necessario a mesma porta definida no microserviço
const microClient = new proto.UserService(
    'localhost:3333',
     grpc.credentials.createInsecure()
);

// exportando o contrato para ser usado nos controllers
module.exports = microClient;