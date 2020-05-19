<template>
  <el-table :data="data.tableData" border style="width:100%">
    <el-table-column v-if="data.tableCofig.selection" type="selection" width="55"></el-table-column>
    <template v-for="item in data.tableCofig.tHead">
      <el-table-column
        :key="item.field"
        :prop="item.field"
        :label="item.label"
        v-if="item.columType === 'slot'"
      >
        <template slot-scope="scope">
          <slot :name="item.slotName" :data="scope.row"></slot>
        </template>
      </el-table-column>
      <el-table-column
        :key="item.field"
        :prop="item.field"
        :label="item.label"
        :width="item.width"
        v-else
      ></el-table-column>
    </template>
  </el-table>
</template>
<script>
import { reactive, onBeforeUpdate } from "@vue/composition-api";
import { requestUrl } from "@/api/requestUrl";
import { loadTableData } from "@/api/common";
export default {
  name: "Table",
  props: {
    config: {
      type: Object,
      default: () => {}
    }
  },
  setup(props, { root }) {
    const data = reactive({
      tableCofig: {
        selection: true,
        recordCheckbox: false,
        tHead: [],
        requestUrl: ""
      },
      tableData: [
        {
          email: "2671255454@qq.com",
          name: "王小虎",
          phone: "13870244028",
          address: "上海市普陀区金沙江路 1518 弄",
          role: "超级管理员"
        },
        {
          email: "2671255454@qq.com",
          name: "王小虎",
          phone: "13870244028",
          address: "上海市普陀区金沙江路 1518 弄",
          role: "超级管理员"
        }
      ]
    });
    let loadData = () => {
      loadTableData()
        .then(res => {
          console.log(res);
        })
        .catch(err => {});
    };
    const initTableCofig = () => {
      let configData = props.config;
      let keys = Object.keys(data.tableCofig);
      for (let key in configData) {
        if (keys.includes(key)) {
          data.tableCofig[key] = configData[key];
        }
      }
    };
    onBeforeUpdate(() => {
      initTableCofig();
      loadData();
    });
    return {
      data
    };
  }
};
</script>

<style lang="scss" scoped>
</style>