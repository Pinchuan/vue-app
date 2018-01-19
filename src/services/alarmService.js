/**
 * Created by Hao on 2017/11/6.
 */
define(['./serviceHelper'], function (serviceHelper) {
    return {
        createAlarm:function (description,alarmType1,alarmType2,alarmType3,realTimeValue,alarmLimitValue,alarmDate,alarmItemId,x,y,cb) {debugger
            var parameter = {
                id:'createAlarm',
                parameter:{
                    description:description,
                    alarmType1:alarmType1,
                    alarmType2:alarmType2,
                    alarmType3:alarmType3,
                    realTimeValue:realTimeValue,
                    alarmLimitValue:alarmLimitValue,
                    alarmDate:alarmDate,
                    alarmItemId:alarmItemId,
                    x:x,
                    y:y,
                    alarmType3Id:50
                }
            };
            $.get(serviceHelper.getPath(parameter),function(result,errorCb){
                if(!!result){
                    if(!!result.success){
                        cb(result.data);
                    }
                }
                else{
                    errorCb(result);
                }
            });
        },

    }

});