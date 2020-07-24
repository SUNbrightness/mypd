const {
    createClient
} = require("webdav");

const client = {
    data:{},
    client: null,
    vue:null,
    install(vue){
        this.vue=vue;
        vue.prototype.wclient = this;
    },
    init:async function() {
        this.client = createClient(
            localStorage.getItem(window.k.wurl), {
                username: localStorage.getItem(window.k.wusername),
                password: localStorage.getItem(window.k.wpassword)
            }
        );
        
        if (await client.exists(window.k.wFileName) === false) {
            this.vue.$notify({ type: 'danger', message: '目录中不存在mypd.json文件' });
            throw '目录中不存在mypd.json文件' ;
        }
        
        client.data = await client.get();
        
        if(!client.data.list){
            client.data.list = [];
        }
        return client.data;
    },
    get: async function() {
        var str='';
        try{
            str = await this.client.getFileContents(window.k.wFileName, {
                format: "text"
            });
        }catch(e){
            this.vue.$notify({ type: 'danger', message: '获取WebDav数据异常,请检查网络和webdav' });
            throw e;
        }
        return str;
    },
    put: function() {
        try{
            this.client.putFileContents(window.k.wFileName, JSON.stringify(this.data));
        }catch(e){
            this.vue.$notify({ type: 'danger', message: '写入WebDav异常,请检查网络和webdav' });
            throw e;
        }
    }
}

export default client;
