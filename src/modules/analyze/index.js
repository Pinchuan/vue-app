var template = require('./content.html');
var eventHelper = require('../../utils/eventHelper');
var mapHelper = require('utils/mapHelper');
var echarts = require('echarts');
var serviceHelper = require('services/serviceHelper');
var carListSecond = require('modules/carListSecond');
var carService = require('services/carService');
// var BScroll = require('better-scroll').default;
// import BScroll from 'better-scroll'

// 定义组件
var comm = Vue.extend({
    template: template,
    data: function () {
        return {
            noMoreData:false,//控制下滚的开关
            showCarListSecond:false,
            truckList:[],//车辆列表
            carNum:'',//车辆号码查询
            message: 'Vue Module Seed',
            loading:false,//控制加载gif开关
            pageNumber:0,//车辆页码
        }
    },
    methods: {
        //返回首页
        returnHome:function(){
            eventHelper.emit('openSub');
        },
        //获取自定义查询条件（如果默认的从界面获取保存的值不满足需求，可以重写此方法，自定义获取值）
        getCustomQueryParam: function () {
            return null;
        },
        openrCarsListInfo:function(item,index){
            var self = this;
            // console.log(new BScroll('.wrapper',{}));
            var itemObj = {};
            carService.getTruckInfoList(item.terminalNum,function (data) {
                self.showCarListSecond = true;
                item.direction = data.direction;
                item.speed = data.speed;
                item.lastTime = data.lastTime;
                item.x = data.x;
                item.y = data.y;
                eventHelper.emit('openrCarListInfo',item);
                self.$dialog.toast({
                    mes: '加载成功！',
                    timeout: 1500,
                    icon: 'success'
                });
            },function (error) {
                console.log(error);
                self.$message({
                    message:'加载失败，请检查你的网络',
                    type:'error'
                });
            })

        },
        //按搜索条件搜索对应车辆
        searchCarByCarNum:function () {
            this.noMoreData = false;
            if(this.carNum ===''){
                this.truckList.splice(0,this.truckList.length);
                this.pageNumber = 0;
                this.loadCarList();
            }else {
                this.pageNumber = 0;
                this.truckList.splice(0,this.truckList.length);
                this.loadCarList();
            }

        },
        loadCarList:function () {
            var name= this.carNum;
             this.noMoreData = true;
            if(!!this.time){
                clearTimeout(this.time);
            }
            if(name == undefined){
                name = "";
            }
            var self = this;
            this.pageNumber++;
            // self.truckList.splice(0,self.truckList.length);
            this.loading = true;
            console.log('run outer');
            this.time = setTimeout(() => {
                console.log('run');
                carService.getTruckListMsg(self.pageNumber, 10, name, function (data) {
                    console.log('query');
                    if(data.records.length === 0){
                        // self.noMoreData = true;
                        self.loading = false;
                      //  self.noMoreData = true;
                    }else{
                        data.records.forEach(function (record) {
                            self.truckList.push({
                                truckNum:record.truckNum,
                                company:record.company,
                                terminalNum:record.terminalNum,
                                id:record.id,
                                inBlackList:record.inBlackList,
                                driver:record.driver,
                                licenseType:record.licenseType,
                                breakRule:record.breakRule,
                                truckType:record.truckType,
                                display:record.display
                            });
                        });
                        self.noMoreData = false;
                    }
                    self.loading = false;
                }, function (error) {
                    console.log(error);
                    self.$message({
                        message: '加载失败，请检查你的网络',
                        type: 'error'
                    });
                });
                //
            }, 1000);

        }
    },
    mounted: function () {
        eventHelper.on('returnCarList',function(){
            this.showCarListSecond = false;
        }.bind(this));
        eventHelper.on('openChildren',function (subId) {
            if(subId === 'clcx')
                this.loadCarList();
        }.bind(this));

    },
    components: {
        carListSecond:carListSecond
    }
});
module.exports = comm;