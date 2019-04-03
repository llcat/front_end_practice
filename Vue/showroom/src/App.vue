<template>
  <div id="app">
    <!--<common-header :title="title" :imgSrc="imgSrc"></common-header>-->
    <!--<skill-item v-for="item in items" :key="item.skill" :skill="item.skill" :imgSrc="item.imgSrc"></skill-item>-->
    <!--<project-intro v-for="projectInfo in projectInfoList" :projectInfo="projectInfo" :key="projectInfo.name"></project-intro>-->
    <swiper-container></swiper-container>
  </div>
</template>

<script>
// import CommonHeader from '@/components/CommonHeader';
//
// import ProjectIntro from '@/components/ProjectIntro';
import SwiperContainer from '@/components/SwiperContainer'


export default {
  name: 'app',
  components: {
      // CommonHeader,
      SwiperContainer,
      // ProjectIntro,
  },
  data(){
      return {
          title: "小作品",
          imgSrc: require('@/assets/product.png'),
          projectInfoList: [
              {
                  name: "Vue-Echarts",
                  info: `基于element-ui和echarts实现的报表页,
                  用户可以基于日,周,月等多个维度查看数据。`,
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
                  name: "React-Calculator",
                  info: `基于react.js编写的一个计算器。
                  `,
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
</style>
