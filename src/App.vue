<template>
    <div id="app">
        <router-view />
    </div>
</template>
<script>

    export default {
        name: 'App',
        components: {
        },
        data() {
            return {
            };
        },
        computed: {},

        async created() {
            try {
                await this.wclient.init();
            } catch (error) {
                console.log("填写webdav信息");
                //初始化如果出现异常就去重新填写webdav信息
                this.$router.push('Web_dav_config');
            }
        },
    }
</script>

<style>

</style>
