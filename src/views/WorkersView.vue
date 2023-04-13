<script setup lang="ts">
import { useWorkerStore } from '@/stores/workers';
import {
    ElEmpty,
    ElTabs,
    ElTabPane
} from 'element-plus';
import WorkerBox from '../components/WorkerBox.vue';
import TeamBox from '../components/TeamBox.vue';
import ModelBox from '@/components/ModelBox.vue';
import SortWorkers from '@/components/SortWorkers.vue';
import { breakpointsTailwind, useBreakpoints } from '@vueuse/core';
const breakpoints = useBreakpoints(breakpointsTailwind);
const isMobile = breakpoints.smallerOrEqual('lg');
const store = useWorkerStore();
</script>

<template>
    <el-tabs v-model="store.activeTab">
        <el-tab-pane label="Работники" name="workers">
            <sort-workers mobile v-if="isMobile" />
            <div class="workers">
                <div class="workers" v-if="store.sortedWorkers.length != 0">
                    <WorkerBox
                        v-for="worker in store.sortedWorkers"
                        :key="worker.id"
                        :worker="worker"
                    />
                </div>
                <el-empty v-else description="Работники не найдены" />
            </div>
        </el-tab-pane>
        <el-tab-pane label="Модели" name="models">
            <sort-workers mobile v-if="isMobile" />
            <div class="models" v-if="store.sortedModels.length != 0">
                <ModelBox
                    v-for="model in store.sortedModels"
                    :key="model.name"
                    :model="model"
                />
            </div>
            <el-empty v-else description="Модели не найдены" />
        </el-tab-pane>
        <el-tab-pane disabled v-if="!isMobile"><template #label><sort-workers /></template></el-tab-pane>
    </el-tabs>
</template>

<style scoped>
    .workers, .teams, .models {
        display: grid;
        grid-template-columns: repeat(auto-fit, minmax(320px, 1fr));
        grid-gap: 10px;
        width: 100%;
    }

    .models {
        grid-template-columns: repeat(auto-fit, minmax(400px, 1fr));
    }

    @media only screen and (min-width: 1280px) {
        :deep(.el-tabs__nav) {
            width: 100%;
        }

        :deep(.el-tabs__item.is-top:last-child) {
            padding: 0 20px;
            float: right;
        }
    }
</style>