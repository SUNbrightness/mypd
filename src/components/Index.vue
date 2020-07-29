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
            <div class="van-hairline--surround">
          <user-form :user-form="thisForm" :this-folder="thisFolder" />
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

        mixins: [],

        props: {},

        data() {
            return {
                searchValue: '',
                thisFolder: 0,
                thisForm:0,
            }
        },

        computed: {},

        watch: {},

        created() {},
        mounted() {},

        destroyed() {},

        methods: {
        },
    };
</script>

<style>
    .flex-box {
        width: 100vw;
        display: flex;
    }
</style>
