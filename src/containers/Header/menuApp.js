export const adminMenu = [
    { //hệ thống
        name: 'menu.admin.manage-user', menus: [
            {
                name: 'menu.admin.crud', link: '/system/user-manage'

            },
            {
                name: 'menu.admin.crud-redux', link: '/system/user-redux'

            },
            {
                name: 'menu.admin.manage-doctor', link: '/system/manage-doctor'
                // subMenus: [
                //     { name: 'menu.system.system-administrator.user-manage', link: '/system/user-manage' },
                //     { name: 'menu.system.system-administrator.user-redux', link: '/system/user-redux' },
                // ]
            },
            // { name: 'menu.system.system-parameter.header', link: '/system/system-parameter' },

            // {
            //     name: 'menu.admin.manage-admin', link: '/system/user-admin'

            // },

            { //quan li ke hoach bac si

                name: 'menu.doctor.manage-schedule', link: '/doctor/manage-schedule'

            },

            { //quan li ke hoach bac si

                name: 'menu.admin.manage-detail-schedule', link: '/system/manage-detail-schedule'

            },
        ]
    },

    { //phòng khám
        name: 'menu.admin.clinic', menus: [
            {
                name: 'menu.admin.manage-clinic', link: '/system/manage-clinic'

            },

        ]
    },

    { //chuyên khoa
        name: 'menu.admin.specialty', menus: [
            {
                name: 'menu.admin.manage-specialty', link: '/system/manage-specialty'

            },

        ]
    },
];



export const doctorMenu = [
    { //quan li ke hoach bac si
        name: 'menu.doctor.manage-schedule', menus: [
            {
                name: 'menu.doctor.manage-schedule', link: '/doctor/manage-schedule'

            },
            {
                name: 'menu.doctor.manage-patient', link: '/doctor/manage-patient'

            },
        ]
    },

];