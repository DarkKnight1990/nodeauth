let User = require('../models/user');


exports.registerUser = async (req, res, next) => {
    let newUser = new User({
        name: req.body.name,
        email: req.body.email,
        username: req.body.username,
        password: req.body.password,
        profileimage: req.file ? req.file.filename : 'noimage.jpg'
    });

    User.createUser(newUser, (err, usr) => {
        if (err) throw err;
        console.log(usr);
    });

    req.flash('success', 'You are registered and can login');

    res.location('/');
    res.redirect('/');
}