<template>
  <div id="login">
    <div class="login-wrap">
      <ul class="menu-tab">
        <li
          :class="{ 'current':item.current }"
          v-for="item in menuTab"
          :key="item.id"
          @click="toggleMenu(item)"
        >{{ item.txt }}</li>
      </ul>
      <!--表单-->
      <el-form
        :model="ruleForm"
        status-icon
        :rules="rules"
        ref="ruleForm"
        class="login-form"
        size="medium"
      >
        <el-form-item class="item-from" prop="username">
          <label for="username">邮箱</label>
          <el-input id="username" type="text" v-model="ruleForm.username" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item class="item-from" prop="password">
          <label for="password">密码</label>
          <el-input
            id="password"
            minlength="6"
            maxlength="20"
            type="password"
            v-model="ruleForm.password"
            autocomplete="off"
          ></el-input>
        </el-form-item>
        <el-form-item class="item-from" prop="passwords" v-show="model === 'register'">
          <label for="passwords">重复密码</label>
          <el-input
            id="passwords"
            minlength="6"
            maxlength="20"
            type="password"
            v-model="ruleForm.passwords"
            autocomplete="off"
          ></el-input>
        </el-form-item>
        <el-form-item class="item-from" prop="code">
          <label for="code">验证码</label>
          <el-row :gutter="11">
            <el-col :span="15">
              <el-input id="code" minlength="6" maxlength="6" v-model="ruleForm.code"></el-input>
            </el-col>
            <el-col :span="9">
              <el-button
                @click="getSms()"
                type="success"
                class="block"
                :disabled="codeButtonStatus.status"
              >{{ codeButtonStatus.text }}</el-button>
            </el-col>
          </el-row>
        </el-form-item>
        <el-form-item>
          <el-button
            class="login-btm block"
            type="danger"
            @click="submitForm('ruleForm')"
            :disabled="loginButtonStatus"
          >{{ model === "login" ? "登录" : "注册" }}</el-button>
        </el-form-item>
      </el-form>
    </div>
  </div>
