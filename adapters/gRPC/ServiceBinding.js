import grpc from '@grpc/grpc-js';
import * as userUseCases from '../../domain/use-cases/UserUseCases.js';
import * as fileUseCases from '../../domain/use-cases/FileUseCases.js';
import * as folderUseCases from '../../domain/use-cases/FolderUseCases.js'; 
import jwt from 'jsonwebtoken';
import fs from 'fs'

import path, {dirname} from 'path';
import { fileURLToPath  } from 'url';
import config from '../../config/config.js';

//public and private key
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename)
const privateKey = fs.readFileSync(path.resolve(__dirname,'../../config/private.key'),'utf-8');
const publicKey = fs.readFileSync(path.resolve(__dirname,'../../config/public.key'),'utf-8');


export default class ServiceBinding {

    #server
    #proto

    constructor(proto) {
        this.#server = new grpc.Server();
        this.#proto = proto;
    }

    addServices(){
        this.#server.addService(this.#proto.DocumentManagementService.service,{
            logInUser: async (call, callback) => {
                let userInput = call.request;

                const context = {
                    username: userInput.username,
                    email: userInput.email,
                    password: userInput.password
                }

                const validUserRes = await userUseCases.validateUserPassword(context);
                if(validUserRes.success) {
                    const tokenData = this.#signJWT(validUserRes.data);
                    if(tokenData.success) {
                        callback(null, {success:tokenData.success, token:tokenData.data});
                    } else {
                        callback({succes:0, err:"Unable to create JWT!: Problem with signing JWT"},null)    
                    }
                } else {
                    callback({succes:0, err:"Unable to create JWT!: Problem in fetching userData"},null)
                }
                 
            },
            
            getDirectoryContents: async (call, callback) => {
                let {id, token} = call.request;
                console.log(token);
                const tokenPayload = await this.#validateJWT(token);
                if(tokenPayload.success) {
                    const userData = tokenPayload.data;
                    const ownerId = userData.userId;
                    const context = {
                        dirId: id,
                        ownerId: ownerId
                    }

                    const res = await folderUseCases.getDirectoryContents(context);

                    if(res.directories || res.files) {
                        callback(null, {success:1, directories:res.directories, files:res.files})
                    } else {
                        callback({success:0}, null)
                    }
                    
                } else {
                    callback({success:0, err:tokenPayload.err}, null);
                }  
            },

            moveFileOrDirectory: async (call, callback) => {
                let {id, currentParentId, newParentId, token} = call.request;
                const tokenPayload = await this.#validateJWT(token);
                if(tokenPayload.success) {
                    const userData = tokenPayload.data;
                    const ownerId = userData.userId;
                    const context = {
                        query:{
                            fileId: id,
                            owner_id: ownerId
                        },
                        update:{
                            parent_dir_id:newParentId
                        }
                    }

                    const res = await fileUseCases.updateFile(context);
                    console.log(res);
                }
            },

            createFile: async (call, callback) => {
              let {name, content, parentDirId, token} = call.request;
              console.log(token);
              const tokenPayload = await this.#validateJWT(token);
              if(tokenPayload.success) {
                  const userData = tokenPayload.data;
                  const ownerId = userData.userId;
                  const context = {
                      name: name,
                      ownerId: ownerId,
                      parentDir: parentDirId,
                      content:content
                  }

                  const res = await fileUseCases.createNewFile(context);

                  if(res.success) {
                      callback(null, {success:1, ...res.data})
                  } else {
                      callback({success:0}, null)
                  }
                  
              } else {
                  callback({success:0, err:tokenPayload.err}, null);
              }                  
            },

            createDirectory: async (call, callback) => {
                let {name, parentDirId, token} = call.request;
                console.log(token);
                const tokenPayload = await this.#validateJWT(token);
                if(tokenPayload.success) {
                    const userData = tokenPayload.data;
                    const ownerId = userData.userId;
                    const context = {
                        name: name,
                        ownerId: ownerId,
                        parentDir: parentDirId,
                    }
  
                    const res = await folderUseCases.createDirectory(context);
  
                    if(res.success) {
                        callback(null, {success:1, ...res.data})
                    } else {
                        callback({success:0}, null)
                    }
                    
                } else {
                    callback({success:0, err:tokenPayload.err}, null);
                }  
            },

            getFileContents : async (call, callback) => {
                let {id, token} = call.request;
                console.log(token);
                const tokenPayload = await this.#validateJWT(token);
                if(tokenPayload.success) {
                    const userData = tokenPayload.data;
                    const ownerId = userData.userId;
                    const context = {
                        fileId: id,
                        ownerId: ownerId
                    }

                    const res = await fileUseCases.getFileContents(context);

                    if(res.success) {
                        callback(null, {success:1, ...res.data})
                    } else {
                        callback({success:0}, null)
                    }
                    
                } else {
                    callback({success:0, err:tokenPayload.err}, null);
                }                  
            }
        })
    }

    async #validateJWT(token){
        try {
          const decode =  jwt.verify(token, privateKey)
          ;return {success:1, data:decode}
        } catch (err) {
            console.log("Invalid JWT:"+err.message);
            return {success:0, err:"Invalid JWT!"}
        }
    }

    #signJWT(userData){
        const jwtSigningOptions = config.jwtSigningOptions;

        const jwtData = {
            userId : userData.userId,
            username: userData.username,
            email: userData.email,
            rootDir: userData.root_dir            
        }

        try {
            const token = jwt.sign(jwtData, privateKey, jwtSigningOptions);
            if(token) {
                return {success:1, data:token}
            } else {
                return {sucess: 0, data:null}
            }
        } catch (err) {
            return {success: 0, err: err}
        }
    }

    getServer(){
        return this.#server;
    }
}