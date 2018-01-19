define(['q', 'services/serviceHelper'], function (Q, serviceHelper) {
    var deferred = Q.defer();
    var stompClient;
    var userID;
    return {
        disconnect: function () {
            if (!!stompClient && !!stompClient.disconnect) {
                stompClient.disconnect();
            }
        },
        subscribeQueue: function (destination, cb, errorCb) {
            stompClient.subscribe('/user/' + userID + destination, function (response) {
                var ajaxResult = JSON.parse(response.body);
                if (ajaxResult) {
                    if (ajaxResult.success === true) {
                        cb(ajaxResult)
                    } else {
                        if (!!errorCb)
                            errorCb(ajaxResult);
                    }
                }
            });
        },
        getInstance: function (userInfo) {
            if (!!stompClient) {
                deferred.resolve(stompClient);
            } else {
                var socket = new SockJS(serviceHelper.getSocketEndpoint());
                stompClient = Stomp.over(socket);
                return this.connect(userInfo);

            }
            return deferred.promise;
        },
        connect: function (userInfo) {
            userID = userInfo.loginName;
            stompClient.connect({login: userInfo.loginName}, function (frame) {
                deferred.resolve(stompClient);
            });
            return deferred.promise;
        }
    }
});