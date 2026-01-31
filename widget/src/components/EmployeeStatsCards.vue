<template>
  <el-row :gutter="20" class="mb-8">
    <!-- Total Employees -->
    <el-col :xs="24" :sm="24" :md="8" :lg="8">
      <el-card shadow="hover" class="stat-card">
        <template #header>
          <div class="flex items-center justify-between">
            <span class="text-sm font-medium text-gray-600">総社員数</span>
            <el-icon color="#409eff" :size="24">
              <Users />
            </el-icon>
          </div>
        </template>
        <el-statistic :value="totalEmployees" />
      </el-card>
    </el-col>

    <!-- Active Employees -->
    <el-col :xs="24" :sm="24" :md="8" :lg="8">
      <el-card shadow="hover" class="stat-card">
        <template #header>
          <div class="flex items-center justify-between">
            <span class="text-sm font-medium text-gray-600">在籍中</span>
            <el-icon color="#67c23a" :size="24">
              <CircleCheckFilled />
            </el-icon>
          </div>
        </template>
        <el-statistic :value="activeCount" style="color: #67c23a" />
      </el-card>
    </el-col>

    <!-- On Leave Employees -->
    <el-col :xs="24" :sm="24" :md="8" :lg="8">
      <el-card shadow="hover" class="stat-card">
        <template #header>
          <div class="flex items-center justify-between">
            <span class="text-sm font-medium text-gray-600">休職中</span>
            <el-icon color="#e6a23c" :size="24">
              <Clock />
            </el-icon>
          </div>
        </template>
        <el-statistic :value="onLeaveCount" style="color: #e6a23c" />
      </el-card>
    </el-col>
  </el-row>
</template>

<script setup lang="ts">
import { computed } from 'vue';
import {
  ElRow,
  ElCol,
  ElCard,
  ElStatistic,
  ElIcon,
} from 'element-plus';
import type { Employee } from '@/types/employee';

interface Props {
  employees: Employee[];
}

const props = defineProps<Props>();

const totalEmployees = computed(() => props.employees.length);

const activeCount = computed(() => {
  return props.employees.filter((emp) => emp.status === 'Active').length;
});

const onLeaveCount = computed(() => {
  return props.employees.filter((emp) => emp.status === 'OnLeave').length;
});
</script>

<style scoped>
.stat-card :deep(.el-card__header) {
  padding: 16px;
  border-bottom: 1px solid #ebeef5;
}

.stat-card :deep(.el-card__body) {
  padding: 16px;
}

.stat-card :deep(.el-statistic__value) {
  font-size: 32px;
  font-weight: bold;
}
</style>
