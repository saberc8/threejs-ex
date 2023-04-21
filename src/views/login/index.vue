<template>
  <div class="login-container">
    <h2>{{ appName }}</h2>
    <p>{{ appDescription }}</p>
    <div class="login-form">
      <el-form
        ref="loginFormRef"
        :model="loginForm"
        :rules="rules"
        label-width="80px"
        class="demo-loginForm"
        :size="formSize"
        status-icon
      >
        <el-form-item label="用户名" prop="username">
          <el-input v-model="loginForm.username" />
        </el-form-item>
        <el-form-item label="密码" prop="password">
          <el-input v-model="loginForm.password" />
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="submitForm(loginFormRef)">
            登陆
          </el-button>
        </el-form-item>
      </el-form>
    </div>
  </div>
</template>

<script setup lang="ts">
  import type { FormInstance, FormRules } from 'element-plus'
  import { appName, appDescription } from '@/constants'
  import { useUserStoreHook } from '@/store/modules/user'
  const useUserStore = useUserStoreHook()
  const formSize = ref('default')
  const loginFormRef = ref<FormInstance>()
  const loginForm = reactive({
    username: 'admin',
    password: '123456',
  })
  const rules = reactive<FormRules>({
    username: [{ required: true, message: '请输入用户民', trigger: 'blur' }],
    password: [{ required: true, message: '请输入密码', trigger: 'blur' }],
  })

  const submitForm = async (formEl: FormInstance | undefined) => {
    if (!formEl) return
    await formEl.validate((valid, fields) => {
      if (valid) {
        useUserStore.userLoginFn(loginForm)
      } else {
        console.log('error submit!', fields)
      }
    })
  }
</script>

<style scoped lang="scss">
  .login-container {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    height: 100vh;
    overflow: auto;
    background: #dee2e7;
    background-image: url(https://mdn.alipayobjects.com/yuyan_qk0oxh/afts/img/V-_oS6r-i7wAAAAAAAAAAAAAFl94AQBr);
    background-repeat: no-repeat;
    .login-form {
      width: 300px;
      padding: 20px;
      background: #ffffff30;
      border-radius: 5px;
      box-shadow: 0 0 20px rgba(0, 0, 0, 0.1);
    }
  }
</style>
