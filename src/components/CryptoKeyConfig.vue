<template>
    <div>
        <van-nav-bar title="WebDav配置" />
        <van-form @submit="onSubmit">
            <van-field v-model="password" type="password" name="密码" label="密码" placeholder="加密key,必须牢记" :rules="[{ required: true, message: '请填写密码' }]" />
            <div style="margin: 16px;">
                <van-button round block type="info" native-type="submit">
                    提交
                </van-button>
            </div>
        </van-form>
    </div>
</template>

<script>
    import {
        EventBus
    } from '@/common/EventBus.js';
    export default {
        name: 'CryptoKeyConfig',
        data() {
            return {
                cryptKeyBack: {
                    backgroundColor: 'gray'
                },
                password: ''
            }
        },
        methods: {
            onSubmit() {
                //md5 + 盐加密
                var cryptoKey = this.md5(this.password + window.k.cryptoKey);
                //如果是第一次设置密码则直接设置
                if (!this.wclient.data.key) {
                    this.wclient.data.key = cryptoKey;
                    this.wclient.put();
                    this.$notify({ type: 'success', message: '初始密码已设置' });
                } else if (cryptoKey != this.wclient.data.key) {
                     this.$notify({ type: 'danger', message: '密码错误' });
                    return;
                }
                //临时保存密码
                sessionStorage.setItem(window.k.cryptoKey,cryptoKey);
                EventBus.$emit('toPage', 1);
            }
        },

    };
</script>

<style>
</style>
