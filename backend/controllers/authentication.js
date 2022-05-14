const router = require('express').Router()
const db = require('../models')
const bcrypt =  require('bcrypt')

const { User } = db

router.post('/', async (req, res) => {
    let user = await User.findOne({
        where: {email: req.body.email}
    })
    
    if(!user || !await bcrypt.compare(req.body.password, user.passwordDigest)){
        res.status(404).json({
            message: `Could not find user with the provided username and password`
        })
    }else{
        req.session.userId = user.userId
        res.status(200).json({ user })
    }
})

router.get('/profile', async (req,res) => {
    console.log(req.session.userId)
    try {
        let user = await User.findOne({
            where:{ userId: req.session.userId}
        })
        res.json(user)
    } catch (error) {
        res.json(null)
    }
})

router.post('/super-important-route', async (req, res) => {
    if(req.session.userId){
        console.log('Do the really super important thing')
        res.send('done')
    } else {
        console.log('You are not authorized to do the super important thing')
        res.send('Denied')
    }
})

module.exports = router