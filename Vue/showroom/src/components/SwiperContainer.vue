<template>
    <div class="project-swiper">
        <div class="swiper-container" ref="swipe">
            <div class="swiper-wrapper">
                <div class="swiper-slide" @click="test">aaa</div>
                <div class="swiper-slide">bbb</div>
                <div class="swiper-slide">ccc</div>
            </div>
        </div>
        <div class="swiper-pagination"></div>
    </div>
</template>

<script>
    import Swiper from 'swiper';
    export default {
        name: "SwiperContainer",
        mounted(){
            let w = window.innerWidth;
            let h = window.innerHeight;
            let aspectRatio = w/h;
            if(w<768 && aspectRatio<1){
                this.sw = new Swiper(this.$refs.swipe, {
                    init: true,
                    speed: 400,
                    pagination: {
                        el: '.swiper-pagination',
                        clickable: true
                    }

                    ,
                })
            }else if(w>=768 && aspectRatio>=1){
                this.sw = new Swiper(this.$refs.swipe, {
                    init: true,
                    direction: "vertical",
                    speed: 400,
                    pagination: {
                        el: '.swiper-pagination',
                        clickable: true
                    },
                })
            }
        },

        methods: {
            test(){
                console.log(this.sw)
            },

        },

    }
</script>

<style lang="scss" scoped>
    @import "~swiper/dist/css/swiper.min.css";
    @mixin media-mobile
    .project-swiper {
        display: inline-flex;
        position: relative;
        flex-direction: row;
    }

    .swiper-container {
        display: flex;
        justify-content: center;
        align-items: center;
        text-align: center;
    }

    @media (max-width: 767px) , (max-aspect-ratio: 1/1){
        .swiper-container {
            width: 80vw;
            height: 35vh;
        }
        .swiper-pagination {
            bottom: 0;
            left: 50%;
            transform: translateX(-50%);
        }
    }

    @media (min-width: 768px), (min-aspect-ratio: 1/1){
        .swiper-container {
            width: 40vw;
            height: 35vh;
        }
        .swiper-pagination {
            top: 50%;
            left: 0;
            transform: translateY(-50%);
        }
    }
</style>
<style>
    @media (max-width: 767px) , (max-aspect-ratio: 1/1){

    }
    .swiper-pagination-bullet {
        display: block;
        margin: 0 0.4vmin;
    }
</style>
