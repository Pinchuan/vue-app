define(function () {
    var departments = {};
    return {

        flowContentType: {
            text: 0,
            image: 1,
            location: 2,
            voice: 3
        },
        relateEntityType: {
            car: 0,
            officer: 1,
            cs: 2
        },
        caseFlowStatus: {
            start: {
                key: 0,
                name: '起草'
            },
            process: {
                key: 1,
                name: '处置部门办理'
            },
            rollback: {
                key: 2,
                name: '退回'
            },
            complaint: {
                key: 3,
                name: '督办'
            },
            finish: {
                key: 4,
                name: '完成'
            }
        },
        setDepartments: function (deps) {
            deps.forEach(function (dep) {
                departments[dep.name] = dep.nameCn;
            })
        },
        getDepartments: function () {
            return departments;
        }
    }
});