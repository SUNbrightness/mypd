
<script>
    
    import {
        mapMutations,
        mapGetters
    } from 'vuex';

    export default {
        name: '',
        computed: { ...mapGetters([
                'wlist',
                'wdata',
                'metaTitle',
                'thisFolder',
                'thisForm',
            ])
        },
        methods: {
            ...mapMutations([
                'setWdata',
                 'setWlist',
                 'setThisForm',
                 'setThisFolder',
            ]),
            notifyOk(mes="ok"){
                this.$notify({ type: 'success', message: mes,duration: 300});
            },notifyNo(mes="error"){
                
                this.$notify({ type: 'danger', message: mes });
            },
            affirm: function (content = "是否要继续进行该操作", title = "") {
                var that = this;
                const promise = new Promise(function (resolve, reject) {
                   
                    that.$dialog.confirm({
                    		title: title,
                    		message: content,
                    	})
                    	.then(() => {
                    		resolve(false);  
                    	})
                    	.catch(() => {
                            resolve(true);
                    	});
                })
                return promise;
            },
             Mclone(obj) {
                return JSON.parse(JSON.stringify(obj));
            }
        },
    };
</script>

<style>
    .cur{
        cursor:pointer;
    }
</style>
