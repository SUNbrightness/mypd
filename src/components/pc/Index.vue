<template>
    <div>
        1
    </div>
</template>

<script>
    import {
        EventBus
    } from '@/common/EventBus.js';
    export default {
    
      name: '',
    
      components: {},
    
      mixins: [],
    
      props: {},
    
      data() {return {
          list:[]
      }},
    
      computed: {},
    
      watch: {},
    
      created() {
          EventBus.$on('wdata', data => {
            this.list = data.list;
          }); 
          
      },
    
      mounted() {},
    
      destroyed() {},
    
      methods: {
          setData(){
              this.wclient.data.list = this.list;
              this.wclient.put();
          }
      },
    
    };
</script>

<style>
</style>
