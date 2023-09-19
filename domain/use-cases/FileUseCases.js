import File from "../entities/File.js";
import {v4 as uuid} from 'uuid';
import * as db from '../../adapters/db_connectors/mongo/db.js'



async function createNewFile(name, content, context) {

    let currDate = new Date();
    let currentDir =22 //context.body.current_dir;
    let ownerId =22 //context.body.owner_id;
    let id = uuid();
    let newFile = new File(id,name, content, currDate, currDate, ownerId, currentDir);
    const fileDetails = newFile.getFileDetails()
    const res =  await db.fileRepo.createNewFile(fileDetails);  
    return res;
}

async function updateFile(context) {
    
    const res = await db.fileRepo.updateFile(context);
    return res;
}

async function getFileContents(context) {

        const query = {fileId: context.fileId, owner_id: context.ownerId}

        const fileData = await db.fileRepo.getFileContents(query);
        return fileData
}

export {
    createNewFile,
    updateFile,
    getFileContents
}