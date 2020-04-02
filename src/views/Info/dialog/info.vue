<template>
  <div>
    <!--对话框-->
    <el-dialog width="580px" title="新增" @close="close" :visible.sync="dialogInfoFlag">
      <el-form :model="form">
        <el-form-item label="类型：" :label-width="formLabelWidth">
          <el-select v-model="form.region" placeholder="请选择">
            <el-option label="区域一" value="shanghai"></el-option>
            <el-option label="区域二" value="beijing"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="标题：" :label-width="formLabelWidth">
          <el-input v-model="form.name" placeholder="请输入标题"></el-input>
        </el-form-item>
        <el-form-item label="概述：" :label-width="formLabelWidth">
          <el-input type="textarea" v-model="form.name" placeholder="请输入概述"></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="close">取消</el-button>
        <el-button type="danger" @click="dialogFormVisible = false">确定</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import { reactive, ref, watch } from "@vue/composition-api";
export default {
  name: "dialogInfo",
  //单项数据流
  props: {
    flag: {
      type: Boolean,
      default: false
    }
  },
  setup(props, { emit }) {
    const dialogInfoFlag = ref(false);
    const form = reactive({
      name: "",
      region: "",
      date1: "",
      date2: "",
      delivery: false,
      type: [],
      resource: "",
      desc: ""
    });
    const formLabelWidth = ref("70px");
    watch(() => {
      dialogInfoFlag.value = props.flag;
    });
    const close = () => {
      dialogInfoFlag.value = false;
      emit("update:flag", false);
      //   this.$emit("close", false);
    };
    return {
      dialogInfoFlag,
      form,
      formLabelWidth,
      close
    };
  }
  //   watch: {
  //     flag: {
  //       handler(newValue, oldValue) {
  //         this.dialogInfoFlag = newValue;
  //         console.log(newValue);
  //       }
  //     }
  //   }
};
</script>

<style lang="scss" scoped>
</style>