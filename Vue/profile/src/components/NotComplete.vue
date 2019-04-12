<template>
    <div class="not-complete">
        <img class="develop" src="../assets/img/developing.png">
        <p>尚未完成, 努力开发中......</p>
        <a class="download-link" href="http://llcat.tech/static/pdf/余品隆-web前端开发工程师-2年经验.pdf" download="余品隆-web前端开发工程师-2年经验.pdf" >
            <img src="../assets/img/download.png">
            下载简历附件
        </a>
    </div>
</template>

<script>
    export default {
        name: "NotComplete"
    }
</script>

<style scoped lang="scss">
    .not-complete {
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: center;
        .develop {
            width: 200px;
        }
        p {
            color: gray;
        }
        a {
            display: flex;
            align-items: center;
            justify-content: center;
            background: rgba(113, 190, 247, 0.66);
            border-radius: 5px;
            padding: 4px 8px;
            text-align: center;
            text-decoration: none;
            font-size: 16px;
            color: #3f3f3f;
            img {
                margin: 0 4px;
                width: 30px;
            }
            &:active {
                cursor: pointer;
                background: rgba(102, 178, 255, 0.51);
            }
            &:hover {
                cursor: pointer;
            }
        }
    }
</style>