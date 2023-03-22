/* eslint-disable no-await-in-loop */
const { CronJob } = require('cron');
const moment = require('moment-timezone');
const logger = require('./loggerService');


const onComplete = () => {
  logger.info('Cronjob done!')
};
exports.dailyReport = async () => {
  const autoUpdateProduct = new CronJob(
    '30 1 * * 1-6',
    onComplete,
    true,
    'Asia/Bangkok',
  ); // same timezone
  autoUpdateProduct.start();
};
