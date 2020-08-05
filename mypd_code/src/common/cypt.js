var CryptoJS = require("crypto-js");
const crypt = {
    //解密
    decrypt: function(ciphertext) {
        var bytes = CryptoJS.AES.decrypt(ciphertext, sessionStorage.getItem(window.k.cryptoKey));
        var originalText = bytes.toString(CryptoJS.enc.Utf8);

        return originalText;
    },
    //加密
    encrypt: function(str) {
        var ciphertext = CryptoJS.AES.encrypt(str, sessionStorage.getItem(window.k.cryptoKey)).toString();
        return ciphertext;
    }
}
export default crypt;