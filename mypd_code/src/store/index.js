import Vue from 'vue'
import Vuex from 'vuex'


Vue.use(Vuex)

export default new Vuex.Store({
   getters:{
       wdata:state => state.wdata,
       wlist:state => state.wdata.list,
       metaTitle:state => state.metaTitle,
       thisForm:state => state.thisForm,
       thisFolder:state => state.thisFolder,
   },
  state: {
      wdata:{},
      metaTitle:'',
      //-2 不显示 form
      //-1 新增
      thisForm: -2,
      thisFolder:-1,
  },
  mutations: {
      setWdata :(state,count) => {state.wdata= count},
      setWlist :(state,count) => {state.wdata.list= count},
      setMetaTitle :(state,count) => {state.metaTitle= count},
      setThisForm :(state,count) => {state.thisForm= count},
      setThisFolder :(state,count) => {state.thisFolder= count},
  },
  actions: {
  },
  modules: {
  }
})
