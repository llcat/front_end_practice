<template>
    <div id="monthly-report">
        <div class="monthly-picker-container">
            <el-date-picker
                    v-model="monthValue"
                    type="month"
                    align="center"
                    :picker-options="monthlyPickerOptions"
                    format="yyyy 年 MM 月"
                    placeholder="选择月份">
            </el-date-picker>
        </div>
        <ChartContainerBasic :id = "salesLineChart.id"
                             :title="salesLineChart.title"
                             :subTitle="salesLineChart.subTitle"
                             :option="salesLineChart.option"
                             :customStyle="salesLineChart.customStyle">
        </ChartContainerBasic>

        <ChartContainerBasic :id = "vmSalesBarChart.id"
                             :title="vmSalesBarChart.title"
                             :subTitle="vmSalesBarChart.subTitle"
                             :option="vmSalesBarChart.option"
                             :customStyle="vmSalesBarChart.customStyle">
        </ChartContainerBasic>

    </div>
</template>

<script>
    import ChartContainerBasic from "./ChartContainerBasic";
    export default {
        name: "MonthlyReport",

        components: {ChartContainerBasic},

        mounted(){
            console.log("monthly-mounted")
            this.monthValue = new Date()
        },

        computed:{
            userId(){
                // return this.$store.state.userInfo.userId;
                return 27;
            }
        },

        watch:{
          monthValue(newMonthValue){
              console.log(newMonthValue);
              let monthRange = this.getMonthRange(newMonthValue);
              this.updateMonthlySalesInfo(monthRange)
          }
        },

        data(){
            return {
                monthValue: "",
                monthlyPickerOptions:{
                    firstDayOfWeek: 1,
                    disabledDate(time) {
                        return time.getTime() > Date.now();
                    }
                },
                salesLineChart:{
                    id: "monthly-sales-line",
                    title: "每月销售状况",
                    subTitle:"",
                    option:{},
                    customStyle:{
                        width: '96vw',
                        height: '45vmax'
                    }
                },
                vmSalesBarChart:{
                    id: "monthly-vm-sales-bar",
                    title: "每月机台销售状况",
                    subTitle:"",
                    option:{},
                    customStyle:{
                        width: '96vw',
                        height: '45vmax'
                    }
                }
            }
        },

        methods:{
            updateMonthlySalesInfo(monthRange){
                let vm = this;
                this.salesLineChart.title = "每月销售状况("+this.customDateString(new Date(this.monthValue), "-").slice(0,-3)+")";
                this.vmSalesBarChart.title = "每月销售状况("+this.customDateString(new Date(this.monthValue), "-").slice(0,-3)+")";
                this.salesLineChart.subTitle = monthRange.startDate+" 到 "+monthRange.endDate;
                this.vmSalesBarChart.subTitle = monthRange.startDate+" 到 "+monthRange.endDate;

                this.$api.listSaleRecordHistory(this.userId, monthRange.startDate, monthRange.endDate, function (r) {
                    if(vm.$api.util.checkResult(r)){
                        console.log(r);
                        vm.salesLineChart.option = vm.$chartoptions.monthlySalesLineOption(r.data.Rows);
                        vm.vmSalesBarChart.option = vm.$chartoptions.monthlyVmSalesBarOption(r.data.Rows);
                    }
                });

            },

            getMonthRange(calDate){
                let year = calDate.getFullYear();
                let month = calDate.getMonth();
                let leapYear = [31,29,31,30,31,30,31,31,30,31,30,31];
                let averageYear = [31,28,31,30,31,30,31,31,30,31,30,31];
                let yearMonthDays = this.isLeapYear(year)?leapYear:averageYear;
                let r = {
                    startDate: new Date(year+"/"+(month+1)+"/01"),
                };
                r.endDate = new Date(r.startDate.getTime()+(yearMonthDays[month]-1)*24*60*60*1000);
                let curDate = new Date();
                if(curDate.getTime()>=r.startDate.getTime() && curDate.getTime()<=r.endDate.getTime()){
                    r.endDate = curDate;
                    r.startDate = new Date(r.endDate.getTime() - 29*24*60*60*1000)
                }
                r.startDate = this.customDateString(r.startDate, "-");
                r.endDate = this.customDateString(r.endDate, "-");
                return r;
            },

            customDateString(date, joiner){
                let year = date.getFullYear();
                let month = date.getMonth() + 1;
                month = Math.floor(month / 10) < 1 ? ("0" + month) : month;
                let day = date.getDate();
                day = Math.floor(day / 10) < 1 ? ("0" + day) : day;
                return year + joiner + month + joiner + day;
            },

            isLeapYear(year){
                return ((year%4===0 && year%100!==0) || year%400===0)
            }
        }
    }
</script>

<style scoped>
    #monthly-report{
        display: flex;
        flex-direction: column;
        align-items: center;
    }
</style>