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
                title:'行驶证编号',
                value:'行驶证编号'
            },{
                title:'号牌种类',
                value:'号牌种类'
            },{
                title:'	号牌号码',
                value:'	号牌号码'
            },{
                title:'	车辆类型',
                value:'	车辆类型'
            },{
                title:'	使用性质',
                value:'	使用性质'
            },{
                title:'	所有人',
                value:'	所有人'
            },{
                title:'	状态',
                value:'	状态'
            },{
                title:'	检验有效期',
                value:'	检验有效期'
            },{
                title:'	强制报废期',
                value:'	强制报废期'
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