<template>
  <div id="layout" :class="[menuStatus ? 'close' : 'open']">
    <LayoutHeader />
    <LayoutMain />
    <LayoutNav />
  </div>
</template>

<script>
import LayoutHeader from "./Components/Header";
import LayoutMain from "./Components/Main";
import LayoutNav from "./Components/Nav";
import { reactive, ref, onMounted, computed } from "@vue/composition-api";
export default {
  name: "layout",
  setup(props, { root }) {
    const menuStatus = computed(() => {
      return root.$store.state.isCollapse;
    });
    return {
      menuStatus
    };
  },
  components: {
    LayoutHeader,
    LayoutMain,
    LayoutNav
  }
};
</script>

<style lang="scss" scoped>
</style>