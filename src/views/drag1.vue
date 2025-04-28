<script setup>
import { ref, onMounted, computed, watch } from 'vue';
import { useRouter } from 'vue-router'
import { getImgSrc } from '@/utils/getimgsrc'
import Scale from '@/components/Scale.vue'
const data = ref([
    { id: 1, src: 'drag1.png' },
    { id: 2, src: 'drag2.png' },
    { id: 3, src: 'drag3.png' },
    { id: 4, src: 'drag4.png' },
    { id: 5, src: 'drag5.png' },
    { id: 6, src: 'drag6.png' },
    { id: 7, src: 'drag7.png' },
    { id: 8, src: 'drag8.png' },
    { id: 9, src: 'drag9.png' },
    { id: 10, src: 'drag10.png' },
    { id: 11, src: 'drag11.png' },
    { id: 12, src: 'drag12.png' },
    { id: 13, src: 'drag13.png' },
    { id: 14, src: 'drag14.png' },
    { id: 15, src: 'drag15.png' },
    { id: 16, src: 'drag16.png' },
    { id: 17, src: 'drag17.png' },
    { id: 18, src: 'drag18.png' },
    { id: 19, src: 'drag19.png' },
    { id: 20, src: 'drag20.png' }
])
const positions = ref([
    { left: '500px', top: '840px' },
    { left: '630px', top: '230px' },
    { left: '300px', top: '520px' },
    { left: '300px', top: '100px' },
    { left: '300px', top: '650px' },
    { left: '630px', top: '360px' },
    { left: '300px', top: '780px' },
    { left: '300px', top: '360px' },
    { left: '760px', top: '230px' },
    { left: '40px', top: '360px' },
    { left: '170px', top: '360px' },
    { left: '760px', top: '360px' },
    { left: '300px', top: '230px' },
    { left: '500px', top: '150px' },
    { left: '170px', top: '780px' },
    { left: '170px', top: '230px' },
    { left: '500px', top: '280px' },
    { left: '630px', top: '80px' },
    { left: '500px', top: '580px' },
    { left: '500px', top: '710px' },
])
const choice_data = new Set()



const showTip = ref(true)// 提示框

