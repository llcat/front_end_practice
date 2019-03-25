<template>
    <div id="data-center-page">
        <CommonHeader :headerInfo="headerInfo"></CommonHeader>
        <el-tabs :stretch="tabStretch">
            <el-tab-pane label="daily-report">
                <div class="tab-pane-slot" slot="label">
                    <img src="../assets/day.png" alt="">
                    <span>销售日报</span>
                </div>
                <div id="daily-report-container">
                    <DailyReport></DailyReport>
                </div>
            </el-tab-pane>
            <el-tab-pane label="weekly-report">
                <div class="tab-pane-slot" slot="label">
                    <img src="../assets/week.png" alt="">
                    <span>销售周报</span>
                </div>
                <div id="weekly-report-container">
                    <WeeklyReport></WeeklyReport>
                </div>
            </el-tab-pane>
            <el-tab-pane label="monthly-report">
                <div class="tab-pane-slot" slot="label">
                    <img src="../assets/month.png" alt="">
                    <span>销售月报</span>
                </div>
                <div id="monthly-report-container">
                    <MonthlyReport></MonthlyReport>
                </div>
            </el-tab-pane>
        </el-tabs>
        <!--<el-button type="primary" @click="testApi">测试api</el-button>-->
    </div>
</template>

<script>
    import CommonHeader from '../components/CommonHeader'
    import DailyReport from '@/components/DailyReport'
    import WeeklyReport from "@/components/WeeklyReport";
    import MonthlyReport from "@/components/MonthlyReport";

    export default {
        name: "DataCenter",
        components: {
            MonthlyReport,
            WeeklyReport,
            CommonHeader,
            DailyReport
        },
        data() {
            return {
                tabStretch: true,
                headerInfo: {
                    title: "数据中心"
                },
            }
        },
        methods: {
            testApi() {
                this.$api.listSaleRecordHistory(27, "2016-10-10", "2016-10-10", function (r){
                    console.log(r)
                })
                // let vm = this;
                // this.$db.lf.get("aa").then(function (value) {
                //     console.log("then"+value)
                // }).catch(function (err) {
                //     console.log("catch"+err)
                // });
                // this.$api.listAllVminfoByUserId(13, function (r) {
                //     console.log(r);
                //     let vmInfoList = r.data.Rows;
                //     let cluster = {};
                //     vmInfoList.forEach(function (vmInfo) {
                //         let f = Object.keys(cluster).findIndex(cluId=>cluId==vmInfo.cluId);
                //         if(f === -1){
                //             cluster[vmInfo.cluId] = []
                //         }
                //         cluster[vmInfo.cluId].push(vmInfo);
                //     });
                //     console.log(cluster);
                // });


                // this.$api.listSaleRecordHistory(27, "2018-08-01", "2018-08-01", function (r) {
                //     console.log(r);
                //     console.log(JSON.stringify(r).length);
                //     r.data.Rows.forEach(function (e) {
                //         vm.$api.listVmDailySale(e.vmId, "2018-08-01", function (r) {
                //             console.log(e.vmId)
                //             console.log(r);
                //         })
                //     })
                // })

                // this.$api.listSpSale(27, "2018-08-01", function (r) {
                //     console.log(r)
                // })

                // this.$api.listAllVminfoByUserId(27, function (r) {
                //     console.log(r)
                // })

                // this.$api.listVmType("3-1601-0068",function (r) {
                //     console.log(r);
                // })
            }
        }
    }
</script>

<style scoped>
    .tab-pane-slot {
        display: flex;
        justify-content: center;
        align-items: center;
    }

    .tab-pane-slot > img {
        width: 4vmin;
        margin-right: 1vmin;
    }
</style>