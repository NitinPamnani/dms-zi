export default class UserRepo {
    #db;

    constructor(db) {
        this.#db = db;
    }

    async getUserDetails(query) {
        return new Promise(async(resolve, reject) => {
            try{
                const res = await this.#db.collection('users').findOne(query)
                if(res._id) {
                    resolve(res);
                    return;
                }
                reject(res);
            } catch(err) {
                console.log("Error while fetching user details: "+err);
                reject(err);
            }
        }).then(data => {
            return {success:1, data: data};
        }).catch(err => {
            return {success:0, err: err};
        })
    }
}