<script setup lang="ts">
import type { RatePostInput } from '@/types/ratings';
import {
    ElButton,
    vLoading,
    ElRate,
    ElImage
} from 'element-plus';
import { ref } from 'vue';

const props = defineProps<{
    id: string;
    imageSource?: string;
    submitted: boolean;
    iconSize?: string;
}>();

const emit = defineEmits<{
    (e: 'onRatingSubmit', rating: RatePostInput, id: string): void;
}>();

const artifactDescriptions = [
    null,
    "Без огрехов",
    "Почти не заметны",
    "Небольшие огрехи",
    "Заметные огрехи",
    "Большие огрехи",
    "Ужасно",
]

const getDefaultRatings = () => ({
    rating: 5,
    artifacts: 1,
})

const currentRating = ref(getDefaultRatings());
const showImage = ref(false);

function onRatingSubmit() {
    emit(
        "onRatingSubmit",
        {
            ...currentRating.value,
            artifacts: currentRating.value.artifacts - 1,
        }, 
        props.id,
    );
    currentRating.value = getDefaultRatings();
    showImage.value = false;
}
</script>

<template>
    <div v-if="id" class="rate">
        <div v-if="imageSource">
            <el-image v-loading="!showImage" @load="() => showImage = true" :src="imageSource" class="rate-image" />
        </div>
        <div>
            <div>Как бы вы оценили эту картинку от 1 до 10?</div>
            <el-rate :max="10" v-model="currentRating.rating" />
        </div>
        <div>
            <div>Как бы вы оценили недостатки этой картинки? ({{ artifactDescriptions[currentRating.artifacts || 1] }})</div>
            <el-rate :max="6" v-model="currentRating.artifacts" />
        </div>
        <div><el-button style="height: 50px; width: 200px" @click="() => onRatingSubmit()" :disabled="submitted">Отправить</el-button></div>
    </div>
</template>

<style scoped>
.rate {
    display: flex;
    flex-direction: column;
    text-align: center;
    align-items: center;
    gap: 10px;
    margin-top: 10px;
}

:deep(.el-rate__icon) {
    font-size: v-bind("iconSize || '28px'") !important;
}

:deep(.el-image__inner) {
    object-fit: contain;
    width: 100%;
    max-width: 80vh;
    height: auto;
    box-shadow: 0 4px 6px -1px rgb(0 0 0 / 0.1), 0 2px 4px -2px rgb(0 0 0 / 0.1);
}

:deep(.el-image__wrapper) {
    text-align:center;
}
</style>