const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const sequelize = require('./config/database');

const authRouter = require('./routes/auth');
const sliderRouter = require('./routes/slider');
const transactionRouter = require('./routes/transactions');
const dashboardRouter = require('./routes/dashboard');

const app = express();
app.use(cors());
const port = 4000;
const allowList = ['http://localhost:3000', 'http://192.168.1.15:3000'];

const checkOrigin = (req, res, next) => {
    const origin = req.headers.origin || req.headers.referer;
    if (allowList.includes(origin)) {
        next();
    } else {
        res.status(403).json('403 Forbidden');
    }
};

app.use(bodyParser.json());
app.use('/auth', checkOrigin, authRouter);
app.use('/slider', checkOrigin, sliderRouter);
// app.use('/transactions', transactionRouter);
// app.use('/dashboard', dashboardRouter);

sequelize.authenticate().then(() => {
  console.log('Database connected...');
}).catch(err => {
  console.log('Error: ' + err);
});

app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`);
});
