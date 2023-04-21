<template>
  <div class="header">
    <div>
      <el-icon><Expand /></el-icon>
      <el-icon><Fold /></el-icon>
    </div>
    <el-dropdown>
      <span class="el-dropdown-link"> <Avatar></Avatar></span>
      <template #dropdown>
        <el-dropdown-menu>
          <el-dropdown-item @click="logout">退出登录</el-dropdown-item>
        </el-dropdown-menu>
      </template>
    </el-dropdown>
  </div>
</template>

<script setup lang="ts">
  import Avatar from './components/Avatar.vue'
  import { Expand, Fold } from '@element-plus/icons-vue'
  import { removeToken } from '@/utils/auth'
  const router = useRouter()
  const logout = () => {
    console.log('logout')
    removeToken()
    router.push('/login')
  }
</script>

<style lang="scss" scoped>
  .header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    height: 100%;
  }
</style>
