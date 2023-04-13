<script setup lang="ts">
import { computed, reactive, ref } from 'vue';
import { useGeneratorStore } from '@/stores/generator';
import {
    type FormRules,
    ElCollapse,
    ElCollapseItem,
    ElForm,
    ElButton,
    ElCard,
    ElMenu,
    vLoading,
    ElLoading,
    ElTooltip,
    ElRow,
    ElCol
} from 'element-plus';
import {
    Comment,
    PictureFilled,
    MagicStick,
} from '@element-plus/icons-vue';
import BrushFilled from '../components/icons/BrushFilled.vue';
import StarEdit24Regular from '../components/icons/StarEdit24Regular.vue';
import ImageSearch from '../components/icons/ImageSearch.vue';
import ImageProgress from '../components/ImageProgress.vue';
import FormSlider from '../components/FormSlider.vue';
import FormSelect from '../components/FormSelect.vue';
import FormInput from '../components/FormInput.vue';
import FormSwitch from '../components/FormSwitch.vue';
import FormModelSelect from '../components/FormModelSelect.vue';
import FormPromptInput from '../components/FormPromptInput.vue';
import GeneratedCarousel from '../components/GeneratedCarousel.vue'
import CustomCanvas from '../components/CustomCanvas.vue';
import GeneratorMenuItem from '../components/GeneratorMenuItem.vue';
import DialogList from '../components/DialogList.vue';
import RatingView from '../components/RatingView.vue';
import BaseLink from '../components/BaseLink.vue';
import { useUIStore } from '@/stores/ui';
import { useCanvasStore } from '@/stores/canvas';
import { useOptionsStore } from '@/stores/options';
import { breakpointsTailwind, useBreakpoints } from '@vueuse/core';
import handleUrlParams from "@/router/handleUrlParams";
import { useRatingStore } from '@/stores/rating';
import InterrogationView from '@/components/InterrogationView.vue';
import { useEllipsis } from '@/utils/useEllipsis';
import { useVideoStore } from '@/stores/video';
import { formatSeconds } from '@/utils/format';

const breakpoints = useBreakpoints(breakpointsTailwind);
const isMobile = breakpoints.smallerOrEqual('md');

const store = useGeneratorStore();
const uiStore = useUIStore();
const canvasStore = useCanvasStore();
const optionsStore = useOptionsStore();
const ratingStore = useRatingStore();
const videoStore = useVideoStore();
const { ellipsis } = useEllipsis();

const negativePromptLibrary = ref(false);

const samplerListLite = ["k_lms", "k_heun", "k_euler", "k_euler_a", "k_dpm_2", "k_dpm_2_a", "DDIM"]
const dpmSamplers = ['k_dpm_fast', 'k_dpm_adaptive', 'k_dpmpp_2m', 'k_dpmpp_2s_a', 'k_dpmpp_sde']

const availableSamplers = computed(() => {
    if (store.selectedModel === "stable_diffusion_2.0") return updateCurrentSampler(["dpmsolver"])
    if (store.generatorType === 'Text2Img') return updateCurrentSampler([...samplerListLite, ...dpmSamplers]);
    return updateCurrentSampler(samplerListLite);
})

const pendingRequests = computed(() => store.queue.filter(el => el.jobId === '' || !el.waitData));

const rules = reactive<FormRules>({
    prompt: [{
        required: true,
        message: 'Пожалуйста введите запрос',
        trigger: 'change'
    }],
    apiKey: [{
        required: true,
        message: 'Пожалуйста введите API ключ',
        trigger: 'change'
    }]
});

function updateCurrentSampler(newSamplers: string[]) {
    if (!store.params) return newSamplers;
    if (!store.params.sampler_name) return newSamplers;
    if (newSamplers.indexOf(store.params.sampler_name) === -1) {
        store.params.sampler_name = newSamplers[0] as any;
    }
    return newSamplers;
}

function formatEST(seconds: number) {
    return "Осталось: " + formatSeconds(seconds, true, { days: true, hours: true, minutes: true, seconds: true })
}

function disableBadge() {
    if (!store.validGeneratorTypes.includes(store.generatorType)) uiStore.showGeneratorBadge = false;
}

function onMenuChange(key: any) {
    store.generatorType = key;
    disableBadge();
    console.log(key)
}

function onDimensionsChange() {
    canvasStore.showCropPreview = true;
    canvasStore.updateCropPreview();
}

