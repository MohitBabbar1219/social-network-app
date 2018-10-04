const router = require('express').Router();
const passport = require('passport');
const mongoose = require('mongoose');

const validatePostInput = require('./../../helpers/postValidation');

// Load user model
const Profile = require('./../../models/Profile');
const Post = require('../../models/Post');

router.post('/', passport.authenticate('jwt', {session: false}), (req, res) => {

    const {errors, isValid} = validatePostInput(req.body);

    if(!isValid) {
        return res.status(400).json(errors);
    }

    const newPost = new Post({
        text: req.body.text,
        name: req.body.name,
        avatar: req.body.avatar,
        user: req.user.id
    });
    newPost.save().then(post => res.json(post));
});

router.get('/', (req, res) => {
    Post.find({}).populate('user').sort({date: -1}).then(posts => {
        res.json({posts});
    }).catch(err => res.status(404).json('couldn\'t get the posts'));
})

router.get('/:id', (req, res) => {
    Post.findById(req.params.id).then(post => {
        if (post) {
            return res.json(post);
        } else {
            return res.status(404).json({post: 'post with this id does not exist'});
        }
    }).catch(err => res.status(404).json('couldn\'t get the posts'));
});

router.post('/like/:id', passport.authenticate('jwt', {session: false}), (req, res) => {
    Profile.findOne({user: req.user.id}).then(profile => {
        Post.findById(req.params.id).then(post => {
            if (post.likes.filter(like => like.user.toString() === req.user.id).length > 0) {
                return res.status(400).json({ message: 'User already liked this post' });
              }
    
              // Add user id to likes array
              post.likes.unshift({ user: req.user.id });
              post.save().then(post => res.json(post));
        }).catch(err => res.status(404).json('couldn\'t like the post'));
    });
});

router.post('/unlike/:id', passport.authenticate('jwt', {session: false}), (req, res) => {
    Profile.findOne({user: req.user.id}).then(profile => {
        Post.findById(req.params.id).then(post => {
            if (post.likes.filter(like => like.user.toString() === req.user.id).length === 0) {
                return res.status(400).json({ message: 'User has not liked this post' });
            }
            const removeIndex = post.likes.map(item => item.user.toString()).indexOf(req.user.id);
            post.likes.splice(removeIndex, 1);
            post.save().then(post => res.json(post)); 
        }).catch(err => res.status(404).json('couldn\'t like the post'));
    });
});

router.delete('/:id', passport.authenticate('jwt', {session: false}), (req, res) => {
    Profile.findOne({user: req.user.id}).then(profile => {
        Post.findById(req.params.id).then(post => {
            if (post) {
                if (post.user.toString() !== req.user.id) {
                    return res.status(401).json({message: 'user not authorized'});
                } else {
                    const postToBeDeleted = {...post};
                    post.remove().then(() => res.status(200).json({deleted: true, deletedPost: postToBeDeleted}));
    
                }
            } else {
                return res.status(404).json({post: 'post with this id does not exist'});
            }
        }).catch(err => res.status(404).json('couldn\'t delete the post'));
    });
});


router.post('/comment/:id', passport.authenticate('jwt', {session: false}), (req, res) => {
    
    const {errors, isValid} = validatePostInput(req.body);

    if(!isValid) {
        return res.status(400).json(errors);
    }
    Post.findById(req.params.id).then(post => {
        const newComment = {
            text: req.body.text,
            name: req.body.name,
            avatar: req.body.avatar,
            user: req.user.id
        };
        post.comments.unshift(newComment);
        post.save().then(post => res.json(post));
    }).catch(err => res.status(400).json({message: 'comment could not be posted'}));
});

router.delete('/comment/:id/:commentId', passport.authenticate('jwt', {session: false}), (req, res) => {

    Post.findById(req.params.id).then(post => {
        if(post.comments.filter(comment => comment._id.toString() === req.params.commentId).length === 0) {
            return res.status(404).json({message: 'comment does not exist'});
        }

        const removeIndex = post.comments.map(comment => comment._id.toString()).indexOf(req.params.commentId);
        post.comments.splice(removeIndex, 1);
        post.save().then(newPost => res.json(newPost));
        // if(post.comments.filter(comment => comment))
    }).catch(err => {
        console.log(err);
        res.status(400).json({message: 'comment could not be deleted'})
    });
});


module.exports = router;