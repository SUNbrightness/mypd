<template>
    <div>
        <van-cell-group>
                <van-cell v-for="(item,index) in uList" :key="'userList'+index" :style="cellStyle(index)" :title="item.title +' -> '+item.username" @click="toUserForm(index)">
                    <!-- 使用 right-icon 插槽来自定义右侧图标 -->
                    <template #right-icon>
                        <van-icon name="delete" @click.stop="del(index,item)" />
                    </template>
                </van-cell>
                
                <van-empty v-if="uList==null||uList.length==0" description="empty" />
                <center>
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
            thisFolder: {
                default:0
            }
        },

        data() {
            return {
                addValue: '',
                cellShow: [],
                thisIndex: 0,
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
                    return index == this.thisIndex ? {
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
                this.thisIndex = index;
                 this.EventBus.$emit('toUserForm',index);
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
                this.thisIndex = -1;
               this.EventBus.$emit('toUserForm',-1);
            },
            async del(index, item) {
                var nook = await this.affirm();
                if (nook) return;
                this.wlist[this.thisFolder].list.splice(index, 1, );
                this.wclient.put();
                this.notifyOk();
            }
        },

    };
</script>

<style>
</style>
