<template>
    <div>
        <van-form @submit="onSubmit">
            <van-field name="checkboxGroup" label="字符">
                <template #input>
                    <van-checkbox-group v-model="filts" direction="horizontal">
                        <van-checkbox name="0" shape="square">
                            a-z
                        </van-checkbox>
                        <van-checkbox name="1" shape="square">
                            A-Z
                        </van-checkbox>
                        <van-checkbox name="2" shape="square">
                            0-9
                        </van-checkbox>
                        <van-checkbox name="3" shape="square">
                            自定义
                        </van-checkbox>
                    </van-checkbox-group>
                </template>
            </van-field>
            <van-field v-model="other" name="other" label="自定义" type="text" />
            <van-field name="slider" label="长度">
                <template #input>
                    <van-slider v-model="length" :min="1" :max="100" />
                </template>
                <template #extra>
                    <van-stepper v-model="length" />
                </template>
            </van-field>

            <van-field v-model="computedValue" type="text" name="密码" label="密码" placeholder="密码" autocomplete="off"
                disableautocomplete
>
                <template #button>
                    <van-button style="margin-left: 10px;" size="small" type="primary" native-type="button" @click="doCopy()">
                        copy
                    </van-button>
                </template>
            </van-field>

            <div style="margin: 16px;">
                <van-button round type="info" block native-type="submit">
                    使用
                </van-button>
            </div>
        </van-form>
    </div>
</template>

<script>
    const Ma = ['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', 'i', 'g', 'k', 'l', 'm', 'n', 'o', 'p', 'q', 'r', 's', 't', 'u',
        'v', 'w', 'x', 'v', 'z'
    ];
    const MA = ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'G', 'K', 'L', 'M', 'N', 'O', 'P', 'Q', 'R', 'S', 'T', 'U',
        'V', 'W', 'X', 'V', 'Z'
    ];
    const M0 = [0,1,2,3,4,5,6,7,8,9];
    
    import MyMixin from '@/components/MyMixin.vue';
    import {
        Checkbox,
        CheckboxGroup,
        Slider,
        Stepper
    } from 'vant';
    export default {

        name: '',

        components: {
            [Checkbox.name]: Checkbox,
            [CheckboxGroup.name]: CheckboxGroup,
            [Slider.name]: Slider,
            [Stepper.name]: Stepper
        },

        mixins: [MyMixin],

        props: {},

        data() {
            return {
                other: '@#$%&0)_+ー=,<>?/00:',
                filts: ["0", "1", "2"],
                length: 8,
            }
        },
        computed: {
            computedValue:{
                get:function(){
                //克隆一份自有妙用
                var filts = this.Mclone(this.filts);
                //排序让0在最前面，需要保证
                //1、生成的密码选择的字符都要有，2、生成的密码在有字母时必须是字母开头
                filts.sort();
                
                var generatePwd = "";
                
                let filtsIndex = 0;
                for (var i = 0; i < this.length; i++) {
                    let randowC = filts[filtsIndex];
                    let generateC = "";
                    switch(randowC){
                        case "0":
                        generateC= Ma[this.getRandomInt(26)];
                        break;
                        case "1":
                        generateC= MA[this.getRandomInt(26)];
                        break;
                        case "2":
                        generateC= M0[this.getRandomInt(10)];
                        break;
                        case "3":
                        generateC= this.other[this.getRandomInt(this.other.length)];
                        break;
                        default:
                        console.log(randowC)
                    }
                    generatePwd += generateC;
                    filtsIndex=(filtsIndex+1)%filts.length;
                }
                
                return generatePwd;
            },
            set:function(newValue){
                //v-model需要
            }
            }
        },

        watch: {
        },

        created() {},

        mounted() {},

        destroyed() {},

        methods: {
            async onSubmit() {
                //二次确认
                var nook = await this.affirm("会覆盖你的当前密码!");
                if (nook) return;
                this.$emit('useRandomPd',this.computedValue);
            },
            doCopy() {
                var that = this;
                this.$copyText(this.computedValue).then(function(e) {
                    that.notifyOk();
                }, function(e) {
                    that.notifyNo();
                })
            },
            getRandomInt(max) {
                return parseInt(Math.random() * max);
            }
        },
    };
</script>

<style>
</style>
