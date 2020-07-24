<template>
  <div id="app">
     <crypto-key-config v-if="pageIndex==0" />
     <!-- 根据不同设备选择不同场景 -->
     <index v-if="showIndex==1" />
     <phone v-if="showIndex==2" />
     
     <web-dav-config v-if="pageIndex==2" />
  </div>
</template>
<script>
import CryptoKeyConfig from '@/components/CryptoKeyConfig.vue';
import WebDavConfig from '@/components/WebDavConfig.vue';
import index from '@/components/pc/Index.vue';
import phone from '@/components/phone/Index.vue';
import { EventBus } from '@/common/EventBus.js';

export default {
  name: 'App',
  components: {
    CryptoKeyConfig,
    WebDavConfig,
  },
  data() {
     return {
       pageIndex: 0,
     };
   },
   computed:{
       showIndex:function(){
           if(this.pageIndex!=1){
               return 0;
           }
           if(navigator.userAgent.match(/(iPhone|iPod|Android|ios)/i)){
               return 2;
           }else {
           return 1;
           }
       }
   },
  created() {
      //listener
    EventBus.$on('toPage', index => {
      this.pageIndex = index;
    });
    
    try{
        this.wclient.init();
    }catch(error){
        //初始化如果出现异常就去重新填写webdav信息
        this.pageIndex = 3;
    }
  },
}

</script>

<style>

</style>
