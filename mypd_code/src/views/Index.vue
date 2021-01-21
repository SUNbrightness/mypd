<template>
    <div>
        <!-- 搜索的规则：账号中存在任何字符串 就展开搜索结果 -->
        <van-search :show-action="true" v-model="searchValue" placeholder="请输入搜索账号或标题" @input="searchChange" >
		<template #action>
			 <router-link to="/web_dav_config">
				 <van-icon name="setting-o"  />
			 </router-link>
			
		</template>
		</van-search>
        <div class="flex-box">
            <template v-if="!searchShow">
                <div class="van-hairline--surround" style="width: 30vw;">
                    <folder />
                </div>
                <div class="van-hairline--surround" style="width: 30vw;">
                    <user-list :addFormShow="addFormShow" />
                </div>
            </template>
            
            <search-result v-if="searchShow" :search-value="searchValue" style="width: 60vw;" />
            
            <div v-if="thisForm!=-2" class="van-hairline--surround" style="width: 40vw;">
                <user-form :key="formKey" />
            </div>
        </div>
    </div>
</template>

<script>
    import MyMixin from '@/components/MyMixin.vue';
    import {
        EventBus
    } from '@/common/EventBus.js';
    import Folder from './Folder.vue';
    import UserList from './UserList.vue';
    import UserForm from './UserForm.vue';
    import SearchResult from '@/components/SearchResult.vue';
    export default {
        name: '',
        components: {
            Folder,
            UserList,
            UserForm,
            SearchResult
        },
        mixins: [MyMixin],
        props: {},
        data() {
            return {
                searchValue: '',
                //保证form的反复创建，拒绝污染
                formKey: '213123kljlk13',
                //展示搜索结果
                searchShow: false,
                //显示from加号
                addFormShow:true,
            }
        },
        computed: {},
        watch: {
            //保证form的反复创建，拒绝污染
            thisFolder: function() {
                this.formKey = new Date().getTime() + '';
               if(this.thisFolder==-1){
                   this.addFormShow=false;
                   this.setThisForm(-2);
               }
               this.ifCheckUserList();
            },
            thisForm: function() {
                this.formKey = new Date().getTime() + '';
                //新增时不显示加号
                if(this.thisForm==-1){
                    this.addFormShow=false;
                }else{
                    this.addFormShow=true;
                }
            }
        },
        mounted() {
            //只要有一个文件夹就选中他
            if(this.wlist&&this.wlist.length>0){
                this.setThisFolder(0);
            }
            this.ifCheckUserList();
        },
        methods: {
            ifCheckUserList(){
                if(this.wlist&&this.wlist.length>0){
                   let refList = this.wlist[this.thisFolder].list;
                   if(refList&&refList.length>0){
                       //选中第一个user_list
                       this.setThisForm(0);
                    }else{
                        //显示加号
                        this.addFormShow=true;
                        //不显示form
                        this.setThisForm(-2);
                    }
                }else{
                    //不显示 user_list的 + 号
                    this.addFormShow=false;
                }
            },
            searchChange() {
                if (this.searchValue) {
                    this.searchShow = true;
                } else {
                    this.searchShow = false;
                }
            }
        }
    };
</script>

<style>
    .flex-box {
        width: 100vw;
        display: flex;
    }
</style>
