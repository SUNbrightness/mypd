<template>
    <div>
        <van-cell-group>
         <template v-for="(item,index) in wlist">
            <van-cell v-show="cellShowComputed(index)" :key="'folder'+index" :style="cellStyle(index)" :title="item.folder" @click="toUserList(index)">
              <!-- 使用 right-icon 插槽来自定义右侧图标 -->
              <template #right-icon>
                <van-icon class="cur" name="edit" @click.stop="edit(index,item)" />
                <div style="width: 10px;" />
                <van-icon class="cur" name="delete" @click.stop="del(index,item)" />
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
        
        <center>
            <van-button icon="plus" type="primary" native-type="button" @click="add()" /></center>
        </van-cell-group>
    </div>
    </template>

<script>
 import MyMixin from '@/components/MyMixin.vue';
    export default {
    
      name: '',
    
      components: {},
    
      mixins: [MyMixin],
    
    
      data() {return {
          addValue:'',
          cellShow:[],
      }},
    
      computed: {
          cellStyle:function(){
              this.cellShow;
              return function(index){
                  return index==this.thisFolder?{
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
          toUserList(index){
            this.setThisFolder(index);
			//抛出事件，phone组件接收
            this.EventBus.$emit('toUserList');
          },
          save(){
            this.wclient.put();
              for (var i = 0; i < this.wlist.length; i++) {
                  this.cellShow.splice(i,1,true);
              }
              this.notifyOk();
          },
          add(){
              if(!this.addValue){
                  return;
              }
              
              this.wlist.push({folder:this.addValue,list:[]});
              this.wclient.put();
              this.addValue='';
              this.notifyOk();
              //选中新增的
              this.setThisFolder(this.wlist.length-1);
          },
          edit(index,item){
              this.editValue = item.folder;
              for (var i = 0; i < this.wlist.length; i++) {
                  this.cellShow.splice(i,1,true);
              }
              //获取焦点
              let key = 'folder-van-field'+index;
              var el =  document.getElementById(key);
              setTimeout(function(){
                  el.focus();
                  el.select();
              },100);
              this.cellShow.splice(index,1,false);
          },
          async del(index,item){
              //二次确认
              var nook = await this.affirm();
              if(nook)return;
              
              //判断是否文件夹下有账号
              if(this.wlist[index].list==null||this.wlist[index].list.length==0){
                  this.wlist.splice(index,1,);
                  this.wclient.put();
                  //选中倒数第二个
                  this.setThisFolder(index-1);
                  this.notifyOk();
              }else{
                  this.notifyNo("该文件夹下还有账号不能删除 ");
              }
              
          }
      },
    };
</script>

<style>
    
</style>
