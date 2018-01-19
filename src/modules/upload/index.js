var template = require('./content.html');
var eventHelper = require('../../utils/eventHelper');
var moduleController = require('controllers/moduleController');
//加载地图组件
var arcgisPlugin = require('modules/arcgisPlugin');
var arcgisHelper = require('modules/arcgisPlugin/plugin/arcgisExpand/arcgis-load-map');
var mapHelper = require('utils/mapHelper');
var facilityService = require('services/facilityService');
var GraphicsLayer = cesc.require("esri/layers/GraphicsLayer");
// 定义组件
var comm = Vue.extend({
    template: template,
    data: function () {
        return {
            showFacilityDetail:false,//是否显示设备详细情况
            //图例说明列表
            legendList:[{
                title:'消纳场',
                icon:'consumptive'
            },{
                title:'工地',
                icon:'buliding-video'
            },{
                title:'采石场',
                icon:'stonePit-video'
            },{
                title:'混凝土搅拌站',
                icon:'jetereting-video'
            }],
            showList:false,//是否显示列表
            isShowList:false,//是否显示污染列表
            pollutionList:[],//污染源的表单
            isShow:false,//是否展示搜索表单
            //污染源下拉列表
            facilityTypeIds:[],
            //所在区下拉列表
            areas: [{
                value: '',
                label: ''
            }, {
                value: '青秀区',
                label: '青秀区'
            }, {
                value: '兴宁区',
                label: '兴宁区'
            }, {
                value: '江南区',
                label: '江南区'
            }, {
                value: '良庆区',
                label: '良庆区'
            }, {
                value: '邕宁区',
                label: '邕宁区'
            }, {
                value: '高新区',
                label: '高新区'
            }],
            address: '',//搜索地址
            pollutionSource: '',//污染源搜索
            district: '',//所在区搜索
            searchPoint:'',//搜索测站输入框
            locationTips: false,
            locationStatus: '',
            dialogFormVisible: false,
            graphicLayer:new GraphicsLayer(),//创建图层
            isOpen:false,
        }
    },

    methods: {
        //显示或者隐藏legend
        openLegend:function () {
            this.isOpen = !this.isOpen;
        },
        //显示污染点在地图所在位置
        showPointInMap(item){
            this.showList = false;
            mapHelper.addCircleSymbol(this.map,item.x,item.y,40,[0, 0, 0,0]);
            mapHelper.setCenter(item.x,item.y,this.map,14);
        },
        //查询污染源点
        searchPollutionPoint:function () {
            this.isShow = false;
            this.showList = true;
            var self = this;
            self.pollutionList.splice(0,self.pollutionList.length);
            facilityService.getFacilityLists(self.address, self.pollutionSource, self.district, function (result) {
                result.records.forEach(function (value) {
                    //只加载污染点（消纳场，工地，采石场，混凝土搅拌站）
                    if(value.facilityTypeIdValue===40 || value.facilityTypeIdValue===38 || value.facilityTypeIdValue===39 || value.facilityTypeIdValue===41){
                        self.pollutionList.push({
                            name: value.name,
                            typeName:value.facilityTypeId,
                            fid: value.facilityTypeIdValue,
                            id:value.id,
                            x: value.x,
                            y: value.y
                        });
                    }
                })
            });
        },
        //显示搜索下拉列表
        showSeachForm:function () {
            this.showList = false;
            this.isShow = true;
        },
        hideSeachForm:function () {
            this.isShow = false;
        },
        addNewPoint: function () {
            this.$toast({
                message: '请点击问题点',
                position: 'middle',
                duration: 1000
            });
            this.isAddingPoint = true;
        },
        query: function () {
            this.$toast({
                message: '查看问题点',
                position: 'middle',
                duration: 1000
            });
        },
        //定位
        getLocation: function () {
            var self = this;
            var options = {
                enableHighAccuracy: true,
                maximumAge: 1000
            }
            //浏览器支持geolocation
           navigator.geolocation.getCurrentPosition(function (position) {
                //返回用户位置
                //经度
                var longitude = position.coords.longitude;
                //纬度
                var latitude = position.coords.latitude;

                var lnglatXY = [longitude, latitude];
                mapHelper.setCenter(longitude,latitude,self.map,13);
                mapHelper.createSymbolNew(self.map,longitude, latitude,'./img/location.png',25,25);
                //获取用户位置范围信息
                mapHelper.addPositionCircle(self.map,longitude,latitude,60);
                //高德GCJ转WGS84
                this.x = newLnglatXY[0];
                this.y = newLnglatXY[1];
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

        },
        initPulltionList:function () {
            var self =this;
            self.pollutionList.splice(0,self.pollutionList.length);
            facilityService.getFacilityLists('', '', '', function (result) {
                result.records.forEach(function (value) {
                    //只加载污染点（消纳场，工地，采石场，混凝土搅拌站）
                    if(value.facilityTypeIdValue===40 || value.facilityTypeIdValue===38 || value.facilityTypeIdValue===39 || value.facilityTypeIdValue===41){
                        self.pollutionList.push({
                            name: value.name,
                            typeName:value.facilityTypeId,
                            fid: value.facilityTypeIdValue,
                            id:value.id,
                            x: value.x,
                            y: value.y
                        });
                    }
                });
                self.pollutionList.forEach(function (item) {
                    if(item.fid ===38)
                            mapHelper.createNewPoint(self.graphicLayer,self.map,item.x,item.y,'./img/toolbar/buliding-video.png',25,25,item);
                    if(item.fid ===39)
                            mapHelper.createNewPoint(self.graphicLayer,self.map,item.x,item.y,'./img/toolbar/stonePit-video.png',25,25,item);
                    if(item.fid ===40)
                            mapHelper.createNewPoint(self.graphicLayer,self.map,item.x,item.y,'./img/toolbar/consumptive.png',25,25,item);
                    if(item.fid ===41)
                            mapHelper.createNewPoint(self.graphicLayer,self.map,item.x,item.y,'./img/toolbar/jetereting-video.png',25,25,item);

                });
                self.graphicLayer.on('click', function (evt) {
                    console.log(123);
                    console.log(evt.graphic.attributes);
                    eventHelper.emit('openFacilityList',evt.graphic.attributes);
                    eventHelper.emit('openSub', 'facility');
                })
                self.map.addLayer(self.graphicLayer,5);
            });
        }
    },
    mounted: function () {
        eventHelper.on('returnBack',function(){
            this.showFacilityDetail = false;
        }.bind(this));
        // var mapObj = new AMap.Map('iCenter');
        var self = this;
        this.initPulltionList();
        eventHelper.on('loadPollutionSite',function(){
           this.initPulltionList();
        }.bind(this));
        //self.map = mapHelper.initGaoDeServer('mainMap', '', 113.333542, 23.122644, 14);
        self.map = arcgisHelper.tdWmtsServer('mainMap', '', 108.324654, 22.736688, 12);
        self.map.hideZoomSlider();
        // mapHelper.createSymbolNew(self.map,108.324654, 22.736688,'./img/location.png',25,25);
        // mapHelper.addMarkSymbolByDistance(self.map, 108.324654, 22.736688);
        //定位，获取用户位置
        this.getLocation();
        //返回设备类型，填充到搜索下拉列表
        facilityService.getFacilityType(function (result) {
            self.facilityTypeIds = [{label: "", value: ""}].concat(result.facilityTypeIds);
        })
    },
    components: {
        'arcgis-plugin': arcgisPlugin,
    }
});
module.exports = comm;