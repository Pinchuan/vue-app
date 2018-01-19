var template = require('./content.html');
var eventHelper = require('../../utils/eventHelper');
var caseService = require('../../services/caseService');
var alarmService = require('../../services/alarmService');
// var appSumitEnd = require('modules/appSumitEnd');
var serviceHelper = require('services/serviceHelper.js');
var mapHelper = require('utils/mapHelper');
var mathUtils = require('utils/mathUtils');

var pi = 3.1415926535897932384626;
var ee = 0.00669342162296594323;
var a = 6378245.0;
// 定义组件
var comm = Vue.extend({
    template: template,
    data: function () {
        return {
            showAddBtn: false,
            showDelOperation: false,//是否显示删除操作
            caseImageUri: '',
            //相机操作项
            actions: [{
                name: '拍照',
                method: this.selectCamera
            }, {
                name: '从相册里选取',
                method: this.selectPhotolibrary
            }
            ],
            sheetVisible: false,//是否显示相机下拉选择项
            number: mathUtils.getCurrentTimeNum(),//案件编号
            street: '',//案发街道
            community: '',//案发社区
            district: '',//案发城区
            location: '',//案发地点
            caseLevel: '',//案件等级
            //案件等级列表
            caseLevels: [{
                label: '高',
                value: '高'
            }, {
                label: '中',
                value: '中'
            }, {
                label: '低',
                value: '低'
            }],
            isDeleteOprate: false,//删除图标
            //案件类型选项
            caseTypeOptions: [{
                label: '消纳场超范围弃土',
                value: '消纳场超范围弃土'
            }, {
                label: '车身带泥',
                value: '车身带泥'
            }, {
                label: '路面撒漏',
                value: '路面撒漏'
            },],
            //当前最大html元素的id，因为jquery经常用id查询，为防止不同功能间id重号，因此在查询时限制在本功能范围，id随机生成，保证不重复
            mainContentDivId: "mainContentDiv" + Math.random().toString(36).substr(2),
            fileId: '',
            base64: '',
            showQuestion: true,
            currentEntityHasSave: true,
            caseName: '',
            testURL: '',
            createPerson: '',
            imgVisible: true,
            caseTypes: '',
            disposeDepartment: '',
            isUpload: false,
            uploadSrc: '',
            x: '',
            y: '',
            //高德地图对象
            //map: null,
            //天地图对象
            tMap: null,
            //当前点标注
            markerCurrentPoint: null,
        }
    },
    methods: {
        //调用相机拍照
        selectCamera: function () {
            this.openCarma(Camera.PictureSourceType.CAMERA);
        },
        //调用相册
        selectPhotolibrary: function () {
            this.openCarma(Camera.PictureSourceType.PHOTOLIBRARY);
        },
        //cordova相机插件，调用摄像头和相册
        openCarma: function (sourceType) {
            var cameraOptions = {
                quality: 100,                                            //相片质量0-100
                destinationType: Camera.DestinationType.FILE_URI,        //返回类型：DATA_URL= 0，返回作为 base64 編碼字串。 FILE_URI=1，返回影像档的 URI。NATIVE_URI=2，返回图像本机URI (例如，資產庫)
                sourceType: sourceType,             //从哪里选择图片：PHOTOLIBRARY=0，相机拍照=1，SAVEDPHOTOALBUM=2。0和1其实都是本地图库
                allowEdit: false,                                        //在选择之前允许修改截图
                encodingType: Camera.EncodingType.JPEG,                   //保存的图片格式： JPEG = 0, PNG = 1
                targetWidth: 800,                                        //照片宽度
                targetHeight: 600,                                       //照片高度
                mediaType: 0,                                             //可选媒体类型：圖片=0，只允许选择图片將返回指定DestinationType的参数。 視頻格式=1，允许选择视频，最终返回 FILE_URI。ALLMEDIA= 2，允许所有媒体类型的选择。
                cameraDirection: 0,                                       //枪后摄像头类型：Back= 0,Front-facing = 1
                popoverOptions: CameraPopoverOptions,
                saveToPhotoAlbum: true
            };
            var self = this;
            navigator.camera.getPicture(function (imageUri) {
                self.imgVisible = true;
                self.caseImageUri = imageUri;
                self.showAddBtn = false;
            }, function (error) {
                messageBox.show({title: "", content: error});
            }, cameraOptions);
        },
        //显示删除按钮
        showDeleteBtn: function () {
            var self = this;
            this.isDeleteOprate = true;
            setTimeout(function () {
                self.isDeleteOprate = false;
            }, 2000);
        },
        //返回首页
        returnHome: function () {
            eventHelper.emit('openSub');
        },
        reSet: function () {
            this.caseTypes = '';
            this.caseLevel = '';
            // this.createPerson = '';
            this.number = mathUtils.getCurrentTimeNum();
            this.caseImageUri = '';
            this.imgVisible = false;
            this.showAddBtn = true;
            $(".img_wrap").attr("src", '');
        },

        selectChange: function () {
            // console.log(this.caseTypes);
        },
        openActionSheet: function () {
            this.sheetVisible = true;
        },
        sumbitMsg: function () {
            var self = this;
            this.$dialog.confirm({
                title: '提示',
                mes: '是否提交案件信息？',
                opts: () => {
                    self.$dialog.loading.open('');
                    if(!!self.caseName || !!self.caseTypes){
                        caseService.createCase(self.caseName,'否',[],[],self.caseName, window.cesc.loginName, self.x, self.y,  self.district, self.street,self.location,'',self.number,self.caseLevel, self.caseTypes,  '是','巡查上报', function (result) {
                            self.fileId = result.data;
                            if(result.success == false){
                                self.$dialog.loading.close();
                                self.$dialog.toast({
                                    mes: '提交失败,请检查网络！',
                                    timeout: 1500,
                                    icon: 'error'
                                });
                            }else if(result.success == true){
                                if (!!self.caseImageUri && !!navigator && !!FileTransfer) {
                                    var options = new FileUploadOptions();
                                    var params = {
                                        bizType: 'case',
                                        bizId: self.fileId,
                                        token: serviceHelper.getToken()
                                    };
                                    options.fileKey = "file_data";
                                    options.params = params;
                                    window.resolveLocalFileSystemURL(self.caseImageUri, function success(fileEntry) {
                                        var ft = new FileTransfer();
                                        //上传地址
                                        var SERVER = serviceHelper.getBasicPath() + '/uploadFile/batchUploadFile';
                                        ft.upload(self.caseImageUri, encodeURI(SERVER), function (success) {
                                            // self.district = JSON.stringify(error);
                                            self.$dialog.loading.close();
                                            self.$dialog.toast({
                                                mes: '提交成功！',
                                                timeout: 1500,
                                                icon: 'success'
                                            });
                                        }, function (error) {
                                            // self.district = JSON.stringify(error);
                                        }, options);
                                    }, function () {

                                    });
                                }
                            }else {
                                self.$dialog.loading.close();
                                self.$dialog.toast({
                                    mes: '提交失败,请检查网络！',
                                    timeout: 1500,
                                    icon: 'error'
                                });
                            }

                        });
                    }else {
                        self.$dialog.alert({mes: '请完善信息！！'});
                    }
                }
            });

        },
        //初始化地图
        initMap: function () {

            //初始化天地图对象
            this.tMap = new T.Map("mobile-timg", {
                projection: 'EPSG:4326'
            });
            //初始化中心点
            var zoom = 16;
            var geocode;
            this.tMap.centerAndZoom(new T.LngLat(108.30897167534597, 22.84253525627857), zoom);
            //天地图单击事件
            this.tMap.addEventListener('click', function (e) {
                this.caseName = '';
                console.log("x:" + e.lnglat.getLng() + ",y:" + e.lnglat.getLat());
                this.x = e.lnglat.getLng();
                this.y = e.lnglat.getLat();
                this.searchResult(e.lnglat.getLat(), e.lnglat.getLng());
                //处理标注
                this.markerMap(e.lnglat.getLng(), e.lnglat.getLat());

            }.bind(this));

        },
        //定位
        getLocation: function () {
            var options = {
                enableHighAccuracy: true,
                maximumAge: 1000
            };
            // navigator.geolocation.getCurrentPosition(onSuccess, onError, options);
            navigator.geolocation.getCurrentPosition(function (position) {
                //返回用户位置
                //经度
                var longitude = position.coords.longitude;
                //纬度
                var latitude = position.coords.latitude;

                var lnglatXY = [longitude, latitude];
                //点击获得到的地址-写到案件名称里
                this.searchResult(latitude, longitude);

                //天地图标记到当前点
                this.markerMap(longitude, latitude);
                //地图定位到对应位置
                this.tMap.centerAndZoom(new T.LngLat(longitude, latitude), 16);
                this.x = longitude;
                this.y = latitude;
                /*                    //高德GCJ转WGS84
                 var newLnglatXY = this.gcjToGps84(lnglatXY);
                 this.x = newLnglatXY[0];
                 this.y = newLnglatXY[1];*/
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

        //###############################################
        //天地图获取详细街道信息-换为腾讯地图解析
        searchResult: function (lat, lng) {
            var self = this;
            mapHelper.getLocationCode(lat, lng, function (data) {
                // return(data);//这里可以得到值
                self.district = data.address_component.district;
                self.street = data.address_component.street;
                self.caseName = data.formatted_addresses.recommend;
                self.location = data.formatted_addresses.recommend;
            });
        },
        //天地图标注
        markerMap: function (x, y) {
            //删除已经存在的点标注
            if (this.markerCurrentPoint) {
                this.tMap.clearOverLays();
                this.markerCurrentPoint = null;
            }
            //把当前坐标添加一个点标注
            this.markerCurrentPoint = new T.Marker(new T.LngLat(x, y));
            this.tMap.addOverLay(this.markerCurrentPoint);
        },
        loadPollutionType:function () {
            var that = this;
            caseService.getCaseTypeTreeData(function (data) {
                that.caseTypeOptions.splice(0, that.caseTypeOptions.length);
                console.log(data);
                var result = data[0].children;
                result.forEach(function (item) {
                    item.children.forEach(function (itemChild) {
                        // itemChild.children.forEach(function (child) {
                        that.caseTypeOptions.push({
                            value: itemChild.nameCn,
                            label: itemChild.nameCn,
                            id: itemChild.id,
                        });
                    });
                });
            });
        }
    },
    mounted: function () {
        var self = this;
        eventHelper.on('getLoginName',function (name) {
            this.createPerson = name;
        }.bind(this));
        eventHelper.on('loadCaseMap',function () {
            self.reSet();
            //加载污染类型列表
            self.loadPollutionType();
            //初始化地图
            self.initMap();
            //定位
            self.getLocation();
        }.bind(this));
    },
    components: {
        // 'app-submit-end': appSumitEnd
    }
});
module.exports = comm;