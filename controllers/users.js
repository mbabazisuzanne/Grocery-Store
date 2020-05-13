const mongoose = require('mongoose')
const User =  require('../models/user')

const signup = (req,res) => {
    const user = new User({
        _id: new mongoose.Types.ObjectId(),
        userName: req.body.username,
        email: req.body.email,
        password: req.body.password
    })

    user.save()
        .then(()=>{
            res.status(201).json({
                message: 'User has been added'
            })
        })
        .catch((err)=>{
            res.status(500).json({
                error: err
            })
        })
}

const login = (req,res) => {
    const userLogin = new login({
        _id: new mongoose.Types.ObjectId(),
        userName: req.body.username,
        password: req.body.password
    })
}

module.exports = {signup}
module.exports = {login}