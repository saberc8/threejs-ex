<template>
  <el-form
    ref="proFromRef"
    name="advanced_search"
    class="ant-advanced-search-form"
    :model="formState"
    @finish="onFinish"
  >
    <el-row :gutter="24">
      <template v-for="(item, index) in searchForm" :key="index">
        <el-col v-show="expand || index < 3" :lg="8" :md="8" :sm="12" :xs="24">
          <el-form-item :name="item.field" :label="item.label">
            <el-input
              v-model:value="formState[`${item.field}`]"
              :placeholder="item.componentProps.placeholder"
              :allowClear="true"
            />
          </el-form-item>
        </el-col>
      </template>
      <el-col style="margin-left: auto" :span="8">
        <el-space>
          <el-button @click="resetFields">重置</el-button>
          <el-button type="primary" html-type="submit">查询</el-button>
          <a style="font-size: 12px" @click="expand = !expand">
            <template v-if="expand">
              收起
              <el-icon><ArrowUp /></el-icon>
            </template>
            <template v-else>
              展开
              <el-icon><ArrowDown /></el-icon>
            </template>
          </a>
        </el-space>
      </el-col>
    </el-row>
  </el-form>
</template>
<script lang="ts" setup>
  import { ArrowUp, ArrowDown } from '@element-plus/icons-vue'
  defineProps<{
    searchForm: Array<any>
  }>()
  const emit = defineEmits(['searchData'])
  const expand = ref(false)
  const proFromRef = ref()
  const formState: any = reactive({})
  const onFinish = (values: any) => {
    console.log(values, 'values')
    emit('searchData', values)
  }

  const resetFields = () => {
    proFromRef.value.resetFields()
    emit('searchData', formState)
  }
</script>