// -----------拖拽模块
let anwserbox = null//放答案的盒子
onMounted(() => {
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

    // 获取拖拽的图片ID和目标格子ID
    const draggedId = +cloneNode.dataset.id
    const targetIndex = +oElement.dataset.index
    if (targetIndex == undefined) {
        choice_data.delete(draggedId)
        positions.value[cloneNode.dataset.index].id = undefined
        return
    }
    if (positions.value[targetIndex].id !== undefined) {
        if (cloneNode.dataset.index == undefined) {
            choice_data.delete(positions.value[targetIndex].id)
        } else {
            positions.value[cloneNode.dataset.index].id = positions.value[targetIndex].id
        }
    } else if (positions.value[targetIndex].id == undefined && cloneNode.dataset.index !== undefined) {
        positions.value[cloneNode.dataset.index].id = undefined
    }
    positions.value[targetIndex].id = draggedId
    choice_data.add(draggedId)

    cloneNode = null
}

// 结束对话框
const endDialog = ref(false)
function reset() {
    endDialog.value = false
    choice_data.clear()
    positions.value.forEach((item, index) => {
        item.id = undefined
    })
}
function Submit() {
    console.log(1)
    if (choice_data.size == data.value.length) {
        endDialog.value = true
    } else {
        ElMessage.error("请先完成")
    }
}
</script>

<template>
    <Scale :designDraftWidth="1440" :designDraftHeight="1040"
        backGround="linear-gradient(180deg, #FFEFF4 0%, #E0F3FF 100%)">
        <div class="manage4">
            <div class="manage4-bar">
                <div @click="Submit" style="right: 120px;" class="left">提交</div>
                <div @click="showTip = true" class="left">教程</div>
            </div>
            <div class="manage4-content">
                <div class="manage4-content-selectbox">
                    <!-- 答案 -->
                    <div v-for="item in data" :key="item" v-show="!choice_data.has(item.id)"
                        :style="{ background: `url(${getImgSrc('drag' + item.id + '.png')}) no-repeat center/ 100% 100%` }"
                        v-drag="{ isrightFun }" class="selectitem" :data-id="item.id">
                    </div>
                </div>
                <div class="manage4-content-box">
                    <!-- 放答案的盒子 -->
                    <div v-for="(item, index) in positions" :data-id="item.id" :key="item" class="box"
                        :style="{ left: item.left, top: item.top, background: item.id ? `url(${getImgSrc('drag' + item.id + '.png')}) no-repeat center/ 100% 100%` : '#D8D8D8' }"
                        :data-index="index" v-drag="{ isrightFun }">
                    </div>
                    <div style="font-size: 36px;color: #333;position: absolute;left: 340px;top: 20px;">感性</div>
                    <div style="font-size: 36px;color: #333;position: absolute;left: 340px;bottom: 40px;">理性</div>
                    <div style="font-size: 36px;color: #333;position: absolute;right: 40px;top: 520px;">直线</div>
                    <div style="font-size: 36px;color: #333;position: absolute;left: 30px;top: 520px;">曲线</div>
                </div>
            </div>
        </div>
    </Scale>
    <el-dialog destroy-on-close width="350px" v-model="showTip" :show-close="false">
        <div style="display: flex;flex-direction: column;align-items: center;">
            <!-- <video width="100%" loop autoplay muted>
                <source src="@/assets/video/drag2.mp4" type="video/mp4">
                您的浏览器不支持HTML5视频标签。
            </video> -->
            <img width="100%" src="@/assets/audio/drag1.gif" alt="">
            <div style="margin: 26px 0;padding: 10px 40px;background: linear-gradient(270deg, #1E44FF 0%, #948FFF 100%);border-radius: 21px;"
                size="large" @click="showTip = !showTip"><span
                    style="color: #fff;font-size: 14px;cursor: pointer;">我已知晓</span></div>
        </div>
    </el-dialog>
    <el-dialog destroy-on-close v-model="endDialog" width="260px" :show-close="false">
        <div
            style="display: flex;font-size: 16px;flex-direction: column;color:#000;justify-content: center;align-items: center;text-align: center;">
            <h3 style="color: #030045;font-family: Source Han Sans;">完成啦！！！</h3>
            <img style="width: 100px;margin: 10px 0;" src="@/assets/images/right.png" alt="">
            <div style="display: flex;justify-content: center;gap: 10px;">

                <div @click="reset" style="padding: 6px 15px;cursor: pointer;
                    background: linear-gradient(270deg, #1E44FF 0%, #948FFF 100%);color: #fff;
                    border-radius: 21px;font-size: 12px;">
                    再来一次</div>
            </div>
        </div>
    </el-dialog>
</template>

<style lang="scss" scoped>
.manage4 {
    width: 100%;
    height: 100%;
    box-sizing: border-box;
    display: flex;
    flex-direction: column;

    .left {
        width: fit-content;
        padding: 10px 25px;
        border-radius: 10px;
        font-size: 20px;
        color: #fff;
        background: #5B97FF;
        cursor: pointer;
        position: absolute;
        right: 20px;
        top: 20px;
        z-index: 10;
    }

    &-content {
        width: 100%;
        height: 100%;
        padding: 10px 20px;
        box-sizing: border-box;
        display: flex;

        &-box {
            position: relative;
            flex: 1;
            background: url('@/assets/images/dragLine.png') no-repeat center/auto 95%, url('@/assets/images/dragLinex.png') no-repeat center/95% auto;
            margin: 0 40px;

            .box {
                width: 120px;
                height: 120px;
                border-radius: 10px;
                position: absolute;
                background-color: #D8D8D8;
            }

            .right {
                &::before {
                    content: '';
                    display: block;
                    width: 24px;
                    height: 24px;
                    background: url('@/assets/images/right.png') no-repeat center/100%;
                    position: absolute;
                    right: 0;
                    bottom: 5px;
                }
            }

            .errorborder {
                border: 3px solid #FF3535;
            }

        }

        &-selectbox {
            width: 400px;
            height: 100%;
            display: flex;
            flex-direction: column;
            align-items: center;
            justify-content: center;
            flex-wrap: wrap;
        }

    }

    &-footer {
        margin-top: 5px;

        .submit,
        .reset {
            height: 40px;
            cursor: pointer;
            border-radius: 10px;
            display: flex;
            justify-content: center;
            align-items: center;
            margin-top: 10px;
            background: #D9D9D9;
            font-size: 22px;
            color: #666;
        }

        .can {
            color: #333;
            background: linear-gradient(90deg, #61FFC0 -21%, #54F1EE 115%);
        }
    }
}

.selectitem {
    width: 120px;
    height: 120px;
    border-radius: 10px;
    margin: 10px;
    cursor: move;
    transition: transform 0.3s ease;

    &:hover {
        transform: scale(1.1);
    }
}

.box {
    width: 120px;
    height: 120px;
    border-radius: 10px;
    position: absolute;
    background-color: #D8D8D8;
    transition: all 0.3s ease;
    border: 2px solid transparent;

    &.box-hover {
        border: 4px solid #5B97FF;
        background-color: #E0F3FF;
    }
}

.choiceItem {
    background: linear-gradient(90deg, #5DFAD0 0%, #54F1EE 100%);
}

.item_hover {
    border: 4px solid #5B97FF;
}
</style>