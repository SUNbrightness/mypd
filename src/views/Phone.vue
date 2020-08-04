<template>
    <div>
        <van-nav-bar v-show="!searchShow" title="账号文件夹" left-text="返回" left-arrow @click-left="$router.go(-1)">
            <template #right>
                <van-icon name="search" size="18" @click="searchShow=true" />
            </template>
        </van-nav-bar>
        
        <van-search v-show="searchShow" v-model="searchValue" placeholder="请输入搜索账号" @input="searchChange" />
        <!-- 搜索展示内容 -->
        <search-result v-show="searchShow" :search-value="searchValue" />
         <vue-router-page-turning>
             <!-- 如果不用路由缓存就会出现选中的list 没有回显 -->
          <keep-alive :exclude="['UserForm']">
        <router-view v-show="!searchShow" />
        </keep-alive>
         </vue-router-page-turning>
    </div>
</template>

<script>
     import VueRouterPageTurning from 'vue-router-page-turning';
    import MyMixin from '@/components/MyMixin.vue';
    import SearchResult from '@/components/SearchResult.vue';
    import {
        EventBus
    } from '@/common/EventBus.js';
    export default {
        name: '',
        components: {
            SearchResult,
            VueRouterPageTurning
        },
        mixins: [MyMixin],
        props: {},
        data() {
            return {
                searchValue: '',
                thisFolder: 0,
                thisForm: -1,
                //已经展示了搜索结果,需要隐藏nav
                searchShow: false,
            }
        },
        computed: {},
        watch: {},
        created() {
            //监听事件
            this.EventBus.$on('toUserList', target => {
                this.thisFolder = target;
                this.$router.push({
                    path:'/user_list',
                    query:{
                        'thisFolder':this.thisFolder
                    }
                })
            });

            this.EventBus.$on('toUserForm', (uindex, findex) => {
                 this.searchShow=false;
                this.thisForm = parseInt(uindex);
                if (findex) {
                    this.thisFolder = parseInt(findex);
                }
                
                  if(this.noCurrentPage('/user_form')){
                      this.$router.push({
                          path:'/user_form',
                          query:{
                              'thisFolder':this.thisFolder,
                               'thisForm':this.thisForm
                          }
                      })
                  }
                
            });
            
        },
        methods: {
           searchChange() {
               //每一次搜索框清空要返回该页面
               if(this.noCurrentPage('/phone')){
                   this.$router.push('/phone');
               }
               
               //搜索框是否为空
               if (this.searchValue) {
                  this.searchShow=true;
               }else{
                   this.searchShow=false;
               }
           },
           noCurrentPage(url){
               return this.$router.history.current.path!=url;
           }
        }
    };
</script>

<style>
</style>
