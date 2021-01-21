# mypd 跨平台、基于坚果云存储的密码管理软件 
# 免责声明
稳定性未知。本软件完全免费，不承担任何责任！！。

# 产品优势

## 跨平台
- 提供，ios(越狱)、android 安装包。
- pc端依赖 utools。(你也可以尝试使用electron打包，本项目是完全基于h5的没有用到环境依赖)

## 数据安全性
1. 将用户所有数据存储至用户自己的坚果云。保证隐私。
2. 坚果云拥有历史查看功能，你可以尝试恢复自己的历史数据！！！
3. 删除数据都做到了警告提示！放置误删！

# 使用说明
## 首页需添加坚果云账号信息.
参考:[坚果云帮助中心](http://help.jianguoyun.com/?p=2064)

- 目录：如果该目录下没有mypd.json文件，系统会自动创建一个新的，并请您设置初始密码
- 账号：
- 应用密码: 
## pc端 
在utools 插件中心 下载mypd 或者在[](https://github.com/SUNbrightness/mypd/tags) 下载utools的插件安装包
## 手机端
打开github 在tags中 下载已经打包好的安装程序
[mypd](https://github.com/SUNbrightness/mypd/tags)

## 开发技术
vue、vux、vue-router

# 版本记录
## 0.2.0
- 首页增加 “设置图标” 可以返回配置界面
- 搜索功能可以搜索标记与账号
- 修复手机端搜索不了的bug
### 开发
- 坚果云目前没办法跨域访问，浏览器无法直接调用接口。**本次在 ./mypd_code/ve.config.js** 中配置了开发环境http代理
- 浏览器调试时请不要加 https://dav.jianguoyun.com/dav/ 前缀,直接使用 / + 目录.
