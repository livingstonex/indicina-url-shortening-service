const express = require('express');
const { encodeURL, decodeUrl, statistics } = require('../controllers/url');

const router = express.Router();

router
  .route('/encode')
  .post(encodeURL);

router
  .route('/decode')
  .get(decodeUrl);

router
  .route('/statistic/:code')
  .get(statistics);

  module.exports = router;