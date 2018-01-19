define(['services/appMenuService'], function (appMenuService) {

    return {
        getApplicationMenu: function (token, cb) {
            appMenuService.getApplicationMenu(token, cb, function () {
                console.log('ERROR');
            });
        }
    }

    /*[
     {
     title:'ABCD',
     menuID:'12345',
     menuIcon:'',
     openSecondary:false,
     nodes:[
     {
     title:'A-Second',
     menuIcon:'',
     menuID:'12345-S',
     nodes:[
     {
     title:'AThird',
     secondaryMenuActive:false,
     menuID:'12345-T',
     menuIcon:''
     },
     {
     title:'AThird',
     menuID:'12345',
     menuIcon:''
     }
     ]
     }
     ]
     },
     {
     title:'DEFG',
     menuID:'12345',
     menuIcon:'',
     openSecondary:false,
     nodes:[
     {
     title:'D-Second',
     menuIcon:'',
     menuID:'12345-S',
     secondaryMenuActive:false,
     nodes:[
     {
     title:'D-Third',
     menuID:'12345-T',
     menuIcon:''
     },
     {
     title:'D-Third',
     menuID:'12345',
     menuIcon:''
     }
     ]
     }
     ]
     }
     ,
     {
     title:'GHIJK',
     menuID:'12345',
     menuIcon:'',
     openSecondary:false,
     nodes:[
     {
     title:'G-Second',
     menuIcon:'',
     menuID:'12345-S',
     secondaryMenuActive:false,
     nodes:[
     {
     title:'G-Third',
     menuID:'12345-T',
     menuIcon:''
     },
     {
     title:'G-Third',
     menuID:'12345',
     menuIcon:''
     },
     {
     title:'G-Third',
     menuID:'12345',
     menuIcon:''
     },
     {
     title:'G-Third',
     menuID:'12345',
     menuIcon:''
     }
     ]
     }
     ]
     }


     ];*/
});