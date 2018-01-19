var template = require('./content.html');
var eventHelper = require('utils/eventHelper');
var caseService = require('services/caseService');
var alarmService = require('services/alarmService');
// var appSumitEnd = require('modules/appSumitEnd');
var serviceHelper = require('services/serviceHelper.js');
var mapHelper = require('utils/mapHelper');
var mathUtils = require('utils/mathUtils');
var facilityService = require('services/facilityService');

var pi = 3.1415926535897932384626;
var ee = 0.00669342162296594323;
var a = 6378245.0;

// 定义组件
var comm = Vue.extend({
    template: template,
    data: function () {
        return {
            facilityName:'',
            facilityList:[],
        }
    },
    methods: {
        //返回上一页
        returnBack: function () {
            eventHelper.emit('openSub');
            eventHelper.emit('change-menu','upload');
        },

    },
    mounted: function () {
        eventHelper.on('openFacilityList',function (item) {
            var self = this;
            this.facilityName = item.name;
            var facilityTypeName;
            switch (item.fid){
                case 38:
                    facilityTypeName = 'CS';
                    break;
                case 39:
                    facilityTypeName = 'SQ';
                    break;
                case 40:
                    facilityTypeName = 'DS';
                    break;
                case 41:
                    facilityTypeName = 'CMP';
                    break;
            }
            facilityService.getFacilityDetailByTypeName(facilityTypeName, function (data) {
                facilityService.getFacilityDetail(item.id, function (messages) {
                    self.facilityList.splice(0,self.facilityList.length);
                    data.facilityRelates.sort(function (a, b) {
                        return a.sort > b.sort ? 1 : -1;
                    });
                    for (var i = 0; i < data.facilityRelates.length; i++) {
                        if (data.facilityRelates[i].display == 1) {
                            self.facilityList.push({
                                name: data.facilityRelates[i].nameCn,
                                value: messages[data.facilityRelates[i].name]
                            })
                        }
                    }
                }.bind(this));
            }.bind(this));
        }.bind(this));
    },
    components: {
    }
});
module.exports = comm;