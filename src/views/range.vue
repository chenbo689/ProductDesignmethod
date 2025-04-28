<script setup>
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import { getImgSrc } from '@/utils/getimgsrc'
import Scale from '@/components/Scale.vue'
import successAudio from '@/assets/audio/rightanswer.mp3';
import failureAudio from '@/assets/audio/Failed.mp3';
import challengeSuccessAudio from '@/assets/audio/success.mp3';
import errorAnswerAudio from '@/assets/audio/errorAnswer.mp3';
import noFillEndAudio from '@/assets/audio/noFillEnd.wav';
import toggleAudio from '@/assets/audio/toggleAudio.mp3';
// 定义音效文件路径并创建Audio对象
const successSound = new Audio(successAudio);
const failureSound = new Audio(failureAudio);
const challengeSuccessSound = new Audio(challengeSuccessAudio);
const errorAnswerSound = new Audio(errorAnswerAudio);
const noFillEndSound = new Audio(noFillEndAudio);
const toggleSound = new Audio(toggleAudio);
// 是否放声音
const isSound = ref(true)
function toggle() {
    playSound(toggleSound)
    isSound.value = !isSound.value
}
function playSound(sound) {
    if (isSound.value) {
        sound.currentTime = 0
        sound.play()
    }
}
const router = useRouter()

const data = ref([
    { id: 0, url: 'range1.png' },
    { id: 1, url: 'range2.png' },
    {
        id: 2, url: 'range3.png'
    },
    {
        id: 3, url: 'range4.png'
    },
    { id: 4, url: 'range5.png' },
    { id: 5, url: 'range6.png' },
    {
        id: 6, url: 'range7.png'
    },
    {
        id: 7, url: 'range8.png'
    },
    {
        id: 8, url: 'range9.png'
    },
    {
        id: 9, url: 'range10.png'
    }
])

data.value = data.value.sort(() => Math.random() - 0.5)
const choiceList = ref([])
const choiceClass = ref(['one', 'tow', 'three', 'four', 'five', 'six', 'seven', 'eight', 'night', 'ten'])
// 选择选项
function choiceContent(index) {
    playSound(successSound)
    if (choiceList.value.includes(index)) {
        choiceList.value = choiceList.value.filter(item => item !== index)
        return;
    }
    choiceList.value.push(index)
}
// ---------展示详情内容
const showDetail = ref(false)// 查看详情
const showConetnt = ref('')// 查看内容
function getDetail(content) {
    console.log(content);
    
    showConetnt.value = content
    showDetail.value = true
}
// 提交
const endDialog = ref(false)// 结束弹窗
const isright = ref(false)// 是否正确
const checkAnwser = ref(false)// 是否查看答案

function submit() {
    if (choiceList.value.length !== data.value.length) {
        playSound(noFillEndSound)
        return ElMessage.error('请完成后再提交')
    }
    // 判断是否正确
    endDialog.value = true
    if (choiceList.value.map(item => data.value[item].id).join('') === '0123456789') {
        isright.value = true
        playSound(challengeSuccessSound)
    } else {
        isright.value = false
        playSound(failureSound)
    }
}
function check() {
    endDialog.value = false
    checkAnwser.value = true
    choiceList.value = []
}

// 重置
function reset() {
    choiceList.value = []
    data.value = data.value.sort(() => Math.random() - 0.5)
    endDialog.value = false
    checkAnwser.value = false
}

const showTip = ref(true)// 提示框
</script>

