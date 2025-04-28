<script setup>
import Scale from '@/components/Scale.vue'
import { getImgSrc } from '@/utils/getimgsrc';
import { ref, onMounted,watch } from 'vue'
const data = [{ id: '1', content: '横臂' }, { id: '2', content: '手轮 ' },
    { id: '3', content: '目镜千分尺' }, { id: '4,8,b,e', content: '螺钉' },
{ id: '5,c', content: '物镜' },
    { id: '7,d', content: '千分尺' }, { id: '9', content: '螺母' },
    { id: 'a', content: '调焦环' }]
const positions = [
    { id: '1', left: '217px', top: '120px', content: '横臂' },
    { id: '2', left: '157px', top: '153px', content: '手轮' },
    { id: '3', left: '88px', top: '285px', content: '目镜千分尺' },
    { id: '4', left: '116px', top: '201px', content: '螺钉' },
    { id: '5', left: '142px', top: '321px', content: '物镜' },
    { id: '7', left: '100px', top: '373px', content: '千分尺' },
    { id: '8', left: '468px', top: '191px', content: '螺钉' },
    { id: '9', left: '468px', top: '235px', content: '螺母' },
    { id: 'a', left: '483px', top: '268px', content: '调焦环' },
    { id: 'b', left: '461px', top: '301px', content: '螺钉' },
    { id: 'c', left: '461px', top: '338px', content: '物镜' },
    { id: 'd', left: '483px', top: '385px', content: '千分尺' },
    { id: 'e', left: '116px', top: '430px', content: '螺钉' },
]

const choice_data = ref([])
let anwserbox = []
onMounted(()=>{
    anwserbox = [...document.querySelectorAll('.box')]
})
function isrightFun(cloneNode, oElement) {
    // 移除cloneNode
    if (cloneNode) {
        document.getElementsByClassName("screen-root")[0].removeChild(cloneNode);
    }
    // 移除样式
    const i = document.querySelector('.item_hover')
    !i ? null : i.classList.remove('item_hover')
    // 必须是答题框才能判断是否正确，如果当前悬浮的盒子已经被填入内容 或者 被选择的答案里面已经有了 或者 是正在进行退回操作
    if (!anwserbox.includes(oElement) || choice_data.value.includes(oElement.dataset.id)) {
        cloneNode = null
        return
    }
    // 判断正误
    if (cloneNode.dataset.id.includes(oElement.dataset.id)) {
        choice_data.value.push(oElement.dataset.id)
        ElMessage.success('正确')
    } else {
        ElMessage.error('错误噢，再试试看~')
    }
    cloneNode = null
}
watch(()=>choice_data.value.length,()=>{
    if(choice_data.value.length==positions.length){
        ElMessage.success('完成挑战')
    }
})
const isright = (id)=>{
    let right = true
    let i = id.split(',')
    for(let item of i){
        right = right && choice_data.value.join(',').includes(item)
    }
    return right
}
</script>

<template>
    <Scale :designDraftWidth="1080" :designDraftHeight="607"
        :backGround="`url(${getImgSrc('background2.png')}) no-repeat center/contain`">
        <div class="manage4">
            <div v-for="item in positions" :key="item" :style="{ left: item.left, top: item.top }" :data-id="item.id"
                class="box"><span v-show="choice_data.includes(item.id)">{{ item.content }}</span></div>
            <div class="choicebox">
                <div v-drag="{ isrightFun }" class="item" v-for="item in data" :key="item" :data-id="item.id"
                    v-show="!isright(item.id)">{{ item.content }}</div>
            </div>
        </div>
    </Scale>
</template>

<style lang="scss" scoped>
.manage4 {
    width: 100%;
    height: 100%;
    box-sizing: border-box;
    position: relative;
    background: url(@/assets/images/inner2.png) no-repeat left 175px top 150px/302px 344px, url(@/assets/images/title2.png) no-repeat center top 20px/201px auto;
    user-select: none !important;

    .box {
        position: absolute;
        display: flex;
        align-items: center;
        justify-content: center;
        width: 109px;
        height: 27px;
        box-sizing: border-box;
        border: 2px solid;
        background-color: #fff;
    }

    .choicebox {
        position: absolute;
        right: 30px;
        top: 171px;
        width: 359px;
        box-sizing: border-box;
        display: flex;
        flex-wrap: wrap;
        gap: 10px;
        border-radius: 5px;

        .item {
            width: 109px;
            box-sizing: border-box;
            border: 1px solid;
            display: flex;
            align-items: center;
            justify-content: center;
            background-color: #fff;
            cursor: grab;
        }
    }
}

.choiceItem {
    width: 109px;
    box-sizing: border-box;
    border: 1px solid;
    display: flex;
    align-items: center;
    justify-content: center;
    background-color: #CFCFCF;
    cursor: grab;
}
</style>