<template>
  <div id="node-box">
    <!-- <div class="title">第一次作业</div> -->
    <div class="node-form">
      <el-form ref="formRef" :model="nodeValidateForm">
        <el-form-item label="主干" prop="">
          <el-button @click="addNode" type="primary">新建event</el-button>
        </el-form-item>
        <div v-for="(item, index) in nodeValidateForm.nodeList" :key="item.key">
          <el-form-item
            label=""
            :prop="'nodeList.' + index + '.value'"
            :rules="[
              {
                required: true,
                message: `请输入event${index + 1}的node信息`,
                trigger: 'blur',
              },
              {
                validator: spaceDouble,
                trigger: 'blur',
              },
            ]"
          >
            <div class="form-box">
              <div class="event-title">{{ item.name }}</div>
              <el-input v-model="item.value" placeholder="请输入node信息">
                <template #append>
                  <el-button @click="deleteNode(item)" type="primary"
                    >--删除该event</el-button
                  >
                </template>
              </el-input>
            </div>
          </el-form-item>
        </div>
      </el-form>
    </div>
    <div class="form-options-btn">
      <div @click="" class="btn-item">重置</div>
      <div @click="submitForm(formRef)" class="btn-item">提交</div>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { reactive, ref } from "vue";
import type { FormInstance } from "element-plus";

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

const formRef = ref<FormInstance>();
//输入的表单list
const nodeValidateForm = reactive<{
  nodeList: DomainItem[];
  onlyOneNodeList: DomainItem[];
}>({
  nodeList: [
    {
      key: 1,
      value: "a b c",
      name: 'event_1',
    },
    {
      key: 2,
      value: "d event_1.b e",
      name: 'event_2',
    },
    {
      key: 3,
      value: "event_2.e f g",
      name: 'event_3',
    },
  ],
  onlyOneNodeList: [],
});

//自定义表单校验
const spaceDouble = (rule: any, value: any, callback: any) => {
  //验证输入是否合法
  let data = value.split(/\s+/).filter(Boolean);
  if (data.length !== 3) {
    callback(new Error("请检查表单是否用空格分割成3个部分"));
  } else {
    callback();
  }
};
//提交用到的数据
const formConsole: any = reactive({
  nodeList: [],
  triadList: [],
});
interface DomainItem {
  key: number;
  value: string;
  name: string;
}

const removeDomain = (item: DomainItem) => {
  const index = nodeValidateForm.nodeList.indexOf(item);
  if (index !== -1) {
    nodeValidateForm.nodeList.splice(index, 1);
  }
};

const addNode = () => {
  nodeValidateForm.nodeList.push({
    value: "",
    key: Date.now(),
    name: 'event_' + (nodeValidateForm.nodeList.length + 1)
  });
  console.log(nodeValidateForm.nodeList);
};
const deleteNode = (item: node) => {
  console.log(item);
  const index = nodeValidateForm.nodeList.indexOf(item);
  if (index !== -1) {
    nodeValidateForm.nodeList.splice(index, 1);
  }
  console.log(item);
  // if (item.teamMemberId) {
  //     API_TEAM_DELETE(item.teamMemberId).then((res) => {
  //         if (res.code == 200) {
  //             ElMessage.success("删除成功");
  //         }
  //     });
  // }
};
//提交
const submitForm = (formEl: FormInstance | undefined) => {
  if (!formEl) return;

  formEl.validate((valid: any) => {
    if (valid) {
      //获取nodeList
      let nodeList = getNodeList();
      getTriadList()
      console.log("xxxxxxxxxxxx", nodeList);
    } else {
      console.log("error submit!");
      return false;
    }
  });
};
//获取nodeList
const getNodeList = () => {
  formConsole.nodeList = [];
  console.log("submit!", nodeValidateForm.nodeList);
  let nodeList = [];
  nodeValidateForm.onlyOneNodeList = []
  nodeValidateForm.nodeList.map((item) => {
    nodeList = item.value.split(/\s+/).filter(Boolean);
    nodeList.map((nodeItem, index) => {
      if (nodeItem.indexOf(".") === -1) {
        let consoleNodeItem = {
          id: -1,
          name: nodeItem,
        };
        formConsole.nodeList.push(consoleNodeItem);
        
      }else{
        console.log(nodeItem)
      }
      nodeValidateForm.onlyOneNodeList.push(nodeItem as any)
    });
  });

  //在这里遍历,修改nodeList中的id
  formConsole.nodeList.map((item: any, index: any) => {
    item.id = index + 1;
  });
  
  return formConsole.nodeList
};

//获取triadList
const getTriadList = () => {
  let triadList = []
  // nodeValidateForm.onlyOneNodeList
  nodeValidateForm.nodeList.map((item:any,index:any)=>{
    let data = {
      id: index + 1,
    }
    let nodeList = [];
    nodeList = item.value.split(/\s+/).filter(Boolean);
    nodeList.map((nodeItem:any, index:any) => {
      if (nodeItem.indexOf(".") === -1) {
        let consoleTriadItem = {
          id: -1,
          name: nodeItem,
        };
        formConsole.triadList.push(consoleTriadItem);
        
      }else{
        console.log(nodeItem)
      }
      
    });
  })
}

const resetForm = (formEl: FormInstance | undefined) => {
  if (!formEl) return;
  formEl.resetFields();
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

  background: #30324f;
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
  .form-box {
    display: flex;
    align-items: center;
    justify-content: center;
    margin-top: 12px;
    .event-title {
      margin-right: 20px;
    }
  }
  :deep(.el-form-item__error) {
    margin-left: 70px;
  }
  :deep(.el-input-group__append, .el-input-group__prepend) {
    background-color: #4894d6;
    color: #fff;
    margin-left: 200px;
  }
}
</style>