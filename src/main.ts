import { createApp } from 'vue'
import './style.css'
import App from './App.vue'
import router from './router'
import { setupStore } from '@/store'
import 'element-plus/es/components/message/style/css'
// import ElementPlus from 'element-plus'
// import 'element-plus/dist/index.css'

// import VXETable from 'vxe-table'
import XEUtils from 'xe-utils'
import {
  // 全局对象
  VXETable,

  // 表格功能
  // Filter,
  // Edit,
  // Menu,
  // Export,
  // Keyboard,
  // Validator,

  // 可选组件
  Icon,
  Column,
  // Colgroup,
  Grid,
  Tooltip,
  Toolbar,
  Pager,
  // Form,
  // FormItem,
  // FormGather,
  // Checkbox,
  // CheckboxGroup,
  // Radio,
  // RadioGroup,
  // RadioButton,
  // Switch,
  Input,
  Select,
  // Optgroup,
  // Option,
  // Textarea,
  // Button,
  // Modal,
  // List,
  // Pulldown,

  // 表格
  Table,
} from 'vxe-table'
import zhCN from 'vxe-table/es/locale/lang/zh-CN'

VXETable.setup({
  i18n: (key, args) => XEUtils.toFormatString(XEUtils.get(zhCN, key), args),
})

const app = createApp(App)
app.use(router)
// app.use(ElementPlus)
// 安装表格
//可选组件
app
  .use(Icon)
  .use(Column)
  // .use(Colgroup)
  .use(Grid)
  .use(Tooltip)
  .use(Toolbar)
  .use(Pager)
  // .use(Form)
  // .use(FormItem)
  // .use(FormGather)
  // .use(Checkbox)
  // .use(CheckboxGroup)
  // .use(Radio)
  // .use(RadioGroup)
  // .use(RadioButton)
  // .use(Switch)
  .use(Input)
  .use(Select)
  // .use(Optgroup)
  // .use(Option)
  // .use(Textarea)
  // .use(Button)
  // .use(Modal)
  // .use(List)
  // .use(Pulldown)

  .use(Table)
setupStore(app)

app.mount('#app')
