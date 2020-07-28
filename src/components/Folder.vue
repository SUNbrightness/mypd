<template>
    <div>
        <van-cell-group>
         <template v-for="(item,index) in wlist">
            <van-cell v-show="cellShowComputed(index)" :key="'folder'+index" :style="cellStyle(index)" :title="item.folder">
              <!-- 使用 right-icon 插槽来自定义右侧图标 -->
              <template #right-icon>
                <van-icon name="edit" @click="edit(index,item)" />
                <div style="width: 10px;" />
                <van-icon name="delete" @click="del(index,item)" />
              </template>
            </van-cell>
            
            <van-field 
            v-show="!cellShowComputed(index)"
            :id="'folder-van-field'+index"
            :key="'folder-van-field'+index"
             v-model="item.folder" 
             :error="true" 
             placeholder="新文件夹名称" 
             @blur="save()"
/>     
         </template>
        
        <van-field v-model="addValue" placeholder="新文件夹名称" />
        
        <center><van-button icon="plus" type="primary" native-type="button" @click="add()" /></center>
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
          addValue:'',
          cellShow:[],
          thisIndex:0
      }},
    
      computed: {
          cellStyle:function(){
              this.cellShow;
              return function(index){
                  return index==this.thisIndex?{
                      "background-color":"lightgray" 
                  }:{};
              };
          },
         cellShowComputed:function(){
             this.cellShow;
             return function(e){
                 return this.cellShow[e]==null?true:this.cellShow[e];
             };
         }
      },
    
      created() {},
    
      mounted() {},
    
      destroyed() {},
    
      methods: {
          save(){
            this.wclient.put();
              for (var i = 0; i < this.wlist.length; i++) {
                  this.cellShow.splice(i,1,true);
              }
              this.notifyOk();
          },
          add(){
              this.wlist.push({folder:this.addValue,list:[]});
              this.wclient.put();
              this.addValue='';
              this.notifyOk();
          },
          edit(index,item){
              this.editValue = item.folder;
              for (var i = 0; i < this.wlist.length; i++) {
                  this.cellShow.splice(i,1,true);
              }
              //获取焦点
              let key = 'folder-van-field'+index;
              var el =  document.getElementById(key);
              var t = el.getElementsByTagName("input");
              el.focus();	
              el.select();
              this.cellShow.splice(index,1,false);
          },
          async del(index,item){
              var nook = await this.affirm();
              if(nook)return;
              this.wlist.splice(index,1,);
              this.wclient.put();
              this.notifyOk();
          }
      },
    };
</script>

<style>
    
</style>