</template>
<script>
import sha1 from "js-sha1";
import { reactive, ref, onMounted } from "@vue/composition-api";
import {
  stripscript,
  validateEmail,
  vaildatePass,
  validateVCode
} from "@/utils/validate";
import { Getsms, Register, Login } from "@/api/login";
export default {
  name: "login",
  setup(props, { refs, root }) {
    let validateUsername = (rule, value, callback) => {
      if (value === "") {
        callback(new Error("请输入用户名"));
      } else if (validateEmail(value)) {
        callback(new Error("用户名格式有误"));
      } else {
        callback(); //true
      }
    };
    // 验证密码
    let validatePassword = (rule, value, callback) => {
      // 过滤后的数据
      ruleForm.password = stripscript(value);
      value = ruleForm.password;
      if (value === "") {
        callback(new Error("请输入密码"));
      } else if (vaildatePass(value)) {
        callback(new Error("密码为6至20位数字+字母"));
      } else {
        callback();
      }
    };
    // 验证重复密码
    let validatePasswords = (rule, value, callback) => {
      // 如果模块值为login, 直接通过
      if (model.value === "login") {
        callback();
      }
      // 过滤后的数据
      ruleForm.passwords = stripscript(value);
      value = ruleForm.passwords;
      if (value === "") {
        callback(new Error("请再次输入密码"));
      } else if (value != ruleForm.password) {
        callback(new Error("重复密码不正确"));
      } else {
        callback();
      }
    };
    // 验证验证码
    let validateCode = (rule, value, callback) => {
      if (value === "") {
        return callback(new Error("请输入验证码"));
      } else if (validateVCode(value)) {
        return callback(new Error("验证码格式有误"));
      } else {
        callback();
      }
    };
    // 这里面放置data数据、生命周期、自定义的函数
    const menuTab = reactive([
      { txt: "登录", current: true, type: "login" },
      { txt: "注册", current: false, type: "register" }
    ]);
    // 模块值
    const model = ref("login");
    //登录按钮的禁用状态
    const loginButtonStatus = ref(true);
    //验证码按钮的状态
    const codeButtonStatus = reactive({
      status: false,
      text: "获取验证码"
    });
    //倒计时
    const timer = ref(null);
    // 表单绑定数据
    const ruleForm = reactive({
      username: "",
      password: "",
      passwords: "",
      code: ""
    });
    // 表单的验证
    const rules = reactive({
      username: [{ validator: validateUsername, trigger: "blur" }],
      password: [{ validator: validatePassword, trigger: "blur" }],
      passwords: [{ validator: validatePasswords, trigger: "blur" }],
      code: [{ validator: validateCode, trigger: "blur" }]
    });

    const toggleMenu = data => {
      menuTab.forEach((elem, index) => {
        elem.current = false;
      });
      data.current = true;
      //修改模块值
      model.value = data.type;
      //重置表单
      resetFromdata();
      //清楚倒计时
      clearCountDown();
    };
    const submitForm = formName => {
      refs[formName].validate(valid => {
        // 表单验证通过
        if (valid) {
          if (model.value === "login") {
            login();
          } else {
            register();
          }
        } else {
          console.log("error submit!!");
          return false;
        }
      });
    };
    //登录
    const login = () => {
      let responseData = {
        username: ruleForm.username,
        password: sha1(ruleForm.password),
        code: ruleForm.code
      };
      Login(responseData)
        .then(response => {
          console.log(response);
          root.$router.push({
            name: "Console"
          });
        })
        .catch(error => {});
    };
    //注册
    const register = () => {
      let requestData = {
        username: ruleForm.username,
        password: sha1(ruleForm.password),
        code: ruleForm.code,
        module: "register"
      };
      Register(requestData)
        .then(response => {
          let data = response.data;
          root.$message({
            message: data.message,
            type: "success"
          });
          toggleMenu(menuTab[0]);
          clearCountDown();
        })
        .catch(error => {
          console.log(error);
        });
    };
    //重置表单
    const resetFromdata = () => {
      refs.ruleForm.resetFields();
    };
    //更新按钮的状态
    const updataButtonStatus = params => {
      codeButtonStatus.status = params.status;
      codeButtonStatus.text = params.text;
    };
    //获取验证码
    const getSms = () => {
      //所请求的接口
      if (ruleForm.username == "") {
        root.$message.error("邮箱不能为空");
        return false;
      }
      if (validateEmail(ruleForm.username)) {
        root.$message.error("邮箱格式错误,请重新输入！");
        return false;
      }
      let data = {
        username: ruleForm.username,
        module: module.value
      };
      //获取修改验证的按钮状态
      updataButtonStatus({
        status: true,
        text: "发送中"
      });
      //延时
      setTimeout(() => {
        Getsms(data)
          .then(response => {
            let data = response.data;
            root.$message({
              message: data.message,
              type: "success"
            });
            loginButtonStatus.value = false;
            //确认定时器,倒计时
            countDown(60);
            console.log(data);
          })
          .catch(error => {
            console.log(error);
          });
      }, 3000);
    };
    //倒计时
    const countDown = number => {
      if (timer.value) {
        clearInterval(timer.value);
      }
      let time = number;
      timer.value = setInterval(() => {
        time--;
        if (time === 0) {
          clearInterval(timer.value);
          updataButtonStatus({
            status: false,
            text: "再次获取"
          });
        } else {
          codeButtonStatus.text = `倒计时${time}秒`;
        }
      }, 1000);
    };
    //清楚倒计时
    const clearCountDown = () => {
      //还原验证码按钮的默认状态
      codeButtonStatus.status = false;
      codeButtonStatus.text = "获取验证码";
      //清楚倒计时
      clearInterval(timer.value);
    };
    //装载
    onMounted(() => {});
    return {
      toggleMenu,
      submitForm,
      menuTab,
      model,
      rules,
      ruleForm,
      getSms,
      loginButtonStatus,
      codeButtonStatus,
      clearCountDown
    };
  }
};
</script>

<style lang="scss" scoped>
#login {
  height: 100vh;
  background-color: #344a5f;
}
.login-wrap {
  width: 330px;
  margin: auto;
}
.menu-tab {
  text-align: center;
  li {
    display: inline-block;
    color: #fff;
    line-height: 26px;
    font-size: 14px;
    width: 80px;
    border-radius: 2px;
    cursor: pointer;
  }
  .current {
    background-color: rgba(0, 0, 0, 0.1);
  }
}
.login-form {
  margin-top: 29px;
  label {
    display: block;
    font-size: 14px;
    margin-bottom: 3px;
    color: #fff;
  }
  .item-from {
    margin-bottom: 13px;
  }
  .block {
    width: 100%;
    display: block;
  }
  .login-btm {
    margin-top: 19px;
  }
}
</style>
