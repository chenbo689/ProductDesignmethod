<script setup>
import Scale from '@/components/Scale.vue'
import { getImgSrc } from '@/utils/getimgsrc';
import { ref, onMounted,watch } from 'vue'
const data = [{ id: '1', content: '固定测头' }, { id: '2', content: '活动测头' },
{ id: '3', content: '等避直角杠杆' }, { id: '4', content: '挺杆' },
{ id: '5,7', content: '弹簧' }, { id: '6', content: '定心板' },
{ id: '8', content: '隔热手柄' }, { id: '9', content: '指示表' }]
const positions = [
    { id: '5', left: '128px', top: '192px', content: '弹簧' },
    { id: '8', left: '128px', top: '290px', content: '隔热手柄' },
    { id: '4', left: '128px', top: '368px', content: '挺杆' },
    { id: '2', left: '68px', top: '449px', content: '活动测头' },
    { id: '3', left: '135px', top: '519px', content: '等避直角杠杆' },
    { id: '6', left: '544px', top: '247px', content: '定心板' },
    { id: '7', left: '541px', top: '304px', content: '弹簧' },
    { id: '1', left: '591px', top: '493px', content: '固定测头' },
    { id: '9', left: '548px', top: '118px', content: '指示表' }
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
    if (choice_data.value.length == positions.length){
        ElMessage.success('完成挑战')
    }
})
const isright = (id) => {
    let right = true
    let i = id.split(',')
    for (let item of i) {
        right = right && choice_data.value.join(',').includes(item)
    }
    return right
}
</script>

<template>
    <Scale :designDraftWidth="1080" :designDraftHeight="607"
        :backGround="`url(${getImgSrc('background.png')}) no-repeat center/contain`">
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
    background: url(@/assets/images/inner.png) no-repeat left 69px top 84px/631px 470px, url(@/assets/images/title1.png) no-repeat center top 20px/198.8px 53px;
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
        padding: 50px 10px;
        border: 1px solid #000;
        background: url(@/assets/images/Union.png) no-repeat center top 10px/80px auto,#EBEBEB;
        width: 253px;
        box-sizing: border-box;
        display: flex;
        flex-wrap: wrap;
        justify-content: space-between;
        gap: 10px;
        border-radius: 5px;

        .item {
            width: 109px;
            box-sizing: border-box;
            border: 1px solid;
            display: flex;
            align-items: center;
            justify-content: center;
            background-color: #CFCFCF;
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