var template = require('./content.html');
var eventHelper = require('../../utils/eventHelper');

// 定义组件
var comm = Vue.extend({
    template: template,
    data: function () {
        return {
            workBannerImg:'./img/Banner.jpg',
            caseList:[
                {
                    id: 'ajsb',
                    class:'icon-anjianshangbao color-news',
                    text: '巡查上报'
                }, {
                    id: 'xccx',
                    class:'icon-anjianchaxun color-dongtai',
                    text: '巡查查询'
                },
            ],
            contentList: [
                // {
                //     id: 'xwdt',
                //     class:'icon-news color-news',
                //     text: '个人信息'
                // },
                {
                    id: 'clcx',
                    class:'icon-cheliangchaxun color-gonggao',
                    text: '车辆查询'
                }, {
                    id: 'xszcx',
                    class:'icon-yonghushouce color-yhsc',
                    text: '行驶证查询'
                }, {
                    id: 'jszcx',
                    class:'icon-shuizhixinxi color-szxx',
                    text: '驾驶证查询'
                }
            ],
            questionList: [
                {
                    title: '工业废水排放',
                    address: '高青县芦湖公园',
                    solution: '专项检测',
                    people: '许军',
                    date: '2017-9-2',
                    num: 32,
                    count: 15,
                    describe: '工业废水排放',
                    img: 'img/detail-jgds.png'
                }, {
                    title: '建筑废弃物',
                    address: '高青县金都花园西门',
                    solution: '清理',
                    people: '陈红',
                    date: '2017-8-31',
                    num: 26,
                    count: 18,
                    describe: '建筑废弃物',
                    img: 'img/detail-wsyl.jpg'
                }
            ]
        }
    },
    methods: {
        showSub: function (subId, content) {
            if (!!content) {
                eventHelper.emit('openComment', content);
            }
            if (subId === 'upload') {
                eventHelper.emit('change-menu', subId);
                eventHelper.emit('toggleTabClass', subId);
            } else if (subId === 'zcfg' || subId === 'tszs' || subId==='szxx') {
                return;
            } else if(subId === 'ajsb'){
                eventHelper.emit('openSub', subId);
                eventHelper.emit('loadCaseMap');
            }else {
                eventHelper.emit('openSub', subId);
            }
        }
    },
    mounted: function () {
    },
    components: {}
});
module.exports = comm;