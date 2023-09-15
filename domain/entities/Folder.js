export default class Folder {
    #id;
    #name;
    #type;
    #created_at;
    #children_dir;
    #children_files;
    #modified_at;
    #owner_id;
    #parent_dir;

    constructor(id, name, type, created_at, children_dir, children_files, modified_at, owner_id, parent_dir) {
        this.#id = id;
        this.#name = name;
        this.#type = type;
        this.#created_at = created_at;
        this.#children_dir = children_dir;
        this.#children_files = children_files;
        this.#modified_at = modified_at;
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

    getChildDirectoryIds() {
        return this.#children_dir;
    }

    getChildFileIds() {
        return this.#children_files;
    }

    getDirectoryType() {
        return this.#type
    }
}