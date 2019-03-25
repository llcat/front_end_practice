<template>
    <div id="daily-report">
        <div class="daily-picker-container">
            <el-date-picker
                    v-model="dateValue"
                    type="date"
                    align="center"
                    :picker-options="dailyPickerOptions"
                    value-format="yyyy-MM-dd"
                    placeholder="请选择日期">
            </el-date-picker>
        </div>
        <ChartContainerBasic :id = "productSalesPieChart.id"
                             :title="productSalesPieChart.title+' ('+dateValue+')'"
                             :option="productSalesPieChart.option"
                             :customStyle="productSalesPieChart.customStyle">

        </ChartContainerBasic>
        <ChartContainerBasic :id = "vmSalesBarChart.id"
                             :title="vmSalesBarChart.title+' ('+dateValue+')'"
                             :option="vmSalesBarChart.option"
                             :customStyle="vmSalesBarChart.customStyle">
        </ChartContainerBasic>
        <ChartContainerBasic :id = "payTypePieChart.id"
                             :title="payTypePieChart.title+' ('+dateValue+')'"
                             :option="payTypePieChart.option"
                             :customStyle="payTypePieChart.customStyle">
            <div class="retry-container">
                <transition name="el-zoom-in-center">
                    <el-button v-if="showRetryInfo"
                               @click="retryGetDailyVmSaleDetailHandler"
                               size="mini"
                               type="primary" plain>
                        有{{errorVmIdList.length}}条数据获取失败,点击重试
                    </el-button>
                </transition>
                <transition name="el-fade-in">
                    <div v-if="showRetryLoading">
                        <mt-spinner type="double-bounce" color="rgba(36, 157, 255, 0.65)"></mt-spinner>
                    </div>
                </transition>
            </div>
        </ChartContainerBasic>
    </div>
</template>

