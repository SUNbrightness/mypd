module.exports = {
     publicPath: process.env.NODE_ENV === "production" ? "././" : "/",
  pages: {
    index: {
      // page 的入口
      entry: 'src/main.js',
    },phone: {
      // page 的入口
      entry: 'src/phone.main.js',
    },
  },
  
}