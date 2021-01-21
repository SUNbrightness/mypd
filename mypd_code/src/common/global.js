//加载全局常量
//将一些常量绑定到 windows.k 对象上
let bindToGlobal = (obj, key='var') => {
    if (typeof window[key] === 'undefined') {
        window[key] = {};
    }
    
    for (let i in obj) {
        window[key][i] = obj[i]
    }
}
const myGlobal = {
    wurl:"wurl",
    wusername:"wusername",
    wpassword:"wpassword",
    wFileName:"mypd.json",
    wInfo:"winfo",
    cryptoKey:"cryptokey",
    
}
bindToGlobal(myGlobal,"k");