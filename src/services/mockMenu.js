define(function () {
        return [
            {
                title: '主页',
                icon: 'fa-home',
                id: '',
                nodes: [
                    {
                        title: 'Dashboard1',
                        menuurl: '/app-demo-chart',
                        id: '',
                        nodes: [
                            {
                                menuurl: 'app-demo-chart',
                                id: 'app-demo-chart',
                                title: 'charts'
                            }
                        ]
                    }, {
                        title: 'Dashboard2',
                        menuurl: '/app-charts',
                        id: '',
                        nodes: [
                            {
                                menuurl: 'app-charts',
                                id: 'app-charts',
                                title: 'chartsdemo'
                            }
                        ]
                    },
                    {
                        title: 'Dashboard3',
                        menuurl: '/app-echarts',
                        id: '',
                        nodes: [
                            {
                                menuurl: 'app-echarts',
                                id: 'app-echarts',
                                title: 'EchartsDemo'
                            }
                        ]

                    }
                ]
            },
            {
                title: '表单',
                icon: 'fa-edit',
                id: '',
                nodes: [
                    {
                        title: '常规表单',
                        menuurl: '/app-demo-form',
                        id: '',
                        nodes: [
                            {
                                menuurl: 'app-general-form',
                                id: 'app-general-form',
                                title: '常规表单'
                            }
                        ]
                    }, {
                        title: '高级组件',
                        menuurl: '/app-advanced-form',
                        id: '',
                        nodes: [
                            {
                                menuurl: 'app-advanced-form',
                                id: 'app-advanced-form',
                                title: '高级表单组件'
                            }
                        ]
                    }, {
                        title: '通讯录表单',
                        menuurl: '/app-grid',
                        id: '',
                        nodes: [
                            {
                                menuurl: 'app-info',
                                id: 'app-info',
                                title: '通信录'
                            }
                        ]
                    }, {
                        title: '流程表单',
                        menuurl: '/app-form-wizard',
                        id: '',
                        nodes: [
                            {
                                title: '流程',
                                menuurl: 'app-form-wizard',
                                id: 'app-form-wizard'
                            }
                        ]
                    }, {
                        title: '上传表单',
                        menuurl: '/app-form-upload',
                        id: '',
                        nodes: [
                            {
                                title: '上传图片',
                                menuurl: 'app-form-upload',
                                id: 'app-form-upload'
                            }
                        ]
                    }, {
                        title: '按钮表单',
                        menuurl: '',
                        id: '',
                        nodes: [
                            {
                                title: '按钮组',
                                menuurl: 'app-form-button',
                                id: 'app-form-button'
                            }
                        ]
                    }
                ]
            },
            {
                title: 'UI元素',
                icon: 'fa-desktop',
                id: '',
                nodes: [
                    {
                        title: '常规元素',
                        menuurl: '',
                        path: '/app-general-elements',
                        id: '',
                        nodes: [
                            {
                                title: '常规元素组件',
                                menuurl: 'app-general-elements',
                                id: 'app-general-elements',
                            }
                        ]
                    }, {
                        title: '媒体相册',
                        menuurl: '/app-media-gallery',
                        id: '',
                        nodes: [
                            {
                                title: '相册demo',
                                menuurl: 'app-media-gallery',
                                id: 'app-media-gallery',
                            }
                        ]
                    }, {
                        title: '图标',
                        menuurl: '',
                        path: '/app-icons',
                        id: '',
                        nodes: [
                            {
                                title: '常用图标',
                                menuurl: 'app-icons',
                                id: 'app-icons'
                            }
                        ]

                    }, {
                        title: 'Glyphicons',
                        menuurl: '',
                        path: '/app-glyphicons',
                        id: '',
                        nodes: [
                            {
                                title: '常用字体图标',
                                menuurl: 'app-glyphicons',
                                id: 'app-glyphicons'
                            }
                        ]

                    }, {
                        title: '窗口小部件',
                        menuurl: '/app-widgets',
                        id: '',
                        nodes: [
                            {
                                title: '各种小部件',
                                menuurl: 'app-widgets',
                                id: 'app-widgets'
                            }
                        ]

                    }, {
                        title: '日历',
                        menuurl: '/app-home',
                        id: '',
                        nodes: [
                            {
                                title: '日历列表',
                                menuurl: 'app-home',
                                id: 'app-home',
                            }
                        ]

                    }
                ]
            },
            {
                title: '表格',
                icon: 'fa-table',
                id: '',
                nodes: [
                    {
                        title: '常规表格类型',
                        menuurl: 'app-tables',
                        customid: 'app-tables',
                        id: 'app-tables'
                    }, {
                        title: '动态表格类型',
                        menuurl: 'app-table-dynamic',
                        customid: 'app-table-dynamic',
                        id: 'app-table-dynamic'
                    }
                ]
            },
            {
                title: '传统页面',
                icon: 'fa-bug',
                id: '',
                nodes: [
                    {
                        title: 'Project',
                        menuurl: '/app-project-track',
                        id: '',
                        nodes: [
                            {
                                menuurl: 'app-project-track',
                                id: 'app-project-track',
                                title: '项目内容'
                            }
                        ]
                    }, {
                        title: 'ProjectDetail',
                        menuurl: '/app-project-detail',
                        id: '',
                        nodes: [
                            {
                                menuurl: 'app-project-detail',
                                id: 'app-project-detail',
                                title: '项目详情'
                            }
                        ]
                    }
                ]
            },
            {
                title: '额外页面',
                icon: 'fa-windows',
                id: '',
                nodes: [
                    {
                        title: '定价卡片设计',
                        menuurl: '/app-pricing-design',
                        id: '',
                        nodes: [
                            {
                                menuurl: 'app-pricing-design',
                                id: 'app-pricing-design',
                                title: '定价卡片'
                            }
                        ]

                    }
                ]
            }
        ]
    }
)