<script>
    import ChartContainerBasic from './ChartContainerBasic.vue'

    export default {
        name: "DailyReport",

        components: {
            ChartContainerBasic
        },

        mounted() {
            this.dateValue = this.currentDate();
        },

        data() {
            return {
                dateValue: "",
                allVmSaleDetail: [],
                tempAllVmSaleDetail: [],
                errorVmIdList: [],
                showRetryInfo: false,
                showRetryLoading: false,
                dailyPickerOptions: {
                    disabledDate(time) {
                        return time.getTime() > Date.now();
                    },
                    firstDayOfWeek: 1
                },
                productSalesPieChart: {
                    id:"daily-product-sales-pie",
                    title: "每日商品销量占比",
                    option: {},
                    customStyle: {
                        width: '96vw',
                        height: '40vmax'
                    }
                },
                vmSalesBarChart: {
                    id:"daily-vm-sales-bar",
                    title: "每日机台销售状况",
                    option: {},
                    customStyle: {
                        width: "96vw",
                        height: '45vmax'
                    }
                },
                payTypePieChart: {
                    id: "daily-pay-type-pie",
                    title: "每日支付类型占比",
                    option: {},
                    customStyle: {
                        width: "96vw",
                        height: "40vmax"
                    }
                }
            }
        },

        computed: {
            userId() {
                // return this.$store.state.userInfo.userId;
                return 27;
            },

            allVmId() {
                return ["3-1601-0066","3-1601-0067","3-1601-0068","3-1601-0069","3-1601-0070","3-1601-0071","3-1601-0072","3-1601-0073","3-1601-0074","3-1601-0075","3-1603-0003","3-1603-0004","3-1603-0005","3-1603-0006","3-1603-0009","3-1603-0012","3-1603-0060","3-1606-0022","3-1606-0023","3-1606-0024"];
            },

        },

        watch: {
            dateValue(newDateValue) {
                console.log(newDateValue);
                let vm = this;
                this.updateDailySpSalesInfo(newDateValue);
                this.updateDailyVmSalesInfo(newDateValue);
                this.updateDailyAllVmSaleDetail(newDateValue).then(function (v) {
                    if(newDateValue !== vm.currentDate()){
                        vm.$db.lf.setDailyAllVmSaleDetail(newDateValue, v)
                    }
                    vm.allVmSaleDetail = v;
                    console.log(vm.allVmSaleDetail);
                }).catch(function (err) {
                    console.log("error:", err);
                    console.log(vm.tempAllVmSaleDetail);
                    console.log(vm.errorVmIdList);
                    vm.showRetryInfo = true;
                })
            },

            allVmSaleDetail(newAllVmSaleDetail){
                // 更新pay-type-pie-chart
                this.payTypePieChart.option = this.$chartoptions.dailyPayTypePieOption(newAllVmSaleDetail)
            },
        },

        methods: {
            updateDailySpSalesInfo(date) {
                let vm = this;
                this.$api.listSpSale(this.userId, date, function (r) {
                    if (vm.$api.util.checkResult(r)) {
                        vm.productSalesPieChart.option = vm.$chartoptions.dailyProductSalesPieOption(r.data.Rows);
                    }
                })
            },

            updateDailyVmSalesInfo(date) {
                let vm = this;
                this.$api.listSaleRecordHistory(this.userId, date, date, function (r) {
                    if(vm.$api.util.checkResult(r)){
                        vm.vmSalesBarChart.option = vm.$chartoptions.dailyVmSalesBarOption(r.data.Rows)
                    }
                })
            },

            retryGetDailyVmSaleDetailHandler(){
                this.showRetryInfo = false;
                this.showRetryLoading = true;
                let vm = this;
                this.retryGetVmSaleDetail(this.errorVmIdList, this.dateValue).then(function (value) {
                    vm.tempAllVmSaleDetail = vm.tempAllVmSaleDetail.concat(value);
                    vm.allVmSaleDetail = vm.tempAllVmSaleDetail;
                    if(vm.allVmSaleDetail.length===vm.allVmId.length
                        && vm.dateValue !== vm.currentDate()){
                        vm.$db.lf.setDailyAllVmSaleDetail(vm.dateValue, vm.allVmSaleDetail);
                    }
                    vm.showRetryLoading = false;
                    if(vm.errorVmIdList.length>0){
                        console.log(vm.errorVmIdList);
                        vm.showRetryInfo = true;
                    }else {
                        vm.showRetryInfo = false;
                    }
                })
            },

            async retryGetVmSaleDetail(vmIdList, date){
                this.errorVmIdList = [];

                let saleDetail = [];
                for(let i=0; i<vmIdList.length; i++){
                    let vmId = vmIdList[i];
                    try{
                        let r = await this.$api.listVmDailySaleByPromise(vmId, date);
                        if(this.$api.util.checkResult(r)){
                            saleDetail.push(r.data)
                        }
                    }catch (e) {
                        console.log(e);
                        this.errorVmIdList.push(vmId)
                    }
                }
                return saleDetail;
            },

            getDailyAllVmSaleDetail(vmIdList, date){
                let promiseList = [];
                let vm = this;
                vm.errorVmIdList = [];
                vm.tempAllVmSaleDetail = [];
                vmIdList.forEach(function (vmId) {
                    promiseList.push(new Promise(function (resolve, reject) {
                        vm.$api.listVmDailySale(vmId, date, function (r) {
                            // console.log(r);
                            if(vm.$api.util.checkResult(r)){
                                vm.tempAllVmSaleDetail.push(r.data);
                                resolve(r.data)
                            }else {
                                if(r.status === "error"){
                                    vm.errorVmIdList.push(vmId);
                                }
                                reject(r)
                            }
                        })
                    }));
                });
                return promiseList;
            },

            /**
             * 使用Promise.all()保证从后端api获取完整数据
             * 1. 请求全部成功，返回完整数据
             * 2. 任何一个请求失败，返回第一个失败的结果
             */
            updateDailyAllVmSaleDetail(date){
                let vm = this;
                if(date === this.currentDate()){
                    return Promise.all(this.getDailyAllVmSaleDetail(this.allVmId,date))
                }else {
                    return vm.$db.lf.getDailyAllVmSaleDetail(date)
                        .then(function (value) {
                            if(value === null){
                                return Promise.all(vm.getDailyAllVmSaleDetail(vm.allVmId,date))
                            }else {
                                return Promise.all(value);
                            }
                        })
                }
            },

            /**
             * tips: 使用async和await来减少对后端api的并发请求数也是然并卵，该失败的还是
             * 会失败，还不如Promise.all()来的痛快。
             *
             * 使用async和await控制每一次请求结果回来后才进行下一次请求。
             * @param date
             * @returns {Promise<{data: Array, errorVmIdList: Array}>}
             */
            async updateDailyAllVmSaleDetailAsync (date){
                let result = {
                    data: [],
                    errorVmIdList: []
                };
                if(date === this.currentDate()){
                    for(let i=0; i<this.allVmId.length; i++){
                        let vmId = this.allVmId[i];
                        try{
                            let r = await this.$api.listVmDailySaleByPromise(vmId, date);
                            if(this.$api.util.checkResult(r)){
                                result.data.push(r.data)
                            }
                        }catch (e) {
                            console.error(e);
                            result.errorVmIdList.push(vmId)
                        }
                    }
                }else {
                    let v = await this.$db.lf.getDailyAllVmSaleDetail(date);
                    if(v===null){
                        for(let i=0; i<this.allVmId.length; i++){
                            let vmId = this.allVmId[i];
                            try{
                                let r = await this.$api.listVmDailySaleByPromise(vmId, date);
                                if(this.$api.util.checkResult(r)){
                                    result.data.push(r.data)
                                }
                            }catch (e) {
                                console.error(e);
                                result.errorVmIdList.push(vmId)
                            }
                        }
                    }else {
                        result.data = v;
                    }
                }
                return result;
            },

            currentDate(){
                let date = new Date();
                let year = date.getFullYear();
                let month = date.getMonth() + 1;
                month = Math.floor(month / 10) < 1 ? ("0" + month) : month;
                let day = date.getDate();
                day = Math.floor(day / 10) < 1 ? ("0" + day) : day;
                return year + "-" + month + "-" + day;
            }
        }
    }
</script>

<style scoped>
    #daily-report {
        display: flex;
        flex-direction: column;
        align-items: center;
    }

    .retry-container {
        margin: 2vmin;
    }
</style>