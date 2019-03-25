import $ from 'jquery'
import 'jquery.soap'

let api = {

    debug: false,
    /**
     * 获取url
     * @returns {string}
     */
    url: function () {
        let proxy_host_main = "http://llcat.tech:8080";
        let proxy_host_test = "http://192.168.1.163:8889";
        return (this.debug ? proxy_host_test : proxy_host_main) + "/FSVMWS/rest/androidreport?wsdl"
    },

    requestBuilder(options, action){
        let result = {};
        let template = {
            url: api.url(),
            success: function (soapResponse) {
                api.util.getResultByRegex(result, soapResponse);
                action(result);
            },
            error: function (soapResponse) {
                result.status = "error";
                result.detail = soapResponse;
                action(result);
            }
        };
        return Object.assign(template, options)
    },

    requestBuilderPromise(options, resolve, reject){
        let result = {};
        let template = {
            url: api.url(),
            success: function (soapResponse) {
                api.util.getResultByRegex(result, soapResponse);
                resolve(result);
            },
            error: function (soapResponse) {
                result.status = "error";
                result.detail = soapResponse;
                reject(result);
            }
        };
        return Object.assign(template, options)
    },

    /**
     * 用户登录
     * @param username 用户名
     * @param password 密码
     * @param action 回调
     */
    login: function (username, password, action) {
        $.soap(api.requestBuilder({
            method: "login",
            data: {
                arg0: username,
                arg1: md5(password)
            }
        }, action))
    },

    /**
     * 查询所有机台信息
     * @param userId 用户id
     * @param action 回调
     */
    listAllVminfoByUserId: function (userId, action) {
        $.soap(api.requestBuilder({
            method: "listAllVminfoByUserId",
            data: {
                arg0: userId,
            },
        }, action))
    },

    /**
     * 机台缺货查询
     * @param vmId 机台编号
     * @param action 回调
     */
    listVmStockByVmId: function (vmId, action) {
        $.soap(api.requestBuilder({
            method: "listVmStockByVmId",
            data: {
                arg0: vmId,
            },
        }, action))
    },

    listVmStockByVmIdPromise(vmId){
        return new Promise(function (resolve, reject) {
            $.soap(api.requestBuilderPromise({
                method: "listVmStockByVmId",
                data: {
                    arg0: vmId,
                },
            }, resolve, reject))
        });
    },

    /**
     * 获取套餐信息
     * @param vmId 机台编号
     * @param action 回调
     */
    getVMInfo: function (vmId, action) {
        $.soap(api.requestBuilder({
            method: "getVMInfo",
            data: {
                arg0: vmId,
            },
        }, action))
    },

    getVMInfoByPromise(vmId) {
        return new Promise(function (resolve, reject) {
            $.soap(api.requestBuilderPromise({
                method: "getVMInfo",
                data: {
                    arg0: vmId,
                },
            }, resolve, reject))
        })
    },

    /**
     * 套餐修改提交
     * @param userId 用户id
     * @param jsonString 修改后的套餐json，即getVmInfo的输出结果
     * @param action 回调
     */
    submitUpdateConf: function (userId, jsonString, action) {
        $.soap(api.requestBuilder({
            method: "submitUpdateConf",
            data: {
                arg0: userId,
                arg1: jsonString
            },
        }, action))
    },

    /**
     * 查询套餐修改记录
     * @param userId 用户id
     * @param startTime 起始时间
     * @param endTime 截止时间
     * @param action 回调
     *
     * 传入起始日期为:2017-11-11,截止日期为:2017-11-14.则查询的时间范围为:2017-11-11 00:00:00~2017-11-14 23:59:59
     *
     */
    listVmConfRecord: function (userId, startTime, endTime, action) {
        $.soap(api.requestBuilder({
            method: "listVmConfRecord",
            data: {
                arg0: userId,
                arg1: startTime,
                arg2: endTime
            },
        }, action))
    },

    /**
     * 生成次日备货单
     * @param userId 用户id
     * @param action 回调
     */
    listTomorrowBhOrder: function (userId, action) {
        $.soap(api.requestBuilder({
            method: "listTomorrowBhOrder",
            data: {
                arg0: userId
            },
        }, action))
    },

    /**
     * 提交备货单
     * @param jsonString 备货单json，即listTomorrowBhOrder的返回结果
     * @param action 回调
     */
    submitBeiHuoMenu: function (jsonString, action) {
        $.soap(api.requestBuilder({
            method: "submitBeiHuoMenu",
            data: {
                arg0: jsonString
            },
        }, action))
    },

    /**
     * 历史备货单
     * @param userId 用户id
     * @param startTime 起始时间
     * @param endTime 截止时间
     * @param action 回调
     *
     * 传入起始日期为:2017-11-11,截止日期为:2017-11-14.则查询的时间范围为:2017-11-11 00:00:00~2017-11-14 23:59:59
     */
    listBeiHuoMenu: function (userId, startTime, endTime, action) {
        $.soap(api.requestBuilder({
            method: "listBeiHuoMenu",
            data: {
                arg0: userId,
                arg1: startTime,
                arg2: endTime,
            },
        }, action))
    },

    /**
     *销售数据，昨日销售详情，今日销售额，周销售详情，月累计销售额
     * @param userId 用户id
     * @param action 回调
     */
    listVmSaleByUserId: function (userId, action) {
        $.soap(api.requestBuilder({
            timeout: 10000,
            method: "listVmSaleByUserId",
            data: {
                arg0: userId
            },
        }, action))
    },

    /**
     * 查询指定时间端的销售数据
     * @param userId 用户id
     * @param startTime 起始时间
     * @param endTime 截止时间
     * @param action 回调
     */
    listSaleRecordHistory: function (userId, startTime, endTime, action) {
        $.soap(api.requestBuilder({
            method: "listSaleRecordHistory",
            data: {
                arg0: userId,
                arg1: startTime,
                arg2: endTime
            },
        }, action))
    },

    /**
     * 商品销售量汇总及单台平均销量
     * @param userId 用户id
     * @param startTime 起始时间
     * @param action
     */
    listSpSale: function (userId, startTime, action) {
        $.soap(api.requestBuilder({
            method: "listSpSale",
            data: {
                arg0: userId,
                arg1: startTime,
            },
        }, action))
    },

    /**
     * 查询机台销售日志
     * @param vmId
     * @param startTime
     * @param action
     */
    listVmDailySale: function (vmId, startTime, action) {
        $.soap(api.requestBuilder({
            timeout: 10000,
            method: "listVmDailySale",
            data: {
                arg0: vmId,
                arg1: startTime,
            },
        }, action))
    },

    listVmDailySaleByPromise(vmId, startTime) {
        return new Promise(function (resolve, reject) {
            $.soap(api.requestBuilderPromise({
                timeout: 10000,
                method: "listVmDailySale",
                data: {
                    arg0: vmId,
                    arg1: startTime
                },
            }, resolve, reject))
        })
    },

    /**
     * 获取机台类型
     * @param vmId
     * @param action
     */
    listVmType: function (vmId, action) {
        $.soap(api.requestBuilder({
            method: "listVmType",
            data: {
                arg0: vmId
            },
        }, action))
    },

    listVmTypeByPromise(vmId){
        return new Promise(function (resolve, reject) {
            $.soap(api.requestBuilderPromise({
                method: "listVmType",
                data: {
                    arg0: vmId
                },
            }, resolve, reject))
        })
    },

    util: {
        /**
         * 处理请求结果
         * @param result result
         * @param rep soapResponse
         */
        getResultByRegex: function (result, rep) {
            if (rep != null) {
                let stringRep = rep.toString();
                let jsonResult = stringRep.match("<return>.*</return>");
                if (result != null) {
                    result.status = "success";
                    result.data = JSON.parse(jsonResult[0].slice(8, -9));
                } else {
                    result.status = "success";
                    result.data = "no match";
                }
            }
        },

        checkResult(r) {
            return r.status === "success" && r.data !== "no match"
        },
    }
};

export default api;