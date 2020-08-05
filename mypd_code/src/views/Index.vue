<template>
    <div>
        <!-- 搜索的规则：账号中存在任何字符串 就展开搜索结果 -->
        <van-search v-model="searchValue" placeholder="请输入搜索账号" @input="searchChange" />
        <div class="flex-box">
            
            
            <template v-if="!searchShow">
                <div class="van-hairline--surround" style="width: 30vw;">
                    <folder />
                </div>
                <div class="van-hairline--surround" style="width: 30vw;">
                    <user-list :this-folder="thisFolder" />
                </div>
            </template>
            
            <search-result v-if="searchShow" :search-value="searchValue" style="width: 60vw;" />
            
            
            <div class="van-hairline--surround" style="width: 40vw;">
                <user-form :key="formKey" :this-form="thisForm" :this-folder="thisFolder" />
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
                thisFolder: 0,
                thisForm: -1,
                //保证form的反复创建，拒绝污染
                formKey: '213123kljlk13',
                //展示搜索结果
                searchShow: false
            }
        },
        computed: {},
        watch: {
            //保证form的反复创建，拒绝污染
            thisFolder: function() {
                this.formKey = +new Date() + '';
                //选中第一个user_list
                this.thisForm = 0;
            },
            thisForm: function() {
                this.formKey = +new Date() + '';
            }
        },
        created() {
            //监听事件
            this.EventBus.$on('toUserList',target=>{
               this.thisFolder = target;
            });
            
            this.EventBus.$on('toUserForm',(uindex,findex)=>{
               this.thisForm = parseInt(uindex);
               if(findex){
                   this.thisFolder = parseInt(findex);
               }
            });
        },
        methods: {
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