const availablePostProcessors = computed(() => {
    const upscalersDisabled = 
        store.postProcessors.includes("RealESRGAN_x4plus_anime_6B") ||
        store.postProcessors.includes("RealESRGAN_x4plus") ||
        store.postProcessors.includes("NMKD_Siax") ||
        store.postProcessors.includes("4x_AnimeSharp");

    const upscalerDisabled = (name: string) => !store.postProcessors.includes(name as any) && upscalersDisabled;

    return [
        "GFPGAN",
        "CodeFormers",
        { label: "RealESRGAN_x4plus", value: "RealESRGAN_x4plus", disabled: upscalerDisabled("RealESRGAN_x4plus") }, 
        { label: "RealESRGAN_x4plus_anime_6B", value: "RealESRGAN_x4plus_anime_6B", disabled: upscalerDisabled("RealESRGAN_x4plus_anime_6B") },
        { label: "NMKD_Siax", value: "NMKD_Siax", disabled: upscalerDisabled("NMKD_Siax") },
        { label: "4x_AnimeSharp", value: "4x_AnimeSharp", disabled: upscalerDisabled("4x_AnimeSharp") },
        "strip_background"
    ]
})

disableBadge();
handleUrlParams();
</script>

<template>
    <el-menu
        :default-active="store.generatorType"
        :collapse="true"
        @select="onMenuChange"
        :mode="isMobile ? 'horizontal' : 'vertical'"
        :class="isMobile ? 'mobile-generator-types' : 'generator-types'"
        :style="isMobile ? 'overflow-x: auto' : ''"
    >
        <GeneratorMenuItem index="Text2Img"      :icon-one="Comment"           :icon-two="PictureFilled" :isMobile="isMobile" />
        <GeneratorMenuItem index="Img2Img"       :icon-one="PictureFilled"     :icon-two="PictureFilled" :isMobile="isMobile" />
        <GeneratorMenuItem index="Inpainting"    :icon-one="BrushFilled"       :icon-two="PictureFilled" :isMobile="isMobile" />
        <GeneratorMenuItem index="Rating"        :icon-one="StarEdit24Regular" :isMobile="isMobile" />
        <GeneratorMenuItem index="Interrogation" :icon-one="ImageSearch"       :isMobile="isMobile" />
    </el-menu>
    <div class="form">
        <div v-if="store.generatorType === 'Rating'" style="padding-bottom: 50px;">
            <h1 style="margin: 0">Оценка изображений</h1>
            <div>Оценивайте картинки на основе своих предпочтений, чтобы получать очки и помочь <BaseLink href="https://laion.ai/">LAION</BaseLink>, некоммерческой организации, помогавшей в обучении Stable Diffusion!</div>
            <div v-if="optionsStore.apiKey === '0000000000' || optionsStore.apiKey === ''">Вы оценили <strong>{{ ratingStore.imagesRated }}</strong> картинок! <BaseLink router href="/options">Войдите</BaseLink> используя свой API ключ, чтобы получать очки.</div>
            <div v-else>За оценку <strong>{{ ratingStore.imagesRated }}</strong> картинок вы получили <strong>{{ ratingStore.kudosEarned }}</strong> очков!</div>
            <el-button
                @click="() => ratingStore.updateRatingInfo()"
                v-if="!ratingStore.currentRatingInfo.id"
                :disabled="ratingStore.submitted"
                style="margin-top: 10px"
                size="large"
            >{{ ratingStore.submitted ? "Загружаю картинку..." : "Начать оценку!"}}</el-button>
            <RatingView
                :id="ratingStore.currentRatingInfo.id || ''"
                :image-source="ratingStore.currentRatingInfo.url || ''"
                :submitted="ratingStore.submitted"
                @onRatingSubmit="ratingStore.submitRating"
            />
        </div>
        <div v-else-if="store.generatorType === 'Interrogation'" style="padding-bottom: 50px;">
            <h1 style="margin: 0">Обработка</h1>
            <div>Обработайте картинку, чтобы узнать её примерное описание и состав тегов</div>
            <InterrogationView />
        </div>
        <el-form
            label-position="left"
            label-width="140px"
            :model="store"
            class="container"
            :rules="rules"
            @submit.prevent
            v-else
        >
            <div class="sidebar">
                <el-collapse v-model="uiStore.activeCollapse" style="margin-bottom: 24px">
                    <el-collapse-item title="Настройки генерации" name="1">
                        <form-prompt-input />
                        <form-input
                            label="Отрицательный запрос"
                            prop="negativePrompt"
                            v-model="store.negativePrompt"
                            :autosize="{ maxRows: 15 }"
                            resize="vertical"
                            type="textarea"
                            placeholder="Введите то, что на картинке вы видеть не хотите и/или теги различных проблем изображения"
                            info="Не работает? Попробуйте повысить следование."
                            label-position="top"
                        >
                            <template #inline>
                                <el-button class="small-btn" style="margin-top: 2px" @click="() => store.pushToNegativeLibrary(store.negativePrompt)" text>Сохранить шаблон</el-button>
                                <el-button class="small-btn" style="margin-top: 2px" @click="() => negativePromptLibrary = true" text>Загрузить шаблон</el-button>
                            </template>
                        </form-input>
                        <form-input label="Сид" prop="seed" v-model="store.params.seed" placeholder="Введите сид или оставьте пустым для случайного">
                            <template #append>
                                <el-tooltip content="Создать!" placement="top">
                                    <el-button :icon="MagicStick" @click="() => store.params.seed = Math.abs((Math.random() * 2 ** 32) | 0).toString()" />
                                </el-tooltip>
                            </template>
                        </form-input>
                        <form-select label="Сэмплеры"        prop="samplers"        v-model="store.multiSelect.sampler.selected"     :options="availableSamplers"  info="Мульти-функция активна. k_heun и k_dpm_2 вдвое дороже и медленнее, но также вдвое лучше." multiple v-if="store.multiSelect.sampler.enabled" />
                        <form-select label="Сэмплер"           prop="sampler"         v-model="store.params.sampler_name"              :options="availableSamplers"  info="k_heun и k_dpm_2 вдвое дороже и медленнее, но также вдвое лучше." v-else />
                        <form-slider label="Размер пачки"        prop="batchSize"       v-model="store.params.n"                         :min="store.minImages"        :max="store.maxImages" />
                        <form-slider label="Числа шагов"          prop="multiSteps"      v-model="store.multiSelect.steps.selected"       :min="store.minSteps"         :max="store.maxSteps"      info="Мульти-функция активна. Придерживайтесь от 30 до 50 для оптимального времени генерации. Качество обычно достигает пика от 60 до 90 шагов." multiple v-if="store.multiSelect.steps.enabled" />
                        <form-slider label="Число шагов"             prop="steps"           v-model="store.params.steps"                     :min="store.minSteps"         :max="store.maxSteps"      info="Придерживайтесь от 30 до 50 для оптимального времени генерации. Качество обычно достигает пика от 60 до 90 шагов." v-else />
                        <form-slider label="Ширина"             prop="width"           v-model="store.params.width"                     :min="store.minDimensions"    :max="store.maxDimensions" :step="64"   :change="onDimensionsChange" />
                        <form-slider label="Высота"            prop="height"          v-model="store.params.height"                    :min="store.minDimensions"    :max="store.maxDimensions" :step="64"   :change="onDimensionsChange" />
                        <form-slider label="Следования"       prop="cfgScales"       v-model="store.multiSelect.guidance.selected"    :min="store.minCfgScale"      :max="store.maxCfgScale"   info="Мульти-функция активна. Чем выше значение, тем точнее ИИ придерживается вашего запроса. Меньшие значения способствуют креативности и разнообразию." multiple v-if="store.multiSelect.guidance.enabled" />
                        <form-slider label="Следование"          prop="cfgScale"        v-model="store.params.cfg_scale"                 :min="store.minCfgScale"      :max="store.maxCfgScale"   :step="0.5"  info="Чем выше значение, тем точнее ИИ придерживается вашего запроса. Меньшие значения способствуют креативности и разнообразию." v-else />
                        <form-slider label="CLIP Пропуски"      prop="clipSkips"       v-model="store.multiSelect.clipSkip.selected"    :min="store.minClipSkip"      :max="store.maxClipSkip"   info="Мульти-функция активна. Число слоёв CLIP которые будут игнорироваться. Нужно в исключительных случаях, например Anything Diffusion с CLIP пропуском в 2 работает лучше обычного." multiple v-if="store.multiSelect.clipSkip.enabled" />
                        <form-slider label="CLIP Пропуск"         prop="clipSkip"        v-model="store.params.clip_skip"                 :min="store.minClipSkip"      :max="store.maxClipSkip"   info="Число слоёв CLIP которые будут игнорироваться. Нужно в исключительных случаях, например Anything Diffusion с CLIP пропуском в 2 работает лучше обычного." v-else />
                        <form-slider label="Вес образца"     prop="denoise"         v-model="store.params.denoising_strength"        :min="store.minDenoise"       :max="store.maxDenoise"    :step="0.01" info="Чем выше значение, тем больше итоговая картинка будет похожа на изначальную." v-if="store.sourceGeneratorTypes.includes(store.generatorType)" />
                        <form-select label="Типы контроля"   prop="controlTypes"    v-model="store.multiSelect.controlType.selected" :options="store.availableControlTypes"                   info="Мульти-функция активна. Утраивает стоимость и время генерации взамен на значительно лучшую композицию изображения." multiple v-if="store.sourceGeneratorTypes.includes(store.generatorType) && store.multiSelect.controlType.enabled" />
                        <form-select label="Тип контроля"      prop="controlType"     v-model="store.controlType"                      :options="store.availableControlTypes"                   info="Утраивает стоимость и время генерации взамен на значительно лучшую композицию изображения." v-if="store.sourceGeneratorTypes.includes(store.generatorType) && !store.multiSelect.controlType.enabled" />
                        <form-model-select />
                        <form-select label="Пост-обработка"   prop="postProcess" v-model="store.postProcessors" :options="availablePostProcessors"  info="GPFGAN: Улучшает лица   RealESRGAN_x4plus: Увеличивает разрешение вчетверо   CodeFormers: Улучшает лица  RealESRGAN_x4plus_anime_6b: Увеличивает разрешение вчетверо, подстроен под аниме стиль     strip_background: Удаляет фон изображения" multiple />
                        <el-row>
                            <el-col :span="isMobile ? 24 : 12">
                                <form-switch label="Hi-res фикс"       prop="hiresFix" v-model="store.params.hires_fix" info="Может помочь улучшить изображения, разрешением выше 800x800." :disabled="store.sourceGeneratorTypes.includes(store.generatorType) || store.multiSelect.hiResFix.enabled" disabled-text="Работает только в Text2Img" />
                            </el-col>
                            <el-col :span="isMobile ? 24 : 12">
                                <form-switch label="Плиточность"           prop="tiling"   v-model="store.params.tiling"    info="Отлично может создавать различные текстуры!" />
                            </el-col>
                            <el-col :span="isMobile ? 24 : 12">
                                <form-switch label="Karras"           prop="karras"   v-model="store.params.karras"    info="Лучшее качество за меньшее время. Колдунство!" :disabled="store.multiSelect.karras.enabled" disabled-text="Мульти-karras активен" />
                            </el-col>
                            <el-col :span="isMobile ? 24 : 12">
                                <form-switch label="Проверенные работники"  prop="trusted"  v-model="store.trustedOnly"      info="Выбирает только проверенных работников для вашего запроса. Исключает проблемы с генерацией." />
                            </el-col>
                            <el-col :span="isMobile ? 24 : 12">
                                <form-switch label="X/Y Сетка"         prop="xyPlot"   v-model="store.xyPlot"           info="Создаёт X/Y сетку с картинками. Не требует затрат, не сохраняется в галлерею." :disabled="Object.values(store.multiSelect).filter(el => el.enabled).length !== 2" disabled-text="Работает только с двумя мульти-функциями" :default-value="false" />
                            </el-col>
                            <el-col :span="isMobile ? 24 : 12">
                                <form-switch label="Создать Видео"     prop="video"    v-model="store.createVideo"      info="Создаёт интерполированное видео. Лучше работает при статичном сиде! Не требует затрат, не сохраняется в галлерею." :disabled="store.totalImageCount < 3" disabled-text="Требуется минимум 3 картинки!" :default-value="false" />
                            </el-col>
                        </el-row>
                        <div v-if="store.createVideo" style="margin: 0 0 16px 0">
                            <h3 style="margin: 0 0 4px 0">Video</h3>
                            <form-slider label="Начальный ФПС"  prop="videoFpsInit"  v-model="videoStore.initFramerate"  :min="videoStore.minInitFramerate"  :max="videoStore.maxInitFramerate"  :step="videoStore.initFramerateStep"  info="Сколько кадров в секунду изначально" />
                            <form-slider label="Итоговый ФПС" prop="videoFpsFinal" v-model="videoStore.finalFramerate" :min="videoStore.minFinalFramerate" :max="videoStore.maxFinalFramerate" :step="videoStore.finalFramerateStep" info="ФПС видео после интерполяции." />
                        </div>
                        <h3 style="margin: 16px 0 4px 0">Мульти-функции</h3>
                        <el-row>
                            <el-col :span="isMobile ? 24 : 12">
                                <form-switch label="Мульти-модель"        prop="multiModelSwitch"    v-model="store.multiSelect.model.enabled" />
                            </el-col>
                            <el-col :span="isMobile ? 24 : 12">
                                <form-switch label="Мульти-сэмплер"      prop="multiSamplerSwitch"  v-model="store.multiSelect.sampler.enabled" info="Заметка: Stable Diffusion 2.0 требует сэмплер 'dpmsolver'." />
                            </el-col>
                            <el-col :span="isMobile ? 24 : 12">
                                <form-switch label="Мульти-следование"     prop="multiGuidanceSwitch" v-model="store.multiSelect.guidance.enabled" />
                            </el-col>
                            <el-col :span="isMobile ? 24 : 12">
                                <form-switch label="Мульти-CLIP пропуск"    prop="multiClipSkipSwitch" v-model="store.multiSelect.clipSkip.enabled" />
                            </el-col>
                            <el-col :span="isMobile ? 24 : 12">
                                <form-switch label="Мульти-шаг"        prop="multiStepsSwitch"    v-model="store.multiSelect.steps.enabled" />
                            </el-col>
                            <el-col :span="isMobile ? 24 : 12">
                                <form-switch label="Мульти-Karras"       prop="multiKarras"         v-model="store.multiSelect.karras.enabled" />
                            </el-col>
                            <el-col :span="isMobile ? 24 : 12">
                                <form-switch label="Мульти-Hi-res фикс"   prop="multiHiResFix"       v-model="store.multiSelect.hiResFix.enabled" />
                            </el-col>
                            <el-col :span="isMobile ? 24 : 12">
                                <form-switch label="Мульти-контроль" prop="multiControl"      v-model="store.multiSelect.controlType.enabled" :disabled="!store.sourceGeneratorTypes.includes(store.generatorType)"  disabled-text="Требуется набросок/образец" />
                            </el-col>
                        </el-row>
                    </el-collapse-item>
                </el-collapse>
            </div>
            <div class="main">
                <el-button @click="() => store.resetStore()" class="reset-btn">Reset</el-button>
                <el-button
                    v-if="!store.generating"
                    type="primary"
                    class="generate-cancel-btn"
                    @click="() => store.generateImage(store.generatorType)"
                >
                    <span>
                        Generate {{ store.totalImageCount }} image{{ store.totalImageCount === 1 ? "" : "s" }}
                        <span v-if="store.totalImageCount > 3 && store.createVideo">
                            + {{ Math.round(store.totalImageCount / videoStore.initFramerate * 100) / 100 }}s video
                        </span>
                        <span v-if="optionsStore.apiKey !== '0000000000' && optionsStore.apiKey !== ''">
                            ({{ optionsStore.allowLargerParams === 'Enabled' ? store.canGenerate ? '✅ ' : '❌ ' : '' }}{{ store.kudosCost.toFixed(2) }} kudos{{ store.canGenerate ? '' : ' required' }})
                        </span>
                    </span>
                </el-button>
                <el-button
                    v-if="store.generating"
                    type="danger"
                    class="generate-cancel-btn"
                    :disabled="store.cancelled"
                    @click="() => {
                        store.cancelled = true;
                        videoStore.cancelGeneration();
                    }"
                >Cancel</el-button>
            </div>
            <div class="image center-horizontal">
                <el-card
                    class="center-both generated-image"
                    v-loading="store.generating && !store.generatingVideo && uiStore.progress === 0 ? {
                        text: `Waiting for request(s) to upload${ellipsis}${'&nbsp;'.repeat(3 - ellipsis.length)}`,
                        background: 'rgba(0, 0, 0, 0.5)'
                    } : false"
                >
                    <div v-if="!store.generating && store.outputs.length == 0">
                        <CustomCanvas v-if="/Inpainting/.test(store.generatorType)" />
                        <CustomCanvas v-if="/Img2Img/.test(store.generatorType)" />
                    </div>
                    <image-progress 
                        :est="videoStore.generationData.est === Infinity ? `Loading${ellipsis}` : formatEST(videoStore.generationData.est)"
                        :progress="videoStore.generationData.ratio * 100"
                        :total="store.queue.reduce((prev, curr) => prev + (curr.params?.n ?? 0), 0)"
                        :gathered="store.gatheredImages"
                        @show-generated="uiStore.showGeneratedImages = true"
                        v-if="!uiStore.showGeneratedImages && store.generatingVideo"
                    >
                        <template #status>
                            <div style="font-size: 18px">Video Status</div>
                            <div v-if="videoStore.generationData.ratio">
                                <span>Completed: {{ Math.floor(videoStore.generationData.ratio * 100) }}% - </span>
                                <span>Processed: {{ videoStore.generationData.time }}s / {{ videoStore.generationData.duration }}s</span>
                            </div>
                            <div v-else>
                                <span>Pending video generation{{ellipsis}}</span>
                            </div>
                        </template>
                    </image-progress>
                    <image-progress 
                        :est="formatEST(Math.round((store.queueStatus?.wait_time as number) * (pendingRequests.length + 1)))"
                        :progress="uiStore.progress"
                        :failed="store.queue.filter(el => el.failed).reduce((prev, curr) => prev + (curr.params?.n ?? 0), 0)"
                        :total="store.queue.reduce((prev, curr) => prev + (curr.params?.n ?? 0), 0)"
                        :gathered="store.gatheredImages"
                        :pending-requests="pendingRequests"
                        :queue-status="store.queueStatus"
                        @show-generated="uiStore.showGeneratedImages = true"
                        v-if="!uiStore.showGeneratedImages && uiStore.progress"
                    />
                    <generated-carousel v-if="uiStore.showGeneratedImages && store.outputs.length !== 0" />
                </el-card>
            </div>
        </el-form>
    </div>
    <DialogList
        v-model="negativePromptLibrary"
        title="Negative Prompts"
        :list="store.negativePromptLibrary"
        empty-description="No negative prompts found"
        search-empty-description="Found no matching negative prompt(s) from your search."
        search-text="Search by prompt"
        deleteText="Delete preset"
        useText="Use preset"
        @use="negPrompt => store.negativePrompt = negPrompt"
        @delete="() => store.removeFromNegativeLibrary"
    />
