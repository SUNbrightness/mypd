<template>
    <div>
        <van-form autocomplete="off" disableautocomplete @submit="onSubmit">
            <van-field v-model="userForm.title" name="标题" label="标题" placeholder="标题" :rules="[{ required: true, message: '必须填写一个标题' }]"
                autocomplete="off" disableautocomplete
/>

            <van-field v-model="userForm.username" type="text" name="用户名" label="用户名" placeholder="用户名" autocomplete="off"
                disableautocomplete
/>



            <!-- 注意这个不是将来要提交的值，这个只是一个临时的明文 -->
            <van-field v-model="pwdWrite" :type="showPwd?'text':'password'" name="密码" label="密码" placeholder="密码"
                autocomplete="off" disableautocomplete
>
                <template #right-icon>
                    <van-icon class="cur" :name="showPwd?'eye':'closed-eye'" @click="showPwd=!showPwd" />
                </template>
                <template #button>
                    <van-button style="margin-left: 10px;" size="small" type="primary" native-type="button" @click="doCopy(pwdWrite)">
                        copy
                    </van-button>
                </template>
            </van-field>

            <van-field v-model="userForm.url" type="text" name="url" label="url" placeholder="url" autocomplete="off"
                disableautocomplete
>
                <template #button>
                    <van-button style="margin-left: 10px;" size="small" type="primary" native-type="button" @click="doCopy(userForm.url)">
                        copy
                    </van-button>
                </template>
                </van-field>

            <van-field v-model="userForm.explain" rows="2" type="textarea" autosize label="备注" placeholder="请输入备注"
                autocomplete="off" disableautocomplete
/>

            <van-button round block type="warning" native-type="button" style="margin-bottom: 10px;" @click="randomShow=true">
                生成随机密码
            </van-button>
            <van-button round block type="info" native-type="submit">
                提交
            </van-button>
        </van-form>
        
        <van-dialog v-model="randomShow" title="随机密码生成" :show-confirm-button="false"
        :close-on-click-overlay="true"
        >
          <random-pd @useRandomPd="pwdWrite=$event;randomShow=false" />
        </van-dialog>
        
        

    </div>

</template>
<script>
    
    import { Dialog } from 'vant';
    import RandomPd from '@/components/RandomPd.vue';
    import cypt from '@/common/cypt.js';
    


    import MyMixin from '@/components/MyMixin.vue';
    export default {

        name: 'UserForm',

        components: {RandomPd,
         [Dialog.Component.name]: Dialog.Component,
        },

        mixins: [MyMixin],

        props: {
            thisForm: {
                default: 0
            },
            thisFolder: {
                default: 0
            },
            
        },
        data() {
            return {
                userForm: this.getNullForm(),
                pwdWrite: '',
                //控制小眼睛，隐藏密码还是显示 
                showPwd: false,
                randomShow:false
            }
        },
        computed: {},
        watch: {
            
        },

        created() {
            console.log("init")
            this.initForm();
        },

        mounted() {

        },

        destroyed() {},

        methods: {
            //判断是该新增还是修改，并拷贝一个对象
            initForm:function(){
              //-1为新增
              if (this.thisForm == -1) {
                  this.userForm = this.getNullForm();
              } else {
                  try {
                      var formData = this.wlist[this.thisFolder].list[this.thisForm];
                      this.userForm = this.Mclone(formData);
                  } catch (e) {
                      this.userForm = this.getNullForm();
                  }
              }
                
                 this.pwdWrite = cypt.decrypt(this.userForm.password);
            },
            doCopy: function(copyValue) {
                var that = this;
                this.$copyText(copyValue).then(function(e) {
                    that.notifyOk();
                }, function(e) {
                    that.notifyNo();
                })
            },
            onSubmit() {
                //将显示的明文加密加入form
                this.userForm.password = cypt.encrypt(this.pwdWrite);

                //新增
                if (this.thisForm == -1) {
                    this.wlist[this.thisFolder].list.push(this.userForm);
                    //新增完成，让userlist 选中新增的form
                    this.EventBus.$emit('toUserForm', this.wlist[this.thisFolder].list.length - 1);
                } else {
                    //修改
                    this.wlist[this.thisFolder].list[this.thisForm] = this.userForm;
                }
                this.wclient.put();
                this.notifyOk();
            },
            getNullForm() {
                return {
                    title: '',
                    username: '',
                    password: '',
                    url: '',
                    explain: ''
                };
            }
        },

    };
</script>

<style>
    .cur{
        cursor:pointer;
    }
</style>
