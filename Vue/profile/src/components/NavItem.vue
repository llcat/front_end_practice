<template>
    <div class="nav-item-box">
        <img class="nav-item-icon" :src="imgSrc"/>
        <span class="nav-item-text">{{text}}</span>
    </div>
</template>

<script>
    export default {
        name: "NavItem",
        props: ["imgSrc", "text"],
    }
</script>

<style scoped lang="scss">
.nav-item-box {
    display: flex;
    justify-content: center;
    align-items: center;
    &:hover {
        background: #c0d2f0;
        cursor: pointer;
    }
    @media screen and (min-width: 320px) and (max-width: 767px) {
        .nav-item-icon {
            width: 5vw;
            margin: 2vmin;
        }
        .nav-item-text {
            display: none;
        }
    }

    @media screen and (min-width: 768px){
        .nav-item-icon {
            width: 5vmin;
            margin: 2vmin;
        }
        .nav-item-text {
            font-size: 3vmin;
            margin-right: 2vmin;
        }
    }
}
</style>