var template = require('./content.html');
var mainView = require('modules/mainView');
// var newsCenter = require('modules/newsCenter');
var comment = require('modules/comment');
var draftDetail = require('modules/draftDetail');
// var uploadDetail = require('modules/uploadDetail');
var drivingLicenseSearch = require('modules/drivingLicenseSearch');
var analyze = require('modules/analyze');
var patrolSearch = require('modules/patrolSearch');
var appCaseReport = require('modules/appCaseReport');
var scanDriverLicense = require('modules/scanDriverLicense');
var facilityDetail = require('modules/upload/facilityDetail');
var caseService = require('services/caseService');
var socketHelper = require('utils/socketHelper');
// 定义组件
var comm = Vue.extend({
    template: template,
    data: function () {
        return {
            selected:'home',
            showUpLoadBtn:false,
            showMain:true,
            showSubId:'',
            footerArr:[{
                    id:'home',
                    class:'icon-gongzuo',
                    text:'首页'
                },{
                id:'session',
                class:'icon-session',
                text:'突发事件'
            },{
                id:'upload',
                class:'icon-yizhangtu',
                text:'资源信息'
            },
                {
                    id:'user',
                    class:'icon-wode',
                    text:'个人信息'
                }
            ]
        }
    },
    watch:{
        selected:function(data){
            eventHelper.emit('change-menu',data);
        }
    },
    methods: {
        //逆地理解析坐标点(登录后把地址坐标等传入后台）
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
                    this.currentPosition = ajaxResult.result.formatted_addresses.recommend;
                    caseService.getUserCurrentPosition(window.loginName,this.x,this.y,this.currentTime,this.currentPosition,'enforceLaw','',function (result) {debugger
                        // caseService.createEmFlowLog(window.caseId,3,[],'我已上线',window.loginName,1, '', '', moment().format('YYYY-MM-DD HH:mm:ss'),function (result) {
                        //     eventHelper.emit('refresh-selected-session');
                        // });
                    }.bind(this));
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
                    this.x = longitude;
                    this.y = latitude;
                    this.searchResult(latitude,longitude);
                }.bind(this), function (error) {
                    //获取地址失败时调用，演示用
                    caseService.getUserCurrentPosition(window.loginName,'108.3621755002594','22.81101584643331',this.currentTime,'南宁市清秀区金湖广场','enforceLaw','',function (result) {
                        // caseService.createEmFlowLog(window.caseId,3,[],'我已上线',window.loginName,1, '', '', moment().format('YYYY-MM-DD HH:mm:ss'),function (result) {
                        //     eventHelper.emit('refresh-selected-session');
                        // });
                    }.bind(this));
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
                }.bind(this), options);

            } else {
                //浏览器不支持geolocation
                self.$message({
                    duration: 1000,
                    message: '浏览器不支持获取当前位置',
                    type: 'error'
                });
            }
        },
    },
    mounted: function () {
        eventHelper.on('loginSuccess', function (userInfo) {
            this.isLoginSuccess = true;
            console.log(userInfo);
            socketHelper.getInstance(userInfo).then(function (client) {
                eventHelper.emit('websocket-connected');
            });
            this.getLocation();
        }.bind(this));
        document.addEventListener("deviceready", onDeviceReady, false);// PhoneGap加载完毕
        function onDeviceReady() {
            document.addEventListener("backbutton", eventBackButton, false); //按钮事件,返回键
        }
        //返回键
        function eventBackButton(){
            showConfirm();
        }
        // callback function
        function onConfirm(button) {
            // 如果选择按钮1，执行下面方法
            if (button === 1){
                document.removeEventListener("backbutton", eventBackButton, false);//注销返回键
                navigator.app.exitApp();//退出app程序
            }
        }
        // PhoneGap Notification 提供的 Confirm API
        function showConfirm() {
            navigator.notification.confirm(
                '您确定要退出程序吗？',     // message
                onConfirm,            // callback function
                '退出程序',               // title
                '确定,取消'              // confirm 選項，用逗號隔開
            );
        }
        eventHelper.on('openUploadBtn',function(){
            this.showUpLoadBtn = true;
        }.bind(this));
        eventHelper.on('closeUploadBtn',function(){
            this.showUpLoadBtn = false;
        }.bind(this));
        eventHelper.on('openSub',function(subId){
            if(this.showMain || !!subId){
                this.showMain = false;
                this.showSubId = subId;
                eventHelper.emit('openChildren',subId);
            }else{
                this.showMain = true;
            }
            if(subId === 'wdsb'|| subId === 'trsb'){
                eventHelper.emit('openUploadDetail',subId);
            }
        }.bind(this));
        eventHelper.on('toggleTabClass',function(subId){
            this.selected = subId;
        }.bind(this));
    },
    components: {
        'main-view':mainView,
        'comment':comment,
        'draft-detail':draftDetail,
        // 'upload-detail':uploadDetail,
        'driving-license-search':drivingLicenseSearch,
        'scan-driver-license':scanDriverLicense,
        'analyze':analyze,
        'app-case-report':appCaseReport,
        'facility-detail':facilityDetail,
        'patrol-search':patrolSearch
    }
});
module.exports = comm;