<script setup>
import { onBeforeMount, onMounted,ref } from 'vue'

const props = defineProps({
    designDraftWidth: {
        type: Number,
        default: 375,
    },
    designDraftHeight: {
        type: Number,
        default: 700,
    },
    backGround:{
        type: String,
        default: '#fff'
    }
})

const screenRef = ref(null)

const designDraftWidth = props.designDraftWidth; //设计稿的宽度
const designDraftHeight = props.designDraftHeight; //设计稿的高度
onMounted(() => {
    screenRef.value.style.width = designDraftWidth+'px'
    screenRef.value.style.height = designDraftHeight+'px'

    handleScreenAuto()
    window.onresize = () => {
        handleScreenAuto()
    }
})
onBeforeMount(() => {
    window.onresize = null
})
function handleScreenAuto() {
    
    const clientHeight = document.documentElement.clientHeight; // 视窗高度
    const clientWidth = document.documentElement.clientWidth; // 视窗宽度
    const scale =
        clientWidth /
            clientHeight <
            designDraftWidth / designDraftHeight
            ? clientWidth / designDraftWidth
            : clientHeight / designDraftHeight;
    // 缩放比例
    document.querySelector(
        '#screen',
    ).style.transform = `scale(${scale}) translate(-50%, -50%)`;
}
</script>

<template>
    <div class="screen-root">
        <div ref="screenRef" :style="{ width:designDraftWidth,height:designDraftHeight,background:backGround }" id="screen" class="screen">
            <slot></slot>
        </div>
    </div>
</template>

<style lang="scss" scoped>
.screen-root {
    width: 100vw;
    height: 100vh;
    // background: linear-gradient(180deg, #6BBCFD 0%, rgba(236, 249, 253, 0) 100%);
    display: flex;
    justify-content: center;
    align-items: flex-end;
    box-sizing: border-box;
    position: relative;

    .screen {
        position: absolute;
        left: 50%;
        top: 50%;
        transform-origin: 0 0;
    }
}
</style>
