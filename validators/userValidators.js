const { body, validationResult } = require('express-validator')

exports.createValidator = (method) => {
    switch (method) {
        case 'registerUser':
            return [
                body('name').not().isEmpty().withMessage('Name cannot be empty'),
                body('email').isEmail().withMessage('Please provide a valid email'),
                body('username').not().isEmpty()
                    .withMessage('Username cannot be empty')
                    .isAlpha()
                    .withMessage('Username should consist of only alphabets'),
                body('password').not().isEmpty().withMessage('Password is required'),
                body('password2').not().isEmpty().withMessage('Confirm password is required')
                    .custom((value, { req }) => {
                        if (value != req.body.password) {
                            throw new Error('Password confirmation does not match!')
                        }
                        return true;
                    })
            ]
        default:
            return []
    }
}

exports.checkValidation = (req, res, next) => {
    const result = validationResult(req);
    if (result.isEmpty()) {
        return next();
    }

    let form = {
        name: req.body.name,
        username: req.body.username,
        email: req.body.email
    }
    const extractedErrors = [];
    result.array().map(err => extractedErrors.push({ 'msg': err.msg }));
    return res.render('register', {
        errors: extractedErrors,
        form: form
    })
}

