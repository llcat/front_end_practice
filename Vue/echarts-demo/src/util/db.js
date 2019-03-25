import localforage from 'localforage'

let db = {

    set(key, obj){
        if(window.localStorage){
            localStorage.setItem(key, JSON.stringify(obj));
        }
    },

    get(key){
        if(window.localStorage){
            return JSON.parse(localStorage.getItem(key));
        }
    },

    remove(key){
      if(window.localStorage){
          localStorage.removeItem(key);
      }
    },

    setCurrentUser(currentUser){
        this.set("currentUser", currentUser);
    },

    getCurrentUser(){
        return this.get("currentUser");
    },

    removeCurrentUser(){
        this.remove("currentUser");
    },

    setLoginInfo(loginInfo){
        this.set("loginInfo", loginInfo);
    },

    getLoginInfo(){
        return this.get("loginInfo");
    },

    setAllVmSaleInfo(allVmSaleInfo){
        this.set("allVmSaleInfo", allVmSaleInfo)
    },

    getAllVmSaleInfo(){
        return this.get("allVmSaleInfo")
    },

    /**
     * 基于后面会存储较大量的数据的情况，替换为localforage作为存储
     * see detail about localforage at https://github.com/localForage/localForage
     * 考量到indexedDB api较为复杂，我们大多数的使用场景基本也是存取简单的键值数据，localForage
     * 应该是个很好的方案。
     */
    lf:{

        instance: null,

        init(option){
            this.instance = localforage.createInstance(option)
        },

        set(key, value){
            if(this.instance != null){
                return this.instance.setItem(key, value)
            }else {
                return new Promise(function (resolve, reject) {
                    reject("null instance");
                });
            }
        },

        get(key){
            if(this.instance != null){
                return this.instance.getItem(key)
            }else {
                return new Promise(function (resolve, reject) {
                    reject("null instance");
                });
            }
        },

        remove(key){
            if(this.instance != null){
                return this.instance.removeItem(key)
            }else {
                return new Promise(function (resolve, reject) {
                    reject("null instance");
                });
            }
        },

        setAllVmInfo(allVmInfo){
            return this.set("allVmInfo", allVmInfo)
        },

        getAllVmInfo(){
            return this.get("allVmInfo")
        },

        setDailyAllVmSaleDetail(date, allVmSaleDetail){
            let key = "dailyAllVmSaleDetail_"+date;
            return this.set(key, allVmSaleDetail)
        },

        getDailyAllVmSaleDetail(date){
          let key = "dailyAllVmSaleDetail_"+date;
          return this.get(key)
        },

    }
};

export default db;