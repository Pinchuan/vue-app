var template = require('./content.html');
var eventHelper = require('utils/eventHelper');

// 定义组件
var comm = Vue.extend({
    template: template,
    data: function () {
        return {
            // updateNewArr:{}
            //驾驶员行驶证信息
        }
    },
    methods: {
        returnParent:function(){
            //10.14新增
            eventHelper.emit('returnUser');
        },
        changePwd:function () {
            
        }
    },
    mounted: function () {

    },
    components: {

    }
});
module.exports = comm;