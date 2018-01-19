define(['./serviceHelper'], function (serviceHelper) {
    return {
        //根据用户返回用户所属组织被分享的案件
        getOrgCaseByLoginName:function (loginName,cb) {
            var parameter = {
                id: 'getOrgCaseByLoginName',
                parameter: {
                    r: Math.random(),
                    loginName : loginName
                }
            };
            $.get(serviceHelper.getPath(parameter), function (result) {
                if (!!result) {
                    if (!!result.success) {
                        cb(result.data);
                    }
                }
                else {
                    console.error('错误');
                }
            })
        },
        //根据caseId获取事件列表
        getCaseByNumber: function (caseNumber, cb) {
            var parameter = {
                id: 'getCaseByNumber',
                parameter: {
                    r: Math.random(),
                    number: caseNumber
                }
            };
            $.get(serviceHelper.getPath(parameter), function (result) {
                if (!!result) {
                    if (!!result.success) {
                        cb(result.data);
                    }
                }
                else {
                    console.error('错误');
                }
            })
        },
        //查询案件流转记录
        getCaseFlowLog: function (caseID, cb) {
            var parameter = {
                id: 'getCaseFlowLog',
                parameter: {
                    r: Math.random(),
                    caseId: caseID
                }
            };
            $.get(serviceHelper.getPath(parameter), function (result) {
                if (!!result) {
                    if (!!result.success) {
                        cb(result.data);
                    }
                }
            })
        },
        //创建突发事件处置记录
        createEmFlowLog:function (caseId, nodeType, disposeDepartment, nodeDetail, dealUser, nodeName, x, y, nodeCreateDate,cb) {
            var parameter = {
                id: 'createEmFlowLog',
                parameter: {
                    r: Math.random(),
                    caseId: caseId,
                    nodeType: nodeType,
                    disposeDepartment: disposeDepartment,
                    nodeDetail: nodeDetail,
                    dealUser: dealUser,
                    nodeName: nodeName,
                    x: x,
                    y: y,
                    nodeCreateDate: nodeCreateDate
                }
            };
            $.get(serviceHelper.getPath(parameter), function (result) {
                if (!!result) {
                    if (!!result.success) {
                        cb(result.data);
                    }
                }
                else {
                    console.error('失败');
                }
            })
        },
        //用户登录获取地理位置等信息
        getUserCurrentPosition:function (loginName,x,y,times,address,addField1,addField2,cb) {
            var parameter = {
                id: 'getUserCurrentPosition',
                parameter: {
                    r: Math.random(),
                    loginName:loginName,
                    x:x,
                    y:y,
                    times:times,
                    address:address,
                    addField1:addField1,
                    addField2 :addField2
                }
            };
            $.get(serviceHelper.getPath(parameter), function (result) {
                if (!!result) {
                    if (!!result.success) {
                        cb(result.data);
                    }
                }
            })
        },
        //查询处置部门列表
        getAllCase: function (pageNum, pageSize,createUser, cb) {
            var parameter = {
                id: 'getAllCase',
                parameter: {
                    r: Math.random(),
                    pageNumber: pageNum,
                    pageSize: pageSize,
                    createUser:createUser
                }
            };
            $.get(serviceHelper.getPath(parameter), function (result, errorCb) {
                if (!!result) {
                    if (!!result.success) {
                        cb(result.data);
                    }
                }
                else {
                    errorCb(result);
                }
            });
        },
        //查询预警类型
        getCaseTypeTreeData: function (cb) {
            var parameter = {
                id: 'getCaseTypeTreeData',
                parameter: {
                    r: Math.random(),
                }
            };
            $.get(serviceHelper.getPath(parameter), function (result, errorCb) {
                if (!!result) {
                    if (!!result.success) {
                        cb(result.data);
                    }
                }
                else {
                    errorCb(result);
                }
            });
        },
        createCase: function (name, isEmergency, relateEntity, disposeDepartment, description, createUser, x, y, district, street, location, community, number, level, category, submitOrNot, createType, cb) {
            var parameter = {
                id: 'createCase',
                parameter: {
                    r: Math.random(),
                    alarmId: 11,
                    name: name,
                    isEmergency: isEmergency,
                    disposeDepartment: JSON.stringify(disposeDepartment),
                    relateEntity: JSON.stringify(relateEntity),//relateEntity,
                    description: description,
                    createUser: createUser,
                    x: x,
                    y: y,
                    district: district,
                    street: street,
                    location: location,
                    community: community,
                    number: number,
                    level: level,
                    category: category,
                    submitOrNot: submitOrNot,
                    createType: createType,

                    ifCPPoint: "false"
                }
            };
            $.get(serviceHelper.getPath(parameter), function (result) {
                if (!!result) {
                    if (!!result.success) {
                        cb(result);
                        console.log('关闭预警成功');
                    }
                }
                else {
                    console.log('关闭预警失败');
                }
            })
        }

    }

});