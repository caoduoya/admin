<template>
  <div>
    <!--对话框-->
    <el-dialog
      width="580px"
      title="修改"
      @opened="openDialog"
      @close="close"
      :visible.sync="dialogInfoFlag"
    >
      <el-form :model="form" ref="addInfoForm">
        <el-form-item label="类型：" :label-width="formLabelWidth" prop="category">
          <el-select v-model="form.category" placeholder="请选择">
            <el-option
              v-for="item in categoryOption.item "
              :key="item.id"
              :label="item.category_name"
              :value="item.id"
            ></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="标题：" :label-width="formLabelWidth" prop="title">
          <el-input v-model="form.title" placeholder="请输入标题"></el-input>
        </el-form-item>
        <el-form-item label="概述：" :label-width="formLabelWidth" prop="content">
          <el-input type="textarea" v-model="form.content" placeholder="请输入概述"></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="close">取消</el-button>
        <el-button type="danger" @loading="sumbitLoading" @click="sumbit">确定</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import { AddInfo, GetList, EditInfo } from "@/api/news";
import { reactive, ref, watch, isRef } from "@vue/composition-api";
export default {
  name: "dialogInfo",
  //单项数据流
  props: {
    flag: {
      type: Boolean,
      default: false
    },
    category: {
      type: Array,
      default: () => []
    },
    id: {
      type: String,
      default: ""
    }
  },
  setup(props, { emit, root, refs }) {
    const dialogInfoFlag = ref(false);
    const form = reactive({
      category: "",
      title: "",
      content: ""
    });
    const categoryOption = reactive({
      item: []
    });
    const sumbitLoading = ref(false);
    const formLabelWidth = ref("70px");
    watch(() => (dialogInfoFlag.value = props.flag));
    const close = () => {
      dialogInfoFlag.value = false;
      emit("update:flag", false);
      resetForm();
    };
    const openDialog = () => {
      categoryOption.item = props.category;
      getInfo();
    };
    const getInfo = () => {
      let requestData = {
        pageNumber: 1,
        pageSize: 1,
        id: props.id
      };
      GetList(requestData)
        .then(res => {
          let responseData = res.data.data.data[0];
          form.category = responseData.categoryId;
          form.title = responseData.title;
          form.content = responseData.content;
        })
        .catch(err => {});
    };
    const resetForm = () => {
      refs.addInfoForm.resetFields();
    //   form.category = "";
    //   form.title = "";
    //   form.content = "";
    };
    const sumbit = () => {
      let requestData = {
        id: props.id,
        categoryId: form.category,
        title: form.title,
        content: form.content
      };
      if (!form.category) {
        root.$message({
          message: "类型不能为空",
          type: "error"
        });
        return false;
      }
      sumbitLoading.value = true;
      EditInfo(requestData)
        .then(res => {
          let data = res.data;
          root.$message({
            message: data.message,
            type: "success"
          });
          sumbitLoading.value = false;
          //二种刷新数据方式
          emit("GetList");
        //   resetForm();
        })
        .catch(err => {
          sumbitLoading.value = false;
        });
    };
    return {
      dialogInfoFlag,
      form,
      formLabelWidth,
      close,
      openDialog,
      categoryOption,
      sumbit,
      sumbitLoading,
      resetForm,
      getInfo
    };
  }
};
</script>

<style lang="scss" scoped>
</style>