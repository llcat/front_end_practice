<template>
    <div class="project-info-slide">
        <img v-if="showImg" :src="imgSrc">
        <div class="info-container">
            <h4>{{projectInfo.name}}</h4>
            <p>{{projectInfo.description}}</p>
        </div>
    </div>
</template>

<script>
    export default {
        name: "ProjectInfoSlide",
        props: {
            projectInfo: Object
        },
        computed: {
            imgSrc(){
                return this.projectInfo.slideImg
            },
            showImg(){
                return this.projectInfo.slideImg?true:false
            }
        }
    }
</script>

<style scoped lang="scss">
    .project-info-slide {
        display: flex;
        align-items: center;
        justify-content: center;
        width: 90%;
        height: 90%;
        img {
            width: 28%;
        }

        .info-container {
            width: 60%;
            margin: 2%;
            h4 {
                margin: 0.5vmin 0;
            }
        }

    }
</style>