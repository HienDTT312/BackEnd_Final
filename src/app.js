const express = require('express');
const routes = require('./routes/router');
const app = express()
const cls = require('cls-hooked');
const clsBinder = require('./middlewares/clsBinder');
const routeLogger = require('./middlewares/routeLogger');
const config = require('./configs/config');
const path = require('path');
const cors = require('cors');
//const db = require('./boostraps/mongodbConnection');
const dir = path.join(__dirname, '../public');
const { dailyReport } = require('./services/cronjob');

const ns = cls.createNamespace(config.cls.correlationIdNamespace);

app.use(clsBinder(ns));

app.use(cors());

app.use(express.json());

app.use(express.urlencoded({ extended: true }));

app.use(routeLogger);

app.use(routes);

dailyReport();

//db();
app.use(express.static('public'));

// require('./boostraps/consumer')();

require('./boostraps/mysqlConnection');


module.exports = app;
