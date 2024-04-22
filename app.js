const express = require('express');
const bodyParser = require('body-parser');
const sequelize = require('./config/database');
const quizRoutes = require('./routes/quizRoutes');
const userRoutes = require('./routes/userRoutes');
require('./associations');  

const app = express();
app.use(bodyParser.json());
app.use('/api/quizzes', quizRoutes);
app.use('/api/users', userRoutes);

sequelize.sync({ force: true }).then(() => { 
    console.log('Connected to MySQL and tables created');
    const port = process.env.PORT || 3000;
    app.listen(port, () => console.log(`Listening on port ${port}...`));
}).catch(err => console.error('Error connecting to MySQL', err));
