var template = require('./context.html');
var eventHelper = require('utils/eventHelper');
var caseService = require('services/caseService');

// 定义组件
var comm = Vue.extend({
    template: template,
    props: [],
    data(){
        return {

        }
    },
    mounted(){

    },
    methods: {
        searchCase:function () {
            caseService.getCaseByNumber(this.search, function (data) {debugger
                if (!!data) {
                    // eventHelper.emit('refresh-case', data)
                }
            })
        },
        getCase(){

        }
    }
});
module.exports = comm;