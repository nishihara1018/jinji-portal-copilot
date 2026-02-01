<template>
  <el-card shadow="hover">
    <template #header>
      <h2 class="text-lg font-semibold">社員一覧</h2>
    </template>

    <el-table
      :data="employees"
      stripe
      style="width: 100%"
      :default-sort="{ prop: 'name', order: 'ascending' }"
    >
      <!-- Name Column -->
      <el-table-column prop="name" label="名前" width="150">
        <template #default="{ row }">
          <div class="flex items-center gap-3">
            <el-avatar
              :src="row.avatarUrl"
              :alt="row.name"
              size="small"
            />
            <span>{{ row.name }}</span>
          </div>
        </template>
      </el-table-column>

      <!-- Email Column -->
      <el-table-column prop="email" label="メール" width="200" />

      <!-- Department Column -->
      <el-table-column prop="department" label="部署" width="150" />

      <!-- Position Column -->
      <el-table-column prop="position" label="職位" width="150" />

      <!-- Joined Date Column -->
      <el-table-column prop="joinedAt" label="入社日" width="130">
        <template #default="{ row }">
          {{ formatDate(row.joinedAt) }}
        </template>
      </el-table-column>

      <!-- Status Column -->
      <el-table-column prop="status" label="ステータス" width="120">
        <template #default="{ row }">
          <el-tag :type="getStatusType(row.status)">
            {{ getStatusLabel(row.status) }}
          </el-tag>
        </template>
      </el-table-column>

      <!-- Action Column -->
      <el-table-column label="アクション" width="100" align="center">
        <template #default="{ row }">
          <el-button
            type="primary"
            link
            @click="handleDetailClick(row)"
          >
            詳細
          </el-button>
        </template>
      </el-table-column>
    </el-table>

    <!-- Empty State -->
    <el-empty
      v-if="employees.length === 0"
      description="表示する社員がいません"
    />
  </el-card>
</template>

<script setup lang="ts">
import {
  ElCard,
  ElTable,
  ElTableColumn,
  ElAvatar,
  ElTag,
  ElButton,
  ElEmpty,
} from 'element-plus';
import type { Employee, EmployeeStatus } from '@/types/employee';

interface Props {
  employees: Employee[];
}

defineProps<Props>();

/**
 * Format date to Japanese format (YYYY年MM月DD日)
 */
function formatDate(dateString: string): string {
  const date = new Date(dateString);
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, '0');
  const day = String(date.getDate()).padStart(2, '0');
  return `${year}年${month}月${day}日`;
}

/**
 * Get status label
 */
function getStatusLabel(status: EmployeeStatus): string {
  const labels: Record<EmployeeStatus, string> = {
    Active: '在籍中',
    OnLeave: '休職中',
    Terminated: '退職',
  };
  return labels[status];
}

/**
 * Get status tag type
 */
function getStatusType(status: EmployeeStatus): 'success' | 'warning' | 'info' | 'primary' | 'danger' {
  const types: Record<EmployeeStatus, 'success' | 'warning' | 'info'> = {
    Active: 'success',
    OnLeave: 'warning',
    Terminated: 'info',
  };
  return types[status];
}

/**
 * Handle detail button click
 */
function handleDetailClick(employee: Employee): void {
  console.log('詳細ボタンがクリックされました:', employee);
}
</script>
