<template>
  <div class="app-page-about">
    <div>dependencies</div>
    <el-space>
      <el-tag   v-for="(item, index) in schema" :key="index">{{ item.label }}</el-tag>
    </el-space>

    <div>devDependencies</div>
    <el-space>
      <el-tag v-for="(item, index) in devSchema" :key="index">{{
        item.label
      }}</el-tag>
    </el-space>
  </div>
</template>

<script setup lang="ts">
  import pkg from '../../../../package.json'
  const { dependencies, devDependencies, name } = pkg
  const schema = <any>[]
  const devSchema = <any>[]
  Object.keys(dependencies).forEach((key) => {
    schema.push({ field: key, label: key })
  })
  Object.keys(devDependencies).forEach((key) => {
    devSchema.push({ field: key, label: key })
  })
</script>
