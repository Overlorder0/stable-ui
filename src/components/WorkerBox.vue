<script setup lang="ts">
import {
    ElCard,
    ElDivider,
    ElIcon,
    ElTooltip,
    ElCollapse,
    ElCollapseItem
} from 'element-plus';
import {
    VideoPause,
    CircleCheck,
    CircleClose,
    Warning
} from "@element-plus/icons-vue"
import type { WorkerDetails } from '@/types/stable_horde';
import { computed } from 'vue';
import { formatSeconds } from '@/utils/format';

// eslint-disable-next-line @typescript-eslint/no-unused-vars
const props = defineProps<{
    worker: WorkerDetails
}>();

const status = computed(() => {
    if (props.worker.online) {
        return "Online";
    }
    if (props.worker.paused) {
        return "Paused";
    }
    if (props.worker.maintenance_mode) {
        return "Maintenance";
    }
    return "Offline";
})
</script>

<template>
    <el-card class="worker-box">
        <template #header>
            <div style="display: flex; justify-content:space-between">
                <div class="card-header">
                    <el-tooltip
                        :content="status"
                        placement="top"
                    >
                        <el-icon :size="20" color="green"  v-if="worker.online"><CircleCheck /></el-icon>
                        <el-icon :size="20" color="orange" v-else-if="worker.paused"><VideoPause /></el-icon>
                        <el-icon :size="20" color="orange" v-else-if="worker.maintenance_mode"><Warning /></el-icon>
                        <el-icon :size="20" color="red"    v-else><CircleClose /></el-icon>
                    </el-tooltip>
                    <span style="margin-left: 0.5rem">{{worker.name}}</span>
                </div>
                <slot name="header"></slot>
            </div>
        </template>
        <div class="small-font">ID: {{worker.id}}</div>
        <div>Этот работник был активен в течении <strong>{{formatSeconds(worker.uptime, true, { days: true, hours: true, minutes: true })}}</strong></div>
        <div>Обработал <strong>{{worker.megapixelsteps_generated}}</strong> MPS</div>
        <div>Работал на скорости <strong>{{worker.performance?.split(" ")[0]}}</strong> MPS/s</div>
        <div>На <strong>{{worker.threads}}</strong> потоке(ах)</div>
        <div>Исполнил <strong>{{worker.requests_fulfilled}}</strong> запросов</div>
        <div>Может сгенерировать вплоть до: <strong>{{Math.round(Math.sqrt(worker.max_pixels || 0))}}x{{ Math.round(Math.sqrt(worker.max_pixels || 0)) }}</strong></div>
        <div>
            <el-collapse style="margin-top: 0.5rem; --el-collapse-header-height: 2.5rem">
                <el-collapse-item :title="worker.models?.length + ' Модель(и)'" name="1">
                    <strong>{{worker.models?.length === 0 ? "stable_diffusion" : ""}}</strong>
                    <strong v-for="(model, index) of worker.models" :key="index">
                        {{model}}{{index === worker.models?.length ? "" : ", "}}
                    </strong>
                </el-collapse-item>
            </el-collapse>
        </div>
        <el-divider v-if="worker.info" style="margin: 10px 0" />
        <div class="small-font">{{worker.info}}</div>
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

    .worker-box {
        max-height: 100%;
    }
</style>