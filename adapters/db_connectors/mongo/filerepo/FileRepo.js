export default class FileRepo {
    #db;

    constructor(db) {
        this.#db = db;
    }

    async createNewFile(fileObject) {
        return new Promise(async(resolve, reject) => {
            try {
                const res = await this.#db.collection('files').insertOne(fileObject)
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
     * and also other editable attributes of a file
     */
    async updateFile(context) {
        return new Promise(async(resolve, reject) => {
            try {
                const res =  await this.#db.collection('files').findOneAndUpdate(
                    context.query, 
                    {$set : context.update}
                )

                if(res && res._id) {
                    resolve(res);
                    return;
                }
                reject(res);                    
            } catch (err) {
                console.log("Error occurred while updating file! "+err)
                console.log("FileObject: "+context)
                reject(err);
            }
        }).then(data => {
            return {success:1, data:data}
        }).catch(err => {
            return {success:0, err:err}
        })
    }

    async getFileContents(context) {
        return new Promise(async(resolve, reject) => {
            try {
                const res =  await this.#db.collection('files').findOne(
                    context
                )

                if(res && res._id) {
                    resolve(res);
                    return;
                }
                reject(res);                    
            } catch (err) {
                console.log("Error occurred while updating file! "+err)
                console.log("FileObject: "+context)
                reject(err);
            }
        }).then(data => {
            return {success:1, data:data}
        }).catch(err => {
            return {success:0, err:err}
        })
    }
}