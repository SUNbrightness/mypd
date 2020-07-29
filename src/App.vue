<template>
  <div id="app">
     <crypto-key-config v-if="pageIndex==0" />
     <!-- 根据不同设备选择不同场景 -->
     <index v-if="this.pageIndex==1" />
     
     <web-dav-config v-if="pageIndex==2" />
  </div>
</template>
<script>
import CryptoKeyConfig from '@/components/CryptoKeyConfig.vue';
import WebDavConfig from '@/components/WebDavConfig.vue';
import Index from '@/components/Index.vue';
import { EventBus } from '@/common/EventBus.js';

export default {
  name: 'App',
  components: {
    CryptoKeyConfig,
    WebDavConfig,
    Index,
  },
  data() {
     return {
       pageIndex: 0,
     };
   },
   computed:{
   },
   
  async created() {
      //listener
    this.EventBus.$on('toPage', index => {
      this.pageIndex = index;
    });
    
    try{
        await this.wclient.init();
    }catch(error){
        console.log("填写webdav信息");
        //初始化如果出现异常就去重新填写webdav信息
        this.pageIndex = 2;
    }
  },
}

</script>

<style>

</style>
