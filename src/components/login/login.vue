<template>
  <div id="login">
    <div id="loginbox">
      <h4>用户登录</h4>
      <form action="" method="post" onsubmit=" return false">
        <div class="user">
          <el-input type="text" placeholder="手机号" id="use" v-model="use" clearable>
          </el-input>
        </div>
        <div class="psw">
          <el-input type="password" placeholder="密码" id="pwd" v-model="psw" clearable>
          </el-input>
        </div>

        <div class="btn">
          <el-checkbox v-model="savePsw">一周内自动保存</el-checkbox>
          <el-button @click="login()">登录</el-button>
          <div style='clear: both'></div>
        </div>
      </form>
    </div>
  </div>
</template>

<script>
  export default {
    name: 'login',
    data() {
      return {
        use: '',
        psw: '',
        savePsw: true,
      }
    },
    methods: {
      login: function () {
        this.$message({
          message: '123',
          type: 'error',
          duration: '5000'
        })
      }
    }
  }
</script>

<style scoped lang='less'>
  @import 'login';
</style>
