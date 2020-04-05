<template>
  <div id="category">
    <el-button type="danger" @click="addFirst({type:'category_first_add'})">添加一级分类</el-button>
    <hr class="hr-e9e9e9" />
    <div>
      <el-row :gutter="30">
        <el-col :span="8">
          <div class="categroy-wrap">
            <div class="category" v-for="item in category.item" :key="item.id">
              <h4>
                <svg-icon icon-class="plus"></svg-icon>
                {{ item.category_name}}
                <div class="button-group">
                  <el-button
                    size="mini"
                    type="danger"
                    @click="editCategory({data:item,type:'category_first_edit'})"
                    round
                  >编辑</el-button>
                  <el-button size="mini" type="success" round>添加子级</el-button>
                  <el-button size="mini" @click="deleteCategoryConfirm(item.id)" round>删除</el-button>
                </div>
              </h4>
              <ul v-if="item.children">
                <li v-for="(item1,index) in item.children" :key="index">
                  {{ item1.category_name}}
                  <div class="button-group">
                    <el-button size="mini" type="danger" round>编辑</el-button>
                    <el-button size="mini" round>删除</el-button>
                  </div>
                </li>
              </ul>
            </div>
          </div>
        </el-col>
        <el-col :span="16">
          <h4 class="menu-title">一级分类编辑</h4>
          <el-form label-width="142px" class="from-wrap" ref="categoryForm">
            <el-form-item label="一级分类名称" v-if="category_first_input">
              <el-input :disabled="category_first_disabled" v-model="form.categoryName"></el-input>
            </el-form-item>
            <el-form-item label="二级分类名称" v-if="category_children_input">
              <el-input :disabled="category_children_disabled" v-model="form.setCategoryName"></el-input>
            </el-form-item>
            <el-form-item>
              <el-button
                :disabled="submit_button_disabled"
                type="danger"
                @click="submit"
                :loading="submit_loading"
              >确定</el-button>
            </el-form-item>
          </el-form>
        </el-col>
      </el-row>
    </div>
  </div>
</template>

