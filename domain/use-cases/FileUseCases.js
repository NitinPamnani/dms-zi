import {File} from "../entities/File.js";
import {v4 as uuid} from 'uuid';



async function createNewFile(name, content, context) {

    let curr_date = new Date();
    let current_dir = context.body.current_dir;
    let owner_id = context.body.owner_id;
    let id = uuid();
    let new_file = new File(id,name, content, curr_date, curr_date, owner_id, current_dir);

}

async function moveFile(currentDir, newDir) {

}

async function getFileContents(fileId) {

}