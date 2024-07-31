// const superUserModel = require('../../../../models/user');
const Router = require("express").Router();
const { getWhereclause } = require("../../../../../../utils/commons");
const { perUserTypeMenu } = require("../../../../../../utils/menus");
const models = require("../../../../models/index");
  
const getMenus = async (req, res, next) => {
    try {

        const dashboardIds = await models.through.clientAdmin_dashboard.findAll( {where: { clientUserId: req.user.topParentId }})

        const _usersDashboards = await models.through.clientUser_dashboard.findAll({
            where: {
                clientUserId: req.user.id
            },
            include: [
                {
                    model: models.meta_data_management.dashboard,
                    as: 'dashboardList', // Specify the alias for the association if you have one
                    attributes: ['id', 'title'], // Specify the columns you want to retrieve from the user_type table
                },
            ],
        });

        const roleBasedUserMenu = perUserTypeMenu.find(e => e.role == req.user['user-type'].title)
        roleBasedUserMenu.menu.find(e => e.title == "Dashboard")['list'] = _usersDashboards.map(_dash => {
            const powerBiIds = dashboardIds.find(e => e.getDataValue('dashboardId') == _dash.getDataValue('dashboardId'));
            return ({
                type: 'menu',
                title: _dash?.dashboardList.title,
                onClick: `/client-user/dashboard/${_dash?.dashboardList?.title}`,
                onClickState: {
                    prod_reportId: powerBiIds?.prod_reportId || null,
                    prod_workspaceId: powerBiIds?.prod_workspaceId || null,
                    sand_reportId: powerBiIds?.sand_reportId || null,
                    sand_workspaceId: powerBiIds?.sand_workspaceId || null
                },
                icon: 'icon-name'
            })
        })

        res.json({ success: true, data: roleBasedUserMenu });

    } catch (error) {
        res.json({ success: false, message: error?.message || 'something went wrong!' })
    }
};

Router.get('/available-list', getMenus);

module.exports = Router;