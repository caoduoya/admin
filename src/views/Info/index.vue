<template>
  <div>
    <el-row :gutter="14">
      <el-col :span="4">
        <div class="label-wrap category">
          <label for>类型：</label>
          <div class="wrap-content">
            <el-select v-model="categoryValue" placeholder="请选择" style="width:100%">
              <el-option
                v-for="item in options"
                :key="item.value"
                :label="item.label"
                :value="item.value"
              ></el-option>
            </el-select>
          </div>
        </div>
      </el-col>
      <el-col :span="7">
        <div class="label-wrap date">
          <label for>日期：&nbsp;&nbsp;</label>
          <div class="wrap-content">
            <el-date-picker
              style="width:100%"
              v-model="dataValue"
              type="datetimerange"
              align="right"
              start-placeholder="开始日期"
              end-placeholder="结束日期"
              :default-time="['12:00:00', '08:00:00']"
            ></el-date-picker>
          </div>
        </div>
      </el-col>
      <el-col :span="4">
        <div class="label-wrap key-work">
          <label for>关键字：</label>
          <div class="wrap-content">
            <el-select v-model="search_key" placeholder="请选择" style="width:100%">
              <el-option
                v-for="item in searchOption"
                :key="item.value"
                :label="item.label"
                :value="item.value"
              ></el-option>
            </el-select>
          </div>
        </div>
      </el-col>
      <el-col :span="3">
        <el-input style="width:100%" v-model="search_keyWork" placeholder="请输入内容"></el-input>
      </el-col>
      <el-col :span="4">
        <el-button type="danger" style="width:50%">搜索</el-button>
      </el-col>
      <el-col :span="2">
        <el-button type="danger" style="width:100%" @click="dialogInfo = true">新增</el-button>
      </el-col>
    </el-row>
    <div class="black-space-30"></div>
    <el-table :data="tableData" border style="width: 100%">
      <el-table-column type="selection" width="45"></el-table-column>
      <el-table-column prop="title" label="标题" width="429"></el-table-column>
      <el-table-column prop="category" label="类型" width="130"></el-table-column>
      <el-table-column prop="date" label="日期" width="237"></el-table-column>
      <el-table-column prop="user" label="管理人" width="115"></el-table-column>
      <el-table-column label="操作">
        <template slot-scope="scope">
          <el-button size="mini" type="danger" @click="deleteItem">删除</el-button>
          <el-button size="mini" type="success" @click="dialogInfo = true">编辑</el-button>
        </template>
      </el-table-column>
    </el-table>
    <!--底部-->
    <div class="black-space-30"></div>
    <el-row>
      <el-col :span="12">
        <el-button size="medium" @click="deleteAll">批量删除</el-button>
      </el-col>
      <el-col :span="12">
        <el-pagination
          class="pull-right"
          @size-change="handleSizeChange"
          @current-change="handleCurrentChange"
          background
          layout="prev, pager, next"
          :total="1000"
        ></el-pagination>
      </el-col>
    </el-row>
    <DialogInfo :flag.sync="dialogInfo" />
  </div>
</template>

<script>
import { global } from "@/utils/global";
import DialogInfo from "./dialog/info";
import { reactive, ref, onMounted, computed } from "@vue/composition-api";
export default {
  name: "infoIndex",
  components: {
    DialogInfo
  },
  setup(props, { root }) {
    //数据
    const { confirm } = global();
    const dialogInfo = ref(false);
    const options = reactive([
      {
        value: 1,
        label: "国际信息"
      },
      {
        value: 2,
        label: "国内信息"
      },
      {
        value: 3,
        label: "行业信息"
      }
    ]);
    const searchOption = reactive([
      {
        value: 1,
        label: "ID"
      },
      {
        value: 2,
        label: "标题"
      }
    ]);
    const search_key = ref("ID");
    const categoryValue = ref("");
    const dataValue = ref("");
    const search_keyWork = ref("");
    const tableData = reactive([
      {
        title: "fafafaf",
        category: "国内信息",
        date: "2016-05-02",
        user: "曹雅俊"
      },
      {
        title: "fafafaf",
        category: "国内信息",
        date: "2016-05-02",
        user: "曹雅俊"
      },
      {
        title: "fafafaf",
        category: "国内信息",
        date: "2016-05-02",
        user: "曹雅俊"
      },
      {
        title: "fafafaf",
        category: "国内信息",
        date: "2016-05-02",
        user: "曹雅俊"
      },
      {
        title: "fafafaf",
        category: "国内信息",
        date: "2016-05-02",
        user: "曹雅俊"
      }
    ]);
    //方法
    const handleSizeChange = val => {
      console.log(val);
    };
    const handleCurrentChange = val => {
      console.log(val);
    };
    const deleteItem = () => {
      // root.confirm({
      //   content: "确认删除当前信息吗?删除后无法恢复",
      //   tip: "警告",
      //   fn: confirmDelete
      // });
      confirm({
        content: "确认删除当前信息吗?删除后无法恢复",
        tip: "警告",
        fn: confirmDelete
      });
    };
    const deleteAll = () => {
      // root.confirm({
      //   content: "确认删除选中的数据吗?删除后无法恢复",
      //   type: "success",
      //   fn: confirmDelete
      // });
      confirm({
        content: "确认删除选中的数据吗?删除后无法恢复",
        type: "success",
        fn: confirmDelete
      });
    };
    const confirmDelete = value => {
      console.log(value);
    };
    return {
      options,
      categoryValue,
      dataValue,
      searchOption,
      search_key,
      search_keyWork,
      tableData,
      handleSizeChange,
      handleCurrentChange,
      dialogInfo,
      deleteItem,
      deleteAll
    };
  }
};
</script>

<style lang="scss" scoped>
@import "../../styles/config.scss";
.label-wrap {
  &.category {
    @include labelDom(left, 60, 40);
  }
  &.date {
    @include labelDom(right, 93, 40);
  }
  &.key-work {
    @include labelDom(right, 99, 40);
  }
}
</style>