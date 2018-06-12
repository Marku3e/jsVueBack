import Vue from '../../main'


export default {
  baseUrl: "http://192.168.1.155",
  sendApi: (url, data, success, error) => {
    // url = url.substr(this.a.baseUrl.length)
    let getId = localStorage.getItem("id")
    let getToken = localStorage.getItem("token")
    let timestamp = new Date().getTime()
    let sign = Vue.vue.$md5(url.substr(this.a.baseUrl.length) + "?userId=" + getId + "&token=" + getToken + "&timestamp=" + timestamp)

    data['id'] = getId
    data['timestamp'] = timestamp
    data['sign'] = sign

    console.log(url);
    var qs = require('qs')
    var instance = Vue.vue.$axios.create({
      headers: {'content-type': 'application/x-www-form-urlencoded'}
    });
    instance.post(url, qs.stringify(data)).then((result) => {
      //检查是否登录,401返回登录界面
      if (result.err_no == 401) {
        if (result.msg != '没有当前权限') {
          Vue.vue.$router.push({path: '/'});
        } else {
          Vue.vue.$message({
            message: '没有权限，请使用有权限的账户重新登录后继续',
            type: 'error',
            duration: '5000'
          })
        }
        return false;
      }
      //检查是否有权限
      if (result.err_no == 403) {
        Vue.vue.$message({
          message: result.msg,
          type: 'error',
          duration: '5000'
        })
        return false;
      }
      //检查是否错误

      if (success) {
        return success(result.data)
      } else {
        return result.data
      }
    })

  },
  jointParam: (url) => {
    // console.log(this.a.baseUrl.length);
    url = url.substr(this.a.baseUrl.length)
    let data = {}
    let getId = localStorage.getItem("id")
    let getToken = localStorage.getItem("token")
    let timestamp = new Date().getTime()
    let sign = Vue.vue.$md5(url + "?userId=" + getId + "&token=" + getToken + "&timestamp=" + timestamp)

    data['id'] = getId
    data['timestamp'] = timestamp
    data['sign'] = sign
    console.log(data)
    // return data
  }
}
