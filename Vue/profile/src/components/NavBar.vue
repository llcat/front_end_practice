<!--
 NavBar:
    构建一个响应式的侧边栏组件
    for mobile: sub item just offer icon and tooltips, full height
    for pc: offer user-avatar, sub item contains icon and title, all component in a float box container.
-->
<template>
    <nav class="nav-container">
        <nav-item v-for="item in items" :imgSrc="item.imgSrc" :text="item.text" :key="item.id">
        </nav-item>
    </nav>
</template>

<script>
    import NavItem from './NavItem';

    export default {
        name: "NavBar",
        components: {
            NavItem,
        },
        data(){
            return {
                items: [
                    {
                        id: 1,
                        imgSrc: require("@/assets/img/personal_info.png"),
                        text: "个人信息"
                    },
                    {
                        id: 2,
                        imgSrc: require("@/assets/img/skill.png"),
                        text: "职业技能"
                    },
                    {
                        id: 3,
                        imgSrc: require("@/assets/img/work_experience.png"),
                        text: "工作经历"
                    },
                    {
                        id: 4,
                        imgSrc: require("@/assets/img/personal_evaluation.png"),
                        text: "个人评价"
                    }
                ]
            }
        }
    }
</script>

<style lang="scss" scoped>
.nav-container {
    box-shadow: 2px 3px 4px rgba(102, 102, 102, 0.7);
    position: absolute;
    top: 50%;
    left: 2%;
    transform: translateY(-50%);
    @media screen and (min-width: 320px) {

    }

    @media screen and (min-width: 768px) {

    }
}
</style>