<script>
import { common } from "@/api/common";
import { global } from "@/utils/global";
import {
  addFirstCategory,
  getCategory,
  DeleteCategory,
  EditCategory
} from "@/api/news";
import {
  reactive,
  ref,
  onMounted,
  computed,
  watch
} from "@vue/composition-api";
export default {
  name: "category",
  setup(props, { root, refs }) {
    const { getinfoCategory, categoryItem } = common();
    const { confirm } = global();
    const form = reactive({
      categoryName: "",
      setCategoryName: ""
    });
    const category = reactive({
      item: [],
      current: []
    });
    const subit_button_type = ref("");
    const submit_loading = ref(false);
    const category_first_input = ref(true);
    const category_children_input = ref(true);
    const category_first_disabled = ref(true);
    const category_children_disabled = ref(true);
    const submit_button_disabled = ref(true);
    const deleteId = ref("");
    const submit = () => {
      if (subit_button_type.value === "category_first_add") {
        if (!form.categoryName) {
          root.$message({
            message: "内容不能为空",
            type: "error"
          });
          return false;
        }
        submit_loading.value = true;
        addFirstCategory({ categoryName: form.categoryName })
          .then(res => {
            let data = res.data;
            if (data.resCode === 0) {
              root.$message({
                message: data.message,
                type: "success"
              });
              category.item.push(res.data.data);
            }
            submit_loading.value = false;
            form.categoryName = "";
            form.setCategoryName = "";
            // refs.categoryForm.resetFields();
          })
          .catch(err => {
            submit_loading.value = true;
            form.categoryName = "";
            form.setCategoryName = "";
            // refs.categoryForm.resetFields();
          });
      }
      if (subit_button_type.value === "category_first_edit") {
        editFirstCategory();
      }
    };
    const addFirstCategroy = () => {};
    const addFirst = params => {
      subit_button_type.value = params.type;
      category_children_input.value = false;
      category_first_disabled.value = false;
      submit_button_disabled.value = false;
      console.log(subit_button_type.value);
    };
    const deleteCategoryConfirm = data => {
      deleteId.value = data;
      confirm({
        content: "确认删除当前信息吗?删除后无法恢复",
        tip: "警告",
        fn: deleteCategory,
        catchFn: () => {
          deleteId.value = "";
        }
      });
    };
    const deleteCategory = () => {
      DeleteCategory({ categoryId: deleteId.value })
        .then(res => {
          //操作数组
          // let index = category.item.findIndex(item => {
          //   item.id == deleteId.value;
          // });
          // category.item.splice(index, 1);
          // console.log(res);
          let newData = category.item.filter(item => item.id != deleteId.value);
          category.item = newData;
        })
        .catch(err => {});
    };
    const editCategory = params => {
      subit_button_type.value = params.type;
      category_children_input.value = false;
      category_first_disabled.value = false;
      submit_button_disabled.value = false;
      console.log(params.data);
      form.categoryName = params.data.category_name;
      category.current = params.data;
    };
    const editFirstCategory = () => {
      if (category.current.length == 0) {
        root.$message({
          message: "未选择分类,请选择分类",
          type: "error"
        });
        return false;
      }
      let data = {
        id: category.current.id,
        categoryName: form.categoryName
      };
      EditCategory(data)
        .then(res => {
          root.$message({
            message: res.data.message,
            type: "success"
          });
          category.current.category_name = res.data.data.data.categoryName;
          form.categoryName = "";
          category.current = [];
        })
        .catch(err => {});
    };
    //挂载完成运行
    onMounted(() => {
      getinfoCategory();
    });
    //监听
    watch(
      () => categoryItem.item,
      value => {
        category.item = value;
      }
    );
    return {
      form,
      submit,
      addFirst,
      category_children_input,
      category_first_input,
      category,
      submit_loading,
      submit_button_disabled,
      category_first_disabled,
      category_children_disabled,
      deleteCategoryConfirm,
      deleteCategory,
      deleteId,
      editCategory,
      editFirstCategory
    };
  }
};
</script>

<style lang="scss" scoped>
@import "../../styles/config.scss";
.categroy-wrap {
  div:first-child {
    &::before {
      top: 20px;
    }
  }
  div:last-child {
    &::before {
      bottom: 21px;
    }
  }
}
.menu-title {
  line-height: 44px;
  background-color: #f3f3f3;
  padding-left: 22px;
}
.category {
  position: relative;
  line-height: 44px;
  cursor: pointer;
  &::before {
    content: "";
    position: absolute;
    width: 32px;
    border-left: 1px dotted #ccc;
    left: 22px;
    bottom: 0;
    top: 0;
  }
  h4 {
    position: relative;
    padding-left: 40px;
  }
  svg {
    position: absolute;
    left: 20px;
    top: 12px;
    font-size: 17px;
  }
  li {
    position: relative;
    padding-left: 36px;
    margin-left: 24px;
    &::before {
      content: "";
      position: absolute;
      width: 32px;
      border-bottom: 1px dotted #ccc;
      left: 0;
      top: 22px;
    }
  }
  li,
  h4 {
    &:hover {
      @include webkit(transition, all 0.3 ease 0s);
      background-color: #f3f3f3;
      .button-group {
        display: block;
      }
    }
  }
}
.button-group {
  display: none;
  position: absolute;
  z-index: 2;
  right: 11px;
  top: -1px;
  button {
    font-size: 12px;
  }
}
.from-wrap {
  width: 410px;
  margin-top: 26px;
}
.hr-e9e9e9 {
  width: calc(100% + 60px);
  margin-left: -30px;
  border: none;
  margin-top: 30px;
  margin-bottom: 30px;
  border-bottom: 1px solid #e9e9e9;
}
</style>