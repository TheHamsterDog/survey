import Post from '../models/post';
import User from '../models/user';
import mongoose = require('mongoose');
import auth from '../middleware/auth';
import { check, validationResult } from 'express-validator';
import express = require('express');
const router = express.Router();
router.get('/', [auth], async (req: any, res: any) => {
    const user = await User.findById(req.user);
    if (!user) {
        return res.status(400).json({ msg: 'user not found' });
    }
    try {
        const post = await Post.find({ user: user.id });
        if (post.length === 0) {

            // console.log('Not made a single post');

            return res.status(400).json({ msg: 'The User Has Not Made A Single Post' })
        }
        // if(!post){
        //     return res.status(404).status('user hasn\'t made a post yet ')
        // }
        // console.log('made atleast a post');
        return res.json({ msg: post })

    }

    catch {
        return res.status(500).json({ msg: 'server Error' })
    }

})

router.get('/:id', async (req, res) => {
    try {
        const post = await Post.findById(req.params.id);
        if (!post) {
            return res.status(400).json({ erros: ['post not found'] });
        }
        return res.json({ msg: post });
      
    }
    catch {
        return res.status(400).json({ erros: ['post not found'] });
    }

})
router.get('/user/:id', async (req, res) => {
    try {
        const post = await Post.find({ user: req.params.id })
        return res.json({ msg: post })
    }
    catch (e) {
        return res.status(400).send('They don\'t have any posts')
    }
})
// router.post('/infinite', [check('from', 'from is required'), check('to', 'to is required')], async (req: any, res: any) => {
//     const errors = validationResult(req);
//     console.log(req.body.to + req.body.from);
//     if (!errors.isEmpty()) {
//         return res.status(400).json({ errors: errors.array() });
//     }
//     try {
//         const post = await Post.find().sort({ date: -1 }).skip(Number(req.body.from)).limit(Number(req.body.to))
//         return res.json({ msg: post })
//     }
//     catch (e) {
//         return res.status(500).send('server error')
//         console.log(e);

//     }
// })
router.post('/', [auth, check('title', 'title is required').not().isEmpty(), check('description', 'description is required').not().isEmpty()], async (req: any, res: any) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }
    try {
        const user = await User.findById(req.user);
        if (user.isVerified) {


            const { title, description, questions } = req.body;
            if (questions.length <= 0) {
                return res.status(400).json({ msg: 'invalid request' });

            }
            else {
                questions.forEach(async (question: any) => {

                    if (question.type === 'text' || question.type === 'number' || question.type === 'date' || question.type === 'email' || question.type === 'url'  || question.type === 'tel' || question.type==='color') {
                        console.log('request valid');
                        const post = new Post({
                            title, description, questions, user: req.user})
                          await post.save();
                        return res.status(200).json({ post })

                    }
                    else {
                        return res.status(400).json({ msg: 'invalid request' });
                    }


                });
                // console.log(validation);

          
            }



        }
        else {
            return res.status(401).json({ msg: 'YOu are not verified' });
        }
    }
    catch {
        return res.status(500).json({ msg: 'server error' });
    }
})
router.post('/respond/:id', async (req: any, res: any)=>{
    
    try{
        const post = await Post.findById(req.params.id);

        if(!post){
            return res.status(400).json({ msg: 'Post Not Found' });
        }
        console.log(req.body);
            
        if(!req.body.responses || req.body.responses.length === 0){
            console.log(req.body.responses);
            console.log(req.body.responses.length);
            return res.status(400).json({ msg: 'Invalid request' });
        }
        post.responses=[...post.responses, req.body.responses];
        await post.save()
        res.json({
            msg:'response Stored'
        });
    }
    catch{
        res.status(500).json({ msg:'Server Error'});
    }
})
router.delete('/:id', [auth], async (req: any, res: any) => {
    console.log('Attempted to delete')
    const errors = validationResult(req);
    if (!req.params.id) {
        return res.status(400).json({ msg: 'not found' })
    }
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array });
    }
    const post = await Post.findById(req.params.id);
    if (!post) {
        return res.status(400).json({ errors: ['Post not found'] })
    }
    const user = await User.findById(req.user);
    if (post.user.toString() === user._id.toString()) {
        await post.delete();

        return res.json({ msg: 'the post has been deleted' });
    }
    return res.status(401).json({ error: 'You are not autorized to take that action' });

})
router.put('/', [auth, check('id', 'Can\'t find post').not().isEmpty(), check('title', 'title is required').not().isEmpty(), check('description', 'description is required').not().isEmpty(), check('image', 'image is required').not().isEmpty(), check('paypal', 'paypal me link is required').not().isEmpty()], async (req: any, res: any) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }
    try {
        const { title, description, image, id, questions } = req.body
        console.log(title, description, image);

        let post = await Post.findById(id);
        if (questions.length <= 0) {
            return res.status(400).json({ msg: 'invalid request' });

        }
        else {
            questions.forEach((question: any) => {

                if (question.type === 'text' || questions.type === 'number' || questions.type === 'date' || questions.type === 'email' || questions.type === 'radio' || questions.type === 'checkbox') {
                    console.log('request valid');

                }
                else {
                    return res.status(400).json({ msg: 'invalid request' });
                }


            });

            if (!post) {
                return res.status(400).json({ errors: ['post not found'] });
            }
            const user = await User.findById(req.user);
            if (post.user.toString() !== user._id.toString()) {
                return res.status(401).json({ errors: ['You are not authorized to take that action'] });
            }
            post.title = title,
                post.description = description;
            post.image = image;
            post.question = questions;
            await post.save()
            return res.status(200).json({ post })
        }
    }
    catch (e) {
        console.log(e);

        return res.status(500).json({ msg: 'server error' });
    }
});
// router.get('/search/:text/:to/:from', async (req, res) => {
//     console.log(`to :- ${req.params.to}`);
//     console.log('route hit');


//     try {

//         console.log(req.params.text);
//         const posts = await Post.find({
//             $text: {
//                 $search: req.params.text
//             }

//         }).sort({ date: -1 }).skip(Number(req.params.from)).limit(Number(req.params.to))
//         if (posts.length < 1) {
//             return res.status(400).json({ msg: 'None of the posts match your query' });
//         }
//         return res.json({ msg: posts });
//     }
//     catch (e) {
//         return res.status(400).json({ msg: 'None of the posts match your query' });
//     }
// });

module.exports = router;
export default router;
