<template>
    <div id="home-page">
        <nav-bar></nav-bar>
        <common-title decoration-type="image" text="test"></common-title>
        <common-title decoration-type="image" text="test1"></common-title>
    </div>
</template>

<script>
    import NavBar from '../components/NavBar';
    import CommonTitle from '../components/CommonTitle'
    export default {
        name: "Home",
        components: {
            NavBar,
            CommonTitle
        }
    }
</script>

<style scoped lang="scss">
    #home-page {
        display: flex;
    }
</style>