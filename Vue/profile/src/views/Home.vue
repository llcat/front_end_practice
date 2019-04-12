<template>
    <div id="home-page">
        <not-complete></not-complete>
        <nav-bar></nav-bar>
    </div>
</template>

<script>
    import NotComplete from '../components/NotComplete';
    import NavBar from '../components/NavBar';
    export default {
        name: "Home",
        components: {
            NotComplete,
            NavBar,
        }
    }
</script>

<style scoped lang="scss">
    #home-page {
        display: flex;
        align-items: center;
        justify-content: center;
        width: 100vw;
        height: 100vh;
    }
</style>