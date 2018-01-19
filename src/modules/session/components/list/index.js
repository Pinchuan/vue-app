var template = require('./context.html');
var eventHelper = require('utils/eventHelper');
// 定义组件
var comm = Vue.extend({
    template: template,
    props: ['sessionList','search','caseList'],
    data(){
      return{
          chatImg:'./img/chat/user/header.png'
      }
    },
    mounted: function () {
    },
    methods: {
        searchCase:function () {
            caseService.getCaseByNumber(this.search, function (data) {
                if (!!data) {
                    // eventHelper.emit('refresh-case', data)
                }
            })
        },
        select (value) {
            // this.sessionIndex = this.userList.indexOf(value);
            // this.cases[this.sessionIndex].active = false;
            this.sessionIndex = this.caseList.indexOf(value);
            eventHelper.emit('change-selected-session', this.sessionIndex);
            // this.cases[this.sessionIndex].active = true;

        }
    },
    filters: {
        search (list) {
            return list.filter(item => item.name.indexOf(this.search) > -1);
        }
    }
});
module.exports = comm;