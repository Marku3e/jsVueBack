<template>
  <div id="app">
    <el-container>
      <el-aside width="auto" v-show=login>
        <div class="nav-top">
        </div>
        <div class='nav-list'>
          <el-menu default-active="index"
                   class="el-menu-vertical-demo"
                   @open="handleOpen" @close="handleClose1"
                   :collapse="isCollapse" :router="true"
                   active-text-color="#fff"
                   text-color='#b8c7ce'
                   background-color='#222D32'>
            <el-menu-item index="index" @click="pushTags($event)" data-name='主页'>
              <i class="el-icon-menu"></i>
              <span slot="title">主页</span>
            </el-menu-item>

            <el-submenu index="vehicleAudit">
              <template slot="title">
                <i class="el-icon-location"></i>
                <span slot="title">财务管理</span>
              </template>
              <el-menu-item-group>
                <el-menu-item index="cashAudits" @click="pushTags($event)" data-name='保证金审核'>保证金审核</el-menu-item>
                <el-menu-item index="loanAudits" @click="pushTags($event)" data-name='放款审核'>放款审核</el-menu-item>
                <el-menu-item index="repayList" @click="pushTags($event)" data-name='还款审核'>还款审核</el-menu-item>
                <el-menu-item index="closedAccount" @click="pushTags($event)" data-name='已结清订单'>已结清订单</el-menu-item>
              </el-menu-item-group>
            </el-submenu>
            <el-submenu index="fkgl">
              <template slot="title">
                <i class="el-icon-location"></i>
                <span slot="title">风控管理</span>
              </template>
              <el-menu-item-group>
                <el-menu-item index="machineAudits" @click="pushTags($event)" data-name='机器待审核'>机器待审核</el-menu-item>
                <el-menu-item index="userAudits" @click="pushTags($event)" data-name='人工待审核'>人工待审核</el-menu-item>
                <el-menu-item index="daixiahu" @click="pushTags($event)" data-name='待下户列表'>待下户列表</el-menu-item>
                <el-menu-item index="reCheck" @click="pushTags($event)" data-name='待复核列表'>待复核列表</el-menu-item>
                <el-menu-item index="sign" @click="pushTags($event)" data-name='待签约列表'>待签约列表</el-menu-item>
                <el-menu-item index="signed" @click="pushTags($event)" data-name='已签约列表'>已签约列表</el-menu-item>
                <el-menu-item index="veto" @click="pushTags($event)" data-name='已否决列表'>已否决列表</el-menu-item>
              </el-menu-item-group>
            </el-submenu>
            <el-submenu index="carAudit">
              <template slot="title">
                <i class="el-icon-location"></i>
                <span slot="title">车辆管理</span>
              </template>
              <el-menu-item-group>
                <el-menu-item index="carInfo" @click="pushTags($event)" data-name='车辆信息库'>车辆信息库</el-menu-item>
                <el-menu-item index="carAudits" @click="pushTags($event)" data-name='待审核车辆'>待审核车辆</el-menu-item>
              </el-menu-item-group>
            </el-submenu>
            <el-submenu index="manager">
              <template slot="title">
                <i class="el-icon-location"></i>
                <span slot="title">管理中心</span>
              </template>
              <el-menu-item-group>
                <el-menu-item index="account_control" @click="pushTags($event)" data-name='员工管理'>员工管理</el-menu-item>
                <el-menu-item index="authority_control" @click="pushTags($event)" data-name='权限管理'>权限管理</el-menu-item>

              </el-menu-item-group>
            </el-submenu>
          </el-menu>
        </div>
      </el-aside>
      <el-container>
        <el-header height='92px' v-show=login>
          <div class="tabs-top">
            <!--<el-button type="primary" icon="el-icon-tickets"-->
            <!--@click='isCollapse=!isCollapse'></el-button>-->
            <div class="iconMenu" @click="isCollapse=!isCollapse" :class='{rotate:isCollapse}'>
              <span class='iconfont icon-weibiaoti12'></span>
            </div>

            <div class="user">
              <el-dropdown trigger="click">
      <span class="el-dropdown-link">
        {{userName}}<i class="el-icon-arrow-down el-icon--right"></i>
      </span>
                <el-dropdown-menu slot="dropdown">
                  <el-dropdown-item><i class='iconfont icon-tuichu'></i>安全退出</el-dropdown-item>

                </el-dropdown-menu>
              </el-dropdown>
            </div>
          </div>
          <div class="tabs-bottom">
            <el-button type="primary" icon="el-icon-d-arrow-left"></el-button>
            <div class='navBox'>
              <el-tag class='index' :class='routePath == "index"?"tabs-active":""'><span
                @click='tabsClick("index")'>主页</span></el-tag>
              <el-tag
                :key="tag.name"
                v-for="(tag,index) in tabsName"
                v-if='index>0'
                closable
                :disable-transitions="false"
                @close="handleClose(tag)"
                :class='routePath == tag.path?"tabs-active":""'
              >
                <span @click='tabsClick(tag.path)'>{{tag.name}}</span>
              </el-tag>
            </div>
            <el-dropdown trigger="click" class='r'>
            <span class="el-dropdown-link">
            关闭操作<i class="el-icon-arrow-down el-icon--right"></i>
            </span>
              <el-dropdown-menu slot="dropdown">
                <el-dropdown-item><span @click="closeAll()">关闭全部选项卡</span></el-dropdown-item>
                <el-dropdown-item><span @click="closeOther($event)">关闭其他选项卡</span></el-dropdown-item>
              </el-dropdown-menu>
            </el-dropdown>
            <el-button type="primary" icon="el-icon-d-arrow-right" class='rightBtn'></el-button>
          </div>
        </el-header>
        <el-main>
          <router-view></router-view>
        </el-main>
        <el-footer height='36px' v-show=login>
          <div class='r'>© 2017-2018</div>
        </el-footer>
      </el-container>
    </el-container>
  </div>
