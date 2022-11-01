<!--
 * @Author: BlackJoken
 * @Date: 2022-03-28 17:14:03
 * @LastEditors: BlackJoken
 * @LastEditTime: 2022-03-29 16:51:03
-->
<template>
  <div id="node-box">
      <!-- <div class="title">第一次作业</div> -->
      <div class="node-form">
          <el-form ref="ruleFormRef">
              <el-form-item label="主干" prop="">
                <el-button @click="addNode" type="primary">新建event</el-button>
              </el-form-item>
              <div v-for="(item, index) in nodeMemberDtos" :key="item.key">
                <el-form-item 
                    label=""
                    :prop="'nodeMemberDtos.' + index + '.value'"
                    :rules="{
                        required: true,
                        message: `请输入event${index + 1}的node信息`,
                        trigger: 'blur',
                    }"
                  >
                  <div class="form-box">

                    <div class="event-title">{{`event${index + 1}`}}</div>
                    <el-input v-model="item.value" placeholder="请输入node信息">
                    
                      <template #append>
                        <el-button @click="deleteNode(item)" type="primary">--删除该event</el-button>
                      </template>
                    </el-input>
                  </div>
                </el-form-item>
              </div>
          </el-form>
      </div>
      <div class="form-options-btn">
        <div @click="" class="btn-item">重置</div>
        <div @click="submit(ruleFormRef)" class="btn-item">提交</div>
      </div>
  </div>
</template>
<script lang="ts">
import {
  ref,
  reactive,
  onMounted,
  getCurrentInstance,
  defineComponent,
  defineAsyncComponent,
} from "vue";
import { useRouter } from "vue-router";
import type { FormInstance } from "element-plus";
import { ElMessage } from "element-plus";
// 题目：编辑一个页面用于格式化内容。
// 例如，输入的格式如图所示，点击保存按钮后数据应该格式化成
// {
// 	"nodeList": [{
// 		"id": 1,
// 		"name": "a"
// 	}, {
// 		"id": 2,
// 		"name": "b"
// 	}, {
// 		"id": 3,
// 		"name": "c"
// 	}, {
// 		"id": 4,
// 		"name": "d"
// 	}, {
// 		"id": 5,
// 		"name": "e"
// 	}, {
// 		"id": 6,
// 		"name": "f"
// 	}, {
// 		"id": 7,
// 		"name": "g"
// 	}],
// 	"triadList": [{
// 		"id": 1,
// 		"node_1_id": 1,
// 		"node_2_id": 2,
// 		"node_3_id": 3
// 	}, {
// 		"id": 2,
// 		"node_1_id": 4,
// 		"node_2_id": 2,
// 		"node_3_id": 5
// 	}, {
// 		"id": 3,
// 		"node_1_id": 5,
// 		"node_2_id": 6,
// 		"node_3_id": 7
// 	}]
// }
// 备注：每个输入框是一个triad，一个triad由三个node组成(用空格分割)。
// nodeList中的id按照自然顺序生成即可，triadList中的node_x_id是指输入的node所对应的id。
// 如果一个triad用到了之前的node，那么所对应的node_x_id是以前的node的id。
// 如果d event_1.b e这个输入，生成的triad应该是
// {
// 	"id": 2,
// 	"node_1_id": 4,
// 	"node_2_id": 2,
// 	"node_3_id": 5
// }

export default {
  components: {},
  setup() {
      const router = useRouter();
      const node = reactive({
          nodeItem: "",
      });
      const nodeMemberDtos = reactive([
        {
          value: '',
          key: -1,
        }
      ])
      const ruleFormRef = ref<FormInstance>();
      const addNode = () => {
        nodeMemberDtos.push({
          value: '',
          key: Date.now(),
        });
        console.log(nodeMemberDtos)
      }
      const deleteNode = (item:node) => {
        console.log(item)
        const index = nodeMemberDtos.indexOf(item);
            if (index !== -1) {
              nodeMemberDtos.splice(index, 1);
            }
            console.log(item);
            // if (item.teamMemberId) {
            //     API_TEAM_DELETE(item.teamMemberId).then((res) => {
            //         if (res.code == 200) {
            //             ElMessage.success("删除成功");
            //         }
            //     });
            // }
      }
      const submit = async (formEl: FormInstance | undefined) => {
          console.log("formEl", formEl);
          if (!formEl) return;

          await formEl.validate((valid, fields) => {
              if (valid) {
              } else {
                  console.log("error submit!", fields);
              }
          });
      };
      
      return {
          node,
          ruleFormRef,
          submit,
          nodeMemberDtos,
          addNode,
          deleteNode,
      };
  },
};
</script>
<style scoped lang="less">
#node-box {
  min-height: calc(100vh - 320px);
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  background: #ffffff;
  padding: 0 40px;


  background: #30324F;
  min-height: 100vh;
  .title {
      margin-top: 10px;
      line-height: 80px;
      height: 80px;
      width: 1120px;
      font-size: 28px;
      font-family: "Alibaba PuHuiTi";
      font-weight: bold;
      color: #333333;
      border-bottom: 1px solid #cccccc;
  }
  .node-form {
      margin-top: 37px;
      width: 400px;
      .node-item {
          font-size: 16px;
          font-family: "Alibaba PuHuiTi";
          font-weight: 400;
          color: #333333;
      }
      :deep(.el-input) {
          // margin-top: 12px;
      }
      :deep(.el-input__inner) {
          width: 400px;
          height: 48px;
          background: #f7f7f7;

          border-radius: 4px;
          &::placeholder {
              font-size: 16px;
              font-family: "PingFang SC";
              font-weight: 500;
              color: #999999;
          }
      }
      :deep(.el-input__inner:focus) {
          border: 1px solid #337ab7;
      }
  }
  .btn-item {
      width: 96px;
      height: 48px;
      background: #337ab7;
      border-radius: 4px;

      font-size: 16px;
      font-family: Alibaba PuHuiTi;
      font-weight: 400;
      color: #ffffff;
      text-align: center;
      line-height: 48px;
      margin-right: 8px;
      cursor: pointer;
  }
  .btn-item:hover {
      background: #4894d6;
  }
  .btn-item:active {
      background: #337ab7;
  }
  .form-options-btn {
      display: flex;
      margin-top: 20px;
  }
  .form-box{
    display: flex;
    align-items: center;
    justify-content: center;
    margin-top: 12px;
    .event-title{
      margin-right: 20px;
    }
  }
  :deep(.el-form-item__error){
    margin-left: 70px;
  }
  :deep(.el-input-group__append, .el-input-group__prepend){
    background-color: #4894d6;
    color: #fff;
    margin-left: 200px;
  }
}
</style>
