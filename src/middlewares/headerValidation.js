const validateHeader = (req, res, next) => {
    try {
      if (req.method === 'POST' && (req.path === '/createUser' || req.path === '/createOrder')) {
          const isFreeAppUser = req.headers.isfreeappuser;
          if (!isFreeAppUser) {
            return res.status(401).send({
              status: false,
              msg: 'Header isFreeAppUser is missing',
            });
          }
          req.body.isFreeAppUser = isFreeAppUser === 'true' ? true : false;
      }
      next();
    } catch (err) {
      res.status(500).json({
        status: false,
        msg: err.message,
      });
    }
}

module.exports.validateHeader = validateHeader