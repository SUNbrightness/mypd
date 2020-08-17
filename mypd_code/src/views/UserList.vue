<template>
    <div>
        <van-cell-group>
                <van-cell v-for="(item,index) in uList" :key="'userList'+index" :style="cellStyle(index)" :title="item.title +' -> '+item.username" @click="toUserForm(index)">
                    <!-- 使用 right-icon 插槽来自定义右侧图标 -->
                    <template #right-icon>
                        <van-icon class="cur" name="delete" @click.stop="del(index,item)" />
                    </template>
                </van-cell>
                
                <van-empty v-if="uList==null||uList.length==0"  />
                <center v-if="addFormShow">
                    <van-button icon="plus" type="primary" native-type="button" @click="add()" />
                </center>
        </van-cell-group>
    </div>
    
    
</template>

<script>
    import MyMixin from '@/components/MyMixin.vue';
    import { Empty } from 'vant';
    export default {

        name: '',

        components: {
            [Empty.name]: Empty,
        },

        mixins: [MyMixin],

        props: {
            addFormShow:{
                default:true
            }
        },

        data() {
            return {
                addValue: '',
                cellShow: [],
            }
        },

        computed: {
            uList: function() {
                if(!this.wdata||!this.wlist||!this.wlist[this.thisFolder]||!this.wlist[this.thisFolder].list){
                    return [];
                }
                return this.wdata.list[this.thisFolder].list;
            },
            cellStyle: function() {
                this.cellShow;
                return function(index) {
                    return index == this.thisForm ? {
                        "background-color": "lightgray"
                    } : {};
                };
            },
            cellShowComputed: function() {
                this.cellShow;
                return function(e) {
                    return this.cellShow[e] == null ? true : this.cellShow[e];
                };
            }
        },

        watch: {},

        created() {
       
        },

        mounted() {},

        destroyed() {},

        methods: {
            toUserForm(index) {
                this.setThisForm(index);
                this.EventBus.$emit('toUserForm');
            },
            save() {
                this.wclient.put();
                for (var i = 0; i < this.wlist.length; i++) {
                    this.cellShow.splice(i, 1, true);
                }
                this.notifyOk();
            },
            add() {
                //新增了这边先不选中菜单
                this.setThisForm(-1);
                this.EventBus.$emit('toUserForm');
            },
            async del(index, item) {
                var nook = await this.affirm();
                if (nook) return;
                this.wlist[this.thisFolder].list.splice(index, 1, );
                this.wclient.put();
                this.notifyOk();
                //不显示form
                this.setThisForm(-2);
            }
        },

    };
</script>

<style>
</style>
