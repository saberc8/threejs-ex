<template>
  <el-dialog
    v-model="visible1"
    :title="title"
    @ok="handleOk"
    @cancel="closeModal"
  >
    <el-form
      :model="formState"
      name="basic"
      :label-col="{ span: 6 }"
      :wrapper-col="{ span: 14 }"
      autocomplete="off"
      @finish="onFinish"
      @finish-failed="onFinishFailed"
    >
      <el-form-item
        v-for="(item, index) in formList"
        :key="index"
        :label="item.label"
        :name="item.value"
      >
        <el-input v-model:value="formState[`${item.value}`]" />
      </el-form-item>
    </el-form>
  </el-dialog>
</template>

<script lang="ts" setup>
  import { addUser } from '@/api/user/user'
  import { ElMessage } from 'element-plus'
  import { FormState } from '../type'
  const emits = defineEmits(['closeModal', 'refresh'])
  const props = defineProps<{
    visible: Boolean
    title: String
    formData: FormState | undefined | null
  }>()
  // 检查props.formData类型
  console.log(typeof props.formData, 'props.formData')
  const visible1 = ref<any>(false)
  watch(
    () => props.visible,
    (val) => {
      visible1.value = val
    },
  )
  const formState = reactive<any>({
    username: '',
    nickname: '',
    password: '123456',
    confirmPassword: '123456',
  })

  watch(
    () => props.formData,
    (val) => {
      if (val) {
        const t = JSON.parse(JSON.stringify(val))
        formState.username = t.username
        formState.nickname = t.nickname
      }
    },
  )

  const formList = ref([
    {
      type: 'input',
      label: '用户名',
      placeholder: '请输入用户名',
      value: 'username',
    },
    {
      type: 'input',
      label: '用户昵称',
      placeholder: '请输入用户昵称',
      value: 'nickname',
    },
    {
      type: 'input',
      label: '密码',
      placeholder: '请输入密码',
      value: 'password',
    },
    {
      type: 'input',
      label: '确认密码',
      placeholder: '请再次输入密码',
      value: 'confirmPassword',
    },
  ])
  const handleOk = () => {
    console.log('ok')
    console.log(formState)
    addUser(formState).then((res) => {
      console.log(res, 'res')
      ElMessage.success(res.message || res)
      closeModal()
      emits('refresh', false)
    })
  }
  const closeModal = () => {
    formState.username = ''
    formState.nickname = ''
    emits('closeModal', false)
  }

  const onFinish = (values: any) => {
    console.log('Success:', values)
  }

  const onFinishFailed = (errorInfo: any) => {
    console.log('Failed:', errorInfo)
  }
</script>
