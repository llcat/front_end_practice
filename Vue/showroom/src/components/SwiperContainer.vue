<template>
    <div class="project-swiper">
        <div class="swiper-container" ref="swipe">
            <div class="swiper-wrapper">
                <div :key="p.id" v-for="p in projectInfoList" class="swiper-slide">
                    <project-info-slide :project-info="p"></project-info-slide>
                </div>
            </div>
        </div>
        <div class="swiper-pagination"></div>
    </div>
</template>

<script>
    import Swiper from 'swiper';
    import ProjectInfoSlide from './ProjectInfoSlide';

    export default {
        name: "SwiperContainer",
        components: {
          ProjectInfoSlide
        },
        props: {
            projectInfoList: Array,
        },
        mounted(){
            this.createSwiper()
        },

        methods: {
            createSwiper(){
                let vm = this;
                let w = window.innerWidth;
                // let h = window.innerHeight;
                this.sw = new Swiper(this.$refs.swipe, {
                    init: true,
                    slidesPerView: 1,
                    speed: 400,
                    effect: 'coverflow',
                    coverflowEffect: {
                        rotate: 30,
                        stretch: 0,
                        depth: 100,
                        modifier: 1,
                        slideShadows : false,
                    },
                    pagination: {
                        el: '.swiper-pagination',
                        clickable: true
                    },
                    on: {
                        slideChange(){
                            vm.$emit("onSlide", this.realIndex)
                        }
                    }
                });
                if(w>=768){
                    this.sw.changeDirection("vertical")
                }
            }
        },

    }
</script>

<style lang="scss" scoped>
    @import "~swiper/dist/css/swiper.min.css";

    .project-swiper {
        display: inline-flex;
        position: relative;
        flex-direction: row;
        background: rgba(240, 248, 255, 0.4);
    }

    .swiper-container {
        display: flex;
        justify-content: center;
        align-items: center;
        text-align: center;
    }

    .swiper-slide {
        background: aliceblue;
        display: flex;
        align-items: center;
        justify-content: center;
        box-sizing: border-box;
        border-radius: 3vmin;
    }

    @media (max-width: 767px) {
        .project-swiper {
            width: 100%;
            border-radius: 0 0 2vmin 2vmin;
        }

        .swiper-wrapper {
            height: 33vh;
        }

        .swiper-container {
            width: 85vw;
            height: 38vh;
        }

        .swiper-slide {
            width: 75vw;
            height: 33vh;
        }

        .swiper-pagination {
            bottom: 0;
            left: 50%;
            transform: translateX(-50%);
        }
    }

    @media (min-width: 768px) {
        .project-swiper {
            justify-content: center;
            align-items: center;
            height: 88vh;
            border-radius: 0 3vmin 3vmin 0;
        }

        .swiper-wrapper {
            align-items: center;
            height: 36vh !important;
        }

        .swiper-container {
            width: 40vw;
        }
        .swiper-slide {
            width: 35vw;
            height: 36vh !important;
        }
        .swiper-pagination {
            top: 50%;
            left: 2%;
            transform: translateY(-50%);
        }
    }
</style>
<style>
    @media (max-width: 767px){
        .swiper-pagination-bullet {
            display: inline-block;
            margin: 0 0.4vmin;
        }
    }

    @media (min-width: 768px){
        .swiper-pagination-bullet {
            display: block;
            margin: 0.8vmin 0;
        }
    }
</style>
