<template>
    <div>
        <van-search v-model="searchValue" placeholder="请输入搜索关键词" :clearable="false" @input="searchChange" />
        <div class="flex-box">
            
            <!-- 搜索的规则：有任何字符串就展开搜索结果 -->
            <template v-if="!searchShow">
                <div class="van-hairline--surround" style="width: 30vw;">
                    <folder @toUserList="thisFolder=$event" />
                </div>
                <div class="van-hairline--surround" style="width: 30vw;">
                    <user-list :this-folder="thisFolder" @toUserForm="thisForm=$event" />
                </div>
            </template>
            
            <search-result v-if="searchShow" :search-value="searchValue" style="width: 60vw;" 
            @toUserForm="thisForm=parseInt($event.uindex);thisFolder=parseInt($event.findex)"
/>
            
            
            <div class="van-hairline--surround" style="width: 40vw;">
                <user-form :key="formKey" :this-form="thisForm" :this-folder="thisFolder" @upthisForm="thisForm=$event" />
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
            },
            thisForm: function() {
                this.formKey = +new Date() + '';
            }
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
