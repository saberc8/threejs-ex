<template>
  <ProTable
    ref="proTable"
    :dataSource="dataSource"
    :columns="columns"
    :params="params"
    :searchForm="searchForm"
    :showForm="showForm"
    :getListFunc="getListFunc"
  >
    <template #toolbar_title>
      <span style="font-weight: bold; font-size: 20px; color: #000"
        >用户表单</span
      >
    </template>
    <template #toolbar_buttons>
      <el-button type="primary" @click="addUserData"> 新增 </el-button>
    </template>
  </ProTable>
  <user-modal
    :visible="visible"
    :title="title"
    :formData="formData"
    @close-modal="closeModal"
    @refresh="refreshTable"
  />
</template>

<script lang="ts" setup>
  import { createVNode, VNode } from 'vue'
  import ProTable from '@/components/ProTable/index.vue'
  import { getUserList } from '@/api/user/user'
  import { VxeGridPropTypes } from 'vxe-table'
  import userModal from './components/userModal.vue'
  import dayjs from 'dayjs'
  import { FormState } from './type'
  import { ElButton, ElMessage, ElTag, ElSpace } from 'element-plus'
  const proTable = ref()
  console.log(proTable.value, 'proTable')
  const formData = ref<FormState>({})
  const visible = ref<Boolean>(false)
  const title = ref('新增用户')
  const getListFunc = getUserList

  const columns: VxeGridPropTypes.Columns = [
    {
      type: 'seq',
      width: 60,
      treeNode: true, // 开启树图表
    },
    { field: 'id', title: 'ID', width: 80 },
    { field: 'username', title: '用户名', width: 180 },
    { field: 'nickname', title: '用户昵称', width: 180 },
    {
      field: 'isSuper',
      title: '是否超级管理员',
      width: 120,
      align: 'center',
      slots: {
        default: ({ row }): VNode => {
          return createVNode(
            ElTag,
            {
              type: row.isSuper ? 'success' : '',
            },
            {
              default: (): string => (row.isSuper ? '是' : '否'),
            },
          )
        },
      },
    },
    {
      field: 'createdAt',
      title: '创建时间',
      width: 180,
      formatter: (row: any) => {
        return dayjs(row.row.createdAt).format('YYYY-MM-DD HH:mm:ss')
      },
    },
    {
      field: 'updatedAt',
      title: '更新时间',
      width: 180,
      formatter: (row: any) => {
        return dayjs(row.row.updatedAt).format('YYYY-MM-DD HH:mm:ss')
      },
    },
    {
      title: '操作',
      width: 220,
      align: 'center',
      slots: {
        default: ({ row }): VNode => {
          return createVNode(
            ElSpace,
            {
              size: 10,
              wrap: true,
            },
            {
              default: (): VNode[] => [
                createVNode(
                  ElButton,
                  {
                    type: 'primary',
                    size: 'small',
                    onClick: () => {
                      editUserData(row)
                    },
                  },
                  () => '编辑',
                ),
                createVNode(
                  ElButton,
                  {
                    type: 'primary',
                    size: 'small',
                    onClick: () => {
                      editUserData(row)
                    },
                  },
                  () => '绑定角色',
                ),
                createVNode(
                  ElButton,
                  {
                    type: 'danger',
                    size: 'small',
                    onClick: () => {
                      deleteUserFunc(row.id)
                    },
                  },
                  () => '删除',
                ),
              ],
            },
          )
        },
      },
      fixed: 'right',
    },
  ]

  const showForm = true
  // 搜索区域
  const searchForm = [
    {
      label: '用户名',
      field: 'username',
      type: 'input',
      componentProps: {
        placeholder: '请输入用户名',
      },
    },
    {
      label: '用户昵称',
      field: 'nickname',
      type: 'input',
      componentProps: {
        placeholder: '请输入用户昵称',
      },
    },
  ]

  const params = ref({
    page: 1,
    size: 10,
  })

  let dataSource = ref<any>([])
  const addUserData = () => {
    title.value = '新增用户'
    visible.value = true
  }

  const closeModal = () => {
    visible.value = false
  }

  const refreshTable = () => {
    closeModal()
    proTable.value.reloadData()
  }

  const editUserData = (row: any) => {
    title.value = '编辑用户'
    formData.value = row
    visible.value = true
  }

  const deleteUserFunc = async (id: number) => {
    console.log(id)
    ElMessage.success('删除成功')
  }
</script>
