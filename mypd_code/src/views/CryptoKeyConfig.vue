<template>
    <div>
        <van-nav-bar title="密码" />
        <van-form @submit="onSubmit">
            <van-field ref="cryptoKeyConfigField" v-model="password" type="password" name="密码" label="密码" placeholder="加密key,必须牢记" :rules="[{ required: true, message: '请填写密码' }]" />
            <div style="margin: 16px;">
                <van-button round block type="info" native-type="submit">
                    提交
                </van-button>
            </div>
        </van-form>
    </div>
</template>

<script>
   var md5 = require('md5');
    import MyMixin from '@/components/MyMixin.vue';
    export default {
        name: 'CryptoKeyConfig',
        mixins:[MyMixin],
        data() {
            return {
                cryptKeyBack: {
                    backgroundColor: 'gray'
                },
                password: ''
            }
        },
        created() {
            var that = this;
          //获取焦点
            setTimeout(function(){
                that.$refs.cryptoKeyConfigField.focus()
            },100);
        },
        methods: {
            onSubmit() {
                //md5 + 盐加密
                var cryptoKey = md5(this.password + window.k.cryptoKey);
                //如果是第一次设置密码则直接设置
                if (!this.wdata.key) {
                    this.wdata.key = cryptoKey;
                    this.wclient.put();
                    this.$notify({ type: 'success', message: '初始密码已设置' });
                } else if (cryptoKey != this.wdata.key) {
                     this.$notify({ type: 'danger', message: '密码错误' });
                    return;
                }
                //临时保存密码
                sessionStorage.setItem(window.k.cryptoKey,cryptoKey);
                //根据不同环境跳转不同路由
                this.toIndex();
            },
            toIndex(){
                var sUserAgent = navigator.userAgent.toLowerCase();
                var bIsIpad = sUserAgent.match(/ipad/i) == "ipad";
                var bIsIphoneOs = sUserAgent.match(/iphone os/i) == "iphone os";
                var bIsMidp = sUserAgent.match(/midp/i) == "midp";
                var bIsUc7 = sUserAgent.match(/rv:1.2.3.4/i) == "rv:1.2.3.4";
                var bIsUc = sUserAgent.match(/ucweb/i) == "ucweb";
                var bIsAndroid = sUserAgent.match(/android/i) == "android";
                var bIsCE = sUserAgent.match(/windows ce/i) == "windows ce";
                var bIsWM = sUserAgent.match(/windows mobile/i) == "windows mobile";
                if(bIsIpad || bIsIphoneOs || bIsMidp || bIsUc7 || bIsUc || bIsAndroid || bIsCE || bIsWM) {
               this.$router.push('/phone');
                } else {
                this.$router.push('/index');
                }
            }
        },
    };
</script>

<style>
</style>
