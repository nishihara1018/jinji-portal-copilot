<template>
  <el-container class="min-h-screen">
    <!-- Header -->
    <el-header class="sticky top-0 z-40 shadow-sm bg-white">
      <div class="flex items-center justify-between h-full">
        <div>
          <h1 class="text-3xl font-bold text-gray-900">社員管理ポータル</h1>
          <p class="text-gray-600 text-sm mt-1">社員情報の管理・閲覧</p>
        </div>
        <el-icon :size="40" class="text-blue-600">
          <Users />
        </el-icon>
      </div>
    </el-header>

    <!-- Main Content -->
    <el-main class="bg-gray-50 px-6 py-8">
      <div class="max-w-7xl mx-auto">
        <!-- Search Bar -->
        <el-input
          v-model="searchQuery"
          placeholder="社員名で検索..."
          clearable
          class="mb-8"
          :prefix-icon="Search"
        />

        <!-- Stats Cards -->
        <EmployeeStatsCards :employees="filteredEmployees" />

        <!-- Employee Table -->
        <EmployeeTable :employees="filteredEmployees" />
      </div>
    </el-main>
  </el-container>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue';
import { ElContainer, ElHeader, ElMain, ElInput, ElIcon } from 'element-plus';
import { Search } from '@element-plus/icons-vue';
import EmployeeStatsCards from '@/components/EmployeeStatsCards.vue';
import EmployeeTable from '@/components/EmployeeTable.vue';
import type { Employee } from '@/types/employee';

// Search query
const searchQuery = ref('');

// Mock data
const employees = ref<Employee[]>([
  {
    id: '1',
    name: '山田太郎',
    email: 'yamada.taro@company.jp',
    department: 'エンジニアリング',
    position: 'シニアエンジニア',
    joinedAt: '2020-04-01',
    status: 'Active',
    avatarUrl: 'https://api.dicebear.com/7.x/avataaars/svg?seed=yamada',
  },
  {
    id: '2',
    name: '佐藤花子',
    email: 'sato.hanako@company.jp',
    department: 'デザイン',
    position: 'デザインリード',
    joinedAt: '2021-06-15',
    status: 'Active',
    avatarUrl: 'https://api.dicebear.com/7.x/avataaars/svg?seed=sato',
  },
  {
    id: '3',
    name: '鈴木次郎',
    email: 'suzuki.jiro@company.jp',
    department: 'マーケティング',
    position: 'マーケティング担当者',
    joinedAt: '2022-01-10',
    status: 'OnLeave',
    avatarUrl: 'https://api.dicebear.com/7.x/avataaars/svg?seed=suzuki',
  },
  {
    id: '4',
    name: '伊藤美咲',
    email: 'ito.misaki@company.jp',
    department: '営業',
    position: '営業マネージャー',
    joinedAt: '2019-03-20',
    status: 'Active',
    avatarUrl: 'https://api.dicebear.com/7.x/avataaars/svg?seed=ito',
  },
  {
    id: '5',
    name: '田中健一',
    email: 'tanaka.kenichi@company.jp',
    department: 'HR',
    position: 'HR専任者',
    joinedAt: '2023-09-01',
    status: 'Terminated',
    avatarUrl: 'https://api.dicebear.com/7.x/avataaars/svg?seed=tanaka',
  },
]);

/**
 * Filtered employees based on search query
 */
const filteredEmployees = computed(() => {
  if (!searchQuery.value.trim()) {
    return employees.value;
  }

  const query = searchQuery.value.toLowerCase();
  return employees.value.filter((emp) =>
    emp.name.toLowerCase().includes(query) ||
    emp.email.toLowerCase().includes(query)
  );
});
</script>

<style scoped>
:deep(.el-input__wrapper) {
  border: 1px solid #dcdfe6;
  border-radius: 4px;
}

:deep(.el-header) {
  padding: 0 24px;
  border-bottom: 1px solid #ebeef5;
}

:deep(.el-main) {
  padding: 32px 24px;
}
</style>
