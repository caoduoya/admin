<template>
  <el-upload
    class="avatar-uploader"
    :action="config.uploadUrl"
    :data="data.uploadkey"
    :show-file-list="false"
    :on-success="handleAvatarSuccess"
    :before-upload="beforeAvatarUpload"
  >
    <img v-if="data.imageUrl" :src="data.imageUrl" class="avatar" />
    <i v-else class="el-icon-plus avatar-uploader-icon"></i>
  </el-upload>
</template>

<script>
import { reactive, onMounted, watch } from "@vue/composition-api";
import { loadTableData } from "@/api/common";
export default {
  //组件的过程
  //最终结果要做什么
  name: "uploadName",
  props: {
    imageUrl: {
      type: String,
      default: ""
    },
    config: {
      type: Object,
      default: () => {}
    }
  },
  setup(props, { root, emit }) {
    const data = reactive({
      imageUrl: "",
      uploadkey: {
        token: "",
        key: ""
      }
    });
    const handleAvatarSuccess = (res, file) => {
      let img = `${root.$store.getters["qiniuUrl"]}${res.key}`;
      data.imageUrl = img;
      emit("update:imageUrl", img);
    };
    const beforeAvatarUpload = file => {
      const isJPG = file.type === "image/jpeg";
      const isLt2M = file.size / 1024 / 1024 < 2;

      if (!isJPG) {
        root.$message.error("上传头像图片只能是 JPG 格式!");
      }
      if (!isLt2M) {
        root.$message.error("上传头像图片大小不能超过 2MB!");
      }
      //文件名转码
      let suffix = file.name;
      let key = encodeURI(`${suffix}`);
      data.uploadkey.key = key;
      return isJPG && isLt2M;
    };
    //获取七牛云的token
    const getQiniuToken = () => {
      let requestData = {
        accesskey: props.config.accesskey,
        secretkey: props.config.secretkey,
        buckety: props.config.buckety
      };
      loadTableData(requestData)
        .then(res => {
          data.uploadkey.token = res.data.data.token;
        })
        .catch(err => {});
    };
    //监听
    watch(
      () => props.imageUrl,
      value => {
        data.imageUrl = value;
      }
    );
    onMounted(() => {
      getQiniuToken();
    });
    return {
      handleAvatarSuccess,
      beforeAvatarUpload,
      data
    };
  }
};
</script>

<style lang="scss" scoped>
</style>