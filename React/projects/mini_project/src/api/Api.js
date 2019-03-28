import axios from 'axios'
import md5 from 'blueimp-md5'
import db from '../util/db'

let functionApi = {
    pinoUrl: "https://domain/api",
    baseUrl: "https://domain/api",

    getUploadUrl(filename,username){
        let config = {
            params: {
                filename,
                username
            }
        }
        return axios.get(`${this.baseUrl}/GetUploadUrl`, config)
    },

    mockRegister(register){
        let data = {
            phone: register.phone.value,
            password: md5(register.password.value),
            nickName: register.nickname.value
        }
        return new Promise((resolve,reject)=>{
            db.getRegisterList()
                .then(r=>{
                    if(r==null){
                        data.indexNum = 1
                        data.id = `u-${data.indexNum}`
                        let registerList = [
                            data
                        ]
                        db.setRegisterList(registerList)
                        resolve({
                            status:"success",
                            info:"注册成功，请登录"
                        })
                    }else if(r.length>=0){
                        let registerList = r
                        let index = registerList.findIndex(register=>register.phone===data.phone)
                        if(index>-1){
                            resolve({
                                status:"fail",
                                info:"手机号码已注册~"
                            })
                        }else{
                            data.indexNum = registerList.length+1
                            data.id = data.id = `u-${data.indexNum}`
                            registerList.push(data)
                            db.setRegisterList(registerList)
                            resolve({
                                status:"success",
                                info:"注册成功，请登录"
                            })
                        }
                    }
                })
                .catch(err=>{
                    reject(err)
                })
        })
    },

    mockLogin(user){
        let data = {
            phone: user.phone,
            password: md5(user.password)
        }
        return new Promise((resolve, reject)=>{
            db.getRegisterList()
                .then(r=>{
                    if(r==null){
                        resolve({
                            status:"no_register",
                            info:"手机号还未注册，请先注册!"
                        })
                    }else if(r.length>=0){
                        let registerList = r
                        let index  = registerList.findIndex(register=>register.phone===data.phone)
                        if(index>-1){
                            let register = registerList[index]
                            if(register.password === data.password){
                                resolve({
                                    status: "success",
                                    info: "验证成功",
                                    userInfo:{
                                        id: register.id,
                                        phone: register.phone,
                                        nickName: register.nickName
                                    }
                                })
                            }else{
                                resolve({
                                    status:"fail",
                                    info:"密码错误,请重新输入"
                                })
                            }
                        }else{
                            resolve({
                                status:"no_register",
                                info:"手机号还未注册，请先注册!"
                            })
                        }
                    }
                })
                .catch(err=>{
                    reject(err)
                })
        })
    },

    UserRegister(register){
        let url = `${this.pinoUrl}/UserRegister`
        let data = {
            phone: register.phone.value,
            password: md5(register.password.value),
            nickName: register.nickname.value
        }
        return axios.post(url, data)
    },

    UserLogin(user){
        let url = `${this.pinoUrl}/UserLogin`
        let data = {
            phone: user.phone,
            password: md5(user.password)
        }
        return axios.post(url, data)
    },

    ListAllVideos(username){
        let url = `${this.baseUrl}/ListAllVideos`
        let config = {
            params: {
                username
            }
        }
        return axios.get(url, config)
    },

    FavoriteQueryVideo(id, flag){
        let url = `${this.baseUrl}/FavoriteQueryVideo`
        let data = {
            id:id,
            favoriteFlag:flag
        }
        return axios.post(url, data)
    },

    UpdateWatchTime(id, playedTime){
        let url = `${this.baseUrl}/UpdateWatchTime`
        let data = {
            id,
            playedTime
        }
        return axios.post(url, data)
    },

    DeleteVideo(video_id){
        let url = `${this.baseUrl}/DeleteVideo`
        let config = {
            params: {
                id:video_id
            }
        }
        return axios.get(url, config)
    }

}

let blobApi = {
    baseUrl: "https://domain",
}


export default functionApi;