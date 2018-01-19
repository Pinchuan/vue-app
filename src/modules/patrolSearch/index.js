var template = require('./content.html');
var eventHelper = require('utils/eventHelper');
var mapHelper = require('utils/mapHelper');
var echarts = require('echarts');
var serviceHelper = require('services/serviceHelper');
var patrolSearchDetail = require('modules/patrolSearch/patrolSearchDetail');
var caseService = require('services/caseService');

// 定义组件
var comm = Vue.extend({
    template: template,
    data: function () {
        return {
            noMoreData:false,//控制下滚的开关
            showPatrolSearchDetail:false,//是否显示详细信息
            caseLists:[],//案件列表
            // carNum:'',//车辆号码查询
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
        openrDetail:function(item,index){
            this.showPatrolSearchDetail = true;
            this.$refs.patrolSearchDetail.open(item);
            // console.log(new BScroll('.wrapper',{}));
            // var itemObj = {};
            // carService.getTruckInfoList(item.terminalNum,function (data) {
            //     self.showCarListSecond = true;
            //     item.direction = data.direction;
            //     item.speed = data.speed;
            //     item.lastTime = data.lastTime;
            //     item.x = data.x;
            //     item.y = data.y;
            //     eventHelper.emit('openrCarListInfo',item);
            //     self.$dialog.toast({
            //         mes: '加载成功！',
            //         timeout: 1500,
            //         icon: 'success'
            //     });
            // },function (error) {
            //     console.log(error);
            //     self.$message({
            //         message:'加载失败，请检查你的网络',
            //         type:'error'
            //     });
            // })

        },
        // //按搜索条件搜索对应车辆
        // searchCarByCarNum:function () {
        //     this.noMoreData = false;
        //     if(this.carNum ===''){
        //         this.truckList.splice(0,this.truckList.length);
        //         this.pageNumber = 0;
        //         this.loadCarList();
        //     }else {
        //         this.pageNumber = 0;
        //         this.truckList.splice(0,this.truckList.length);
        //         this.loadCarList();
        //     }
        //
        // },
        loadCarList:function () {
            // var self = this;
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
            // self.caseLists.splice(0,self.caseLists.length);
            this.loading = true;
            this.time = setTimeout(() => {
                caseService.getAllCase(self.pageNumber, 6,window.cesc.loginName, function (data) {
                    console.log(window.cesc.loginName);
                    if(data.records.length === 0){
                        self.loading = false;
                    }else{
                        data.records.forEach(function (record) {
                            self.caseLists.push({
                                createDate:record.createDate,
                                createType:record.createType,
                                createUser:record.createUser,
                                id:record.id,
                                category:record.category,
                                level:record.level,
                                number:record.number,
                                name:record.name,
                                x:record.x,
                                y:record.y,
                                location:record.location
                            });
                        });
                        // console.log(self.caseLists);
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
        eventHelper.on('returnPatrolSearch',function(){
            this.showPatrolSearchDetail = false;
        }.bind(this));
        eventHelper.on('openChildren',function (subId) {
            if(subId === 'xccx')
                this.loadCarList();
        }.bind(this));

    },
    components: {
        'patrol-search-detail':patrolSearchDetail
    }
});
module.exports = comm;