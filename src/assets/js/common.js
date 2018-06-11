import Vue from 'vue'

export default {
  baseUrl: "http://192.168.1.155",
  sendApi: (url, data, success, error) => {
    url = url.substr(this.a.baseUrl.length)
    let getId = localStorage.getItem("id")
    let getToken = localStorage.getItem("token")
    let timestamp = new Date().getTime()
    let sign = Vue.$md5(url + "?userId=" + getId + "&token=" + getToken + "&timestamp=" + timestamp)

    data['id'] = getId
    data['timestamp'] = timestamp
    data['sign'] = sign


    Vue.$axios({
      url: url,
      method: 'post',
      data: data,
    }).then((result) => {
      if (result.err_no == 401) {

      }
    })

  },
  jointParam: (url) => {
    console.log(this.a.baseUrl.length);
    url = url.substr(this.a.baseUrl.length)
    let data = {}
    let getId = localStorage.getItem("id")
    let getToken = localStorage.getItem("token")
    let timestamp = new Date().getTime()
    let sign = Vue.$md5(url + "?userId=" + getId + "&token=" + getToken + "&timestamp=" + timestamp)

    data['id'] = getId
    data['timestamp'] = timestamp
    data['sign'] = sign

    return data
  }
}
