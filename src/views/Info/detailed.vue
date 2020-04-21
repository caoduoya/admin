<template>
  <el-form ref="form" :model="form" label-width="120px">
    <el-form-item label="信息分类：">
      <el-select v-model="form.categoryId">
        <el-option
          v-for="item in data.category"
          :key="item.id"
          :value="item.id"
          :label="item.category_name"
        ></el-option>
      </el-select>
    </el-form-item>
    <el-form-item label="新闻标题：">
      <el-input v-model="form.title" placeholder="请输入标题"></el-input>
    </el-form-item>
    <el-form-item label="缩略图：">
      <UploadImg :imageUrl.sync="form.imageUrl" :config="uploadImgConfig" />
    </el-form-item>
    <el-form-item label="发布日期：">
      <el-date-picker disabled v-model="form.dataTime" type="date" placeholder="选择日期"></el-date-picker>
    </el-form-item>
    <el-form-item label="详细内容：">
      <quillEditor v-model="form.content" ref="myQuillEditor" :options="data.editorOption" />
    </el-form-item>
    <el-form-item>
      <el-button type="primary" @click="sumbit" :loading="data.sumbitLoading">保存</el-button>
    </el-form-item>
  </el-form>
</template>

<script>
import { AddInfo, GetList, EditInfo } from "@/api/news";
import {
  reactive,
  ref,
  onMounted,
  computed,
  watch
} from "@vue/composition-api";
import { timestampToTime } from "@/utils/common";
import { quillEditor } from "vue-quill-editor";
import "quill/dist/quill.core.css";
import "quill/dist/quill.snow.css";
import "quill/dist/quill.bubble.css";
import UploadImg from "@c/UploadImg";
export default {
  name: "infoDetailed",
  components: {
    quillEditor,
    UploadImg
  },
  setup(props, { root }) {
    const uploadImgConfig = reactive({
      uploadUrl: "http://up-z2.qiniup.com",
      accesskey: "Cz2SPo3pFreoVtSp8ptSh8Lw4adB-Oe24hYtNqBc",
      secretkey: "NfPu1mrysTgqc_x4a0R3m0mNupfx5OpmawOv5jwj",
      buckety: "caodouya"
    });
    const data = reactive({
      id: root.$route.query.id || root.$store.getters["infoId"],
      category: [],
      editorOption: {},
      sumbitLoading: false
    });
    const form = reactive({
      categoryId: "",
      title: "",
      dataTime: "",
      content: "",
      imageUrl: ""
    });
    // let id = root.$route.query.id || root.$store.getters["infoId"];
    // let title = root.$route.query.title || root.$store.getters["infoTitle"];
    const getInfoCategory = () => {
      root.$store.dispatch("GetInfoCategory").then(res => {
        data.category = res;
      });
    };
    const getInfo = () => {
      let requestData = {
        pageNumber: 1,
        pageSize: 1,
        id: data.id
      };
      GetList(requestData)
        .then(res => {
          let responseData = res.data.data.data[0];
          form.categoryId = responseData.categoryId;
          form.title = responseData.title;
          form.dataTime = timestampToTime(responseData.createDate);
          form.content = responseData.content;
          form.imageUrl = responseData.imgUrl;
        })
        .catch(err => {});
    };
    const sumbit = () => {
      let requestData = {
        id: data.id,
        categoryId: form.categoryId,
        title: form.title,
        content: form.content,
        imgUrl: form.imageUrl
      };
      data.sumbitLoading = true;
      EditInfo(requestData)
        .then(res => {
          let data = res.data;
          root.$message({
            message: data.message,
            type: "success"
          });
          data.sumbitLoading = false;
        })
        .catch(err => {
          data.sumbitLoading = false;
        });
    };

    onMounted(() => {
      getInfoCategory();
      getInfo();
    });
    return {
      data,
      form,
      sumbit,
      uploadImgConfig
    };
  }
};
</script>

<style lang="scss" scoped>
.avatar-uploader .el-upload {
  border: 1px dashed #d9d9d9;
  border-radius: 6px;
  cursor: pointer;
  position: relative;
  overflow: hidden;
}
.avatar-uploader .el-upload:hover {
  border-color: #409eff;
}
.avatar-uploader-icon {
  font-size: 28px;
  color: #8c939d;
  width: 178px;
  height: 178px;
  line-height: 178px;
  text-align: center;
}
.avatar {
  width: 178px;
  height: 178px;
  display: block;
}
</style>