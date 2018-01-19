var template = require('./rightPanel.html');
var eventHelper = require('utils/eventHelper');
var store = require('./components/store');
// var card = require('./components/card');
// var list = require('./components/list');
var caseService = require('services/caseService');
var text = require('./components/text');
var message = require('./components/message');
var socketHelper = require('utils/socketHelper');
// 定义组件
var comm = Vue.extend({
    template: template,
    data: function () {
        let serverData = store.fetch();
        return {
            sessionTitle:'事件日志列表',
            chatImg:'./img/chat/user/header.png',//头像图片
            showCaseSession: true,
            activeIndex: "1",
            //点击链接获取case信息对象
            // caseInfo:{},
            // 登录用户
            user: {
                userId: '',
                name: '',
                img: './img/chat/user/header.png'
            },
            // user:serverData.user,
            // 用户列表
            users: serverData.userList,
            // 会话列表
            sessionList: [],
            //事件列表
            caseList:[],
            //测试事件列表对象
            newCaseList:[],
            // 搜索key
            search: '',
            session:{},
            // 选中的会话Index
            sessionIndex: 0,
            caseId:'',
            //对话内容对象
            // session:{}
            enLargeImgShow: false,
        }
    },
    methods: {
        //返回列表页
        returnMain:function () {
            this.showCaseSession = true;
            this.sessionTitle = '事件日志列表';
            eventHelper.emit('closeUploadBtn');
        },
        //搜索案件（暂时不做此功能）
        searchCase:function () {
            caseService.getCaseByNumber(this.search, function (data) {
                if (!!data) {
                    // eventHelper.emit('refresh-case', data)
                }
            })
        },
        select:function (item) {
            // this.selectedCase = item.emergencyCase.id;
            this.showCaseSession = false;
            this.sessionTitle = item.emergencyCase.name;
            eventHelper.emit('openUploadBtn');
            window.caseId = item.emergencyCase.id;
            this.sessionList = item.flows;
            setTimeout(function () {
                var div = $("#messageBox");
                if (!!div && div.length > 0) {
                    div.scrollTop(div[0].scrollHeight);
                }
            }.bind(this), 1000);
        },
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
        getOrgCaseByLoginName:function (userName) {
            caseService.getOrgCaseByLoginName('zhangmc',function (data) {
                data.forEach(function (item) {
                    caseService.getCaseFlowLog(item.id, function (flowLogs) {
                        //关联列表与对话日志，用一个数组将它封装起来
                        this.newCaseList.push({
                            emergencyCase: item,
                            flows: flowLogs
                        });
                        //连接websocket后台
                        socketHelper.subscribeQueue('/case/caseFlowLogStream/' + item.id, function (response) {
                            var flowLog = response.flowLog;
                            var caseId = response.flowLog.caseId;
                            if (flowLog.x !=0 && flowLog.y !=0) {
                                this.transLocateToQQMap([flowLog.x, flowLog.y], function (result) {
                                    flowLog.x = result[0].lng;
                                    flowLog.y = result[0].lat;
                                });
                            }
                            for(var i=0;i<this.newCaseList.length;i++){
                                if(this.newCaseList[i].emergencyCase.id == caseId){
                                    this.newCaseList[i].flows.push(flowLog);
                                }
                                if(window.caseId == caseId){
                                    this.sessionList = this.newCaseList[i].flows;
                                }
                            }
                            // this.sessionList.push(flowLog);
                            setTimeout(function () {
                                var div = $("#messageBox");
                                if (!!div && div.length > 0) {
                                    div.scrollTop(div[0].scrollHeight);
                                }
                            }.bind(this), 1000);
                        }.bind(this));
                    }.bind(this));

                }.bind(this));

            }.bind(this));
        },
    },
    mounted: function () {
        // eventHelper.on('change-selected-session', function (selectedCaseIndex) {
        //     this.sessionIndex = selectedCaseIndex;
        //     this.session = this.sessionList[selectedCaseIndex];
        // }.bind(this));
        // eventHelper.on('refresh-selected-session', function () {
        //     // this.getFlowLogByCaseId();
        // }.bind(this));
        this.user.userId = window.cesc.loginName;
        this.user.name = window.cesc.loginUserName;
        this.getOrgCaseByLoginName();

        // this.getFlowLogByCaseId();
        eventHelper.on('controlImg', function (isLarge) {
            this.enLargeImgShow = isLarge;//同步图片是否放大
        }.bind(this));
    },
    computed: {
        // session () {
        //     return this.sessionList[this.sessionIndex];
        // }
    },
    watch: {},
    components: {
        'mText': text,
        'message': message,
        // 'card':card,
        // 'list':list
    },

});
module.exports = comm;