<template>
    <div>
        <van-search v-model="searchValue" placeholder="请输入搜索关键词" />
        <!-- 全边框 -->
        <div class="flex-box">
            <div class="van-hairline--surround" style="width: 30vw;">
              
              <folder :list="list" />
                
            </div>
            <div class="van-hairline--surround">
                123
            </div>
            <div class="van-hairline--surround">
                123
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
    export default {

        name: '',

        components: {Folder},

        mixins: [],

        props: {},

        data() {
            return {
                searchValue: '',
                list: [],
                activeKey: 0,
            }
        },

        computed: {},

        watch: {},

        created() {
        },
        mounted() {},

        destroyed() {},

        methods: {
            setData() {
                // this.setWlist(this.list);
                this.wclient.put();
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
