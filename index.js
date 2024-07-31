const app = require('express')();
const bodyParser = require('body-parser');
const cors = require('cors');
require('dotenv').config();

const sequelize = require('./versions/v1/services/mysql/index');
const buildAssociations = require('./versions/v1/services/mysql/relations');

app.use(bodyParser.json());
app.use(cors());

app.use('/api', require('./versions/v1/index'));
app.use('/', (_, res) => res.json({ status: 'working' }));

const connectNow = async () => {
    try {
        await sequelize.sync({ alter: eval(process.env.SEQUELIZE_ALTER), logging: false });
        buildAssociations();
        app.listen(process.env.APP_PORT);
        console.log('Sync Successful');
    } catch (error) {
        console.error('Error:', error);
        process.exit(1);
    }
}

connectNow(); 