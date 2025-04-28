<script setup>
import { ref, onMounted, computed, watch } from 'vue';
import { getImgSrc } from '@/utils/getimgsrc'
import Scale from '@/components/Scale.vue'
const Bsdata = [
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
]
const data = ref([])
const positions = [
    { id: 1, left: '1020px', top: '540px' },
    { id: 2, left: '760px', top: '410px' },
    { id: 3, left: '290px', top: '20px' },
    { id: 4, left: '1020px', top: '410px' },
    { id: 5, left: '290px', top: '150px' },
    { id: 6, left: '760px', top: '540px' },
    { id: 7, left: '290px', top: '280px' },
    { id: 8, left: '420px', top: '540px' },
    { id: 9, left: '890px', top: '410px' },
    { id: 10, left: '160px', top: '540px' },
    { id: 11, left: '290px', top: '540px' },
    { id: 12, left: '890px', top: '540px' },
    { id: 13, left: '420px', top: '410px' },
    { id: 14, left: '620px', top: '330px' },
    { id: 15, left: '30px', top: '540px' },
    { id: 16, left: '290px', top: '410px' },
    { id: 17, left: '620px', top: '460px' },
    { id: 18, left: '760px', top: '260px' },
    { id: 19, left: '420px', top: '150px' },
    { id: 20, left: '420px', top: '280px' },
]
const choice_data = ref([])

const tag = Bsdata.sort(() => Math.random() - 0.5)
data.value = tag.slice(0,15)
choice_data.value = tag.slice(15,21).map(item=>item.id)

const showTip = ref(true)// 提示框

// -----------拖拽模块
let anwserbox = null//放答案的盒子
let timer//拖拽的定时器
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
    // 必须是答题框才能判断是否正确
    if (!anwserbox.includes(oElement) || choice_data.value.includes(oElement.dataset.id) || timer) {
        cloneNode = null
        return
    }

    if (oElement.dataset.id == cloneNode.dataset.id || positions[oElement.dataset.id - 1].left == positions[cloneNode.dataset.id - 1].left) {
        choice_data.value.push(+cloneNode.dataset.id)
        // oElement.style.background = `url(${getImgSrc('drag' + cloneNode.dataset.id + '.png')}) no-repeat center/ 100% 100%`
    } else {
        ElMessage.error('错误噢，再试试看~')
        oElement.classList.add('errorborder')
        oElement.style.background = `url(${getImgSrc('drag' + cloneNode.dataset.id + '.png')}) no-repeat center/ 100% 100%`
        let count = 0
        timer = setInterval(() => {
            oElement.classList.toggle('errorborder')
            count++
            if (count === 5) {
                oElement.style.background = '#D8D8D8'
                clearInterval(timer)
                oElement.classList.remove('errorborder')
                timer = null
            }
        }, 300)
    }
    cloneNode = null
}


watch(choice_data.value, (newVal) => {
    if (newVal.length == Bsdata.length) {
        endDialog.value = true
    }
})
// 结束对话框
const endDialog = ref(false)
function reset() {
    endDialog.value = false
    const tag = Bsdata.sort(() => Math.random() - 0.5)
    data.value = tag.slice(0, 16)
    choice_data.value = tag.slice(16, 21).map(item => item.id)
}
</script>

<template>
    <Scale :designDraftWidth="1440" :designDraftHeight="1040"
        backGround="linear-gradient(180deg, #FFEFF4 0%, #E0F3FF 100%)">
        <div class="manage4">
            <div class="manage4-bar">
                <div @click="showTip = true" class="left">教程</div>
            </div>
            <div class="manage4-content">
                <div class="manage4-content-box">
                    <div v-for="(item) in positions" :data-id="item.id" :key="item" class="box"
                        :style="{ left: item.left, top: item.top, background: choice_data.includes(item.id) ? `url(${getImgSrc('drag' + item.id + '.png')}) no-repeat center/ 100% 100%` : '#D8D8D8' }">
                        <!-- <div v-if="choice_data.includes(item.id)"
                            :style="{ width: '100%', height: '100%', background: `url(${getImgSrc('drag' + item.id + '.png')}) no-repeat center/ 100% 100%` }">
                        </div> -->
                    </div>
                    <div style="font-size: 36px;color: #333;position: absolute;left: -50px;bottom: 60px;">直线</div>
                    <div style="font-size: 36px;color: #333;position: absolute;right: 50px;bottom: 60px;">曲线</div>
                </div>
                <div class="manage4-content-selectbox">
                    <div v-for="item in data" :key="item" v-show="!choice_data.includes(item.id)"
                        :style="{ background: `url(${getImgSrc('drag' + item.id + '.png')}) no-repeat center/ 100% 100%` }"
                        v-drag="{ isrightFun }" class="selectitem" :data-id="item.id">
                    </div>
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
            <img width="100%" src="@/assets/audio/drag2.gif" alt="">
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
    }

    &-content {
        width: 100%;
        height: 100%;
        padding: 10px 20px;
        box-sizing: border-box;
        display: flex;
        flex-direction: column;

        &-box {
            position: relative;
            flex: 1;
            background: url('@/assets/images/dragLine2.png') no-repeat center bottom/100% auto;
            margin: 0 40px;

            .box {
                width: 120px;
                height: 120px;
                border-radius: 10px;
                position: absolute;
                background-color: #D8D8D8;
            }

            .errorborder {
                border: 3px solid #FF3535;
            }

        }

        &-selectbox {
            height: 300px;
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
    font-size: 14px;
    color: #333;
    margin-top: 10px;
    cursor: grab;
}

.choiceItem {
    background: linear-gradient(90deg, #5DFAD0 0%, #54F1EE 100%);
}
</style>