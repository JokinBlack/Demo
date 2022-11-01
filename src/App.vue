<!--
 * @Author: BlackJoken
 * @Date: 2022-01-10 14:45:33
 * @LastEditors: BlackJoken
 * @LastEditTime: 2022-01-12 13:41:48
-->


<template>
  <el-config-provider :locale="locale">
    <div id="app">
      <router-view class="view" />
    </div>
  </el-config-provider>
</template>

<script lang="ts">
  import { defineComponent } from 'vue'
  import { ElConfigProvider } from 'element-plus'
  //国际化语言包
  import zhCn from 'element-plus/lib/locale/lang/zh-cn'
  
  export default defineComponent({
    components: {
      ElConfigProvider,
    },
    setup() {
      return {
        locale: zhCn,
      }
    },
  })
</script>

<style>

body{
  padding: 0;
  margin: 0;
}
</style>