</template>

<script>
  export default {
    name: 'App',
    data() {
      return {
        TabsValue: '1',
        asideList: [],
        tabsName: [{name: '主页', path: 'index'},],
        tabsIndex: 1,
        isCollapse: false,
        screenWidth: document.body.clientWidth,
        routePath: "index",
        login: false,
        userName: ''
      }
    },
    watch: {
      screenWidth(val) {
        this.screenWidth = val
        // console.log(this.screenWidth);
        if (this.screenWidth <= 992) {
          this.isCollapse = true
        } else {
          this.isCollapse = false
        }
      },
      "$route"() {
        this.routePath = this.$route.path.split('/')[1];

        // console.log(this.tabsName);
      },

    },
    mounted() {
      const that = this;
      this.userName = localStorage.getItem('user')
      console.log(JSON.parse(localStorage.getItem('list')));
      that.asideList = JSON.parse(localStorage.getItem('list'));
      sessionStorage.getItem('accessToken') ? this.login = true : this.login = false;
      window.onresize = () => {
        return (() => {
          window.screenWidth = document.body.clientWidth
          that.screenWidth = window.screenWidth
        })()
      }
    },
    created() {
    },
    methods: {
      handleOpen(key, keyPath) {
        console.log(key, keyPath);
      },
      handleClose1(key, keyPath) {
        console.log(key, keyPath);
        // console.log(1);
      },
      pushTags(e) {
        let text = e.$el.dataset.name
        let pathIndex = e.index
        let data = {name: text, path: pathIndex}
        // console.log(data);
        if (JSON.stringify(this.tabsName).indexOf(pathIndex) == -1) {
          this.tabsName.push(data)
        } else {
          console.log('你已经点开了该页面');
        }
      },
      handleClose(tag) {
        let num = this.tabsName.indexOf(tag);
        if (this.$route.path.split('/')[1] == this.tabsName[num].path) {
          this.tabsName.splice(num, 1);

          if (this.tabsName[num]) {
            this.$router.push({path: '/' + this.tabsName[num].path})
          } else {
            num = num - 1
            this.$router.push({path: '/' + this.tabsName[num].path})
          }
        } else {
          this.tabsName.splice(num, 1);
        }
      },
      tabsClick(path) {
        // console.log(path);
        this.$router.push({path: '/' + path + ''})
      },
      closeAll() {
        this.tabsName.splice(1, this.tabsName.length - 1)
        // console.log(this.tabsName);
        this.$router.push({path: '/index'})
      },
      closeOther(e) {
        let path = this.$route.path.split("/")[1]
        // console.log(path);
        // console.log(this.tabsName);
        let length = this.tabsName.length;
        for (var i = length - 1; i > 0; i--) {
          // console.log(this.tabsName[i].path);
          if (this.tabsName[i].path == path) {
            console.log('return');
          } else {
            this.tabsName.splice(i, 1)
          }

        }
      },


    },
  }
