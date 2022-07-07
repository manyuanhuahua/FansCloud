const { validationResult } = require('express-validator');
const handleValidationErrors = (req, _res, next)=>{
    const validationErrors = validationResult(req);
    // console.log(validationErrors)
    if(!validationErrors.isEmpty()){
        const errors = validationErrors
                .array()
                .map((error)=>(`${error.param}: ${error.msg}`));

        const err = Error('Validation Error');
        err.errors=errors;
        err.status = 400;
        err.title = 'Validation Error';
        next(err)
    };
    next();


};








module.exports={
    handleValidationErrors
}
