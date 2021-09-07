const ErrorResponse = require('../utils/errorResponse');
const asyncHandler = require('../middleware/async');
const ShortUrl = require('../models/shortUrl');

/**
  @desc Encode a url
  @route POST /api/v1/encode
  @access PUBLIC
 */
exports.encodeURL = asyncHandler(async (req, res, next) => {
  const fullUrl = req.body.fullUrl;

  if (!fullUrl) return res.status(400).json({ message: 'Please enter a url.' });

  if (!fullUrl) {
    return next(
      new ErrorResponse(`Please enter a url`, 400)
    )
  }

  const response = await ShortUrl.create({ full: fullUrl });

  const encodedUrl = {
    fullUrl: response.full,
    shortUrl: response.short,
  }

    // return res.created({ data: encodedUrl, message: 'Url created successfully.' });
    return res.status(201).json({ status: 'ok', message: 'Url created successfully.', data: encodedUrl });
});

/**
  @desc Decode a url
  @route GET /api/v1/decode
  @access PUBLIC
 */
exports.decodeUrl = asyncHandler(async (req, res, next) => {
  const code = req.body.shortUrl;

  if (!code) {
    return next(
      new ErrorResponse(`Please enter a short url`, 400)
    );
  }

  const shortUrl = await ShortUrl.findOne({ short: code });

  if (!shortUrl) {
    return next(
      new ErrorResponse(`ShortUrl not found with code of ${code}`, 404)
    );
  }

  shortUrl.clicks++
  shortUrl.save();

  const decodedUrl = {
    fullUrl: shortUrl.full
  }

  return res.status(200).json({ status: 'ok', data: decodedUrl });
  // return res.ok({ data: decodedUrl })
});

/**
  @desc Statistics of a short url
  @route GET /api/v1/statistics/:code
  @access PUBLIC
 */
exports.statistics = asyncHandler(async (req, res, next) => {
  const code = req.params.code;

  const shortUrl = await ShortUrl.findOne({ short: code });

  if (!shortUrl) {
    return next(
      new ErrorResponse(`ShortUrl not found with code of ${code}`, 404)
    );
  }

  const stat = {
    fullUrl: shortUrl.full,
    clicks: shortUrl.clicks,
  }

  return res.status(200).json({ status: 'ok', data: stat });
  // return res.ok({ data: stat })
});

