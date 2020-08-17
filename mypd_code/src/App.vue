<template>
    <div id="app">
        <router-view v-if="routerViewShow" />
    </div>
</template>
<script>
    export default {
        name: 'App',
        components: {},
        data() {
            return {
                routerViewShow: false
            };
        },
        computed: {},

        async mounted() {
            try {
                await this.wclient.init();
            } catch (error) {
                console.log("填写webdav信息");
                //初始化如果出现异常就去重新填写webdav信息
                this.$router.push('web_dav_config');
            }finally{
                //必须等待数据请求完毕后再渲染组件
                this.routerViewShow=true;
            }
        },
    }
</script>

<style>

</style>
