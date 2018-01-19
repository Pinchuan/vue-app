define(['./serviceHelper'], function (serviceHelper) {
    return {
        login: function (userName, password, cb) {
            var parameter = {
                id: 'login',
                parameter: {
                    username: userName,
                    password: password
                }
            };
            $.get(serviceHelper.getPath(parameter), function (result) {
                if (!!result) {
                    if (!!result.success) {
                        serviceHelper.setToken(result.data.token);
                        cb(result.data);
                        window.sessionStorage.setItem('cescToken', result.data);
                        setInterval(function () {
                            //refreshToken
                            $.get(serviceHelper.getPath('refreshToken'), function (result) {
                                if (!!result) {
                                    if (!!result.success) {
                                        console.log('Refresh Token');
                                    }
                                }
                                else {
                                    console.log('Failed to refresh token');
                                }
                            });
                        }, 30000);
                    }
                }
                else {
                    errorCb();
                }
            });
        },
        getUserInfo: function ( cb) {
            var parameter = {
                id: 'getUserInfo',
                parameter: {
                }
            };
            $.get(serviceHelper.getPath(parameter), function (result,errorCb) {
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
        getUserRole: function (token, cb, errorCb) {
            $.get(serviceHelper.getPath('userRole'), function (result) {
                if (!!result) {
                    var resultObj = JSON.parse(result);
                    if (resultObj.state == 1) {
                        cb(resultObj.data.result);
                    }
                }
                else {
                    errorCb();
                }
            });
        }
    }
});