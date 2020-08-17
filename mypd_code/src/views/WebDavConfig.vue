<template>
    <div>
        <van-nav-bar title="WebDav配置" />
        <van-form @submit="onSubmit">
            <van-field v-model="url" name="url" label="url" placeholder="url" :rules="[{ required: true, message: '请填写url' }]" />
            <van-field v-model="username" name="用户名" label="用户名" placeholder="用户名" :rules="[{ required: true, message: '请填写用户名' }]" />
            <van-field v-model="password" type="password" name="密码" label="密码" placeholder="密码" :rules="[{ required: true, message: '请填写密码' }]" />
            <div style="margin: 16px;">
                <van-button round block type="info" native-type="submit">
                    提交
                </van-button>
            </div>
        </van-form>
    </div>
</template>

<script>
    import MyMixin from '@/components/MyMixin.vue';
    export default {
        name: 'CryptoKeyConfig',
        mixins: [MyMixin],
        data() {
            return {
                url: '',
                username: '',
                password: '',
            }
        },
        methods: {

            async onSubmit() {

                if (this.url.indexOf("http") == -1) {
                    this.$notify({
                        type: 'danger',
                        message: '地址格式不对!'
                    });
                    return;
                }
                //初始化  webDavclient 并且获取json数据
                var data = await this.wclient.init({
                    url: this.url,
                    username: this.username,
                    password: this.password
                });
                var wdata = data;
                this.setWdata(wdata);


                this.$notify({
                    type: 'success',
                    message: "webDav ok"
                });

                //持久化webdav信息
                this.$cookies.set(window.k.wurl, this.url);
                this.$cookies.set(window.k.wusername, this.username);
                this.$cookies.set(window.k.wpassword, this.password);

                 this.$router.push('/');
            }
        },

    };
</script>

<style>
</style>
