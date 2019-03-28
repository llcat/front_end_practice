import localforage from "localforage"

const current_user = "current_user"
const register_list = "register_list"

let db = {
    setCurrentUser(user){
        return this.set(current_user, user)
    },

    getCurrentUser(){
        return this.get(current_user)
    },

    removeCurrentUser(){
        return this.remove(current_user)
    },

    setRegisterList(registerList){
        return this.set(register_list, registerList)
    },

    getRegisterList(){
        return this.get(register_list)
    },

    removeRegisterList(){
        return this.remove(register_list)
    },

    set(key, value){
        return localforage.setItem(key, value)
    },

    get(key){
        return localforage.getItem(key)
    },

    remove(key){
        return localforage.removeItem(key)
    }
}

export default db;