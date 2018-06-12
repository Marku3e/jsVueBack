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
    mounted() {
      this.getCookie()
    },
    methods: {
      login: function () {
        if (this.use == '' || this.use == '用户名') {
          this.$message.error('用户名不能为空');
          return
        } else if (this.psw == '' || this.psw == '密码') {
          this.$message.error('密码不能为空');
          return
        } else {
          let that = this
          let url = that.$common.baseUrl + "/manager/account/login"
          let data = {}
          data['phone'] = this.use
          data['password'] = this.$md5(this.psw)
          console.log(url);
          this.$common.sendApi(url, data, (res) => {
            // console.log(res.data);
            // let res = result.data
            if (res.err_no == 200) {
              if (that.savePsw) {
                that.setCookie(that.use, that.psw, 7);
              } else {
                that.clearCookie()
              }
              localStorage.setItem("id", res.data.manager_id);
              localStorage.setItem("token", res.data.token);
              localStorage.setItem("user", res.data.name + "(" + that.use + ")");
              localStorage.setItem("store_id", res.data.store_id);
              localStorage.setItem("store_name", res.data.store_name);
              localStorage.setItem("store_path", res.data.store_path);
              localStorage.setItem("list", JSON.stringify(res.data.list));
              sessionStorage.setItem('accessToken', 'agreeLogin')
              this.$router.push({path: '/index'});
            } else {
              that.$message.error('账号/密码输入错误');
              return
            }
          })
        }
      },
      //设置cookie
      setCookie(c_name, c_pwd, exdays) {
        var exdate = new Date();//获取时间
        exdate.setTime(exdate.getTime() + 24 * 60 * 60 * 1000 * exdays);//保存的天数
        //字符串拼接cookie
        window.document.cookie = "userName" + "=" + c_name + ";path=/;expires=" + exdate.toGMTString();
        window.document.cookie = "userPwd" + "=" + c_pwd + ";path=/;expires=" + exdate.toGMTString();
      },
      //读取cookie
      getCookie: function () {
        if (document.cookie.length > 0) {
          var arr = document.cookie.split('; ');//这里显示的格式需要切割一下自己可输出看下
          for (var i = 0; i < arr.length; i++) {
            var arr2 = arr[i].split('=');//再次切割
            //判断查找相对应的值
            if (arr2[0] == 'userName') {
              this.use = arr2[1];//保存到保存数据的地方
            } else if (arr2[0] == 'userPwd') {
              this.psw = arr2[1];
            }
          }
        }
      },
      //清除cookie
      clearCookie: function () {
        this.setCookie("", "", -1);//修改2值都为空，天数为负1天就好了
      }
    }
  }
</script>

<style scoped lang='less'>
  @import 'login';
</style>
