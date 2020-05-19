<template>
  <div>
    <el-row :gutter="14">
      <el-col :span="4">
        <div class="label-wrap category">
          <label for>类别：</label>
          <div class="wrap-content">
            <el-select v-model="categoryValue" placeholder="请选择" style="width:100%">
              <el-option
                v-for="item in options.category"
                :key="item.id"
                :label="item.category_name"
                :value="item.id"
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
              format="yyyy 年 MM 月 dd 日"
              value-format="yyyy-MM-dd HH:mm:ss"
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
            <SelectVue :config="data.configOption" />
            <!-- <el-select v-model="search_key" placeholder="请选择" style="width:100%">
              <el-option
                v-for="item in searchOption"
                :key="item.value"
                :label="item.label"
                :value="item.value"
              ></el-option>
            </el-select>-->
          </div>
        </div>
      </el-col>
      <el-col :span="3">
        <el-input style="width:100%" v-model="search_keyWork" placeholder="请输入内容"></el-input>
      </el-col>
      <el-col :span="4">
        <el-button type="danger" style="width:50%" @click="getList">搜索</el-button>
      </el-col>
      <el-col :span="2">
        <el-button type="danger" style="width:100%" @click="dialogInfo = true">新增</el-button>
      </el-col>
    </el-row>
    <div class="black-space-30"></div>
    <el-table
      v-loading="loading"
      :data="tableData.item"
      border
      style="width: 100%"
      @selection-change="handleSelectionChange"
    >
      <el-table-column type="selection" width="45"></el-table-column>
      <el-table-column prop="title" label="标题" width="309"></el-table-column>
      <el-table-column :formatter="toCategroy" prop="categoryId" label="类型" width="130"></el-table-column>
      <el-table-column :formatter="toData" prop="createDate" label="日期" width="237"></el-table-column>
      <el-table-column prop="user" label="管理人" width="115"></el-table-column>
      <el-table-column label="操作">
        <template slot-scope="scope">
          <el-button size="mini" type="danger" @click="deleteItem(scope.row.id)">删除</el-button>
          <el-button size="mini" type="success" @click="editInfo(scope.row.id)">编辑</el-button>
          <el-button size="mini" type="success" @click="detailed(scope.row)">编辑详情</el-button>
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
          layout="total,sizes,prev,pager,next,jumper"
          :total="total"
        ></el-pagination>
      </el-col>
    </el-row>
    <!--新增弹窗-->
    <DialogInfo :flag.sync="dialogInfo" :category="options.category" />
    <!--修改弹窗-->
    <DialogInfoEdit
      :flag.sync="dialogInfoEdit"
      :id="infoID"
      :category="options.category"
      @GetList="getList"
    />
  </div>
</template>

<script>
import { timestampToTime } from "@/utils/common";
import { common } from "@/api/common";
import { getCategory, GetList, DeleteInfo } from "@/api/news";
import { global } from "@/utils/global";
import DialogInfo from "./dialog/info";
import DialogInfoEdit from "./dialog/edit";
import SelectVue from "@c/Select";
import {
  reactive,
  ref,
  onMounted,
  computed,
  watch
} from "@vue/composition-api";
export default {
  name: "infoIndex",
  components: {
    DialogInfo,
    DialogInfoEdit,
    SelectVue
  },
  setup(props, { root }) {
    //数据
    const data = reactive({
      configOption: {
        init: ["id", "title"]
      }
    });
    const { confirm } = global();
    const { getinfoCategory, categoryItem } = common();
    const dialogInfo = ref(false);
    const dialogInfoEdit = ref(false);
    const options = reactive({
      category: []
    });
    const searchOption = reactive([
      {
        value: "id",
        label: "ID"
      },
      {
        value: "title",
        label: "标题"
      }
    ]);
    const search_key = ref("id");
    const categoryValue = ref("");
    const dataValue = ref("");
    const search_keyWork = ref("");
    const total = ref(0);
    const loading = ref(false);
    const deleteInfoId = ref("");
    const infoID = ref("");
    const page = reactive({
      pageNumber: 1,
      pagesize: 10
    });
    const tableData = reactive({
      item: []
    });
    //方法
    const handleSizeChange = val => {
      console.log(val);
    };
    const handleCurrentChange = val => {
      page.pageNumber = val;
      getList();
    };
    const deleteItem = row => {
      deleteInfoId.value = [row];
      confirm({
        content: "确认删除当前信息吗?删除后无法恢复",
        tip: "警告",
        fn: confirmDelete
      });
    };
    const formatData = () => {
      let requestData = {
        pageNumber: page.pageNumber,
        pageSize: page.pagesize
      };
      if (categoryValue.value) {
        requestData.categoryId = categoryValue.value;
      }
      //日期
      if (dataValue.value.length > 0) {
        requestData.startTiem = dataValue.value[0];
        requestData.endTime = dataValue.value[1];
      }
      //关键字
      if (search_keyWork.value) {
        requestData[search_key.value] = search_keyWork.value;
      }
      return requestData;
    };
    const editInfo = id => {
      infoID.value = id;
      dialogInfoEdit.value = true;
    };
    const getList = () => {
      //单独处理数据
      let requestData = formatData();
      loading.value = true;
      GetList(requestData)
        .then(res => {
          loading.value = false;
          let data = res.data.data;
          tableData.item = data.data;
          //更新页码
          total.value = data.total;
        })
        .catch(err => {
          loading.value = false;
        });
    };
    const deleteAll = () => {
      if (!deleteInfoId.value || deleteInfoId.value.length == 0) {
        root.$message({
          message: "请选择删除项",
          type: "error"
        });
        return false;
      }
      confirm({
        content: "确认删除选中的数据吗?删除后无法恢复",
        type: "success",
        fn: confirmDelete
      });
    };
    const confirmDelete = value => {
      DeleteInfo({ id: deleteInfoId.value })
        .then(res => {
          console.log(res);
          getList();
        })
        .catch(err => {});
    };
    //监听
    // watch(
    //   () => categoryItem.item,
    //   value => {
    //     options.category = value;
    //   }
    // );
    const toData = (row, column, cellValue, index) => {
      return timestampToTime(row.createDate);
    };
    const toCategroy = row => {
      let categoryId = row.categoryId;
      let categroyData = options.category.filter(
        item => item.id == categoryId
      )[0];
      return categroyData.category_name;
    };
    const handleSelectionChange = val => {
      let id = val.map(item => item.id);
      deleteInfoId.value = id;
    };

    //获取分类
    //挂载完成运行
    onMounted(() => {
      getList();
      // getinfoCategory();
      root.$store
        .dispatch("GetInfoCategory")
        .then(res => {
          options.category = res;
        })
        .catch(err => {});
    });
    const detailed = data => {
      root.$store.commit("SET_ID", data.id);
      root.$store.commit("SET_TITLE", data.title);
      root.$router.push({
        name: "InfoDetailed",
        query: {
          id: data.id,
          title: data.title
        }
      });
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
      deleteAll,
      getList,
      total,
      page,
      loading,
      toData,
      toCategroy,
      deleteInfoId,
      handleSelectionChange,
      dialogInfoEdit,
      editInfo,
      infoID,
      detailed,
      data
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