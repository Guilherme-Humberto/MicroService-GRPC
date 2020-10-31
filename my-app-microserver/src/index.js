const grpc = require('grpc');
const path = require('path')
const protoLoader = require('@grpc/proto-loader');
const implementation = require('./controllers')
const loaderConfig = require('./config/index')

require('./db/connetion/index')
require('./db/schemas/index')

// Configuração para carregar arquivos .proto
const packageDefinition = protoLoader.loadSync(
path.resolve(__dirname, 'pb', 'contract_server.proto'),
    loaderConfig
);
const proto = grpc.loadPackageDefinition(packageDefinition);

// Abrindo servidor do microserviço
const server = new grpc.Server();
server.addService(proto.UserService.service, implementation)
server.bind('0.0.0.0:3333', grpc.ServerCredentials.createInsecure());
server.start();
