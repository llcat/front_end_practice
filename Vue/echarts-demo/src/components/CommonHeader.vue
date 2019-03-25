<template>
    <mt-header class="common-header" :title="headerInfo.title">
        <mt-button icon="back" slot="left" @click="goBack"></mt-button>
    </mt-header>
</template>

<script>
    export default {
        name: "CommonHeader",
        props: {
            headerInfo: Object
        },
        methods: {
            goBack() {
                this.$router.go(-1)
            }
        }
    }
</script>

<style scoped>
    .common-header{
        background-color: white;
        color: #409EFF;
    }
</style>