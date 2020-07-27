<template>
    <div>
        <van-cell-group>
        <van-cell v-for="(item,index) in wlist" :key="'folder'+index" :title="item.folder" is-link to="index" />
        
        <van-field v-model="addValue" placeholder="请输入用户名" />
        
        <center><van-button icon="plus" type="primary" /></center>
        </van-cell-group>
    </div>
    </template>

<script>
 import MyMixin from './MyMixin.vue';
    export default {
    
      name: '',
    
      components: {},
    
      mixins: [MyMixin],
    
    
      data() {return {
          addValue:''
      }},
    
      computed: {},
    
      watch: {},
    
      created() {},
    
      mounted() {},
    
      destroyed() {},
    
      methods: {
          add(){
              
          }
      },
    
    };
</script>

<style>
</style>
