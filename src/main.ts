/*
 * @Author: BlackJoken
 * @Date: 2022-01-10 14:45:33
 * @LastEditors: BlackJoken
 * @LastEditTime: 2022-01-18 13:07:25
 */

import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import 'amfe-flexible/index.js'
import '@/common/rem.js'

import initStorePersistence from './store/relaunch'
import installMaxerStore, { Maxer } from './store/maxer.mixin'
// 声明全局组件 防止需要this调用时不能识别类型
declare module '@vue/runtime-core' {
    interface ComponentCustomProperties {
        $m: Maxer;  // 声明全局方法
    }
}

//iconfont
import '@/assets/iconfont/iconfont.css'

import ElementPlus from 'element-plus'
import 'element-plus/dist/index.css'
import zhCn from 'element-plus/es/locale/lang/zh-cn'

const app = createApp(App)

app.use(ElementPlus, {
    locale: zhCn,
})
installMaxerStore(app) // 全局混入vuex
initStorePersistence(store) // 初始化持久化vuex
app.use(router).use(store).mount('#app')
