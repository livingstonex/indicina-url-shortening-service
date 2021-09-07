
module.exports = {
  // Add res.body to express res object (for logging and other purposes)
  InjectResponseBody(req, res, next) {
    const originalWrite = res.write;
    const originalEnd = res.end;

    // Start Response Timer
    req._requestTime = Date.now();

    // Chunks array to store response body
    const chunks = [];

    // Stream write
    res.write = function (chunk) {
      chunks.push(chunk);
      // Write Response Stream
      originalWrite.apply(res, arguments);
    };

    // End response
    res.end = function (chunk) {
      if (chunk) chunks.push(chunk);
      // End response cycle
      originalEnd.apply(res, arguments);

      res._responseTime = Date.now() - req._requestTime;

      if (res._headers['content-type'] === 'application/json; charset=utf-8') {
        res.body = Buffer.concat(chunks).toString('utf8');
      } else {
        res.body = `{"data":"${res._headers['content-type'] || 'x'}"}`;
        // res.body is a String!!!
      }
    };

    return next();
  },
};
