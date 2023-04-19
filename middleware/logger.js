const log4js = require('log4js');
log4js.configure('./config/log4js_setting.json'); // NOTE: from root
const logger = log4js.getLogger('debug');

exports.requestInfo = (req, res, next) => {
    logger.debug('method:', req.method, ', url:', req.url, ', params:', req.params, ' , query:', req.query);
    next();
};
