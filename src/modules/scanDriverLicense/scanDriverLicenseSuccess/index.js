var template = require('./content.html');
var eventHelper = require('utils/eventHelper');
var detailInfo = require('modules/detailInfo');

// 定义组件
var comm = Vue.extend({
    template: template,
    data: function () {
        return {
            showDetailInfo:false,
            // updateNewArr:{}
            //驾驶员行驶证信息
            driverInfo:[{
                title:'证芯编号',
                value:'证芯编号'
            },{
                title:'	姓名',
                value:'	姓名'
            },{
                title:'身份证号',
                value:'身份证号'
            },{
                title:'	性别',
                value:'	性别'
            },{
                title:'	准驾车型',
                value:'	准驾车型'
            },{
                title:'	档案编号',
                value:'	档案编号'
            },{
                title:'	状态',
                value:'	状态'
            },{
                title:'	有效期至',
                value:'	有效期至'
            },{
                title:'	状态',
                value:'	状态'
            }],
        }
    },
    methods: {
        returnMain:function(){
            // eventHelper.emit('closeQuestion');
            //10.14新增
            eventHelper.emit('returnBack');
            // eventHelper.emit('closeUploadBtn');

        },
    },
    mounted: function () {

    },
    components: {
        'detail-info':detailInfo
    }
});
module.exports = comm;