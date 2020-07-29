<template>
    <div>
        <van-form autocomplete="off" disableautocomplete @submit="onSubmit">
            <van-field v-model="userForm.title" name="标题" label="标题" placeholder="标题" :rules="[{ required: true, message: '请填写标题' }]"
                autocomplete="off" disableautocomplete
/>

            <van-field v-model="userForm.username" name="用户名" label="用户名" placeholder="用户名" :rules="[{ required: true, message: '请填写用户名' }]"
                autocomplete="off" disableautocomplete
/>
            <van-field v-model="userForm.password" type="password" name="密码" label="密码" placeholder="密码" :rules="[{ required: true, message: '请填写密码' }]"
                autocomplete="off" disableautocomplete
/>
            <div style="margin: 16px;" />
        </van-form>

        <van-field v-model="userForm.explain" rows="1" autosize label="请输入备注" type="textarea" placeholder="请输入备注"
            autocomplete="off" disableautocomplete
/>
        <div style="margin: 16px;">
            <van-button round block type="info" native-type="submit">
                提交
            </van-button>
        </div>
    </div>

</template>

<script>
    //拷贝对象
    function Mclone(obj){
        return JSON.parse(JSON.stringify(obj));
    }
    
    
    import MyMixin from './MyMixin.vue';
    export default {

        name: '',

        components: {},

        mixins: [MyMixin],

        props: {
            thisForm: {
                type: Number,
                default: 0
            },
            thisFolder: {
                type: Number,
                default:0
            }
        },

        data() {
            return {
                userForm: this.getNullForm()
            }
        },

        computed: {},

        watch: {
            thisForm:function(){
                //-1为新增
                if(this.thisForm==-1){
                    this.userForm=this.getNullForm();
                }else{
                    try{
                        var formData = this.wlist[this.thisFolder].list[this.thisForm];
                        this.userForm= Mclone(formData);
                    }catch(e){
                       this.userForm=this.getNullForm();
                    }
                }
            }
        },

        created() {},

        mounted() {
            
        },

        destroyed() {},

        methods: {
            onSubmit() {

            },
            getNullForm(){
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
</style>
