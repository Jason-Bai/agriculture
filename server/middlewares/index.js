
module.exports = (app) => {
  app.use('/', (req, res, next) => {
    const token =  req.params.access_token || req.headers['X-Access-Token'];
    return next();
    if (!token) {
      return res.status(403).send({
        code: 403,
        message: 'No access token!'
      });
    }
    next()
  });
}
