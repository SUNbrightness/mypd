
<script>
    import {
        mapMutations,
        mapGetters
    } from 'vuex';

    export default {
        name: '',
        computed: { ...mapGetters([
                'wlist',
                'wdata'
            ])
        },
        methods: {
            ...mapMutations([
                'setWdata',
                 'setWlist'
            ]),
            notifyOk(mes="ok"){
                this.$notify({ type: 'success', message: mes });
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
</style>
