export default class DirectoryRepo {
    #db;

    constructor(db) {
        this.#db = db;
    }

    async createNewDirectory(dirObject) {
        return new Promise(async(resolve, reject) => {
            try {
                const res = await this.#db.collection('folders').insertOne(dirObject)
                if(res.acknowledged && res.insertedId) {
                    resolve(res);
                    return;
                }
                reject(res);
            } catch (err) {
                console.log("Error occurred while creating a new file: "+err);
                reject(err);
                //return;
            }
        }).then(data => {
            return {success:1, data:data}
        }).catch(err => {
            return {success:0, err:err}
        })
    }

    /**
     * Can update the path (parent dir)
     * and also other editable attributes of a directory
     */
    async updateDir(dirObject) {
        return new Promise(async(resolve, reject) => {
            try {
                const res =  await this.#db.collection('folders').findOneAndUpdate(
                    {directoryId:dirObject.directoryId}, 
                    {$set : {name: dirObject.name}}
                )

                if(res && res._id) {
                    resolve(res);
                    return;
                }
                reject(res);                    
            } catch (err) {
                console.log("Error occurred while updating file! "+err)
                console.log("FileObject: "+fileObject)
                reject(res);
            }
        }).then(data => {
            return {success:1, data:data}
        }).catch(err => {
            return {success:0, err:err}
        })
    }

    async getFilesInDir(context) {
        const fileFetchQuery = {
            owner_id: context.ownerId,
            parent_dir_id: context.dirId,
        }

        return new Promise(async(resolve,reject) => {
            try{
                const res = await this.#db.collection('files').find(fileFetchQuery).toArray();

                if(res.length && res[0]._id) {
                    resolve(res);
                    return;
                }
                reject(res);
            } catch (err) {
                console.log("Error occured while fetching dir!"+err);
                console.log("File fetch query: "+fileFetchQuery);
            }
        }).then(data => {
            return {success:1, data: data}
        }).catch(err => {
            return {success:0, err:err}
        })        
    }

    async getDirInDir(context) {

        const dirFetchQuery = {
            owner_id: context.ownerId,
            parent_dir_id: context.dirId,
            type:"SUB"
        }

        return new Promise(async(resolve,reject) => {
            try{
                const res = await this.#db.collection('folders').find(dirFetchQuery).toArray();

                if(res.length && res[0]._id) {
                    resolve(res);
                    return;
                }
                reject(res);
            } catch (err) {
                console.log("Error occured while fetching dir!"+err);
                console.log("Dir fetch query: "+dirFetchQuery);
            }
        }).then(data => {
            return {success:1, data: data}
        }).catch(err => {
            return {success:0, err:err}
        })
    }

    async getDirData(context) {

        const dirFetchQuery = {
            owner_id: context.ownerId,
            directoryId: context.dirId
        }

        return new Promise(async(resolve,reject) => {
            try{
                const res = await this.#db.collection('folders').findOne(dirFetchQuery);

                if(res && res._id) {
                    resolve(res);
                    return;
                }
                reject(res);
            } catch (err) {
                console.log("Error occured while fetching dir!"+err);
                console.log("Dir fetch query: "+dirFetchQuery);
            }
        }).then(data => {
            return {success:1, data: data}
        }).catch(err => {
            return {success:0, err:err}
        })

    }
}