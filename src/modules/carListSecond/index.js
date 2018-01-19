var template = require('./content.html');
var eventHelper = require('../../utils/eventHelper');
var echarts = require('echarts');
var arcgisPlugin = require('modules/arcgisPlugin');
var arcgisHelper = require('modules/arcgisPlugin/plugin/arcgisExpand/arcgis-load-map');
var mapHelper = require('utils/mapHelper');
// 定义组件
var comm = Vue.extend({
    template: template,
    data: function () {
        return {
            carDetailList:{
            },
            title:'',
            content:[],
            date:'',
            num:0,
            count:0,
        }
    },
    methods: {
        openrRiversListInfo:function () {

        },
        returnParent:function(){
            eventHelper.emit('returnCarList');
        }
    },
    mounted: function () {
        this.map = arcgisHelper.tdWmtsServer('carMap', '', 108.295906, 22.901796, 14);
        var that = this;
        eventHelper.on('openrCarListInfo',function(itemObj){
            if(!!this.carGraphic){
                mapHelper.removeGraphic(this.carGraphic);
            }
            this.carDetailList = itemObj;
            var x = Number(itemObj.x);
            var y = Number(itemObj.y);
            this.carGraphic = mapHelper.addPoint(that.map,x,y,'./img/icon/car.png',itemObj);
            mapHelper.setCenter(x,y,this.map,14);
        }.bind(this));

    },
    components: {

    }
});
module.exports = comm;