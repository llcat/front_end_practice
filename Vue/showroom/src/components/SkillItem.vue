<template>
    <div class="skill-item">
        <img :src="imgSrc" alt="skill-icon">
        <span>{{skillName}}</span>
    </div>
</template>

<script>
    export default {
        name: "SkillItem",
        props: {
            imgSrc: String,
            skillName: String
        }
    }
</script>

<style scoped lang="scss">
.skill-item {
    display: inline-flex;
    padding: 0.5vmin 1vmin;
    font-size: 5vmin;
    align-items: center;
    border-radius: 3vmin;
    box-shadow: 1px 1px 2px 1px rgba(128, 128, 128, 0.71);
    margin: 1vmin;
    &:hover {
        background: rgba(128, 128, 128, 0.35);
        cursor: pointer;
    }
    img {
        width: 4vmin;
        height: 4vmin;
        margin:0 1vmin 0 1vmin;
    }
    span {
        margin-left: 1vmin;
        margin-right: 1vmin;
    }

    @media screen and (min-width: 768px) {
        & {
            font-size: 3vmin;

            img {
                width: 2vmin;
                height: 2vmin;
            }
        }
    }
}
</style>