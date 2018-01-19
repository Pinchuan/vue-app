var template = require('./content.html');
var eventHelper = require('utils/eventHelper');

// 定义组件
var comm = Vue.extend({
    template: template,
    data: function () {
        return {
            userInfo:{
                name:'余学华',
                role:'司机',
                userPhoto:'./img/user.png'
            },
            isSignIn:true,
            isRegister:false,
            regText:'签到'
        }
    },
    methods: {
        returnParent:function () {

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
    },
    components: {}
});
module.exports = comm;