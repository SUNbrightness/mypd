<template>
  <div id="app">
     <crypto-key-config v-if="pageIndex==0" />
     <index v-if="pageIndex==1" />
     <web-dav-config v-if="pageIndex==2" />
  </div>
</template>
<script>
import CryptoKeyConfig from '@/components/CryptoKeyConfig.vue';
import WebDavConfig from '@/components/WebDavConfig.vue';
import index from '@/components/pc/Index.vue';

export default {
  name: 'App',
  components: {
    CryptoKeyConfig,
    WebDavConfig,
  },
  data() {
     return {
       pageIndex: 2,
     };
   },
}
</script>

<style>

</style>
