<template>
  <div>
    <el-select v-model="data.selectValue" placeholder="请选择">
      <el-option
        v-for="item in data.initOption"
        :key="item.value"
        :value="item.value"
        :label="item.label"
      ></el-option>
    </el-select>
  </div>
</template>

<script>
import { reactive, onMounted } from "@vue/composition-api";
export default {
  name: "",
  props: {
    config: {
      type: Object,
      default: () => {}
    }
  },
  setup(props, { root }) {
    const data = reactive({
      selectValue: "",
      initOption: [],
      option: [
        { value: "name", label: "姓名" },
        { value: "phone", label: "电话" },
        { value: "email", label: "邮箱" },
        { value: "id", label: "ID" },
        { value: "title", label: "标题" }
      ]
    });
    let initOption = () => {
      let initData = props.config.init;
      let optionArr = [];
      if (initData.length === 0) {
        console.log("config的参数是空的，无法显示下拉列表");
        return false;
      }
      initData.forEach(item => {
        let arr = data.option.filter(elem => elem.value == item);
        if (arr.length > 0) {
          optionArr.push(arr[0]);
        }
      });
      if (optionArr.length === 0) {
        console.log("匹配的数据为空");
        return false;
      }
      data.initOption = optionArr;
      data.selectValue = optionArr[0].value;
    };
    onMounted(() => {
      initOption();
    });
    return {
      data
    };
  }
};
</script>

<style lang="scss" scoped>
</style>