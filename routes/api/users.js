const router = require('express').Router();
const gravatar = require('gravatar');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const passport = require('passport');

const validateRegisterInput = require('./../../helpers/registerValidations');
const validateLoginInput = require('./../../helpers/loginValidations');
// Load user model
const User = require('./../../models/User');

// jwt secret
const {secret} = require('./../../config/keys');

router.post('/register', (req, res) => {

    const { errors, isValid } = validateRegisterInput(req.body);

    // Check Validation
    if (!isValid) {
        return res.status(400).json(errors);
    }

    User.findOne({email: req.body.email}).then(user => {
        if (user) {
            return res.status(400).json({email: 'Email already exists'});
        } else {
            const avatar = gravatar.url(req.body.email, {
                s: '200', // size
                r: 'pg',   // rating
                d: 'mm'   // default    
            });
            const newUser = new User({
                email: req.body.email,
                name: req.body.name,
                password: req.body.password,
                avatar
            })

            bcrypt.genSalt(10, (err, salt) => {
                bcrypt.hash(newUser.password, salt, (err, hash) => {
                    if (err) {
                        throw err;
                    }
                    newUser.password = hash;
                    newUser.save().then(user => res.status(200).json({status: 'successful', user}));
                });
            })
        }
    });
});

router.post('/login', (req, res) => {

    const { errors, isValid } = validateLoginInput(req.body);

    // Check Validation
    if (!isValid) {
        return res.status(400).json(errors);
    }

    const email = req.body.email;
    const password = req.body.password;

    User.findOne({email}).then(user => {
        if (user) {
            // check password
            bcrypt.compare(password, user.password).then(isMatch => {
                if (isMatch) {
                    // res.status(200).json({message: 'Success'});
                    const payload = {
                        id: user.id,
                        name: user.name,
                        avatar: user.avatar
                    };
                    jwt.sign(payload, secret, {expiresIn: '1d'}, (err, token) => {
                        res.json({
                            success: true,
                            token: 'Bearer ' + token
                        });
                    })
                } else {
                    return res.status(400).json({password: 'Incorrect password'});
                }
            })
        } else {
            return res.status(404).json({"email": "user not found"});
        }
    })
});

router.get('/current_user', passport.authenticate('jwt', {session: false}), (req, res) => {
    res.json({
        name: req.user.name,
        email: req.user.email,
        avatar: req.user.avatar,
        id: req.user.id
    });
});

module.exports = router;