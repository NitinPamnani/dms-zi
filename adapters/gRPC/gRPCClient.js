import grpc from '@grpc/grpc-js';
import protoloader from '@grpc/proto-loader';
import path, { dirname } from 'path';
import { fileURLToPath } from 'url';


const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename)

const packageDefinition = protoloader.loadSync(path.resolve(__dirname,'./dms.proto'));
const DmsService = grpc.loadPackageDefinition(packageDefinition).DocumentManagementService;

const client = new DmsService('localhost:5002',
grpc.credentials.createInsecure())

export default client