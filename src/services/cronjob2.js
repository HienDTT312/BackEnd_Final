/* eslint-disable no-await-in-loop */
const { CronJob } = require('cron');
const _ = require('lodash');
const moment = require('moment-timezone');
const logger = require('./loggerService');
const { COMMISSION_TYPES, PAYMENT_REPORT_SOURCE } = require('../helpers/enum.js');
const dbInstances = require('../bootstrap/neo4j')();
const { delay } = require('../helpers/helper');
const {
  fetchingAffiliateCommissionsFromCellXpertApi,
  commitAffiliateCommissionsToMongo,
} = require('../services/affiliateService');
const { findingMatchedCommissionForAcustomReport } = require('../services/pammService');
const { fetchingPammCommissionsFromSimple2TradePlatform } = require('../services/simple2TradeService');

const broadcastDailyReportEmail = require('./broadcastDailyReportEmail').default;

try {
  moment.tz.setDefault('Europe/Athens');
} catch (e) {
  logger.error(e.message);
}


const autoApproveAndPayTick = () => {
  // autoApproveAndPay();
  createMissingCommissionConfigNodes();
};
const simple2TradeCronInitializer = () => {
  try {
    logger.info('simple2trade cron just started');
    const startTime = moment().utc().add(-1, 'day').startOf('day').format('DD/MM/YYYY hh:mm a'); // '13/08/2021 12:00 AM';
    const endTime = moment().utc().add(-1, 'day').endOf('day').format('DD/MM/YYYY hh:mm a'); // '13/08/2021 11:59 PM';
    fetchingPammCommissionsFromSimple2TradePlatform(startTime, endTime);
  } catch (e) {
    logger.error(e.message);
  }
};

const onComplete = () => {};
exports.dailyReport = async () => {
  const autoPayandApproveJob = new CronJob(
    '30 6 * * *',
    autoApproveAndPayTick,
    onComplete,
    true,
    'Europe/Athens',
  ); // same timezone
  const affiliateCommissionCron = new CronJob(
    '30 9 * * *',
    fetchingAffiliateCommissionsAndGeneratingTheReport,
    onComplete,
    true,
    'Europe/Athens',
  );

  const simple2TradeCron = new CronJob(
    '30 7 * * *',
    simple2TradeCronInitializer,
    onComplete,
    true,
    'Europe/Athens',
  ); // same timezone
  autoPayandApproveJob.start();
  affiliateCommissionCron.start();
  simple2TradeCron.start();
};
