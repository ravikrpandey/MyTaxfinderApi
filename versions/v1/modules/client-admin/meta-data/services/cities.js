// const superUserModel = require('../../../../models/user');
const Router = require("express").Router();
const { getWhereclause } = require("../../../../../../utils/commons");
const models = require("../../../../models/index");


const fetchList = async (req, res, next) => {
    try {
        const { page = 0, pageSize = 1000, sortField, sortDirection, filterField, filterOperator, filterValue } = req.query;
        const offset = (page) * pageSize;
        const result = await models.meta_data_management.city.findAll({
            limit: parseInt(pageSize),
            offset: offset,
            where: getWhereclause({ filterField, filterOperator, filterValue }),

            ...((sortField && sortDirection) &&  // sorting
                !(sortField == 'null') && !(sortDirection == 'null') ? {
                order: [
                    [sortField, sortDirection],
                ]
            } : {})
        });

        const totalCount = await models.meta_data_management.city.count();
        const pageCount = Math.ceil(totalCount / pageSize);

        res.json({
            success: true,
            data: {
                list: result,
                pagination: {
                    pageCount,
                    pageNumber: parseInt(page),
                    totalDocuments: totalCount,
                }
            }
        });

    } catch (error) {
        return res.json({
            success: false,
            message: error?.message || "Something went wrong. Try again later!",
        });
    }
};

Router.get('/get-list', fetchList);

module.exports = Router;
