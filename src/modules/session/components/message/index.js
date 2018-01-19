var template = require('./context.html');
var eventHelper = require('utils/eventHelper');
var facilityService = require('services/facilityService');
var socketHelper = require('utils/socketHelper');
var caseService = require('services/caseService');
var currentUser, sessionUser = {
    name: '大行动办',
    img: './img/chat/user/nnca.png'
};
// 定义组件
var comm = Vue.extend({
    template: template,

    props: ['sessionList', 'user', 'users','enLargeImgShow'],
    data(){
        return {
            locationImage: './img/chat/location.png',
            isLarge:false,//控制图片大小
        }
    },
    computed: {
        // sessionUser () {
        //     let users = this.users.filter(item => item.id === this.session.userId);
        //     return users[0];
        // }
    },
    mounted: function () {
        // console.log('111'+this.session.messages);
        // eventHelper.on('refresh-selected-session',function () {
        //     caseService.getCaseFlowLog(window.caseId, function (flowLogs) {
        //         if (!!this.sessionList && this.sessionList.length == flowLogs.length) {
        //             return;
        //         }
        //         this.sessionList.splice(0, this.sessionList.length);
        //         flowLogs.forEach(function (item) {
        //             item.caseNumber = window.case.number;
        //             if (!!item.x && !!item.y) {
        //                 this.transLocateToQQMap([item.x, item.y], function (result) {
        //                     item.x = result[0].lng;
        //                     item.y = result[0].lat;
        //                 });
        //             }
        //             this.sessionList.push(item);
        //         }.bind(this));
        //
        //     }.bind(this));
        //     setTimeout(function () {
        //         var div = $("#messageBox");
        //         div.scrollTop(div[0].scrollHeight);
        //     }, 1000);
        // }.bind(this));
    },
    methods: {
        //转换坐标在腾讯地图
        transLocateToQQMap: function (lnglatXY, cb) {
            var qqmapKey = "KRNBZ-AR6R5-TCOIE-Q3A4T-6WHBV-7IBRU";
            var url = 'http://apis.map.qq.com/ws/coord/v1/translate?locations=' + lnglatXY[1] + ',' +
                lnglatXY[0] + '&output=jsonp&type=1&key=JZBBZ-FEPWP-MVID6-VNO52-UDDXO-NEBVL';
            console.log('URL:' + url);
            $.ajax({
                type: "get",
                url: url,
                dataType: "jsonp",
                jsonp: "cb",
                data: {},
                success: function (ajaxResult) {
                    cb(ajaxResult.locations);
                }.bind(this)
            });
        },
        //点击案件图片放大
        enlargeCaseImg:function () {
            this.isLarge = !this.isLarge;
            var getFactImgHeight;
            var imgWidth = document.getElementById('caseImage-'+window.caseId).naturalWidth;//图片实际宽度
            var imgHeight = document.getElementById('caseImage-'+window.caseId).naturalHeight;//图片实际宽度
            var windowWidth = $(window).width();//窗口宽度
            getFactImgHeight = (windowWidth/imgWidth) * imgHeight;//按比例的图片高度
            if(this.isLarge){
                $('#caseImage-'+window.caseId).css({
                    'width': '100%',
                    'position': 'absolute',
                    'left': '0',
                    'top':'50%',
                    'margin-top':(-getFactImgHeight/2)+'px',
                    'z-index': '9999'
                });
                eventHelper.emit('controlImg',this.isLarge);
            }else {
                $('#caseImage-'+window.caseId).css({
                    'width': '4rem',
                    'position': 'unset',
                    'left': 'unset',
                    'top':'uset',
                    'margin-top':'0',
                    'z-index': 'unset'
                });
                eventHelper.emit('controlImg',this.isLarge);
            }
        },
        //点击当前图片
        enLargeImg:function (item) {
            this.isLarge = !this.isLarge;
            var getFactImgHeight;
            var imgWidth = document.getElementById('flowImg-'+item.id).naturalWidth;//图片实际宽度
            var imgHeight = document.getElementById('flowImg-'+item.id).naturalHeight;//图片实际宽度
            var windowWidth = $(window).width();//窗口宽度
            getFactImgHeight = (windowWidth/imgWidth) * imgHeight;//按比例的图片高度
            if(this.isLarge){
                $('#flowImg-'+item.id).css({
                    'width': '100%',
                    'position': 'absolute',
                    'left': '0',
                    'top':'50%',
                    'margin-top':(-getFactImgHeight/2)+'px',
                    'z-index': '9999'
                });
                eventHelper.emit('controlImg',this.isLarge);
            }else {
                $('#flowImg-'+item.id).css({
                    'width': '100%',
                    'position': 'unset',
                    'left': 'unset',
                    'top':'uset',
                    'margin-top':'0',
                    'z-index': 'unset'
                });
                eventHelper.emit('controlImg',this.isLarge);
            }

        },
        //获取case图片
        getCaseImage: function () {
            // if (this.session.showImage) {
            //     return;
            // }
            // this.session.showImage = true;
            // var caseId = this.session.emergencyCase.id;
            facilityService.getFacilityUploadImage('case', window.caseId, 1, function (data) {
                //根据不同的设备类型加载不同的信息
                if (!!data && data.length > 0) {
                    var dataUrl = 'data:image/' + data[0].fileExt + ';base64,' + data[0].base64;
                    var id = '#caseImage-' + window.caseId;
                    this.$nextTick(function () {
                        setTimeout(function () {
                            $(id).attr("src", dataUrl);
                            var div = $("#messageBox");
                            if (!!div && div.length > 0) {
                                div.scrollTop(div[0].scrollHeight);
                            }
                        }, 3000);
                    })
                }
            }.bind(this));
        },
        //筛选用户图片
        getImageUrl: function (item) {
            var flowId = item.id;
            facilityService.getFacilityUploadImage('emergency-case', flowId, 1, function (data) {
                //根据不同的设备类型加载不同的信息
                if(!!data && data.length>0){
                    var dataUrl = 'data:image/' + data[0].fileExt + ';base64,' + data[0].base64;
                    var id = '#flowImg-' + flowId;
                    $(id).attr("src", dataUrl);
                }
                this.$nextTick(function () {
                    var div = $("#messageBox");
                    if (!!div && div.length > 0) {
                        div.scrollTop(div[0].scrollHeight);
                    }
                })
            }.bind(this));
        },
        // 筛选出用户头像
        getAvatar (item) {
            setTimeout(function () {
                this.getCaseImage();
            }.bind(this), 1000);
            // console.log(this.sessionList);
            // 如果是自己发的消息显示登录用户的头像
            let user = item.dealUser == 'eadmin' ? sessionUser : this.user;
            if (!!user) {
                return user.img;
            }
        },
    },
    directives: {
        // 发送消息后滚动到底部
        'scroll-bottom' () {
            var div = $('#messageBox');
            if (!!div && div.length > 0) {
                div.scrollTop(div[0].scrollHeight);
            }
        }
    }
});
module.exports = comm;