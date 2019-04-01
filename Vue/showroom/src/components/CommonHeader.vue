<template>
    <header class="common-header">
        <div class="icon-container">
            <img class="icon" :src="imgSrc"/>
        </div>
        <span class="title">{{title}}</span>
    </header>
</template>

<script>
    export default {
        name: "CommonHeader",
        props: ["imgSrc", 'title']
    }
</script>

<style scoped lang="scss">
@mixin flex-align-center {
    display: flex;
    align-items: center;
}

@mixin flex-center {
    @include flex-align-center;
    justify-content: center;
}

.common-header {
    @include flex-align-center;
    color: white;
    font-size: 6vmin;
    font-weight: 600;
    font-style: italic;
    background: linear-gradient(90deg, rgba(255, 14, 70, 0.8), rgb(40, 117, 245));

    .icon-container {
        width: 10vmin;
        height: 10vmin;
        @include flex-center;
        border-radius: 50%;
        background: white;
        margin: 2vmin 3vmin 2vmin 4vmin;
    }

    .icon {
        width: 6vmin;
        height: 6vmin;
    }

    .title {
        padding: 2vmin;
    }
}
</style>