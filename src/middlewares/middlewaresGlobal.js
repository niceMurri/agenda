exports.checkErrCsrf = (err, req, res, next) => {
    if(err && err.code == 'EBADCSRFTOKEN'){
        console.log(err)
        return next(err);
    }
}

exports.csrfMiddleware = (req,res,next) => {
    res.locals.csrfToken = req.csrfToken();
    next();
}