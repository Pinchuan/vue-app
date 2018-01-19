define(['config'], function (config) {
    var userToken = '';
    var basicUrl = config.basicURL;
    var serviceEndpoint = {
        basicPath: basicUrl,
        login: basicUrl + '/login/loginValid',
        socketEndpoint: basicUrl + '/endpointMain',
        // createCase:basicUrl+'/case/createCase',
        userMenu: basicUrl + '/user/getMenu',
        makeOrder: basicUrl + '/orders/save',
        queryMenu: basicUrl + '/orders/menu',
        queryEmployee: basicUrl + '/employee',
        refreshToken: basicUrl + 'login/updateToken',
        queryOrder: basicUrl + '/orders/query',
        facilityList: basicUrl + '/facility/getAllFacilitysType',
        getCarList:basicUrl+'/truck/getTruckList',
        getFacilityByType:basicUrl+'/facility/getOneTypeFacilitys',
        getFacilityDetail:basicUrl+'/facility/getOneFacilityInfo',
        getHistoricalDate:basicUrl+'/dataHistory/getDataHistoryByItemId',
        deviceDetail:basicUrl+'/device/getDeviceInfosByFacilityId',
        monitorRealTimeValue:basicUrl+'dataReal/getDataRealByItemIds',
        getCarHistoryCount:basicUrl+'/truck/getTruckHistoryTrackCount',
        getMonitorDetail:basicUrl+'/facility/getOneFacilityInfo',
        getFacilityFieldById: basicUrl + '/facilityType/getFacilityFieldByFacilityTypeId',
        getFacilityDetailByTypeName: basicUrl + "/facilityType/getFacilityFieldByFacilityTypeName",
        getFacilityList:basicUrl+'/facility/list',
        formatLocation: basicUrl + '/coordTrans/wgs84ToGz',
        getTruckInfo:basicUrl + '/truck/getTruckInfo',
        getTruckList:basicUrl + '/truck/list',
        createAlarm:basicUrl+'/alarm/createAlarm',
        createCase:basicUrl+'/case/createCase',
        getFacilityType: basicUrl + "/facility/getInitFormValue",
        getUserInfo:basicUrl+'/sysUser/getUserInfo',
        getCaseTypeTreeData: basicUrl + '/caseType/getCaseTypeTreeData',
        getAllCase: basicUrl + '/case/list',//获取事件列表
        getUserCurrentPosition:basicUrl + '/enforceLawGps/save',//用户登录获取用户位置等信息
        getFacilityUploadImage: basicUrl + '/uploadFile/getUploadFilesByBizId',//根据id获取上传图片
        createEmFlowLog: basicUrl + '/flowLog/createEmFlowLog',//创建对话日志
        getCaseFlowLog: basicUrl + '/flowLog/getFlowLog',//获取用户对话日志
        getCaseByNumber: basicUrl + '/case/getCaseByNumber',//根据caseId获取事件列表
        getOrgCaseByLoginName:basicUrl +'/case/getOrgCaseByLoginName'//根据用户返回用户所属组织被分享的案件
    }
    return {
        setToken: function (token) {
            userToken = token;
        },
        getToken: function () {
            return userToken;
        },
        getSocketEndpoint:function () {
            return serviceEndpoint['socketEndpoint'];
        },
        getBasicPath: function () {
            return serviceEndpoint['basicPath'];
        },
        getPath: function (connectionObj) {
            var url;
            if (!(connectionObj instanceof Object) && !!serviceEndpoint[connectionObj]) {
                url = serviceEndpoint[connectionObj];
            }
            else {
                url = serviceEndpoint[connectionObj.id];
            }
            if (!url) {
                console.log('ERROR:Cant get the url with id:', connectionObj.id);
                return serviceEndpoint.basicUrl;
            }
            if (!!userToken) {
                url += '?token=' + userToken;
            }
            if (!!connectionObj.parameter) {
                var parameters = connectionObj.parameter;
                var parameterURL = !!userToken ? '&' : '?';
                for (var key in parameters) {
                    parameterURL += key + '=' + parameters[key] + '&';
                }
                return encodeURI(url + parameterURL.substring(0, parameterURL.length - 1));
            }
            return url;
        }
    }
});