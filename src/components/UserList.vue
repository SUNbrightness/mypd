<template>
    <div>
        <van-cell-group>
                <van-cell v-for="(item,index) in uList" :key="'userList'+index" :style="cellStyle(index)" :title="item.title +' -> '+item.username" @click="toUserForm(index)">
                    <!-- 使用 right-icon 插槽来自定义右侧图标 -->
                    <template #right-icon>
                        <van-icon name="delete" @click="del(index,item)" />
                    </template>
                </van-cell>
            <center>
                <van-button icon="plus" type="primary" native-type="button" @click="add()" />
            </center>
        </van-cell-group>
    </div>
</template>

<script>
    import MyMixin from './MyMixin.vue';
    export default {

        name: '',

        components: {},

        mixins: [MyMixin],

        props: {
            thisFolder: {
                type: Number,
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
            //用于一开始默认选中第一个
            this.toUserForm(0);
        },

        mounted() {},

        destroyed() {},

        methods: {
            toUserForm(index) {
                this.thisIndex = index;
                 this.$emit('toUserForm',index);
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
               this.$emit('toUserForm',-1);
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
