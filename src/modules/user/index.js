var template = require('./content.html');
var eventHelper = require('../../utils/eventHelper');
var userMsgDetail = require('modules/user/userMsgDetail');
var userPasswordChange = require('modules/user/userPasswordChange');
// 定义组件
var comm = Vue.extend({
    template: template,
    data: function () {
        return {
            showUserDetail:false,//是否显示用户信息
            showPwdPanel:false,//是否显示修改密码子页
            userInfo:{
                name:window.cesc.loginUserName,
                role:window.cesc.userRole,
                userPhoto:'./img/user.png'
            },
            isSignIn:true,
            isRegister:false,
            regText:'签到'
        }
    },
    methods: {
        changePassword:function () {
            this.showPwdPanel = true;
        },
        dailyRegister:function(){
            this.isRegister = true;
            this.regText = '已签到'
        },
        signIn:function(){
            this.isSignIn = true;
        },
        signOut:function(){
            this.isSignIn = false;
        }
    },
    mounted: function () {
        eventHelper.on('returnUser',function () {
            this.showUserDetail = false;
            this.showPwdPanel = false;
        }.bind(this))
    },
    components: {
        'user-msg-detail':userMsgDetail,
        'user-password-change':userPasswordChange
    }
});
module.exports = comm;