</template>

<style>
:root {
    --sidebar-width: 70px
}

.small-btn {
    padding: 6px 8px;
    height: unset;
}

.generator-types {
    position: fixed;
    height: calc(100vh - 67px);
    top: 67px;
}

.mobile-generator-types {
    width: 100%
}

.generated-image {
    aspect-ratio: 1 / 1;
    width: 100%;
    height: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
}

.generated-image > .el-card__body {
    width: 100%;
    height: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
}

.el-collapse, .sidebar-container {
    width: 100%
}

.form {
    padding-left: 20px;
    margin-left: var(--sidebar-width);
}

.main {
    grid-area: main;
    display: flex;
    justify-content: center;
}


.generate-cancel-btn {
    width: 80%;
}

.sidebar {
    grid-area: sidebar;
    max-width: 90%;
}

.image {
    grid-area: image;
}

.container {
    display: grid;
    height: 75vh;
    grid-template-columns: 50% 50%;
    grid-template-rows: 40px 95%;
    grid-template-areas:
        "sidebar main"
        "sidebar image";
}

@media only screen and (max-width: 1280px) {
    .generated-image > .el-card__body {
        height: 100%;
        display: flex;
        justify-content: center;
        align-items: center;
    }

    .generated-image {
        width: 80%;
        height: 100%;
    }

    .container {
        display: grid;
        height: 110vh;
        grid-template-rows: minmax(400px, 45vh) 65px 60%;
        grid-template-columns: 100%;
        gap: 10px;
        grid-template-areas:
            "image"
            "main"
            "sidebar";
    }

    .sidebar {
        max-width: 100%;
    }

    .main {
        flex-wrap: wrap;
        gap: 5px;
    }

    .main > * {
        width: 100% !important;
        margin: 0 !important;
    }

    .reset-btn {
        order: 1;
    }

    .generate-cancel-btn {
        order: 0;
    }
}

@media only screen and (max-width: 768px) {
    .generated-image {
        width: 100%;
        height: 100%;
    }

    .container {
        grid-template-rows: minmax(400px, 50vh) 65px 60%;
    }

    .form {
        padding-top: 20px;
        padding-left: 0;
        margin-left: 0;
    }
}

</style>