</script>

<style scoped lang='less'>
  #app {
    width: auto;
    height: 100%;
    .el-aside {
      .nav-top {
        width: 100%;
        height: 90px;
        background-color: #222D32;
        #userImg {
          width: 60px;
          height: 60px;
          -webkit-border-radius: 50%;
          -moz-border-radius: 50%;
          border-radius: 50%;
          background-color: #FFD777;
          margin: auto 0;
        }
        #userName {
          color: #E7F2F2;
        }
        background-image: url('./assets/images/logo.png');
        background-repeat: no-repeat;
        background-position: 50%;
        border-bottom: 2px solid #222D32;
      }
      .nav-list {
        width: 100%;
        height: auto;
        .el-menu {
          border-right: 0;
          text-align: left;
          span {
            font-weight: 700;
          }
          i {
            color: #a7b1c2;
          }
        }
      }
    }
    .rotate {
      transform: rotateZ(-90deg);
    }
    .el-header {
      background-color: #F3F3F4;
      padding: 0;
      .tabs-top {
        box-sizing: border-box;
        height: 50px;
        background-color: #3C8DBC;
        .iconMenu {
          display: inline-block;
          height: 50px;
          width: 50px;
          text-align: center;
          cursor: pointer;
          span {
            line-height: 50px;
            color: #f5f5f5;
          }

        }
        .user {
          float: right;
          margin-top: 25px;
          -webkit-transform: translateY(-50%);
          -moz-transform: translateY(-50%);
          -ms-transform: translateY(-50%);
          -o-transform: translateY(-50%);
          transform: translateY(-50%);
          margin-right: 50px;
          cursor: pointer;
          span {
            color: #e7f2f2;
          }
        }
      }
      .tabs-bottom {
        height: 42px;
        border-top: 1px solid #000000;
        box-sizing: border-box;
        position: relative;
        /*display: flex;*/
        /*flex-flow: row nowrap;*/
        overflow: hidden;
        .navBox {
          width: 10000px;
          height: 100%;
          position: absolute;
          top: 0;
          left: 56px;
          .tabs-active {
            background-color: #2F4050;
            color: #fff;
          }
        }
        .el-tag {
          line-height: 39px;
          height: 39px;
          /*padding: 0 15px;*/
          padding: 0;
          padding-right: 15px;
          background-color: #fafafa;
          color: #1abc9c;
          border: 0;
          border-radius: 0;
          border-right: 1px solid #e5e5e5;
          cursor: pointer;
          -moz-user-select: none; /*火狐*/
          -webkit-user-select: none; /*webkit浏览器*/
          -ms-user-select: none; /*IE10*/
          -khtml-user-select: none; /*早期浏览器*/
          user-select: none;
          span {
            display: inline-block;
            height: 100%;
            padding-left: 15px;
          }
        }
        .index {
          border-left: 1px solid #e5e5e5;
          margin-right: -4px;

        }
        button {
          height: 39px;
          border-radius: 0;
          background-color: #fff;
          border-color: #fff;
          color: #999;
          font-weight: 700;
          border-right: 1px solid #e5e5e5;
          cursor: pointer;
        }
        .rightBtn {
          float: right;
          cursor: pointer;
          position: absolute;
          top: 0;
          right: 105px;

        }
        .el-dropdown {
          float: right;
          background-color: #fff;
          cursor: pointer;
          -moz-user-select: none; /*火狐*/
          -webkit-user-select: none; /*webkit浏览器*/
          -ms-user-select: none; /*IE10*/
          -khtml-user-select: none; /*早期浏览器*/
          user-select: none;
          span {
            width: 100%;
            height: 37px;
            line-height: 37px;
            padding: 0 15px;
          }
        }
      }
    }
    .el-main {
      width: 100%;
      height: 100%;
      padding: 0;
      margin: 0;
    }
  }

  .el-menu-vertical-demo:not(.el-menu--collapse) {
    width: 220px;
    min-height: 100%;
    background-color: #2F4050;
  }

  .el-container {
    width: auto;
    height: 100%;
  }

  .el-header {
    height: 100px;
    border-bottom: solid 2px #2f4050;
  }

  .el-aside {
    background-color: #222D32;
    color: #333;
    text-align: center;
    height: 100%;

  }

  .el-footer {
    background: none repeat scroll 0 0 #fff;
    border-top: 1px solid #e7eaec;
    overflow: hidden;
    padding: 10px 20px;
  }


</style>
