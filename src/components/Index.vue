<template>
    <div>
        <van-search v-model="searchValue" placeholder="请输入搜索关键词" />
        <!-- 全边框 -->
        <div class="flex-box">
            <div class="van-hairline--surround" style="width: 30vw;">
                <folder @toUserList="thisFolder=$event" />
            </div>
            <div class="van-hairline--surround" style="width: 30vw;">
                <user-list :this-folder="thisFolder" @toUserForm="thisForm=$event" />
            </div>
            <div class="van-hairline--surround" style="width: 40vw;">
                <user-form :key="formKey" :this-form="thisForm" :this-folder="thisFolder" @upthisForm="thisForm=$event" />
            </div>
        </div>
    </div>
</template>

<script>
    import MyMixin from './MyMixin.vue';
    import {
        EventBus
    } from '@/common/EventBus.js';
    import Folder from './Folder.vue';
    import UserList from './UserList.vue';
    import UserForm from './UserForm.vue';
    export default {
        name: '',
        components: {
            Folder,
            UserList,
            UserForm
        },
        mixins: [MyMixin],
        props: {},
        data() {
            return {
                searchValue: '',
                thisFolder: 0,
                thisForm:-1,
                //保证form的反复创建，拒绝污染
                formKey:'213123kljlk13'
            }
        },
        computed: {},
        watch: {
            //保证form的反复创建，拒绝污染
            thisFolder:function(){
               this.formKey = +new Date()+'';
            },
            thisForm:function(){
                this.formKey = +new Date()+'';
            }
            },
    };
</script>

<style>
    .flex-box {
        width: 100vw;
        display: flex;
    }
</style>
