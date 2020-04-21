<template>
  <div id="nav-wrap">
    <h1 class="logo">
      <img src="../../../assets/logo.png" alt />
    </h1>
    <el-menu
      default-active="1-4-1"
      class="el-menu-vertical-demo"
      :collapse="isCollapse"
      background-color="transparent"
      text-color="#fff"
      active-text-color="#fff"
      router
    >
      <template v-for="(item,index) in routers">
        <el-submenu :key="item.id" v-if="!item.hidden" :index="index + ''">
          <template slot="title">
            <svg-icon :iconClass="item.meta.icon" :className="item.meta.icon" />
            <span slot="title">{{ item.meta.name }}</span>
          </template>
          <template v-for="subItem in item.children">
            <el-menu-item
              :key="subItem.id"
              :index="subItem.path"
            >{{ subItem.meta.name }}</el-menu-item>
          </template>
        </el-submenu>
      </template>
    </el-menu>
  </div>
</template>

<script>
import { reactive, ref, onMounted, computed } from "@vue/composition-api";
export default {
  name: "navMenu",
  setup(props, { root }) {
    //data数据
    // const isCollapse = ref(false);
    const routers = reactive(root.$router.options.routes);
    const isCollapse = computed(() => {
      return root.$store.state.isCollapse;
    });
    return {
      isCollapse,
      routers
    };
  }
};
</script>

<style lang="scss" scoped>
@import "../../../styles/config.scss";
.logo {
  text-align: center;
  img {
    width: 92px;
    margin: 28px auto 25px;
    @include webkit(transition, all 0.3s ease 0s);
  }
}
#nav-wrap {
  position: fixed;
  top: 0;
  left: 0;
  width: $navMenu;
  height: 100vh;
  background-color: #344a5f;
  @include webkit(transition, all 0.3s ease 0s);
  svg {
    font-size: 20px;
    margin-right: 10px;
  }
}
.open {
  #nav-wrap {
    width: $navMenu;
  }
}
.close {
  #nav-wrap {
    width: $navMenuMin;
  }
  .logo img {
    width: 60%;
  }
}
</style>