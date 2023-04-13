<script setup lang="ts">
import {
    ElRow,
    ElCol,
    ElCard,
    ElEmpty,
    ElIcon,
    ElTable,
    ElTableColumn,
    ElScrollbar,
    ElDivider
} from "element-plus";
import {
    Money,
    Aim,
    Picture,
    Avatar,
    Lock
} from "@element-plus/icons-vue"
import DataLabel from '../components/DataLabel.vue'
import WorkerEditor from '../components/WorkerEditor.vue';
import { breakpointsTailwind, useBreakpoints } from '@vueuse/core';
import { computed } from 'vue';
import { useOptionsStore } from '@/stores/options';
import { useDashboardStore } from '@/stores/dashboard';
import { useWorkerStore } from "@/stores/workers";

const breakpoints = useBreakpoints(breakpointsTailwind);

const breakLabels = breakpoints.smallerOrEqual('xl');
const breakLabelsMore = breakpoints.smallerOrEqual('lg');

const dashStore = useDashboardStore();
const workerStore = useWorkerStore();
const optionsStore = useOptionsStore();

// Max: 24 for each col
const spanAmount = computed(() => breakLabels.value ? 24 : 12);

function sortChange(column: any) {
    dashStore.leaderboardOrderProp = column.prop;
    dashStore.leaderboardOrder = column.order;
    dashStore.updateLeaderboard();
}

async function onWorkerChange(id: string) {
    const index = dashStore.userWorkers.findIndex(el => el.id === id);
    dashStore.userWorkers[index] = await workerStore.getWorker(id) || dashStore.userWorkers[index];
}

const signedIn = computed(() => optionsStore.apiKey != '0000000000' && optionsStore.apiKey != '');
</script>

<template>
    <div class="dashboard">
        <div>
            <div v-if="signedIn">
                <div class="dashboard-title">Добро пожаловать, {{dashStore.user.username}}</div>
                <div
                    style="display: flex;  width: 100%; margin-bottom: 2rem;"
                    :style="{
                        flexWrap: breakLabels ? 'wrap' : undefined,
                        gap: breakLabels ? '8px' : '1rem',
                    }"
                >
                    <data-label style="width: 100%" :icon="Money"   label="Поощрения"           :content="dashStore.user.kudos"                        color="var(--el-color-success)" />
                    <data-label style="width: 100%" :icon="Picture" label="Изображений запрошено" :content="dashStore.user.records?.request?.image"     color="var(--el-color-danger)"  />
                    <data-label style="width: 100%" :icon="Aim"     label="Изображений исполнено" :content="dashStore.user.records?.fulfillment?.image" color="var(--el-color-primary)" />
                    <data-label style="width: 100%" :icon="Avatar"  label="Всего работников"   :content="dashStore.user.worker_count"                 color="var(--el-color-warning)" />
                </div>
            </div>
            <div v-else>
                <div class="api-key-required"><el-icon :size="30" style="margin-right: 10px"><Lock /></el-icon>Статистика требует наличия API ключа</div>
            </div>
            <el-row :gutter="breakLabels ? 0 : 20" justify="space-around" style="margin-bottom: 2rem;">
                <el-col :span="spanAmount" class="label">
                    <el-card style="margin-bottom: 10px;">
                        <template #header>
                            <strong>Текущая производительность</strong>
                        </template>
                        <div>Сейчас <strong>{{dashStore.performance.queued_requests}}</strong> запросов в очереди (<strong>{{dashStore.performance.queued_megapixelsteps}}</strong> MPS) к <strong>{{dashStore.performance.worker_count}}</strong> работникам (<strong>{{dashStore.performance.thread_count}}</strong> потоков).</div>
                        <div>Сейчас <strong>{{dashStore.performance.queued_forms}}</strong> запросов обработки к <strong>{{dashStore.performance.interrogator_count }}</strong> обработчикам (<strong>{{dashStore.performance.interrogator_thread_count}}</strong> потоков).</div>
                        <div>За последнюю минуту было обработанно <strong>{{dashStore.performance.past_minute_megapixelsteps}}</strong> MPS.</div>
                    </el-card>
                </el-col>
            </el-row>
            <el-card v-if="signedIn">
                <template #header><strong>Ваши работники</strong></template>
                <div class="user-workers" v-if="dashStore.userWorkers.length !== 0">
                    <WorkerEditor
                        v-for="worker in dashStore.userWorkers"
                        :key="worker.id"
                        :worker="worker"
                        @updated="(id) => onWorkerChange(id)"
                    />
                </div>
                <div v-else><el-empty description="Работники не найдены" /></div>
            </el-card>
            <div v-else>
                <div class="api-key-required"><el-icon :size="30" style="margin-right: 10px"><Lock /></el-icon>Изменение и просмотр работников требует API ключ</div>
            </div>
        </div>
    </div>
</template>

<style>
.user-workers {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(320px, 1fr));
    grid-gap: 10px;
    width: 100%;
}

.dashboard-title {
    font-size: 50px;
    margin-bottom: 1rem;
    text-align: center;
}

.api-key-required {
    font-size: 20px;
    margin-bottom: 1rem;
    display: flex;
    justify-content: center;
    align-items: center;
}

.center-both-absolute {
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
}

.leaderboard {
    width: 100%;
}

.news {
    height: 300px;
}

.news > div > div > p {
    margin-top: 0
}

@media only screen and (max-width: 1000px) {
    .dashboard-title {
        font-size: 40px;
    }
}

@media only screen and (max-width: 1280px) {
    .label {
        margin-bottom: 5px
    }
}
</style>