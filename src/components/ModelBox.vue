<script setup lang="ts">
import {
    ElDivider,
    ElCard,
    ElIcon,
    ElTooltip,
    ElImage,
    ElCarousel,
    ElCarouselItem,
    ElEmpty,
    vLoading,
    ElLoading,
} from 'element-plus';
import {
    CircleCheck,
    CircleClose,
    VideoPause
} from "@element-plus/icons-vue";
import { computed, ref } from 'vue';
import type { IModelData } from '@/stores/generator';
import { useIntersectionObserver } from '@vueuse/core';
const props = defineProps<{
        model: IModelData;
}>();

const status = computed(() => {
    if (props.model.count === 0) {
        return "Offline";
    }
    if (props.model.queued === 0) {
        return "Standby";
    }
    return "Online";
})

const imageRef = ref(null);
const shouldRender = ref(false);
useIntersectionObserver(
    imageRef,
    ([{ isIntersecting }]) => {
        shouldRender.value = isIntersecting;
    }, {
        rootMargin: '500px',
    }
);
</script>

<template>
    <el-card class="model-box" :body-style="{ padding: '0px' }" ref="imageRef">
        <div v-if="model.nsfw" :class="{ 'ribbon ribbon-top-right': model.nsfw }">
            <span class="ribbonSpan">NSFW</span>
        </div>
        <div v-if="shouldRender && model.nsfw != true">
            <el-carousel
                style="width: 100%; margin: 0"
                :autoplay="false"
                indicator-position="none"
                v-if="model.showcases"
                :arrow="model.showcases.length === 1 ? 'never' : 'always'"
                v-loading=""
            >
                <el-carousel-item v-for="showcase in model.showcases" :key="showcase">
                    <el-image :src="showcase">
                        <template #placeholder>
                            <div v-loading="true" element-loading-text="Загрузка..." style="height: 300px"></div>
                        </template>
                    </el-image>
                </el-carousel-item>
            </el-carousel>
            <el-empty v-else description="Предпросмотр не найден!" />
        </div>
        <div v-else style="height: 300px"></div>
        <div style="padding: 20px">
            <div style="display: flex; justify-content:space-between; font-size: 16px;">
                <div class="card-header">
                    <el-tooltip
                        :content="status"
                        placement="top"
                    >
                        <el-icon :size="20" color="red"    v-if="model.count === 0"><CircleClose /></el-icon>
                        <el-icon :size="20" color="orange" v-else-if="model.queued === 0"><VideoPause /></el-icon>
                        <el-icon :size="20" color="green"  v-else><CircleCheck /></el-icon>
                    </el-tooltip>
                    <span style="margin-left: 0.5rem">{{model.name}}</span>
                </div>
                <slot name="header"></slot>
            </div>
            <div>Сейчас <strong>{{model.count}}</strong> работников работают с этой моделью</div>
            <div>Сейчас в очереди <strong>{{Math.floor((model.queued || 0) / 10_000) / 100}}</strong> MPS</div>
            <div>Средняя скорость <strong>{{Math.floor((model.performance || 0) / 10_000) / 100}}</strong> MPS/s</div>
            <div>Ожидается что понадобиться <strong>{{model.eta}}s</strong> чтобы исполнить всю очередь</div>
            <div></div>
            <div>Стиль этой модели - <strong>{{model.style}}</strong></div>
            <div v-if="model.nsfw">Эта модель может изображать непристойности.</div>
            <el-divider v-if="model.description" style="margin: 10px 0" />
            <div class="small-font">{{model.description}}</div>
        </div>
    </el-card>
</template>

<style scoped>
    .card-header {
        display: flex;
        align-items: center;
        font-weight: 800;
    }

    .small-font {
        font-style: oblique;
        font-size: 12px;
    }

    .model-box {
        min-height: 100%;
    }
    
    .ribbon-top-right {
        top: -10px;
        right: -73%;
    }
    .ribbon-top-right::before,
    .ribbon-top-right::after {
        border-top-color: transparent;
        border-right-color: transparent;
    }
    .ribbon-top-right::before {
        top: 0;
        left: 0;
    }
    .ribbon-top-right::after {
        bottom: 0;
        right: 0;
    }
    .ribbon-top-right .ribbonSpan {
        left: -25px;
        top: 30px;
        transform: rotate(45deg);
    }
    .ribbon {
        position: relative;
        overflow: visible;
        z-index: 10;
    }
    .ribbon::before,
    .ribbon::after {
        position: absolute;
        z-index: -1;
        content: '';
        display: block;
        border: 5px solid #3f0000;
    }
    .ribbon .ribbonSpan {
        position: absolute;
        display: block;
        width: 225px;
        padding: 2px 0;
        background-color: #c10000;
        box-shadow: 0 5px 10px rgb(0 0 0 / 10%);
        color: #fff;
        text-shadow: 0 1px 1px rgb(0 0 0 / 20%);
        text-transform: uppercase;
        text-align: center;
        font-weight: bolder;
        font-family: system-ui;
        font-size: 30px;
    }

</style>