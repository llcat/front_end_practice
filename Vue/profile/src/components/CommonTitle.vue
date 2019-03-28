<!--
    通用标题组件
    Description:
    简历中有各类型的标题可以抽象出来, 他们之间的区别仅在于标题前的装饰
    比如一个圆点, 一条竖线, 一个方块，一个图像等,以及使用字体的大小等地方。
-->
<template>
    <div class="common-title">
        <div class="title-decoration" :style="decorationStyle">
            <img v-if="showImg" src=""/>
        </div>
        <span class="title-text">{{text}}</span>
    </div>
</template>

<script>
    export default {
        name: "CommonTitle",

        props: {
            decorationType: {
                type: String,
                validator: function (value) {
                    return ['circle', 'rectangle', 'vertical-bar', 'image'].indexOf(value) !== -1
                }
            },
            decorationStyle: {
                type: Object,
                default: function () {
                    return {
                        width: "4vmin",
                        height: "4vmin",
                        borderRadius: "50%",
                        background: "green"
                    }
                }
            },
            text: String,
            fontSize: String,
            fontWeight: Number
        },

        computed: {
            showImg(){
                return this.decorationType === 'image'
            },
            calDecorationStyle(){

            }
        }
    }
</script>

<style scoped lang="scss">
    .common-title {
        display: flex;
        align-items: center;
        .title-text {
            display: block;
        }
    }
</style>