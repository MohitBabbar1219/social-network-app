const router = require('express').Router();
const mongoose = require('mongoose');
const passport = require('passport');

const User = require('../../models/User');
const Profile = require('../../models/Profile');

const validateProfileInput = require('./../../helpers/profileValidations');
const validateExperienceInput = require('./../../helpers/experienceValidations');
const validateEducationInput = require('./../../helpers/educationValidations');

router.get('/', passport.authenticate('jwt', {session: false}), (req, res) => {
    const errors = {};
    Profile.findOne({user: req.user.id}).populate('user', ['name', 'email', 'avatar']).then(profile => {
        if (!profile) {
            errors.noProfile = "There is no profile for this user";
            return res.status(200).json(errors);
        }
        return res.json({profile});
    }).catch(err => res.status(400).json(err));
});

router.post('/', passport.authenticate('jwt', {session: false}), (req, res) => {
    const {errors, isValid} = validateProfileInput(req.body);

    if (!isValid) {
        return res.status(400).json(errors);
    }

    const profileFields = {};
    profileFields.user = req.user.id;
    if (req.body.handle) profileFields.handle = req.body.handle;
    if (req.body.company) profileFields.company = req.body.company;
    if (req.body.website) profileFields.website = req.body.website;
    if (req.body.location) profileFields.location = req.body.location;
    if (req.body.bio) profileFields.bio = req.body.bio;
    if (req.body.status) profileFields.status = req.body.status;

    if (typeof req.body.skills !== 'undefined') {
      profileFields.skills = req.body.skills.split(',');
    }

    // Social
    profileFields.social = {};
    if (req.body.youtube) profileFields.social.youtube = req.body.youtube;
    if (req.body.twitter) profileFields.social.twitter = req.body.twitter;
    if (req.body.facebook) profileFields.social.facebook = req.body.facebook;
    if (req.body.linkedin) profileFields.social.linkedin = req.body.linkedin;
    if (req.body.instagram) profileFields.social.instagram = req.body.instagram;

    Profile.findOne({user: req.user.id}).then(profile => {
        if (profile) {
            profileFields.handle = profile.handle;
            Profile.findOneAndUpdate({user: req.user.id}, {$set: profileFields}, {new: true}).then(profile => {
                res.json({profile});
            })
        } else {
            Profile.findOne({handle: profileFields.handle}).then(profile => {
                if(profile) {
                    errors.handle = 'This handle already exists';
                    res.status(200).json({errors});
                } else {
                    new Profile(profileFields).save().then(profile => res.json(profile));
                }
            });
        }
    })

});


router.get('/handle/:handle', (req, res) => {
    const errors = {};
    Profile.findOne({handle: req.params.handle}).populate('user', ['name', 'email', 'avatar']).then(profile => {
        if (!profile) {
            errors.profile = 'There is no profile by that handle';
            return res.status(404).json(errors);
        }
        res.json(profile);
    }).catch(err => res.status(404).send({profile: 'Couldn\'t find a profile for this user'}));
});

router.get('/user/:userId', (req, res) => {
    const errors = {};
    Profile.findOne({user: req.params.userId}).populate('user', ['name', 'email', 'avatar']).then(profile => {
        if (!profile) {
            errors.profile = 'There is no profile by that id';
            return res.status(404).json(errors);
        }
        res.json(profile);
    }).catch(err => res.status(404).send({profile: 'Couldn\'t find a profile for this user'}));
});

router.get('/all', (req, res) => {
    const errors = {};
    Profile.find({}).populate('user').then(profiles => {
        if (!profiles) {
            errors.noProfiles = 'There are no profiles';
            return res.status(200).json(errors);
        }
        res.json({profiles})
    }).catch(err => res.status(200).send({profile: 'Couldn\'t find any profiles'}));
});

router.post(
    '/experience',
    passport.authenticate('jwt', { session: false }),
    (req, res) => {
      const { errors, isValid } = validateExperienceInput(req.body);
  
      // Check Validation
      if (!isValid) {
        // Return any errors with 400 status
        return res.status(400).json(errors);
      }
  
      Profile.findOne({ user: req.user.id }).then(profile => {
        const newExp = {
          title: req.body.title,
          company: req.body.company,
          location: req.body.location,
          from: req.body.from,
          to: req.body.to,
          current: req.body.current,
          description: req.body.description
        };
  
        // Add to exp array
        profile.experience.unshift(newExp);
  
        profile.save().then(profile => res.json({profile}));
      });
    }
  );
  
  router.post(
        '/education',
        passport.authenticate('jwt', { session: false }),
        (req, res) => {
        const { errors, isValid } = validateEducationInput(req.body);
    
        // Check Validation
        if (!isValid) {
            // Return any errors with 400 status
            return res.status(200).json(errors);
        }
    
        Profile.findOne({ user: req.user.id }).then(profile => {
            const newEdu = {
            school: req.body.school,
            degree: req.body.degree,
            fieldofstudy: req.body.fieldofstudy,
            from: req.body.from,
            to: req.body.to,
            current: req.body.current,
            description: req.body.description
            };
    
            // Add to exp array
            profile.education.unshift(newEdu);
    
            profile.save().then(profile => res.json({profile}));
        });
    }
  );
  
  router.delete(
    '/experience/:exp_id',
    passport.authenticate('jwt', { session: false }),
    (req, res) => {
      Profile.findOne({ user: req.user.id })
        .then(profile => {
          // Get remove index
          const removeIndex = profile.experience
            .map(item => item.id)
            .indexOf(req.params.exp_id);
  
          // Splice out of array
          profile.experience.splice(removeIndex, 1);
  
          // Save
          profile.save().then(profile => res.json({profile}));
        })
        .catch(err => res.status(200).json(err));
    }
  );
  
  router.delete(
    '/education/:edu_id',
    passport.authenticate('jwt', { session: false }),
    (req, res) => {
      Profile.findOne({ user: req.user.id })
        .then(profile => {
          // Get remove index
          const removeIndex = profile.education
            .map(item => item.id)
            .indexOf(req.params.edu_id);
  
          // Splice out of array
          profile.education.splice(removeIndex, 1);
  
          // Save
          profile.save().then(profile => res.json({profile}));
        })
        .catch(err => res.status(200).json(err));
    }
  );
  
  router.delete(
    '/',
    passport.authenticate('jwt', { session: false }),
    (req, res) => {
      Profile.findOneAndRemove({ user: req.user.id }).then(() => {
        User.findOneAndRemove({ _id: req.user.id }).then(() =>
          res.json({ success: true })
        );
      });
    }
  );

module.exports = router;