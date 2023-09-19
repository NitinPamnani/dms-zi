export default class File {
    #id;
    #name;
    #content;
    #created_at;
    #modified_at;
    #owner_id;
    #parent_dir;

    constructor(id, name, content, created_at, modified_at, owner_id, parent_dir) {
        this.#id = id;
        this.#name = name;
        this.#created_at = created_at;
        this.#modified_at = modified_at;
        this.#content = content;
        this.#owner_id = owner_id;
        this.#parent_dir = parent_dir;
    }

    getId() {
        return this.#id;
    }

    setName(name) {
        this.#name = name;
        this.#modified_at = new Date();
    }

    getName() {
        return this.#name;
    }

    setOwner(owner_id) {
        this.#owner_id = owner_id;
        this.#modified_at = new Date();
    }

    getOwner() {
        return this.#owner_id;
    }    

    setParentDir(parent_dir_id) {
        this.#parent_dir = parent_dir_id;
        this.#modified_at = new Date();
    }

    getParentDir() {
        return this.#parent_dir;
    }

    setContent(content) {
        this.#content = content;
        this.#modified_at = new Date();
    }

    getContent() {
        return this.#content;
    }

    getFileDetails() {
        return {
            fileId : this.#id,
            name : this.#name,
            content : this.#content,
            created_at : this.#created_at,
            modified_at : this.#modified_at,
            owner_id : this.#owner_id,
            parent_dir_id : this.#parent_dir
        }
    }

}