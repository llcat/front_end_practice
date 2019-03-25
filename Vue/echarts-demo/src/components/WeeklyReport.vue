<template>
    <div id="weekly-report">
        <div class="weekly-picker-container">
            <el-date-picker
                    v-model="weekValue"
                    type="week"
                    align="center"
                    :picker-options="weeklyPickerOptions"
                    format="yyyy 第 WW 周"
                    placeholder="选择周">
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
        name: "WeeklyReport",

        components: {ChartContainerBasic},

        mounted() {
            console.log("weekly-mounted");
            this.weekValue = new Date();
        },

        data() {
            return {
                weekValue: "",
                weeklyPickerOptions:{
                    firstDayOfWeek: 1,
                    disabledDate(time) {
                        return time.getTime() > Date.now();
                    }
                },

                salesLineChart:{
                    id: "weekly-sales-line",
                    title: "每周销售状况",
                    subTitle:"",
                    option:{},
                    customStyle:{
                        width: '96vw',
                        height: '45vmax'
                    }
                },

                vmSalesBarChart:{
                    id: "weekly-vm-sales-bar",
                    title: "每周机台销售状况",
                    subTitle:"",
                    option:{},
                    customStyle:{
                        width: '96vw',
                        height: '45vmax'
                    }
                }
            }
        },
        computed:{
            userId(){
                // return this.$store.state.userInfo.userId;
                return 27;
            }
        },
        watch:{
            weekValue(newWeekValue){
                console.log(newWeekValue);
                let weekRange = this.getWeekRange(newWeekValue);
                this.updateWeeklySalesInfo(weekRange);
            }
        },

        methods:{
            updateWeeklySalesInfo(weekRange){
                let vm = this;
                this.salesLineChart.title = "每周销售状况 ("+weekRange.currentYear+" 第"+weekRange.weekNum+"周)";
                this.vmSalesBarChart.title = "每周机台销售状况 ("+weekRange.currentYear+" 第"+weekRange.weekNum+"周)";
                if(new Date().getTime()>=new Date(weekRange.startDate).getTime() && new Date().getTime()<=new Date(weekRange.endDate).getTime()){
                    weekRange.startDate = this.customDateString(new Date(new Date().getTime()-6*24*60*60*1000), "-");
                    weekRange.endDate = this.customDateString(new Date(),"-")
                }
                this.salesLineChart.subTitle = weekRange.startDate+" 到 "+weekRange.endDate;
                this.vmSalesBarChart.subTitle = weekRange.startDate+" 到 "+weekRange.endDate;
                this.$api.listSaleRecordHistory(this.userId, weekRange.startDate, weekRange.endDate, function (r) {
                    if(vm.$api.util.checkResult(r)){
                        vm.salesLineChart.option = vm.$chartoptions.weeklySalesLineOption(r.data.Rows);
                        vm.vmSalesBarChart.option = vm.$chartoptions.weeklyVmSalesBarOption(r.data.Rows)
                    }
                })
            },

            /**
             * return a week info contains startDate, endDate, weekNum
             * calculate rules:
             * 1. set the monday as the first day of a week;
             * 2. if the first day(xxxx-01-01) of a year is bigger than Thursday,
             * let the date as one day of the pre-year's last week. else as this
             * year's first week
             *
             * eg:
             * 如果01-01是小于等于周四的, 认为是该年的第一周
             * 2015-01-01 thursday (2015年 第 1 周, range:2014-12-29 ~ 2015-01-04)
             * 如果01-01是大于周四的，认为是去年的最后一周
             * 2016-01-01 friday (2015年 第 53 周, range:2015-12-28 ~ 2016-01-03)
             *
             * why use this rules?
             * because i want keep a consistent rule with the date-picker components
             * in element ui
             *
             * @param calDate (a Date instance)
             */
            getWeekRange(calDate){
                let year = calDate.getFullYear();
                let day = calDate.getDay()===0?7:calDate.getDay();
                let weekRange = {
                    startDate:"",
                    endDate: "",
                    weekNum: 0,
                    currentYear:year
                };
                let yearRange = this.calYearRange(year);
                if(calDate.getTime()>new Date(yearRange.endDate).getTime()){
                    yearRange = this.calYearRange(year+1);
                    weekRange.currentYear = year+1
                }else if(calDate.getTime()<new Date(yearRange.startDate).getTime()){
                    yearRange = this.calYearRange(year-1);
                    weekRange.currentYear = year-1
                }
                let delta = calDate.getTime() - new Date(yearRange.startDate).getTime();
                let oneDay = 24*60*60*1000;
                weekRange.weekNum = Math.ceil((delta===0?1:delta)/(7*oneDay));
                weekRange.startDate = this.customDateString(new Date(calDate.getTime() - ((day-1)*oneDay)), "-");
                weekRange.endDate = this.customDateString(new Date(calDate.getTime() + ((7-day)*oneDay)), "-");
                return weekRange;
            },

            customDateString(date, joiner){
                let year = date.getFullYear();
                let month = date.getMonth() + 1;
                month = Math.floor(month / 10) < 1 ? ("0" + month) : month;
                let day = date.getDate();
                day = Math.floor(day / 10) < 1 ? ("0" + day) : day;
                return year + joiner + month + joiner + day;
            },

            getYearDays(year){
                return ((year%4===0 && year%100!==0) || year%400===0)?366:365
            },

            calAddDays(firstDate){
                let addDays = 0;
                let firstDateDay = firstDate.getDay()===0?7:firstDate.getDay();
                if(firstDateDay >= 2 && firstDateDay <= 4){
                    addDays = firstDateDay-1
                }else if(firstDateDay >= 5 && firstDateDay <= 7){
                    addDays = firstDateDay-8;
                }
                return addDays;
            },

            calYearRange(year){

                let yearDays = this.getYearDays(year);

                //判断当年的01-01是周几
                let firstDate = new Date(year+"/01/01");
                let nextFirstDate = new Date((year+1)+"/01/01");

                let yearRange = {
                    startDate: year+"/01/01",
                    endDate: year+"/12/31",
                    days: yearDays
                };

                let addDays = this.calAddDays(firstDate);
                let nextAddDays = this.calAddDays(nextFirstDate);

                if(addDays>0){
                    yearRange.startDate = (year-1)+"/12/"+(31-addDays+1);
                    yearRange.days += addDays;
                }else if(addDays<0){
                    yearRange.startDate = year+"/01/0"+(Math.abs(addDays)+1);
                    yearRange.days += addDays;
                }

                if(nextAddDays>0){
                    yearRange.endDate = year+"/12/"+(31-nextAddDays);
                    yearRange.days -= nextAddDays;
                }else if(nextAddDays<0){
                    yearRange.endDate = (year+1)+"/01/0"+(Math.abs(nextAddDays));
                    yearRange.days -= nextAddDays;
                }

                return yearRange;
            }
        },
    }
</script>

<style scoped>
    #weekly-report{
        display: flex;
        flex-direction: column;
        align-items: center;
    }
</style>