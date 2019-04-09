<template>
  <div id="app">
    <common-header :title="title" :imgSrc="imgSrc"></common-header>
    <div class="main-container">
      <swiper-container :projectInfoList="projectInfoList" @onSlide="handleSlide"></swiper-container>
      <div class="intro-container">
        <project-intro :projectInfo="currentProject"></project-intro>
      </div>
    </div>
  </div>
</template>

<script>
import CommonHeader from '@/components/CommonHeader';
import SwiperContainer from '@/components/SwiperContainer'
import ProjectIntro from  '@/components/ProjectIntro'

export default {
  name: 'app',
  components: {
      CommonHeader,
      SwiperContainer,
      ProjectIntro
  },
  computed: {
      currentProject(){
          return this.projectInfoList[this.currentIndex]
      }
  },
  methods: {
      handleSlide(currentIndex){
          this.currentIndex = currentIndex
      }
  },
  data(){
      return {
          title: "小作品",
          imgSrc: require('@/assets/product.png'),
          currentIndex: 0,
          projectInfoList: [
              {
                  id: 1,
                  name: "Vue-Echarts",
                  description: `基于element-ui和echarts实现的报表页。`,
                  info: `提供销售数据可视化报表，用户可以基于日,周,月等多个维度，选择查看销售数据。`,
                  link: "http://llcat.tech/echarts/",
                  slideImg: this.$imgSet.echartsDemo,
                  skillList: [
                      {
                          skillName: "vue",
                          imgSrc: this.$iconSet.vue
                      },
                      {
                          skillName: "element-ui",
                          imgSrc: this.$iconSet.element_ui
                      },
                      {
                          skillName: "echarts",
                          imgSrc: this.$iconSet.echarts
                      },
                      {
                          skillName: "webpack",
                          imgSrc: this.$iconSet.webpack
                      },
                  ]
              },
              {
                  id: 2,
                  name: "React-Calculator",
                  description: `基于react.js编写的一个仿小米计算器。
                  `,
                  info: `仿小米计算器，提供了基本/高级的计算功能，还有好用的单位换算功能~`,
                  link: "http://llcat.tech/echarts/",
                  slideImg: this.$imgSet.echartsDemo,
                  skillList: [
                      {
                          skillName: "react",
                          imgSrc: this.$iconSet.react
                      },
                      {
                          skillName: "sass",
                          imgSrc: this.$iconSet.sass
                      },
                      {
                          skillName: "webpack",
                          imgSrc: this.$iconSet.webpack
                      },
                  ]
              }
          ],
  }
  }
}
</script>

<style lang="scss">
  html, body {
    margin: 0;
    padding: 0;
    font-family: 'Avenir', Helvetica, Arial, sans-serif;
  }
  #app {
    min-height: 100vh;
    background: linear-gradient(90deg, rgba(255, 14, 70, 0.8), rgb(40, 117, 245));
    @media (max-width: 767px){
      .main-container {
        display: flex;
        flex-direction: column;
        align-items: center;
      }
      .intro-container {
        display: flex;
        align-items: center;
        justify-content: center;
        height: 50vh;
      }
    }

    @media (min-width: 768px) {
      .main-container {
        display: flex;
        align-items: center;
        justify-content: space-between;
      }
      .intro-container {
        margin: 0 10vw;
      }
    }
  }

</style>
