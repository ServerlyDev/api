const rateLimit = require('express-rate-limit');
const { ipKeyGenerator } = require('express-rate-limit');

const metricsLimiter = rateLimit({
  windowMs: 60 * 1000,
  max: process.env.RATE_LIMIT_METRICS || 100,
  message: 'Trop de requêtes de métriques, veuillez réessayer plus tard',
  standardHeaders: true,
  legacyHeaders: false,
  keyGenerator: (req) => {
    return req.user?.userId || ipKeyGenerator(req);
  }
});

const apiLimiter = rateLimit({
  windowMs: 60 * 1000,
  max: process.env.RATE_LIMIT_API || 200,
  message: 'Trop de requêtes API, veuillez réessayer plus tard',
  standardHeaders: true,
  legacyHeaders: false,
  keyGenerator: (req) => {
    return req.user?.userId || ipKeyGenerator(req);
  }
});

module.exports = {
  metricsLimiter,
  apiLimiter
};
