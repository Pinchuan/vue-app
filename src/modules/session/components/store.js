const key = 'VUE-CHAT-v3';

// 虚拟数据
let now = new Date();

let data = {
    // 登录用户
    user: {
        id: 1,
        name: '城管局张三',
        img: 'img/chat/1.jpg'
    },

    // 用户列表
    userList: [
        {
            id: 2,
            name: '站长素材',
            img: 'img/chat/2.png',
            active:false
        },
        {
            id: 3,
            name: 'webpack',
            img: 'img/chat/3.jpg',
            active:false
        }
    ],

    // 会话列表
    sessionList: [
        {
            userId: 2,
            messages: [
                {
                    text: 'Hello，这是一个基于Vue + Webpack构建的简单chat示例，聊天记录保存在localStorge。简单演示了Vue的基础特性和webpack配置。',
                    date: now,
                    type:''
                },
                {
                    text: '项目地址: https://sc.chinaz.com/jiaoben/',
                    date: now
                }
            ]
        },
        {
            userId: 3,
            messages: []
        }
    ],
};

define(function () {
    return {
        fetch () {
            return data;
            console.log('fetch')
        },
        save (store) {
            //localStorage.setItem(key, JSON.stringify(store));
            console.log('save')
        }
    }
})