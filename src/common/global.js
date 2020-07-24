//加载全局常量
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
    cryptokey:"cryptokey",
    
}
bindToGlobal(myGlobal,"k");