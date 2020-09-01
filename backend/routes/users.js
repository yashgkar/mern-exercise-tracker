const router = require('express').Router();
let User = require('../models/user.model');

router.route('/').get((req,res)=> {
    User.find()
    .then(users => res.json(users))
    .catch(err => res.status(400).json('Error:'+ err));
});

router.route('/add').post((res, req) => {
    const username = req.body.username; //here's the TypeError username of undefined

    const newUser = new User({username});

    newUser.save()
    .then(()=> res.json('User added!'))
    .catch(err => res.status(400).json('Error:'+ err));
})

module.exports = router;