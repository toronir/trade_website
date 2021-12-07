const Users = require('../models/userModel')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken');
const { create } = require('../models/userModel');

const userCtrl = {
    register: async (req, res) => {
        try {
            const {name, email, password} = req.body;

            const user = await Users.findOne({email});
            if(user) return res.status(400).json({msg: "Email istnieje"})
            if(password.length < 6)
                return res.status(400).json({msg: "Password conajmniej 6 znakow"})

            const passwordHash = await bcrypt.hash(password, 10)
            const newUser = new Users({
                name, email, password: passwordHash
            })

            // in database saved 

            await newUser.save()

            // jsonwebtoken

            const accestoken = createAccessToken({id: newUser._id})
            const refreshtoken = createRefreshToken({id: newUser._id})
            
            res.cookie('refreshtoken', refreshtoken, {
                httpOnly: true,
                path: '/user/refresh_token'
            })

           res.json({accestoken})
          //  res.json({msg: "Sie udało no"})
        } catch (err) {
            return res.status(500).json({msg: err.message})
        }
    },
    login: async (req, res) => {
        try {
            const {email, password} = req.body;

            const user = await Users.findOne({email})
                if(!user) return res.status(400).json({msg: "User nie istnieje"})

            const isMatch = await bcrypt.compare(password, user.password)
                if(!isMatch) return res.status(400).json({msg: "zle haslo"})

            // create acces token and refresh tokken

            const accestoken = createAccessToken({id: user._id})
            const refreshtoken = createRefreshToken({id: user._id})
            
            res.cookie('refreshtoken', refreshtoken, {
                httpOnly: true,
                path: '/user/refresh_token'
            })

           res.json({accestoken})

        } catch (err) {
            return res.status(500).json({msg: err.message})
        }
    },
    logout: async (req, res) =>{
        try {
            res.clearCookie('refreshtoken',{path: '/user/refresh_token'})
                return res.json({msg: "Wylogowany"})
            
        } catch (err) {
            return res.status(500).json({msg: err.message})
        }
    },
    refreshToken: (req, res) => {
        try {
            const rf_token = req.cookies.refreshtoken;
            if(!rf_token) return res.status(400).json({msg: "Zaloguj sie albo zarejestuj"})

             jwt.verify(rf_token, process.env.REFRESH_TOKEN_SECRET, (err, user) =>{
                 if(err) return res.status(400).json({msg: "Zaloguj sie albo zarejestuj"})
                 const accestoken = createAccessToken({id: user.id})
                 res.json({user, accestoken})
             })

            res.json({rf_token})
        } catch (err) {
            return res.status(500).json({msg: err.message})
        }
       
    },
    getUser: async (req, res) =>{
        try {
            const user = await Users.findById(req.user.id).select('-password')
                if(!user) return res.status(400).json({msg: "użytkownik nie istnieje"})
            
            res.json(user)
        } catch (err) {
            return res.status(500).json({msg: err.message})
        }
    }
}

const createAccessToken = (user) => {
    return jwt.sign(user, process.env.ACCESS_TOKEN_SECRET, {expiresIn: '1d'})
}

const createRefreshToken = (user) => {
    return jwt.sign(user, process.env.REFRESH_TOKEN_SECRET, {expiresIn: '7d'})
}

module.exports = userCtrl