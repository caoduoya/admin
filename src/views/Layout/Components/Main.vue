<template>
  <div id="main-wrap">
    <div class="main-content">
      <div class="content">
        <router-view />
      </div>
    </div>
  </div>
</template>

<script>
export default {};
</script>

<style lang="scss" scoped>
@import "../../../styles/config.scss";
#main-wrap {
  height: 100vh;
  // position: fixed;
  // left: 250px;
  // top: 75px;
  // right: 0;
  // bottom: 0;
  // background-color: #fff;
  // border: 30px solid #f7f7f7;
  // border-bottom: none;
  // -webkit-box-sizing: border;
}
.main-content {
  height: 100%;
  width: 100%;
  box-sizing: border-box;
  padding: $layoutHeader + 30 30px 0 $navMenu + 30;
  @include webkit(box-sizing, border-box);
  @include webkit(transition, all 0.3s ease 0s);
}
.open {
  .main-content {
    padding-left: $navMenu + 30;
  }
}
.close {
  .main-content {
    padding-left: $layoutHeader;
  }
}
.content {
  height: 100%;
  width: 100%;
  padding-top: 30px;
  padding-left: 30px;
  @include webkit(box-sizing, border-box);
  box-sizing: border-box;
  background-color: #fff;
}
</style>