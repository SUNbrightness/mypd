<template>
    <div>
        <van-nav-bar v-show="!searchShow" :title="metaTitle" left-text="返回" left-arrow @click-left="navLeftClick">
            <template v-if="$route.path=='/phone'" #left>
                <van-icon name="setting-o" />
            </template>
			<template #right>
			    <van-icon name="search" size="18" @click="searchShow=true" />
			</template>
        </van-nav-bar>
        
        <van-search v-show="searchShow" v-model="searchValue" placeholder="请输入搜索账号或标题" @input="searchChange" />
        <!-- 搜索展示内容 -->
        <search-result v-show="searchShow" :search-value="searchValue" />
             <!-- 如果不用路由缓存就会出现选中的list 没有回显 -->
          <keep-alive :exclude="['UserForm']">
        <router-view v-show="!searchShow" />
        </keep-alive>
    </div>
</template>

<script>
    import MyMixin from '@/components/MyMixin.vue';
    import SearchResult from '@/components/SearchResult.vue';
    import {
        EventBus
    } from '@/common/EventBus.js';
    export default {
        name: '',
        components: {
            SearchResult,
        },
        mixins: [MyMixin],
        props: {},
        data() {
            return {
                searchValue: '',
                //已经展示了搜索结果,需要隐藏nav
                searchShow: false,
            }
        },
        computed: {},
        watch: {},
        created() {
            //监听事件
            this.EventBus.$on('toUserList', target => {
                this.$router.push({
                    path:'/user_list'
                })
            });
			//用户选择了某条账号
            this.EventBus.$on('toUserForm', target => {
				//隐藏搜索框
                 this.searchShow=false;
				 //如果当前不是user_for页面那么久跳
                  if(this.noCurrentPage('/user_form')){
                      this.$router.push({
                          path:'/user_form'
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
           },
		   navLeftClick(){
			   //如果当前路由是/phone那么久跳转到配置页面
			   if(this.$route.path=='/phone'){
				   this.$router.push('/web_dav_config');
			   }else{
				   this.$router.go(-1);
			   }
		   }
        }
    };
</script>

<style>
</style>
