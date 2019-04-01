<template>
  <div id="app">
    <common-header :title="title" :imgSrc="imgSrc"></common-header>
  </div>
</template>

<script>
import CommonHeader from '@/components/CommonHeader'

export default {
  name: 'app',
  components: {
    CommonHeader
  },
  data(){
      return {
          title: "小作品",
          imgSrc: require('@/assets/product.png')
      }
  }
}
</script>

<style lang="scss">
html, body{
  margin: 0;
  padding: 0;
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
}
</style>
