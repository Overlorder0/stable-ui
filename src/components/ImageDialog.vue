<script setup lang="ts">
import {
    ElDialog,
} from 'element-plus';
import { SwipeDirection, useSwipe } from '@vueuse/core';
import ImageActions from '../components/ImageActions.vue';
import { computed, ref, watch } from 'vue';
import { useUIStore } from '@/stores/ui';
import { useOutputStore } from '@/stores/outputs';
import { db } from '@/utils/db';

const store = useOutputStore();
const uiStore = useUIStore();

const target = ref();
useSwipe(target, {
    onSwipeEnd(e: TouchEvent, direction: SwipeDirection) {
        if (direction === "RIGHT") uiStore.openModalToLeft()
        if (direction === "LEFT") uiStore.openModalToRight()
    },
});

const modalOpen = computed({
    get() {
        return uiStore.activeModal !== -1;
    },
    set() {
        uiStore.activeModal = -1;
    }
});

const currentOutput = ref(store.currentOutputs[0]);

watch(
    () => uiStore.activeModal,
    async () => {
        const output = store.currentOutputs.find(el => el.id === uiStore.activeModal);
        if (output) return currentOutput.value = output;
        currentOutput.value = await db.outputs.get(uiStore.activeModal) || store.currentOutputs[0];
    }
)

function handleClose() {
    modalOpen.value = false;
}
</script>

<template>
    <el-dialog
        :model-value="modalOpen"
        :width="currentOutput?.width"
        class="image-viewer"
        @closed="handleClose"
        align-center
    >
        <div class="main-output-container" ref="target">
            <!-- Loads the image instantly -->
            <div class="main-output" :style="{
                backgroundImage: `url(${currentOutput.image})`,
                backgroundSize: 'contain',
                backgroundRepeat: 'no-repeat',
                backgroundPosition: 'center center',
            }" />
        </div>
        <div style="font-size: 18px; font-weight: 500;">{{currentOutput.prompt?.split("###")[0] || 'Unkown Creation'}}</div>
        <div style="font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif; letter-spacing: 0.025em;">
            <div>Отрицательный запрос: {{currentOutput.prompt?.split("###")[1] || "None"}}</div>
            <span>Модель: {{currentOutput.modelName || "Unknown"}} - </span>
            <span>Сэмплер: {{currentOutput.sampler_name || "Unknown"}} - </span>
            <span>Тип контроля: {{currentOutput.control_type || "none"}} - </span>
            <span>Сид: {{currentOutput.seed || "Unknown"}} - </span>
            <span>Шагов: {{currentOutput.steps || "Unknown"}} - </span>
            <span>Следование: {{currentOutput.cfg_scale || "Unknown"}} - </span>
            <span>Clip пропуск: {{currentOutput.clip_skip || "Unknown"}} - </span>
            <span>Разрешение: {{currentOutput.width || "???"}}x{{currentOutput.height || "???"}} - </span>
            <span>Karras: {{currentOutput.karras || false}} - </span>
            <span>Плиточность: {{currentOutput.tiling || false}} - </span>
            <span>Hi-Res фикс: {{currentOutput.hires_fix || false}}</span>
            <div v-if="currentOutput.post_processing?.length">Пост-обработка: {{(currentOutput.post_processing || []).join(", ") || "None"}}</div>
            <div>Сгенерированно работником: {{currentOutput.workerName || "Unknown"}} <em>{{currentOutput.workerID ? `(${currentOutput.workerID})` : ''}}</em></div>
        </div>
        <div>
            <ImageActions :image-data="currentOutput" />
        </div>
    </el-dialog>
</template>

<style>
.main-output-container {
    display: flex;
    justify-content: center;
    background-color: var(--el-fill-color-light);
}

.main-output {
    width: 100%;
    height: 512px;
    max-height: 100%;
}

.image-viewer {
    width: 100%;
    max-width: 1024px;
    height: 72vh;
    display: flex;
    flex-direction: column;
}

.image-viewer > .el-dialog__header {
    padding: 26px;
}

.image-viewer > .el-dialog__body {
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    gap: 10px;
    text-align: center;
    word-break: keep-all;
    overflow-y: scroll;
    padding-top: 0;
    height: 100%;
}

@media only screen and (max-width: 1280px) {
    .image-viewer {
        width: 720px;
    }
}

@media only screen and (max-width: 768px) {
    .image-viewer {
        width: 100%;
        height: 80vh;
    }

    .main-output {
        width: 100%;
        height: 40vh;
    }
}
</style>
