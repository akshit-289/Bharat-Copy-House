// Routes folder is made to make the different routes for different pages.
// Routes are basically end points or path or url where that particular page can be found
const express = require("express");
//router is a package of express used for dealing with routes
const router = express.Router();
const User = require("../models/User");
// User is a model and we can use it to perform CRUD operations
const bodyParser = require('body-parser');
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
const jwtSecret = "hellomynameisakshitaggarwalandia";
router.use(bodyParser.json());

const { body, validationResult } = require('express-validator');

router.post("/createuser", //username must be an email
[body('email', 'Enter a valid email ID').isEmail(),
body('name', 'name must be more than 5 characters').isLength({ min: 5 }),
// password must be at least 5 chars long
body('password', 'Password must be more than 5 characters long').isLength({ min: 5 })]
,async(req, res)=>{
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
                    // bcrypt.genSalt will create the salt for password and we will
                    // use it in hash function to create the hash. 
    const salt = await bcrypt.genSalt(10);
    let secPassword = await bcrypt.hash(req.body.password, salt);
    try {
     await User.create({
           name: req.body.name,
           password: secPassword,
           email: req.body.email
        })  
    // the below response will be created when after hitting end point we will get something in response.    
    res.json({success: true});
    } catch (error) {
        console.log(error);
        res.json({success:false});
    }
})

router.post("/loginuser",async(req, res)=>{
    let email = req.body.email;
    try {
    //findOne method will check the data which matches with this email and will send it to us    
    let userData = await User.findOne({email});
    if(!userData){
        return res.status(400).json({ errors: "Try logging with correct email ID" })
    }
    // the below response will be created when after hitting end point we will get something in response.   
    
    const pwdCompare = await bcrypt.compare(req.body.password, userData.password);
    console.log(userData.password);
    console.log(req.body.password);
    if(!pwdCompare){
        return res.status(400).json({ errors: "Try logging with correct Password" })
    }
    const data = {
        user:{
            id: userData.id,
            email: userData.email
        }
    }

    // this is authorization token generated from data (payload of user), jwtSecret (verify signature) and the header (we have taken it's default value which is in sign method)
    const authToken = jwt.sign(data, jwtSecret)
    return res.json({success:true, authToken: authToken})
    } catch (error) {
        console.log(error);
        res.json({success:false});
    }
})

module.exports = router;