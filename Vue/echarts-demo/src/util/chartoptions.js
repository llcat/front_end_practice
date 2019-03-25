import db from './db'

let chartoptions = {

    dailyPayTypePieOption(dailyAllVmSaleDetail){
        let data = this.fmt.dailyPayTypePieData(dailyAllVmSaleDetail);
        console.log(data);
        return {
            tooltip: {
                trigger: 'item',
                textStyle: {
                    align: "left"
                },
                formatter: "{a} <br/>{b}: {c}笔<br/> 支付占比: {d}%"
            },
            legend: {
                orient: 'horizontal',
                top: 5,
                data: data.legend
            },
            series: [
                {
                    name: '支付类型',
                    type: 'pie',
                    radius: '60%',
                    center: ['50%', '60%'],
                    data: data.series.payTypeCount,
                    itemStyle: {
                        color(params){
                            if(params.name === "支付宝"){
                                return "#32C5E9"
                            }else if(params.name === "微信支付"){
                                return "#72e67e"
                            }else if(params.name === "现金"){
                                return "#ff9f7f"
                            }
                        },
                        emphasis: {
                            shadowBlur: 10,
                            shadowOffsetX: 0,
                            shadowColor: 'rgba(0, 0, 0, 0.5)'
                        }
                    }
                }
            ]
        }
    },
    dailyProductSalesPieOption(dailyProductSalesInfo) {
        let data = this.fmt.dailyProductSalesPieData(dailyProductSalesInfo);
        return {
            tooltip: {
                trigger: 'item',
                textStyle: {
                    align: "left"
                },
                formatter: "{a} <br/>{b}: {c}笔<br/> 销量占比: {d}%"
            },
            toolbox: {
                feature: {
                    dataView: {
                        readOnly: true,
                        optionToContent(opt) {
                            console.log(opt);
                            let series = opt.series[0];
                            let allRow = "";
                            series.data.forEach(function (e) {
                                let rowTemplate = `
                            <tr><td>${e.name}</td><td>${e.value}</td></tr>
                            `;
                                allRow += rowTemplate;
                            });

                            let tableTemplate = `
                            <table style="width:100%;text-align:center">
                                <tbody>
                                    <tr><td>商品名称</td><td>${series.name}</td></tr>
                                    ${allRow}
                                </tbody>
                            </table>
                            `;
                            return tableTemplate;
                        }
                    },
                }
            },
            legend: {
                orient: 'horizontal',
                type: 'scroll',
                bottom: 5,
                data: data.legend
            },
            series: [
                {
                    name: '单日售出数量',
                    type: 'pie',
                    radius: ['50%', '70%'],
                    center: ['50%', '45%'],
                    avoidLabelOverlap: false,
                    label: {
                        normal: {
                            show: false,
                            position: 'center'
                        },
                        emphasis: {
                            show: true,
                            textStyle: {
                                fontSize: '15',
                                fontWeight: 'bold'
                            }
                        }
                    },
                    labelLine: {
                        normal: {
                            show: false
                        }
                    },
                    data: data.series.salesProduct
                }
            ]
        }
    },
    dailyVmSalesBarOption(dailyVmSalesInfo) {
        let data = this.fmt.dailyVmSalesBarData(dailyVmSalesInfo);
        return {
            tooltip: {
                trigger: 'axis',
                textStyle: {
                    align: "left"
                },
                axisPointer: {
                    type: 'shadow'
                },
                formatter(params){
                    let fmtString = "机台"+params[0].axisValue+"<br/>";
                    let unit = {
                        "销售金额": "元",
                        "销售数量": "笔"
                    };
                    for (let i = 0; i < params.length; i++) {
                        fmtString += params[i].marker + params[i].seriesName + "：" + params[i].value + unit[params[i].seriesName] + "<br/>"
                    }
                    return fmtString
                }
            },
            toolbox: {
                feature: {
                    dataView: {
                        readOnly: true,
                        optionToContent(opt) {
                            console.log(opt);
                            let xAxisData = opt.xAxis[0].data;
                            let seriesSaleAmount = opt.series[0];
                            let seriesSaleNum = opt.series[1];
                            let allRow = "";
                            xAxisData.forEach(function (e, i) {
                                let rowTemplate = `
                               <tr>
                                    <td>${e}</td>
                                    <td>${seriesSaleAmount.data[i]}</td>
                                    <td>${seriesSaleNum.data[i]}</td>
                               </tr>
                               `;
                                allRow += rowTemplate
                            });
                            let tableTemplate = `
                            <table style="width:100%;text-align:center">
                                <tbody>
                                    <tr>
                                    <td>机台编号</td>
                                    <td>${seriesSaleAmount.name}(元)</td>
                                    <td>${seriesSaleNum.name}(笔)</td>
                                    </tr>
                                    ${allRow}
                                </tbody>
                            </table>
                            `;
                            return tableTemplate;
                        }
                    }
                }
            },
            legend: {
                data: data.legend
            },
            grid: {
                left: '3%',
                right: '4%',
                bottom: '3%',
                containLabel: true
            },
            xAxis: {
                type: 'category',
                axisTick: {
                    show: false
                },
                boundaryGap: true,
                data: data.xAxisData
            },
            yAxis: {
                type: 'value',
                axisLine: {
                    show: false
                },
                axisTick: {
                    show: false
                },
            },
            series: [
                {
                    name: data.legend[0],
                    type: 'bar',
                    data: data.series.saleAmount
                },
                {
                    name: data.legend[1],
                    type: 'bar',
                    data: data.series.saleNum
                }
            ]
        }
    },

    weeklySalesLineOption(weeklySalesInfo){
        let data = this.fmt.weeklySalesLineData(weeklySalesInfo);
        return {
            tooltip: {
                trigger: 'axis',
                textStyle: {
                    align: "left"
                },
                // formatter: "{b}<br/>{a0}：{c0}元<br/>{a1}：{c1}笔"
                formatter: function (params) {
                    let week = chartoptions.util.getWeekInfoByFullDate(params[0].axisValue);
                    let fmtString = params[0].axisValue + "(" + week + ")" + "<br/>";
                    let unit = {
                        "销售金额": "元",
                        "销售数目": "笔"
                    };
                    for (let i = 0; i < params.length; i++) {
                        fmtString += params[i].marker + params[i].seriesName + "：" + params[i].value + unit[params[i].seriesName] + "<br/>"
                    }
                    return fmtString
                }
            },
            legend: {
                data: data.legend
            },
            grid: {
                left: '3%',
                right: '4%',
                bottom: '3%',
                containLabel: true
            },
            toolbox: {
                feature: {
                    magicType: {show: true, type: ['bar']},
                    restore: {}
                }
            },
            xAxis: {
                type: 'category',
                boundaryGap: true,
                axisTick: {
                    show: false
                },
                axisLabel:{
                    formatter(value){
                        return value.slice(5)
                    }
                },
                data: data.xAxisData
            },
            yAxis: {
                type: 'value',
                axisLine: {
                    show: false
                },
                axisTick: {
                    show: false
                }
            }
            ,
            series: [
                {
                    name: data.legend[0],
                    type: 'line',
                    data: data.series.saleAmount
                },
                {
                    name: data.legend[1],
                    type: 'line',
                    data: data.series.saleNum
                }
            ]
        };
    },
    weeklyVmSalesBarOption(weeklySalesInfo){
        let data = this.fmt.weeklyVmSalesBarData(weeklySalesInfo);
        return {
            tooltip: {
                trigger: 'axis',
                textStyle: {
                    align: "left"
                },
                axisPointer: {
                    type: 'shadow'
                },
                formatter(params){
                    let fmtString = "机台"+params[0].axisValue+"<br/>";
                    let unit = {
                        "销售金额": "元",
                        "销售数量": "笔"
                    };
                    for (let i = 0; i < params.length; i++) {
                        fmtString += params[i].marker + params[i].seriesName + "：" + params[i].value + unit[params[i].seriesName] + "<br/>"
                    }
                    return fmtString
                }
            },
            toolbox: {
                feature: {
                    dataView: {
                        readOnly: true,
                        optionToContent(opt) {
                            let xAxisData = opt.xAxis[0].data;
                            let seriesSaleAmount = opt.series[0];
                            let seriesSaleNum = opt.series[1];
                            let allRow = "";
                            xAxisData.forEach(function (e, i) {
                                let rowTemplate = `
                               <tr>
                                    <td>${e}</td>
                                    <td>${seriesSaleAmount.data[i]}</td>
                                    <td>${seriesSaleNum.data[i]}</td>
                               </tr>
                               `;
                                allRow += rowTemplate
                            });
                            let tableTemplate = `
                            <table style="width:100%;text-align:center">
                                <tbody>
                                    <tr>
                                    <td>机台编号</td>
                                    <td>${seriesSaleAmount.name}(元)</td>
                                    <td>${seriesSaleNum.name}(笔)</td>
                                    </tr>
                                    ${allRow}
                                </tbody>
                            </table>
                            `;
                            return tableTemplate;
                        }
                    }
                }
            },
            legend: {
                data: data.legend
            },
            grid: {
                left: '3%',
                right: '4%',
                bottom: '3%',
                containLabel: true
            },
            xAxis: {
                type: 'category',
                axisTick: {
                    show: false
                },
                boundaryGap: true,
                data: data.xAxisData
            },
            yAxis: {
                type: 'value',
                axisLine: {
                    show: false
                },
                axisTick: {
                    show: false
                },
            },
            series: [
                {
                    name: data.legend[0],
                    type: 'bar',
                    data: data.series.saleAmount
                },
                {
                    name: data.legend[1],
                    type: 'bar',
                    data: data.series.saleNum
                }
            ]
        }
    },

    monthlySalesLineOption(monthlySalesInfo){
        let data = this.fmt.monthlySalesLineData(monthlySalesInfo);
        return {
            tooltip: {
                trigger: 'axis',
                textStyle: {
                    align: "left"
                },
                // formatter: "{b}<br/>{a0}：{c0}元<br/>{a1}：{c1}笔"
                formatter: function (params) {
                    let week = chartoptions.util.getWeekInfoByFullDate(params[0].axisValue);
                    let fmtString = params[0].axisValue + "(" + week + ")" + "<br/>";
                    let unit = {
                        "销售金额": "元",
                        "销售数目": "笔"
                    };
                    for (let i = 0; i < params.length; i++) {
                        fmtString += params[i].marker + params[i].seriesName + "：" + params[i].value + unit[params[i].seriesName] + "<br/>"
                    }
                    return fmtString
                }
            },
            legend: {
                data: data.legend
            },
            grid: {
                left: '3%',
                right: '4%',
                bottom: '3%',
                containLabel: true
            },
            toolbox: {
                feature: {
                    magicType: {show: true, type: ['bar']},
                    restore: {}
                }
            },
            xAxis: {
                type: 'category',
                boundaryGap: true,
                axisTick: {
                    show: false
                },
                axisLabel:{
                    formatter(value){
                        return value.slice(5)
                    }
                },
                data: data.xAxisData
            },
            yAxis: {
                type: 'value',
                axisLine: {
                    show: false
                },
                axisTick: {
                    show: false
                }
            }
            ,
            series: [
                {
                    name: data.legend[0],
                    type: 'line',
                    data: data.series.saleAmount
                },
                {
                    name: data.legend[1],
                    type: 'line',
                    data: data.series.saleNum
                }
            ]
        };
    },
    monthlyVmSalesBarOption(monthlySalesInfo){
        let data = this.fmt.monthVmSalesBarData(monthlySalesInfo);
        return {
            tooltip: {
                trigger: 'axis',
                textStyle: {
                    align: "left"
                },
                axisPointer: {
                    type: 'shadow'
                },
                formatter(params){
                    let fmtString = "机台"+params[0].axisValue+"<br/>";
                    let unit = {
                        "销售金额": "元",
                        "销售数量": "笔"
                    };
                    for (let i = 0; i < params.length; i++) {
                        fmtString += params[i].marker + params[i].seriesName + "：" + params[i].value + unit[params[i].seriesName] + "<br/>"
                    }
                    return fmtString
                }
            },
            toolbox: {
                feature: {
                    dataView: {
                        readOnly: true,
                        optionToContent(opt) {
                            let xAxisData = opt.xAxis[0].data;
                            let seriesSaleAmount = opt.series[0];
                            let seriesSaleNum = opt.series[1];
                            let allRow = "";
                            xAxisData.forEach(function (e, i) {
                                let rowTemplate = `
                               <tr>
                                    <td>${e}</td>
                                    <td>${seriesSaleAmount.data[i]}</td>
                                    <td>${seriesSaleNum.data[i]}</td>
                               </tr>
                               `;
                                allRow += rowTemplate
                            });
                            let tableTemplate = `
                            <table style="width:100%;text-align:center">
                                <tbody>
                                    <tr>
                                    <td>机台编号</td>
                                    <td>${seriesSaleAmount.name}(元)</td>
                                    <td>${seriesSaleNum.name}(笔)</td>
                                    </tr>
                                    ${allRow}
                                </tbody>
                            </table>
                            `;
                            return tableTemplate;
                        }
                    }
                }
            },
            legend: {
                data: data.legend
            },
            grid: {
                left: '3%',
                right: '4%',
                bottom: '3%',
                containLabel: true
            },
            xAxis: {
                type: 'category',
                axisTick: {
                    show: false
                },
                boundaryGap: true,
                data: data.xAxisData
            },
            yAxis: {
                type: 'value',
                axisLine: {
                    show: false
                },
                axisTick: {
                    show: false
                },
            },
            series: [
                {
                    name: data.legend[0],
                    type: 'bar',
                    data: data.series.saleAmount
                },
                {
                    name: data.legend[1],
                    type: 'bar',
                    data: data.series.saleNum
                }
            ]
        }
    },
    homePageSaleLineOption(weeklySaleInfo) {
        let data = this.fmt.homePageSaleLineData(weeklySaleInfo);
        return {
            tooltip: {
                trigger: 'axis',
                textStyle: {
                    align: "left"
                },
                // formatter: "{b}<br/>{a0}：{c0}元<br/>{a1}：{c1}笔"
                formatter: function (params) {
                    let week = chartoptions.util.getWeekInfo(params[0].axisValue);
                    let fmtString = params[0].axisValue + "(" + week + ")" + "<br/>";
                    let unit = {
                        "销售金额": "元",
                        "销售数目": "笔"
                    };
                    for (let i = 0; i < params.length; i++) {
                        fmtString += params[i].marker + params[i].seriesName + "：" + params[i].value + unit[params[i].seriesName] + "<br/>"
                    }
                    return fmtString
                }
            },
            legend: {
                data: data.legend
            },
            grid: {
                left: '3%',
                right: '4%',
                bottom: '3%',
                containLabel: true
            },
            toolbox: {
                feature: {
                    saveAsImage: {}
                }
            },
            xAxis: {
                type: 'category',
                boundaryGap: true,
                axisTick: {
                    show: false
                },
                data: data.xAxisData
            },
            yAxis: {
                type: 'value',
                axisLine: {
                    show: false
                },
                axisTick: {
                    show: false
                }
            }
            ,
            series: [
                {
                    name: data.legend[0],
                    type: 'line',
                    data: data.series.saleAmount
                },
                {
                    name: data.legend[1],
                    type: 'line',
                    data: data.series.saleNum
                }
            ]
        };
    },


    fmt: {
        monthlySalesLineData(monthlySalesInfo){
            let data = {
                title: "每月销售明细",
                legend: ["销售金额", "销售数目"],
                xAxisData: [],
                series: {
                    saleAmount: [],
                    saleNum: []
                }
            };
            let r = {};
            monthlySalesInfo.forEach(function (saleInfo) {
                if(saleInfo.saleTime!==""){
                    if(r.hasOwnProperty(saleInfo.saleTime)){
                        r[saleInfo.saleTime].saleAmount += saleInfo.sales;
                        r[saleInfo.saleTime].saleNum += saleInfo.salesNum;
                    }else {
                        r[saleInfo.saleTime] = {
                            saleAmount: saleInfo.sales,
                            saleNum: saleInfo.salesNum
                        }
                    }
                }
            });
            let sortedR = [];
            Object.keys(r).forEach(function (key) {
                sortedR.push({
                    saleTime: key,
                    saleAmount: r[key].saleAmount,
                    saleNum: r[key].saleNum
                })
            });
            sortedR.sort(function (e1, e2) {
                return new Date(e1.saleTime).getTime() - new Date(e2.saleTime).getTime()
            });
            sortedR.forEach(function (v) {
                data.xAxisData.push(v.saleTime);
                data.series.saleAmount.push(v.saleAmount);
                data.series.saleNum.push(v.saleNum)
            });
            return data
        },

        monthVmSalesBarData(monthlySalesInfo){
            let data = {
                title: "每月机台销售状况",
                legend: ["销售金额", "销售数量"],
                xAxisData: [],
                series: {
                    saleAmount: [],
                    saleNum: []
                }
            };
            let r = {};
            monthlySalesInfo.forEach(function (saleInfo) {
                if(r.hasOwnProperty(saleInfo.vmId)){
                    r[saleInfo.vmId].saleAmount += saleInfo.sales;
                    r[saleInfo.vmId].saleNum += saleInfo.salesNum;
                }else {
                    r[saleInfo.vmId] = {
                        saleAmount: saleInfo.sales,
                        saleNum: saleInfo.salesNum
                    }
                }
            });
            let sortedR = [];
            Object.keys(r).forEach(function (key) {
                sortedR.push({
                    vmId:key,
                    saleAmount:r[key].saleAmount,
                    saleNum:r[key].saleNum
                });
            });
            sortedR.sort(function (e1, e2) {
                return e2.saleAmount - e1.saleAmount;
            });

            sortedR.forEach(function (v) {
                data.xAxisData.push(v.vmId);
                data.series.saleAmount.push(v.saleAmount);
                data.series.saleNum.push(v.saleNum)
            });
            return data
        },

        weeklyVmSalesBarData(weeklySalesInfo){
            let data = {
                title: "每周机台销售状况",
                legend: ["销售金额", "销售数量"],
                xAxisData: [],
                series: {
                    saleAmount: [],
                    saleNum: []
                }
            };
            let r = {};
            weeklySalesInfo.forEach(function (saleInfo) {
                if(r.hasOwnProperty(saleInfo.vmId)){
                    r[saleInfo.vmId].saleAmount += saleInfo.sales;
                    r[saleInfo.vmId].saleNum += saleInfo.salesNum;
                }else {
                    r[saleInfo.vmId] = {
                        saleAmount: saleInfo.sales,
                        saleNum: saleInfo.salesNum
                    }
                }
            });
            let sortedR = [];
            Object.keys(r).forEach(function (key) {
                sortedR.push({
                    vmId:key,
                    saleAmount:r[key].saleAmount,
                    saleNum:r[key].saleNum
                });
            });
            sortedR.sort(function (e1, e2) {
                return e2.saleAmount - e1.saleAmount;
            });

            sortedR.forEach(function (v) {
                data.xAxisData.push(v.vmId);
                data.series.saleAmount.push(v.saleAmount);
                data.series.saleNum.push(v.saleNum)
            });
            return data
        },

        weeklySalesLineData(weeklySalesInfo){
            let data = {
                title: "每周销售明细",
                legend: ["销售金额", "销售数目"],
                xAxisData: [],
                series: {
                    saleAmount: [],
                    saleNum: []
                }
            };
            let r = {};
            weeklySalesInfo.forEach(function (saleInfo) {
                if(saleInfo.saleTime!==""){
                    if(r.hasOwnProperty(saleInfo.saleTime)){
                        r[saleInfo.saleTime].saleAmount += saleInfo.sales;
                        r[saleInfo.saleTime].saleNum += saleInfo.salesNum;
                    }else {
                        r[saleInfo.saleTime] = {
                            saleAmount: saleInfo.sales,
                            saleNum: saleInfo.salesNum
                        }
                    }
                }
            });
            Object.keys(r).forEach(function (key) {
                data.xAxisData.push(key);
                data.series.saleAmount.push(r[key].saleAmount);
                data.series.saleNum.push(r[key].saleNum)
            });
            return data
        },

        homePageSaleLineData(weeklySaleInfo) {
            let data = {
                title: "7日销售明细",
                legend: ["销售金额", "销售数目"],
                xAxisData: [],
                series: {
                    saleAmount: [],
                    saleNum: []
                }
            };
            weeklySaleInfo.forEach(function (saleInfo) {
                data.xAxisData.push(saleInfo.date.slice(5));
                let sales = saleInfo.sales.split(",");
                data.series.saleAmount.push(sales[0]);
                data.series.saleNum.push(sales[1]);
            });
            return data;
        },

        dailyProductSalesPieData(dailyProductSalesInfo) {
            let data = {
                title: "每日商品销量占比",
                legend: [],
                series: {
                    salesProduct: []
                }
            };
            dailyProductSalesInfo.forEach(function (productSaleInfo) {
                data.legend.push(productSaleInfo.spName);
                data.series.salesProduct.push({
                    name: productSaleInfo.spName,
                    value: productSaleInfo.spSaleCountNum
                })
            });
            return data;
        },

        dailyVmSalesBarData(dailyVmSalesInfo) {
            let data = {
                title: "每日机台销售状况",
                legend: ["销售金额", "销售数量"],
                xAxisData: [],
                series: {
                    saleAmount: [],
                    saleNum: []
                }
            };
            dailyVmSalesInfo.sort(function (e1, e2) {
                return e2.sales - e1.sales
            });

            let countAmount = 0;
            let countNum = 0;
            dailyVmSalesInfo.forEach(function (vmSaleInfo) {
                if (vmSaleInfo.sales > 0 || vmSaleInfo.salesNum > 0) {
                    countAmount += vmSaleInfo.sales;
                    countNum += vmSaleInfo.salesNum;
                    data.xAxisData.push(vmSaleInfo.vmId);
                    data.series.saleAmount.push(vmSaleInfo.sales);
                    data.series.saleNum.push(vmSaleInfo.salesNum);
                }
            });
            // data.xAxisData.push("总计");
            // data.series.saleAmount.push(countAmount);
            // data.series.saleNum.push(countNum);
            return data
        },

        dailyPayTypePieData(dailyAllVmSaleDetail){
            let data = {
                title: "每日支付类型占比",
                legend: [],
                series: {
                    payTypeCount: []
                }
            };
            let payType = {};
            dailyAllVmSaleDetail.forEach(function (vmSaleDetail) {
                if(vmSaleDetail.Total>0){
                    vmSaleDetail.Rows.forEach(function (saleInfo) {
                        let f = Object.keys(payType).findIndex(type=>type===saleInfo.saleType);
                        if(f===-1){
                            payType[saleInfo.saleType] = 1;
                        }
                        payType[saleInfo.saleType] += 1;
                    })
                }
            });
            console.log(payType);
            if(Object.keys(payType).length>0){
                data.legend = Object.keys(payType);
                data.legend.forEach(function (type) {
                    let item = {
                        name: type,
                        value: payType[type]
                    };
                    data.series.payTypeCount.push(item)
                })
            }
            return data;
        }
    },

    util: {
        /**
         * eg:
         * 09-05 -> 周三
         *
         * @param date  like 09-05
         * return weekInfo
         */
        getWeekInfo(date) {
            //从数据库中找到匹配的年月日
            let allVmSaleInfo = db.getAllVmSaleInfo();
            let weekList = [
                "周日", "周一", "周二", "周三", "周四", "周五", "周六"
            ];
            if (allVmSaleInfo != null) {
                let weeklySaleInfo = allVmSaleInfo.weeklySaleInfo;
                let find = weeklySaleInfo.find(function (saleInfo) {
                    return saleInfo.date.slice(5) === date
                });
                let week = new Date(find.date.replace(/-/g, "/")).getDay();
                return weekList[week]
            }
            return ""
        },

        getWeekInfoByFullDate(date){
            let weekList = [
                "周日", "周一", "周二", "周三", "周四", "周五", "周六"
            ];
            let d = new Date(date);
            return weekList[d.getDay()]
        }
    }

};
export default chartoptions