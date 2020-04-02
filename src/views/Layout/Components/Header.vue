<template>
  <div id="header-wrap">
    <div @click="navMenuState" class="pull-left header-icon">
      <svg-icon iconClass="menu" class="menu" />
    </div>
    <div class="pull-right header-icon">
      <div class="user-info pull-left">
        <img src="../../../assets/images/face.jpg" alt />
        {{ username }}
      </div>
      <div class="header-icon pull-left" @click="exit">
        <svg-icon iconClass="exit" class="exit" />
      </div>
    </div>
  </div>
</template>

<script>
import { computed } from "@vue/composition-api";
export default {
  name: "layoutHeader",
  setup(props, { root }) {
    const username = computed(() => {
      return root.$store.state.username;
    });
    const navMenuState = () => {
      root.$store.commit("SEL_COLLAPSE");
    };
    //退出
    const exit = () => {
      root.$store.dispatch("exit").then((res)=>{
        root.$router.push({
          name:"/login"
        })
      }).catch((err)=>{

      })
    };
    return {
      navMenuState,
      username,
      exit
    };
  }
};
</script>

<style lang="scss" scoped>
@import "../../../styles/config.scss";
#header-wrap {
  position: fixed;
  top: 0;
  right: 0;
  left: $navMenu;
  height: 75px;
  background-color: #fff;
  @include webkit(box-shadow, 0 3px 16px 0 rgba(0, 0, 0, 0.1));
  @include webkit(transition, all 0.3s ease 0s);
  line-height: 75px;
}
.open {
  #header-wrap {
    left: $navMenu;
  }
}
.close {
  #header-wrap {
    left: $navMenuMin;
  }
}
.header-icon {
  padding: 0 32px;
  svg {
    margin-bottom: -8px;
    font-size: 25px;
    cursor: pointer;
  }
}
.user-info {
  height: 100%;
  padding: 0 32px;
  border-right: 1px solid #ededed;
  + .header-icon {
    padding: 0 28px;
  }
  img {
    display: inline-block;
    margin-bottom: -12px;
    margin-right: 18px;
    border-radius: 50px;
  }
}
</style>