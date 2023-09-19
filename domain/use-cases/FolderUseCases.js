import Folder from '../entities/Folder.js';
import {v4 as uuid} from 'uuid';
import * as db from '../../adapters/db_connectors/mongo/db.js';


async function createDirectory(context) {
    let currDate = new Date();
    let id = uuid();
    let newDir = new Folder(id,context.name, context.type || "SUB" , currDate, currDate, context.ownerId, context.parentDir);
    const dirDetails = newDir.getFolderDetails()
    const res =  await db.dirRepo.createNewDirectory(dirDetails);  
    return res;
}


async function getDirectoryContents(context) {
    const ownerId = context.userId;
    const dirId = context.dirId;

    

    const dirData = await db.dirRepo.getDirData(context);
    if(dirData) {
        const directoriesInDir = await db.dirRepo.getDirInDir(context);
        const filesInDir = await db.dirRepo.getFilesInDir(context);

        let data =  {directories: directoriesInDir.data, files: filesInDir.data}

        if(data.directories &&  data.directories.length) {
          data.directories = data.directories.map((dir) => {
              return {
                  id: dir.directoryId,
                  name: dir.name
              }
          })
        }

        if(data.files && data.files.length) {
          data.files = data.files.map((file) => {
              return {
                  id: file.fileId,
                  name: file.name
              }
          })
        }

        return data
    } else {
        return dirData
    }
}


export {
    getDirectoryContents,
    createDirectory
}