<template>
    <Scale :designDraftWidth="375" :designDraftHeight="812"
        backGround="linear-gradient(180deg, #FFD8D8 0%, #FFF9D5 100%)">
        <div class="manage8">
            <div class="manage8-title">请按顺序点击文段进行排序</div>
            <div class="manage8-bar">
                <div @click="showTip = true" class="left">教学视频</div>
                <div class="right">
                    <img @click="toggle" v-if="isSound" src="@/assets/images/onmusic.png" alt="">
                    <img @click="toggle" style="width: 20px;height: 20px;" v-else src="@/assets/images/offmusic.png"
                        alt="">
                </div>
            </div>
            <div class="manage8-content">
                <div @click="choiceContent(index)" v-for="(item, index) in data" :key="item.id"
                    :style="{background: `url(${getImgSrc(item.url)}) no-repeat center/ 103% 103%`}"
                    :class="['boxcontent', choiceList.includes(index) ? choiceClass[choiceList.indexOf(index)] : checkAnwser ? choiceClass[item.id] : '']">
                    <!-- <img :src="" style="width: 100%;height: 100%;" alt=""> -->
                    <div @click.stop="getDetail(getImgSrc(item.url))" class="bottom">查看详情</div>
                </div>
            </div>
            <div class="manage8-footer">
                <div @click="submit" v-show="!checkAnwser" :class="['submit']">提交
                </div>
                <div @click="reset" v-show="checkAnwser" class="reset can">再来一次</div>
            </div>
        </div>
    </Scale>

    <el-dialog destroy-on-close width="350px" v-model="showTip" :show-close="false">
        <div style="display: flex;flex-direction: column;align-items: center;">
            <!-- <video width="100%" loop autoplay muted>
                <source src="@/assets/video/range.mp4" type="video/mp4">
                您的浏览器不支持HTML5视频标签。
            </video> -->
            <img width="100%" src="@/assets/audio/range.gif" alt="">
            <button
                style="margin: 26px 0;border: none;font-weight: bold;padding: 10px 40px; background: linear-gradient(90deg, #FFED79 -15%, #FF6666 115%);border-radius: 21px;"
                size="large" @click="showTip = !showTip"><span
                    style="color: #3C0000;font-size: 14px;cursor: pointer;">我已知晓，开始练习</span></button>
        </div>
    </el-dialog>
    <el-dialog destroy-on-close v-model="showDetail" width="350px" :show-close="false">
        <div :style="{ width: '315px', height: '360px', background: `url(${showConetnt}) no-repeat center/100% 100%`}">
        </div>
        <div style="text-align: center;margin: 10px 0;">
            <!-- <img @click="showDetail = false" style="cursor: pointer;" src="@/assets/images/close.svg" alt=""> -->
        </div>
    </el-dialog>
    <el-dialog destroy-on-close v-model="endDialog" width="260px" :show-close="false">
        <div
            style="display: flex;font-size: 16px;flex-direction: column;color:#000;justify-content: center;align-items: center;text-align: center;">
            <img v-if="isright" style="width: 40px;" src="@/assets/images/right.png" alt="">
            <img v-else style="width: 40px;" src="@/assets/images/error.png" alt="">
            <div style="margin: 10px 0;" v-if="isright">恭喜你回答正确</div>
            <div style="margin-top: 10px;" v-else>
                <div style="font-weight: bold;">回答错误</div>
                <div @click="check" style="font-size: 14px;text-decoration: underline;cursor: pointer;
                color: #999;margin: 10px 0;">查看答案</div>
            </div>
            <div style="display: flex;justify-content: center;">
                <div @click="reset" style="padding: 11px 25px;cursor: pointer;font-weight: bold;color: #3C0000;border-radius: 30px;
                    background: linear-gradient(90deg, #FFDC77 -15%, #FF7869 115%);">
                    再来一次</div>
            </div>
        </div>
    </el-dialog>
</template>

<style lang="scss" scoped>
.manage8 {
    width: 100%;
    height: 100%;
    box-sizing: border-box;
    padding: 0 10px;
    &-title {
        font-size: 22px;
        font-weight: bold;
        font-family: Alimama ShuHeiTi;
        text-align: center;
        margin-top: 40px;
        color: #3C0000;
    }

    &-bar {
        width: 100%;
        height: 50px;
        display: flex;
        justify-content: space-between;
        align-items: center;
        margin-top: 10px;
        padding: 0 20px;
        box-sizing: border-box;

        .left {
            font-size: 14px;
            color: #E64C2E;
            text-decoration: underline;
            font-size: 14px;
            cursor: pointer;
        }

        .right {
            img {
                width: 15px;
                height: 15px;
                cursor: pointer;
            }
        }
    }

    &-content {
        width: 100%;
        height: 542px;
        border-radius: 32px;
        background: #fff;
        padding: 10px;
        box-sizing: border-box;
        display: flex;
        flex-wrap: wrap;
        justify-content: space-evenly;
        align-items: center;
        gap: 5px;
        .boxcontent {
            width: 106px;
            height: 120px;
            background: #f5f5f5;
            border-radius: 10px;
            display: flex;
            flex-direction: column;
            justify-content: space-between;
            align-items: center;
            box-sizing: border-box;
            cursor: pointer;
            position: relative;
            border: 1px solid #63786D;
            .bottom {
                font-size: 14px;
                color: #333333;
                cursor: pointer;
                font-weight: bolder;
                font-family: Alimama ShuHeiTi;
                position: absolute;
                bottom: 30px;
            }
        }

        .one,
        .tow,
        .three,
        .four,.five,.six,.seven,.eight,.night,.ten {
            background-color: #fff;

            &::before {
                content: '';
                position: absolute;
                display: block;
                top: 0;
                left: 0;
                color: #fff;
                border-radius: 8px 0px 8.5px 0px;
                width: 25px;
                height: 17px;
                text-align: center;
            }
        }

        .one {
            border: 2px solid #DD0000;

            &::before {
                content: '1';
                background: #DD0000;
            }
        }

        .tow {
            border: 2px solid #FF7A00;

            &::before {
                content: '2';
                background: #FF7A00;
            }
        }

        .three {
            border: 2px solid #FFE500;

            &::before {
                content: '3';
                background: #FFE500;
            }
        }

        .four {
            border: 2px solid #00B3FF;

            &::before {
                content: '4';
                background: #00B3FF;
            }
        }
        .five {
            border: 2px solid #00DD3B;

            &::before {
                content: '5';
                background: #00DD3B;
            }
        }

        .six {
            border: 2px solid #B634A4;

            &::before {
                content: '6';
                background: #B634A4;
            }
        }

        .seven {
            border: 2px solid #314D99;

            &::before {
                content: '7';
                background: #314D99;
            }
        }

        .eight {
            border: 2px solid #C08B5B;

            &::before {
                content: '8';
                background: #C08B5B;
            }
        }
        .night {
            border: 2px solid #8D864C;

            &::before {
                content: '9';
                background: #8D864C;
            }
        }
        .ten {
            border: 2px solid #51A668;

            &::before {
                content: '10';
                background: #51A668;
            }
        }
    }

    &-footer {
        height: 100px;
        display: flex;
        flex-direction: column;
        justify-content: center;
        margin-top: 5px;

        .submit,
        .reset {
            height: 40px;
            cursor: pointer;
            border-radius: 29px;
            display: flex;
            justify-content: center;
            align-items: center;
            margin-top: 10px;
            font-size: 22px;
            color: #B9884C;
            background: #FFDE9D;
        }
        .can{
            background: linear-gradient(270deg, #FF4C33 1%, #FFC22C 100%);
            color: rgba(255, 255, 255, 1);
        }
    }
}
</style>