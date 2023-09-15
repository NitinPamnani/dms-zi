import { MongoClient, ServerApiVersion } from 'mongodb';
import Config from '../../config/config.js';

const mongo_uri = `mongodb+srv://${Config.database.username}:${Config.database.password}@${Config.database.host}`;


const client = new MongoClient(mongo_uri, {
    serverApi: {
        version: ServerApiVersion.v1,
        strict: true, 
        deprecationErrors: true,
    }
});

async function run() {
    try {
      await client.connect();
      await client.db(Config.database.database).command({ ping: 1 });
      console.log("Pinged your deployment. You successfully connected to dms MongoDB!");
    } catch (err) {
      console.log(err)
    }
  }
  //run().catch(console.dir);
  export  {
    run,
    client
  }
//module.exports = run