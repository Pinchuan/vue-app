var template = require('./login.html');
var loginCtrl = require('controllers/loginController');
var eventHelper = require('utils/eventHelper');
var loginService = require('services/loginService');
var storage = window.localStorage;
// 定义组件
var comm = Vue.extend({
    template: template,
    data: function () {
        return {
            password: storage.getItem('password'),
            userName: storage.getItem('userName'),
            loginComplete: false,
            loginFail: false,
            needUpdate: false
        }
    },
    methods: {
        handleClose: function () {
            // window.open("http://120.77.246.153:9000/package/latest/hezhang.apk");
            navigator.app.exitApp();
        },
        login: function () {
            if (!this.password || !this.userName) {
                this.loginFail = true;
                return;
            }
            eventHelper.emit('isLoading');
            this.loginFail = false;
            var loginTimeout = setTimeout(function () {
                this.$alert('请保证网络连接顺畅', '网络连接失败', {
                    confirmButtonText: '关闭应用',
                    callback: function () {
                        navigator.app.exitApp();
                    }
                });
            }.bind(this), 60000);
            loginCtrl.login(this.userName, this.password, function (token) {
                clearTimeout(loginTimeout);
                eventHelper.emit('closeLoading');
                eventHelper.emit('loginSuccess', token);
                loginService.getUserInfo(function (result) {
                    window.cesc.loginUserName = result.name;
                    window.cesc.loginName = result.loginName;
                    window.cesc.userRole = result.roles[0].name;
                    eventHelper.emit('getLoginName',window.cesc.loginUserName);
                });
                window.cesc.userName = this.userName;
                console.log('Login Success:'+ token);
                storage.setItem('userName', this.userName); // Pass a key name to get its value.
                storage.setItem('password', this.password); // Pass a key name to get its value.
                this.loginComplete = true;
            }.bind(this), function (result) {
                clearTimeout(loginTimeout);
                eventHelper.emit('closeLoading');
                this.loginFail = true;
            }.bind(this));
        }
    },
    mounted: function () {
        // loginCtrl.getCurrentVersion(function (needUpdate) {
        //     this.needUpdate = needUpdate;
        // }.bind(this));
        /* if (navigator.userAgent.toLowerCase().indexOf("chrome") >= 0) {
         $('input:not(input[type=submit])').each(function(){
         var outHtml = this.outerHTML;
         $(this).append(outHtml);
         });
         }*/
    },
    components: {}
});
module.exports = comm;