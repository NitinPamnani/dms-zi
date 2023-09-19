import express from 'express';
import * as db from './adapters/db_connectors/mongo/db.js'
import Config from './config/config.js'
import * as fileUseCase from './domain/use-cases/FileUseCases.js'
import fileRouter from './adapters/REST/FileRoutes.js';
import userRouter from './adapters/REST/UserRoutes.js';

import grpc from '@grpc/grpc-js';
import protoloader from '@grpc/proto-loader';
import ServiceBinding from './adapters/gRPC/ServiceBinding.js';
import path, { dirname } from 'path';
import { fileURLToPath } from 'url';


const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename)

const packageDefinition = protoloader.loadSync(path.resolve(__dirname,'./adapters/gRPC/dms.proto'));
const dmsProto = grpc.loadPackageDefinition(packageDefinition);

const app = express();

const PORT = Config.application.port ||  5001;
const GRPCPORT = Config.application.gRPCPort || 5002;

app.use(express.json())
app.use('/api/file', fileRouter)
app.use('/api/user', userRouter)

db.run().then(()=>{
  
  const serviceBind = new ServiceBinding(dmsProto);
  serviceBind.addServices();
  const gRPCServer = serviceBind.getServer();

  gRPCServer.bindAsync(`localhost:${GRPCPORT}`,
  grpc.ServerCredentials.createInsecure(),(err, port) => {
    if(err) {
      console.log("Unable to start gRPC:"+err)
    } else {
      gRPCServer.start();
      console.log("gRPC serving at "+port)
    }
  })


  app.listen(PORT, () => {
      console.log("REST serving at "+PORT)
  })
}).catch((err)=> {
    console.log("Check this error"+err)
})