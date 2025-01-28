const router = require('express').Router();
const User = require('../models/user')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
const auth = require('../middlewares/auth')

//route for registering a new user with validation
router.post('/register', async  (req , res) => {
    const {name , email , password } = req.body;

    // check all the missing fields
    if(!name || !email || !password){
        res.status(404).json({error: "Please fill all the required fields"});
        return false;
    }
    // name validation
    if(name.length > 25 ){
        res.status(404).json({error : "Please name should not be more than 25 characters"})
        return false;
    }
    //email validation
    const EmailRegex =  /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|.(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    if(!EmailRegex.test(email)){
        res.status(404).json({error : "Invalid Email"})
        return false;
    }
    const Emailexist = await User.findOne({email});
    if(Emailexist){
        res.status(404).json({error: "User with that email already exist"})
        return false;
    }
    //password validation
    if(password.length < 6){
        res.status(404).json({error : "password should be at least 6 characters"})
        return false;
    }
    try{
        const hashPassword = await bcrypt.hash(password, 12)
        const newUser = new User({name , email , password: hashPassword})

        //save new user
        const results = await newUser.save();
        res.status(201).json({results})
    }catch(error){
        console.log(error)
    }
})

//route for user login
router.post('/login', async (req , res ) => {
    try{
        const{email , password } = req.body;
        if(!email || !password){
            res.status(404).json({error : "Please fill out all the fields"})
            return false;
        }
        const EmailRegex =  /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|.(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        if(!EmailRegex.test(email)){
            res.status(404).json({error : "Invalid Email"})
            return false;
        }
        //checks whether user is available
    const Userdata = await User.findOne({email});
    if(!Userdata){
        res.status(404).json({error : "Oops!!! , User not found"})
        return false;
    }
    // checks password is valid if email is existing
    const MatchPass = await bcrypt.compare(password , Userdata.password);
    if(!MatchPass){
        res.status(404).json({error : "Invalid email or password"})
        return false;
    }
    //Json web token
    const payload ={_id: Userdata._id};
    const token = jwt.sign(payload, process.env.JWT_SECRET, {expiresIn: "1hr"});
    const user = { ...Userdata._doc, password : undefined}
    return res.status(200).json({token , user})

    }catch(error){
        console.log(error)
        return res.status(500).json({error : err.message})
    }
})

//logged in user
router.get('/me', auth , async (req , res) => {
  return  res.status(200).json({ ...req.user._doc})
})

module.exports = router


