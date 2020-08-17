import { Notify } from 'vant';
import store from '@/store';
 import {
        EventBus
    } from '@/common/EventBus.js';
    

const {
    createClient
} = require("webdav");
const plugin = {
  install(vue, options = {}) {
      const myClient = {
          client: null,
          init: async function(data) {
              if(!data){
                  data = {
                      url:  vue.$cookies.get(window.k.wurl) ,
                      username: vue.$cookies.get(window.k.wusername),
                      password: vue.$cookies.get(window.k.wpassword)
                  }
              }
              myClient.client = createClient(
                  data.url, {
                      username: data.username,
                      password: data.password
                  }
              );
              
              var wdata;
              
              //判断这个文件是否已经存在
              if (await myClient.client.exists(window.k.wFileName) === false) {
                  wdata = {};
              }else{
                  wdata = await myClient.get();
              }
      
              if (!wdata.list) {
                  wdata.list = [];
              }
              
              store.commit('setWdata', wdata)
              return wdata;
          },
          get: async function() {
              var str = '';
              try {
                  str = await myClient.client.getFileContents(window.k.wFileName, {
                      format: "text"
                  });
              } catch (e) {
                  Notify({
                      type: 'danger',
                      message: '获取WebDav数据异常,请检查网络和webdav'
                  });
                  throw e;
              }
              return str;
          },
          put: function() {
              try {
                  myClient.client.putFileContents(window.k.wFileName, JSON.stringify(store.getters.wdata));
              } catch (e) {
                  Notify({
                      type: 'danger',
                      message: '写入WebDav异常,请检查网络和webdav'
                  });
                  throw e;
              }
          }
      }
      
      
          vue.prototype.wclient = myClient;
}}


export default plugin;
