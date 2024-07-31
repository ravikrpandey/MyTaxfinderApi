const sequelize = require("sequelize");



module.exports = {
    generateOTP: () => {
        // Generate a random 6-digit number between 100000 and 999999
        const min = 100000;
        const max = 999999;
        const otp = Math.floor(Math.random() * (max - min + 1)) + min;

        // Convert the number to a string
        return otp.toString();
    },
    getNextMonthDateWithValidation: () => {
        const currentDate = new Date();

        // Get the next month
        const nextMonth = new Date(currentDate);
        nextMonth.setMonth(currentDate.getMonth() + 1);

        // Check if the current month has 31 days
        const isCurrentMonth31Days = new Date(currentDate.getFullYear(), currentDate.getMonth() + 1, 0).getDate() === 31;

        // If the current month has 31 days, ensure the next month also has 31 days
        if (isCurrentMonth31Days && nextMonth.getDate() !== 31) {
            nextMonth.setDate(31);
        }

        return nextMonth;
    },
    getRandomPassword: () => {
        const characters = '0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ';
        let randomString = '';

        for (let i = 0; i < 15; i++) {
            const randomIndex = Math.floor(Math.random() * characters.length);
            randomString += characters.charAt(randomIndex);
        }

        return randomString;
    },
    getWhereclause: ({ filterField, filterOperator, filterValue }) => {
        const operatorsWithValues = {
            // filters for number
            '=': value => value,
            '!=': value => ({ [sequelize.Op.ne]: value }),
            '>': value => ({ [sequelize.Op.gt]: value }),
            '>=': value => ({ [sequelize.Op.gte]: value }),
            '<': value => ({ [sequelize.Op.lt]: value }),
            '<=': value => ({ [sequelize.Op.lte]: value }),

            // fitlers for text
            'equals': value => value,
            'contains': value => ({ [sequelize.Op.like]: `%${value}%` }),
            'startsWith': value => ({ [sequelize.Op.startsWith]: value }),
            'endsWith': value => ({ [sequelize.Op.endsWith]: value }),
            'isEmpty': value => '',
            'isNotEmpty': value => ({ [sequelize.Op.not]: '' }),
            'isAnyOf': value => ({ [sequelize.Op.in]: value.split(',').map(val => val.trim()) }),

            // filters for dates 
            'is': value => ({
                [sequelize.Op.and]: [
                    { [sequelize.Op.gte]: new Date(value) }, // Greater than or equal to the specified date
                    { [sequelize.Op.lt]: new Date(new Date(value).setDate(new Date(value).getDate() + 1)) } // Less than the next day
                ]
            }),
            'not': value => ({
                [sequelize.Op.or]: [
                    { [sequelize.Op.lt]: new Date(value) }, // Greater than or equal to the specified date
                    { [sequelize.Op.gte]: new Date(new Date(value).setDate(new Date(value).getDate() + 1)) } // Less than the next day
                ],
            }),
            'after': value => ({ [sequelize.Op.gte]: new Date(new Date(value).setDate(new Date(value).getDate() + 1)) }),
            'onOrAfter': value => ({ [sequelize.Op.gte]: new Date(value) }),
            'before': value => ({ [sequelize.Op.lte]: new Date(value) }),
            'onOrBefore': value => ({ [sequelize.Op.lte]: new Date(new Date(value).setDate(new Date(value).getDate() + 1)) }),
        };

        const whereClause = {};

        if (
            filterField && filterField != 'null' &&
            filterOperator && filterOperator != 'null' &&
            operatorsWithValues[filterOperator] &&
            ((filterOperator !== 'isEmpty' && filterOperator !== 'isNotEmpty') ? filterValue : true)
        ) {
            whereClause[filterField] = operatorsWithValues[filterOperator](filterValue);
        }

        return whereClause;
    },
    replaceDashWithUnderscore: (inputString) => {
        return inputString.replace(/-/g, '_');
    },
    generateSimplePassword: (length) => {
        const charset = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";
        let password = "";

        for (let i = 0; i < length; i++) {
            const randomIndex = Math.floor(Math.random() * charset.length);
            password += charset.charAt(randomIndex);
        }

        return password;
    },
    dateInUnix: () => {
        const currentDate = new Date();
        return Math.floor(currentDate.getTime() / 1000);
    },
    generateInvoiceId: (userId) => {
        const date = new Date();
        const year = date.getFullYear();
        const unix = Math.floor(date.getTime() / 1000);
        const month = ('0' + (date.getMonth() + 1)).slice(-2);
        const day = ('0' + date.getDate()).slice(-2);
        return `${year}/INV/${month}-${day}/${userId}/${unix}`;
    }
}
