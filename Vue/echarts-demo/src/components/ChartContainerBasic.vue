<template>
    <div class="chart-container-basic">
        <div class="title-container">
            <span class="chart-title">{{title}}</span>
            <span class="chart-subtitle">{{subTitle}}</span>
        </div>
        <div :id="id" class="chart-canvas" :style="customStyle">
        </div>
        <slot></slot>
    </div>
</template>

<script>
    export default {
        name: "ChartContainerBasic",

        props: {
            id: String,
            title: String,
            subTitle:String,
            option: Object,
            customStyle: Object,
        },

        watch: {
            option(newOption) {
                this.updateChart(newOption)
            },
        },

        methods: {
            updateChart(option){
                let chart = this.$echarts.init(document.getElementById(this.id), 'light');
                chart.setOption(option)
            }
        }
    }
</script>

<style scoped>
    .chart-container-basic {
        width: 96vw;
        display: flex;
        flex-direction: column;
        align-items: center;
        border: 1px rgba(163, 171, 186, 0.47) solid;
        margin: 4vmin 0;
    }

    .title-container {
        width: 100%;
        border-bottom: 1px rgba(163, 171, 186, 0.47) solid;
        padding: 2vmin 0;
    }

    .chart-title {
        display: block;
        font-size: 5vmin;
        font-weight: bold;
        color: #409EFF;
    }

    .chart-subtitle {
        display: block;
        font-size: 3vmin;
        color: gray;
    }
</style>