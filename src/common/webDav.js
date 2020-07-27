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
                      url: localStorage.getItem(window.k.wurl),
                      username: localStorage.getItem(window.k.wusername),
                      password: localStorage.getItem(window.k.wpassword)
                  }
              }
              
              // 如果信息不全就必须去填写 webDav信息 
              // if (!localStorage.getItem(window.k.wurl) || !localStorage.getItem(window.k.wusername) || !localStorage.getItem(window.k.wpassword)) 
              // {
              //    throw new Error("填写webDav信息");
              // }
      
              myClient.client = createClient(
                  data.url, {
                      username: data.username,
                      password: data.password
                  }
              );
              if (await myClient.client.exists(window.k.wFileName) === false) {
                  Notify({
                      type: 'danger',
                      message: '目录中不存在mypd.json文件'
                  });
                  throw '目录中不存在mypd.json文件';
              }
      
              var wdata = await myClient.get();
      
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
                  myClient.client.putFileContents(window.k.wFileName, JSON.stringify(store.wdata));
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
