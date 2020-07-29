<template>
    <div>
        <van-form>
            <van-field name="checkboxGroup" label="复选框组">
              <template #input>
            <van-checkbox-group v-model="filts" direction="horizontal">
                <van-checkbox name="1" shape="square">
                    复选框 1
                </van-checkbox>
                <van-checkbox name="2" shape="square">
                    复选框 2
                </van-checkbox>
            </van-checkbox-group>
            </template>
            </van-field>
            <van-field name="slider" label="滑块">
              <template #input>
                <van-slider v-model="lenght" :min="1" :max="100" />
              </template>
              <template #extra>
                <van-stepper v-model="lenght" />
              </template>
            </van-field>
            <van-field v-model="value" type="password" name="密码" label="密码" placeholder="密码" />
            <div style="margin: 16px;">
                <van-button round block type="info" native-type="submit">
                    提交
                </van-button>
            </div>
        </van-form>
    </div>
</template>

<script>
    import { Checkbox, CheckboxGroup,Slider,Stepper } from 'vant';
    export default {

        name: '',

        components: {
            [Checkbox.name]: Checkbox,
            [CheckboxGroup.name]: CheckboxGroup,
            [Slider.name]: Slider,
            [Stepper.name]: Stepper
        },

        mixins: [],

        props: {},

        data() {
            return {
                filts: [],
                lenght: 6,
                value: ''
            }
        },
        computed: {},

        watch: {},

        created() {},

        mounted() {},

        destroyed() {},

        methods: {},

    };
</script>

<style>
</style>
