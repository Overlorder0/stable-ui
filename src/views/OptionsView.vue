<script setup lang="ts">
import {
    ElForm,
    ElFormItem,
    ElInput,
    ElButton,
    type UploadFile,
    ElIcon,
    ElUpload,
    ElTabs,
    ElTabPane,
    ElTooltip,
    ElLoading,
    vLoading,
    ElMessage,
} from 'element-plus';
import {
    UploadFilled,
    Download
} from '@element-plus/icons-vue';
import { useOptionsStore } from '@/stores/options';
import { useWorkerStore } from '@/stores/workers';
import { useTagsStore } from '@/stores/tags';
import type { BasicColorSchema } from '@vueuse/core';
import FormSlider from '../components/FormSlider.vue';
import FormSelect from '../components/FormSelect.vue';
import FormRadio from '../components/FormRadio.vue';
import { ref } from 'vue';
import { useOutputStore } from '@/stores/outputs';
import { downloadMultipleImages } from '@/utils/download';
import { db } from '@/utils/db';

const tagStore = useTagsStore();
const store = useOptionsStore();
const outputsStore = useOutputStore();
const workerStore = useWorkerStore();

interface ColorModeOption {
    value: BasicColorSchema;
    label: string;
}

const options: ColorModeOption[] = [
    {
        value: 'dark',
        label: 'Dark',
    }, {
        value: 'light',
        label: 'Light',
    }, {
        value: 'auto',
        label: 'Auto',
    }
]

const fileList = ref([]);
const upload = ref();
const downloading = ref(false);
const downloaded = ref(0);

async function handleChange(uploadFile: UploadFile) {
    outputsStore.importFromZip(uploadFile);
    upload.value!.clearFiles();
}

async function bulkDownload() {
    ElMessage({
        message: `Downloading ${outputsStore.outputsLength} image(s)... (this may take a while)`,
        type: 'info',
    })
    downloading.value = true;
    downloaded.value = 0;

    const selectedOutputs = await db.outputs.toCollection().primaryKeys();
    await downloadMultipleImages(selectedOutputs, false, () => { downloaded.value++ });

    downloading.value = false;
    downloaded.value = 0;
}

async function onTagsChange() {
    if (tagStore.tagsTypes[tagStore.currentTagsType].tags.length !== 0) return;
    tagStore.loadTags(tagStore.currentTagsType);
}
</script>

<template>
    <h1>Настройки</h1>
    <el-form
        label-position="top"
        :model="store.options"
        @submit.prevent
    >
        <el-tabs type="border-card" style="min-height: 50vh;">
            <el-tab-pane label="🖨️ Генерация">
                <h2>Настройки генерации</h2>
                <el-form-item label="API ключ (регистрация - https://stablehorde.net/register)" prop="apiKey">
                    <el-input
                        v-model="store.apiKey"
                        type="password"
                        placeholder="Enter API Key Here"
                        autocomplete="off"
                        class="apikey"
                        show-password
                    />
                    <el-button class="anon" @click="store.useAnon()">Аноним?</el-button>
                </el-form-item>
                <form-select label="Автодополнение тегов" prop="tagAutocomplete" v-model="tagStore.currentTagsType" :options="tagStore.possibleTags" @change="onTagsChange" v-loading="tagStore.tagsLoading" info="Начните вводить тег, ориентируйтесь стрелками вверх-вниз и выберите подходящий тег из списка клавишей Ввод" />
                <form-select label="Использовать одного работника" prop="worker" v-model="store.useWorker" :options="['Выбрать', ...workerStore.workers.map(el => {return {label: `${el.name} (${el.performance?.split(' ')[0]} MPS/s, ${Math.floor(Math.sqrt(el.max_pixels || 0))}x${Math.floor(Math.sqrt(el.max_pixels || 0))})`, value: el.id}}).sort((a,b) => (a.label || '').localeCompare(b.label || ''))]" filterable />
                <form-radio  label="Большие значения" prop="allowLargerParams" v-model="store.allowLargerParams" :options="['Enabled', 'Disabled']" info="У каджита есть товар, если у тебя есть монеты, друг. (открывает большие разрешения и число шагов при наличии большого числа очков)" :disabled="store.apiKey === '0000000000' || store.apiKey === ''" />
                <form-radio  label="Делиться изображениями с LAION" prop="shareWithLaion" v-model="store.shareWithLaion" :options="['Enabled', 'Disabled']" info="Автоматически и анонимно отправляет создаваемые изображения в некоммерческий фонд LAION для дополнения их датасетов, на которых и обучаются модели вроде Stable Diffusion. ЗАМЕТКА: эта опция включена по умолчанию для анонимных пользователей." :disabled="store.apiKey === '0000000000' || store.apiKey === ''" />
            </el-tab-pane>
            <el-tab-pane label="📷 Галерея">
                <h2>Настройки галереи</h2>
                <form-slider label="Картинок на странице" prop="pageSize" v-model="store.pageSize" :min="10" :max="50" :step="5" :disabled="store.pageless === 'Enabled'" />
                <form-radio  label="Бесстраничный формат" prop="pageless" v-model="store.pageless" :options="['Enabled', 'Disabled']" />
                <form-radio  label="Автопрокрутка" prop="autoCarousel" v-model="store.autoCarousel" :options="['Enabled', 'Disabled']" />
                <form-radio  label="Формат скачиваемых изображений" prop="downloadType" v-model="store.imageDownloadType" :options="['WEBP', 'PNG', 'JPG']" />
                <el-form-item label="Экспорт галереи (ZIP архив)">
                    <el-button :icon="Download" @click="bulkDownload()" v-if="!downloading">Скачать {{outputsStore.outputsLength}} картин(ок)</el-button>
                    <el-button :icon="Download" disabled v-else>Загрузка... ({{downloaded}} / {{outputsStore.outputsLength}} картин(ок))</el-button>
                </el-form-item>
                <el-form-item label="Импорт галереи (ZIP архив)">
                    <el-upload
                        drag
                        ref="upload"
                        :auto-upload="false"
                        @change="handleChange"
                        :file-list="fileList"
                        :limit="1"
                        multiple
                    >
                        <el-icon :size="100"><upload-filled /></el-icon>
                        <div>Перетащите файл сюда ИЛИ <em>нажмите для поиска</em></div>
                    </el-upload>
                </el-form-item>
            </el-tab-pane>
            <el-tab-pane label="⚙️ Общее">
                <h2>Общие настройки</h2>
                <form-select label="Цветовая палитра" prop="colorScheme" v-model="store.options.colorMode" :options="options" />
            </el-tab-pane>
        </el-tabs>
    </el-form>
</template>  

<style scoped>
.anon {
    width: 80px
}

.el-tab-pane {
    max-width: 600px;
}

h2 {
    margin-top: 0
}

.apikey {
    width: calc(100% - 80px)
}

@media only screen and (max-width: 1000px) {
    .anon {
        width: 80px
    }

    .apikey {
        width: 100%
    }
}
</style>