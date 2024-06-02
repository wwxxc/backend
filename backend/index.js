const express = require('express');
const bodyParser = require('body-parser');
const sequelize = require('./config/database');

const authRouter = require('./routes/auth');
const transactionRouter = require('./routes/transactions');
const dashboardRouter = require('./routes/dashboard');

const app = express();
const port = 4000;

app.use(bodyParser.json());
app.use('/auth', authRouter);
app.use('/transactions', transactionRouter);
app.use('/dashboard', dashboardRouter);

sequelize.authenticate().then(() => {
  console.log('Database connected...');
}).catch(err => {
  console.log('Error: ' + err);
});

app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`);
});
