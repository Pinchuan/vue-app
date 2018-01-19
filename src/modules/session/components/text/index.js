var template = require('./context.html');
var eventHelper = require('utils/eventHelper');
var caseService = require('services/caseService');
var caseFlowModel = require('controllers/model/caseFlow');
var serviceHelper = require('services/serviceHelper');
var moment = require('moment');
// 定义组件
var comm = Vue.extend({
    template: template,
    data () {
        return {
            //上传的路径
            uploadUrl: serviceHelper.getBasicPath() + '/uploadFile/batchUploadFile',
            uploadParm: {},//上传参数
            uploadFiles: [],//上传文件
            text: '',
            showSendBtn:false,//是否显示发送按钮
            disableText:false,//是否文字信息，false就是文字信息，true是坐标信息
        };
    },
    methods: {
        //逆地理解析坐标点
        searchResult: function (lat,lng){
            //var qqmapKey = "SXTBZ-QNDCG-YYOQZ-IX4IG-DESD6-XGF45";
            var qqmapKey = "KRNBZ-AR6R5-TCOIE-Q3A4T-6WHBV-7IBRU";
            // 调用腾讯地图api获取地址
            // 由于跨域限制，需要用jsonp方式访问
            url = "http://apis.map.qq.com/ws/geocoder/v1/?location=" + lat
                + "," + lng + "&key=" + qqmapKey
                + "&coord_type=1&output=jsonp";

            console.log("URL:"+url);

            $.ajax({
                type : "get",
                url : url,
                dataType : "jsonp",
                jsonp : "cb",
                data : {},
                success : function(ajaxResult) {
                    console.log(ajaxResult.result.formatted_addresses.recommend);
                    this.text = ajaxResult.result.formatted_addresses.recommend;
                    this.showSendBtn = true;
                    this.disableText = true;
                }.bind(this)
            });
        },
        //定位
        getLocation: function () {
            let self = this;
            var options = {
                enableHighAccuracy: true,
                maximumAge: 1000
            }
            if (navigator.geolocation) {
                //浏览器支持geolocation
                // navigator.geolocation.getCurrentPosition(onSuccess, onError, options);
                navigator.geolocation.getCurrentPosition(function (position) {
                    //返回用户位置
                    //经度
                    var longitude = position.coords.longitude;
                    //纬度
                    var latitude = position.coords.latitude;
                    this.searchResult(latitude,longitude);
                    this.x = longitude;
                    this.y = latitude;
                }.bind(this), function (error) {
                    switch (error.code) {
                        case 1:
                            alert("位置服务被拒绝");
                            break;

                        case 2:
                            alert("暂时获取不到位置信息");
                            break;

                        case 3:
                            alert("获取信息超时");
                            break;

                        case 4:
                            alert("未知错误");
                            break;
                    }
                }, options);

            } else {
                //浏览器不支持geolocation
                self.$message({
                    duration: 1000,
                    message: '浏览器不支持获取当前位置',
                    type: 'error'
                });
            }
        },
        //撤销文件
        remove(file, fileList) {
            if (fileList.length > 0) {
                this.disableText = true;
            } else {
                this.disableText = false;
            }
        },
        //图片上传失败回调函数
        error: function (error) {
            console.log(error)
        },
        //文件上传file改变触发
        change: function (file, fileList) {
            if(fileList.length>0){
                caseService.createEmFlowLog(window.caseId,caseFlowModel.flowContentType.image,[],this.text,window.cesc.loginName,1, '', '', moment().format('YYYY-MM-DD HH:mm:ss'),function (flowId) {
                    this.uploadImage(flowId);
                }.bind(this));
            }
            this.newUpload = true;
        },
        //图片上传成功回调函数
        success: function (data) {
            this.disableText = false;
            this.uploadFiles.splice(0, this.uploadFiles.length)
            // eventHelper.emit('refresh-selected-session');
            this.$refs.upload.clearFiles();
            this.newUpload = false;
        },
        //输入框有值时，显示发送按钮
        changeInput:function () {
            if(!!this.text){
                this.showSendBtn = true;
            }else {
                this.showSendBtn = false;
            }
        },
        beforeUpload:function(){
            // this.$refs.upload.submit();
        },
        //上传图片方法
        uploadImage: function (bizId) {
            this.uploadParm.bizType = "emergency-case";
            this.uploadParm.bizId = bizId;
            this.uploadParm.token = serviceHelper.getToken();
            this.uploadParm.r = Math.random();
            this.$refs.upload.submit();
        },
        sendMsg:function() {
            if (this.disableText) {//发送的是坐标信息
                caseService.createEmFlowLog(window.caseId,caseFlowModel.flowContentType.location,[],this.text,window.cesc.loginName,1, this.x, this.y, moment().format('YYYY-MM-DD HH:mm:ss'),function (result) {
                    // eventHelper.emit('refresh-selected-session');
                });
            }else {//发送的是文字信息
                caseService.createEmFlowLog(window.caseId,caseFlowModel.flowContentType.text,[],this.text,window.cesc.loginName,1, '', '', moment().format('YYYY-MM-DD HH:mm:ss'),function (result) {
                    // eventHelper.emit('refresh-selected-session');
                });
            }
            //恢复初始化状态
            this.disableText = false;
            this.showSendBtn = false;
            this.text = '';
        }
    }
});
module.exports = comm;