const validateHeader = (req, res, next) => {
    if (req.method === 'POST' && (req.path === '/createUser' || req.path === '/createOrder')) {
        const isFreeAppUser = req.headers.isfreeappuser;
        if (!isFreeAppUser) {
          return res.status(400).json({ message: 'Header isFreeAppUser is missing' });
        }
        req.body.isFreeAppUser = isFreeAppUser === 'true';
    }
    next();

}

module.exports.validateHeader = validateHeader