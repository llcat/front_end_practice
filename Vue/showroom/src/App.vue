<template>
  <div id="app">
    <common-header :title="title" :imgSrc="imgSrc"></common-header>
    <swiper-container :projectInfoList="projectInfoList" @onSlide="handleSlide"></swiper-container>
    <project-intro :projectInfo="currentProject"></project-intro>
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
                  description: `基于element-ui和echarts实现的报表页,
                  用户可以基于日,周,月等多个维度查看数据。`,
                  info: `基于element-ui和echarts实现的报表页,
                  用户可以基于日,周,月等多个维度查看数据。`,
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
                          skillName: "sass",
                          imgSrc: this.$iconSet.sass
                      },

                  ]
              },
              {
                  id: 2,
                  name: "React-Calculator",
                  description: `基于react.js编写的一个计算器。
                  `,
                  info: `基于react.js编写的一个计算器。
                  `,
                  slideImg: this.$imgSet.echartsDemo,
                  skillList: [
                      {
                          skillName: "vue",
                          imgSrc: this.$iconSet.vue
                      },

                      {
                          skillName: "echarts",
                          imgSrc: this.$iconSet.echarts
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
    height: 100vh;
    background: linear-gradient(90deg, rgba(255, 14, 70, 0.8), rgb(40, 117, 245));
  }
</style>
