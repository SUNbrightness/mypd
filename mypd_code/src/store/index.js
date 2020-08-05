import Vue from 'vue'
import Vuex from 'vuex'


Vue.use(Vuex)

export default new Vuex.Store({
   getters:{
       wdata:state => state.wdata,
       wlist:state => state.wdata.list,
       metaTitle:state => state.metaTitle,
   },
  state: {
      wdata:{},
      metaTitle:'',
  },
  mutations: {
      setWdata :(state,count) => {state.wdata= count},
      setWlist :(state,count) => {state.wdata.list= count},
      setMetaTitle :(state,count) => {state.metaTitle= count},
  },
  actions: {
  },
  modules: {
  }
})
