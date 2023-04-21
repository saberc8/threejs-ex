<template>
  <div class="layout-sider">
    <div class="logo">
      <img class="logo-img" src="/logo.jpg" alt="" />
      <h3 class="logo-name" v-show="!collapse">{{ appName }}</h3>
    </div>
    <el-menu class="layout-menu" :collapse="collapse">
      <div v-for="(item, index) in menuList" :key="index">
        <el-sub-menu v-if="item.children" :index="item.path">
          <template #title>
            <el-icon><location /></el-icon>
            <span>{{ item.meta.title }}</span>
          </template>
          <el-menu-item
            v-for="(itemChild, indexChild) in item.children"
            :key="indexChild"
          >
            <el-menu-item
              :index="itemChild.path"
              @click="menuClick(itemChild)"
              >{{ itemChild.meta.title }}</el-menu-item
            >
          </el-menu-item>
        </el-sub-menu>
        <el-menu-item v-else @click="menuClick(item)">
          <el-icon><icon-menu /></el-icon>
          <template #title>{{ item.meta.title }}</template>
        </el-menu-item>
      </div>
    </el-menu>
  </div>
</template>

<script setup lang="ts">
  import { Menu as IconMenu, Location } from '@element-plus/icons-vue'
  import { appName } from '@/constants'
  import { routerArray } from '@/router'
  const router = useRouter()
  const collapse = ref(false)
  console.log(routerArray)
  const menuList: any = computed(() => {
    // .filter((item) => item.meta?.hideMenu !== true)
    return routerArray
  })
  const menuClick = (e: any) => {
    console.log(e)
    router.push(e.path)
  }
</script>

<style lang="scss" scoped>
  .layout-sider {
    height: 100vh;
    position: relative;
    overflow: scroll;
    .logo {
      position: sticky;
      display: flex;
      align-items: center;
      height: 64px;
      z-index: 999;
      background-color: #fff;
      top: 0;
      padding: 0 10px;
      &-img {
        width: 32px;
        height: 32px;
        margin-right: 10px;
      }
    }
    .layout-menu {
      height: calc(100vh - 64px);
    }
  }
  :deep(.el-menu) {
    border-right: none;
  }
</style>
