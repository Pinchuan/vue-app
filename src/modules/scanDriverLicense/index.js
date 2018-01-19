var template = require('./content.html');
var eventHelper = require('../../utils/eventHelper');
var scanDriverLicenseSuccess = require('modules/scanDriverLicense/scanDriverLicenseSuccess');

// 定义组件
var comm = Vue.extend({
    template: template,
    data: function () {
        return {
            searchLicenseId:'',//行驶证id
            showScanSuccessDetail:false,//是否显示扫描成功子页面
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
            }],
        }
    },
    methods: {
        //输入行驶证id进行搜索
        searchMsgByLicenseId:function () {
            //打开成功扫描信息子页面
            this.showScanSuccessDetail = true;
        },
        //扫描二维码/条形码
        scanCode:function () {
            var self =this;
            //打开成功扫描信息子页面
            this.showScanSuccessDetail = true;
            cordova.plugins.barcodeScanner.scan(
                function (result) {
                    alert("We got a barcode\n" +
                        "Result: " + result.text + "\n" +
                        "Format: " + result.format + "\n" +
                        "Cancelled: " + result.cancelled);
                },
                function (error) {
                    alert("Scanning failed: " + error);
                }
            );
        },
        returnMain:function(){
            // eventHelper.emit('closeQuestion');
            //10.14新增
            eventHelper.emit('openSub');
            eventHelper.emit('closeUploadBtn');

        },
    },
    mounted: function () {
        eventHelper.on('returnBack',function(){
            this.showScanSuccessDetail = false;
        }.bind(this));
    },
    components: {
        'scan-driver-license-success':scanDriverLicenseSuccess
    }
});
module.exports = comm;