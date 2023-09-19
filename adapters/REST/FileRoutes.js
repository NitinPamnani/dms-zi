import express from 'express';
import * as fileUseCases from '../../domain/use-cases/FileUseCases.js'
const fileRouter = express.Router();


fileRouter.post('/', async(req, res) => {
    //const {error} = validate(req.body)
    let createFileRes = await fileUseCases.createNewFile("Hello", "This is my first file");
    console.log("Check the logs" + JSON.stringify(createFileRes));

    if(createFileRes.success) {
        res.send({success:true, message:"File Created Successfully!"});
    } else {
        res.send({success:false, message:"Unable to create file!"})
    }
})

fileRouter.put('/', async(req, res) => {
    let fileId = 'dfe2bde0-5195-49bc-9c9b-88f397f8020f';
    let newContent = 'New content for file';    

    let context = {
        fileId: fileId,
        content: newContent,
        action: 'updateContent'
    }

    let updateFileRes = await fileUseCases.updateFile(context);
    console.log("Check the logs" + JSON.stringify(updateFileRes));

    if(updateFileRes.success) {
        res.send({sucess:true, message:"File updated successfully!"});
    } else {
        res.send({success:false, message:"Unable to update file!"});
    }
})

export default fileRouter
