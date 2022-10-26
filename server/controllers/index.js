let express = require('express');
let router = express.Router();
let mongoose = require('mongoose');
let passport = require('passport');

// Create the User Model instance
let userModel = require('../models/user')
let User = userModel.User; //alias

module.exports.displayHomePage = (req, res, next) => {
    //if a user logged in, display the "Display Name", otherwise show nothing
    res.render('index', {title: 'Home', displayName: req.user ? req.user.displayName : ''});
}

module.exports.displayAboutPage = (req, res, next) => {
    res.render('index', {title: 'About', displayName: req.user ? req.user.displayName : ''});
}

module.exports.displayProductsPage = (req, res, next) => {
    res.render('index', {title: 'Products', displayName: req.user ? req.user.displayName : ''});
}

module.exports.displayServicesPage = (req, res, next) => {
    res.render('index', {title: 'Services', displayName: req.user ? req.user.displayName : ''});
}

module.exports.displayContactPage = (req, res, next) => {
    res.render('index', {title: 'Contact', displayName: req.user ? req.user.displayName : ''});
}

module.exports.displayLoginPage = (req, res, next) => {
    // check if the user is already logged in
    if(!req.user)
    {
        res.render('auth/login', 
        {
            // when the user is there, then return the display name
            // otherwise display nothing 
            title: 'Login', 
            message: req.flash('loginMessage'), 
            displayName: req.user ? req.user.displayName: ''
        })
    } else {
        return res.redirect('/');
    }
}

// Check if the username and password are correct or not
module.exports.processLoginPage = (req, res, next) => {
    passport.authenticate('local', 
    (err, user, info) => {
        // server err?
        if(err) {
            return next(err);
        } 
        // is there a user login error?
        if(!user) {
            req.flash('loginMessage', 'Authentication Error');
            return res.redirect('/login');
        }
        req.login(user, (err) => {
            // server error?
            if(err) {
                return next(err);
            }
            return res.redirect('/book-list');
        });
    }) (req, res, next);
}

module.exports.displayRegisterPage = (req, res, next) => {
    // check if the user is not already logged in
    if(!req.user) {
        res.render('auth/register', {
            title: 'Register', 
            message: req.flash('registerMessage'), 
            displayName: req.user ? req.user.displayName: ''
        });
    } else {
        return res.redirect('/');
    }
}

module.exports.processRegisterPage = (req, res, next) => {
    // instantiate a user object
    let newUser = new User({
        username: req.body.username, 
        //password: req.body.password,
        email: req.body.email, 
        displayName: req.body.displayName
    });

    User.register(newUser, req.body.password, (err) => {
        if(err) {
            console.log("Error: Inserting New User");
            if(err.name == "UserExistsError") {
                req.flash(
                    'redisterMessage', 
                    'Registration Error: User Already Exists!'
                );
                console.log('User Already Exists!')
            }
            return res.render('auth/register', {
                title: 'Register', 
                message: req.flash('registerMessage'), 
                displayName: req.user ? req.user.displayName: ''
            });
        } else {
            // if no error exists, then registration is successful

            // redirect the usr and authenticate them

            return passport.authenticate('local')(req, res, () => {
                res.redirect('/book-list')
            });
        }
    })
}

module.exports.performLogout = (req, res, next) => {
    req.logout(function(err) {
        if (err) {
          return next(err);
        };
    res.redirect('/');
    });
}