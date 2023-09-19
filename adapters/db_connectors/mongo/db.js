import { MongoClient, ServerApiVersion } from 'mongodb';
import Config from '../../../config/config.js';
import DirRepo from './directoryrepo/DirectoryRepo.js';
import FileRepo from './filerepo/FileRepo.js';
import UserRepo from './userrepo/UserRepo.js';

const mongo_uri = `mongodb+srv://${Config.database.username}:${Config.database.password}@${Config.database.host}`;


const client = new MongoClient(mongo_uri, {
    serverApi: {
        version: ServerApiVersion.v1,
        strict: true, 
        deprecationErrors: true,
    }
});

let dirRepo;
let userRepo;
let fileRepo;

async function run() {
    try {
      await client.connect();
      await client.db(Config.database.database).command({ ping: 1 });
      console.log("Pinged your deployment. You successfully connected to dms MongoDB!");
      const db = client.db(Config.database.database);
      fileRepo = new FileRepo(db);
      userRepo = new UserRepo(db);
      dirRepo = new DirRepo(db);
    } catch (err) {
      console.log(err)
    }
}

export  {
  run,
  dirRepo,
  userRepo,
  fileRepo
}