const Router = require("express").Router();
const { getWhereclause } = require("../../../../../../utils/commons");
const models = require("../../../../models"); 
const Joi = require('joi');

const addBusinessUnit = async (req, res, next) => {
    try {
        const {
            businessUnitName,
            businessUnitCountryData = [],
            businessUnitFunctionData = []
        } = req.body;

        const createdBy = req?.user?.id
        const updatedBy = req?.user?.id

        const _currentAuth = req.user.id 
       const companyId = req.user?.topParentId || req.user.id 

        const businessUnit = await models.meta_data_management.business_unit.create({
            businessUnitName,
            createdBy,
            updatedBy,
            companyId,
        });

        let response = [businessUnit];

        if (businessUnitCountryData && businessUnitCountryData.length > 0) {
            for (const countryData of businessUnitCountryData) {
                const createdCountry = await models.through.business_unit_country.create({
                    businessUnitId: businessUnit.id,
                    businessUnitCountryName: countryData.businessUnitCountryName,
                    businessUnitCountryId: countryData.businessUnitCountryId,
                    createdBy,
                    updatedBy
                });
                response.push(createdCountry);
            }
        }

        if (businessUnitFunctionData && businessUnitFunctionData.length > 0) {
            for (const functionData of businessUnitFunctionData) {
                const createdFunction = await models.through.business_unit_function.create({
                    businessUnitId: businessUnit.id,
                    businessUnitFunctionName: functionData.businessUnitFunctionName,
                    businessUnitFunctionId: functionData.businessUnitFunctionId,
                    createdBy,
                    updatedBy
                });
                response.push(createdFunction);
            }
        }

        res.json({
            success: true,
            message: 'Business unit created successfully',
            data: response
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({
            success: false,
            message: error?.original?.sqlMessage || error?.message || "Something went wrong, Try again later!"
        });
    }
};

const updateBusinessUnitSchema = Joi.object({
    businessUnitName: Joi.string().required(),
    businessUnitCountryData: Joi.array().items(Joi.object({
        businessUnitCountryName: Joi.string().required(),
        businessUnitCountryId: Joi.number().required()
    })).optional(),
    businessUnitFunctionData: Joi.array().items(Joi.object({
        businessUnitFunctionName: Joi.string().required(),
        businessUnitFunctionId: Joi.number().required()
    })).optional()
});

const updateBusinessUnit = async (req, res, next) => {
    const { error, value } = updateBusinessUnitSchema.validate(req.body);
    if (error) {
        return res.status(400).json({ success: false, message: error.details[0].message });
    }

    const { businessUnitName, businessUnitCountryData, businessUnitFunctionData } = value;
    const { id } = req.query;
    const updatedBy = req?.admin?.id;

    try {
        await models.meta_data_management.business_unit.update(
            { businessUnitName, updatedBy },
            { where: { id } }
        );

        if (businessUnitCountryData && businessUnitCountryData.length) {
            await models.through.business_unit_country.update(
                { isDeleted: true },
                { where: { businessUnitId: id } }
            );
            for (const countryData of businessUnitCountryData) {
                await models.through.business_unit_country.create({
                    businessUnitCountryName: countryData.businessUnitCountryName,
                    businessUnitCountryId: countryData.businessUnitCountryId,
                    businessUnitId: id,
                    updatedBy
                });
            }
        }

        if (businessUnitFunctionData && businessUnitFunctionData.length) {
            await models.through.business_unit_function.update(
                { isDeleted: true },
                { where: { businessUnitId: id } }
            );
            for (const functionData of businessUnitFunctionData) {
                await models.through.business_unit_function.create({
                    businessUnitFunctionName: functionData.businessUnitFunctionName,
                    businessUnitFunctionId: functionData.businessUnitFunctionId,
                    businessUnitId: id,
                    updatedBy
                });
            }
        }

        res.json({ success: true, message: 'Business unit updated successfully' });
    } catch (error) {
        console.error(error);
        res.status(500).json({
            success: false,
            message: error?.original?.sqlMessage || error?.message || "Something went wrong, try again later!"
        });
    }
};


const getAllBusinessUnits = async (req, res, next) => {
    try {
        const {
            page = 0,
            pageSize = 1000,
            sortField,
            sortDirection,
            filterField,
            filterOperator,
            filterValue
        } = req.query;
        const offset = page * pageSize;
        const companyId = req.user?.topParentId || req.user.id 

        // Construct where clause based on filters
        const whereClause = {
            companyId: companyId,
            isDeleted: false,
            ...getWhereclause({ filterField, filterOperator, filterValue })
        };

        // Sorting options
        const orderClause = (sortField && sortDirection && sortField !== 'null' && sortDirection !== 'null')
            ? [[sortField, sortDirection]]
            : [];

        // Fetch paginated business units
        const businessUnits = await models.meta_data_management.business_unit.findAll({
            limit: parseInt(pageSize),
            offset: offset,
            where: whereClause,
            order: orderClause,
            include: [
                {
                    model: models.through.business_unit_country, as: 'business_unit_country',
                    where: { isDeleted: false },
                    required: false
                },
                {
                    model: models.through.business_unit_function, as: 'business_unit_function',
                    where: { isDeleted: false },
                    required: false
                }
            ]
        });

        // Total count of business units
        const totalCount = await models.meta_data_management.business_unit.count({
            where: whereClause
        });
        const pageCount = Math.ceil(totalCount / pageSize);

        // Format response
        let finalResponse = businessUnits.map(unit => {
            let businessUnitFunctionData = unit.business_unit_function.map(fdata => ({
                businessUnitFunctionName: fdata.businessUnitFunctionName,
                businessUnitFunctionId: fdata.businessUnitFunctionId
            }));

            let allBusinessUnitFunctionNames = businessUnitFunctionData.map(fdata => fdata.businessUnitFunctionName);

            let countryData = unit.business_unit_country.map(cdata => ({
                businessUnitCountryName: cdata.businessUnitCountryName,
                businessUnitCountryId: cdata.businessUnitCountryId
            }));

            let allBusinessUnitCountryNames = countryData.map(cdata => cdata.businessUnitCountryName);

            return {
                id: unit.id,
                businessUnitName: unit.businessUnitName,
                createdBy: unit.createdBy,
                updatedBy: unit.updatedBy,
                createdAt: unit.createdAt,
                updatedAt: unit.updatedAt,
                isDeleted: unit.isDeleted,
                companyId: unit.companyId,
                businessUnitFunctionData: businessUnitFunctionData,
                businessUnitCountryData: countryData,
                allBusinessUnitFunctionNames: allBusinessUnitFunctionNames.join(', '),
                allBusinessUnitCountryNames: allBusinessUnitCountryNames.join(', '),
            };
        });

        // Send response
        res.json({
            success: true,
            message: 'Business units fetched successfully',
            data: {
                list: finalResponse,
                pagination: {
                    pageCount,
                    pageNumber: parseInt(page),
                    totalDocuments: totalCount
                }
            }
        });
    } catch (error) {
        console.error('Error fetching data:', error);
        res.status(500).json({
            success: false,
            message: error?.message || "Something went wrong. Try again later!"
        });
    }
};

const getBusinessUnitById = async (req, res, next) => {
    try {
        const { id } = req.query;
        if (!id) {
            return res.status(403).send({status: false, message:'please provide id'})
        }
        const businessUnit = await models.meta_data_management.business_unit.findByPk(id, {
            include: [
                { model: models.through.business_unit_country, as: 'business_unit_country' },
                { model: models.through.business_unit_function, as: 'business_unit_function' }
            ]
        });

        if (!businessUnit) {
            return res.status(404).json({ success: false, message: "Business unit not found" });
        }

        res.json({ success: true, data: businessUnit });
    } catch (error) {
        console.error(error);
        res.status(500).json({
            success: false,
            message: error?.message || "Something went wrong, Try again later!"
        });
    }
};

const deleteBusinessUnit = async (req, res, next) => {
    const { id } = req.query;

    try {
        const businessUnit = await models.meta_data_management.business_unit.findByPk(id);

        if (!businessUnit) {
            return res.status(404).json({ success: false, message: "Business unit not found" });
        }

        await models.meta_data_management.business_unit.update({isDeleted: true}, { where: { id } });

        // Delete associated country and function data
        await models.through.business_unit_country.update({isDeleted: true},{ where: { businessUnitId: id } });
        await models.through.business_unit_function.update({isDeleted: true},{ where: { businessUnitId: id } });

        res.json({ success: true, message: 'Business unit deleted successfully' });
    } catch (error) {
        console.error(error);
        res.status(500).json({
            success: false,
            message: error?.message || "Something went wrong, Try again later!"
        });
    }
};


Router.post('/add-businessunit', addBusinessUnit);
Router.get('/list-businessunit', getAllBusinessUnits);
Router.get('/businessunit-byid', getBusinessUnitById);
Router.delete('/remove-businessunit', deleteBusinessUnit);
Router.put('/update-businessunit', updateBusinessUnit);

module.exports = Router;
