

exports.middlewaresGlobal = (req,res, next) => {
    res.locals.errors = req.flash('errors');
    res.locals.success = req.flash('success');
    res.locals.user = req.session.user;
    next()
}

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

exports.loginRequired = (req,res,next) => {
    if(!req.session.user){
        req.flash('errors', "Você precisa fazer login para cadastrar contatos.");
        
        return res.redirect('/');
    }
    next()
}