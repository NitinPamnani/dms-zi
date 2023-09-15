import express from 'express';
import * as db from './adapters/db_connectors/db.js'
import Config from './config/config.js'


const app = express();

const PORT = Config.application.port ||  5001;

app.get('/', (req, res) => 
    res.end('Chalu hai')
)

db.run().then(()=>{
  app.listen(PORT, () => {
      console.log("Listening at "+PORT)
  })
}).catch((err)=> {
    console.log("Check this error"+err)
})