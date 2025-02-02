import express from 'express';
import User from '../models/User.js';
import { body, validationResult } from 'express-validator';
import bcrypt from 'bcryptjs'
import jwt from "jsonwebtoken";
import dotenv from 'dotenv';

// Load environment variables from the .env file
dotenv.config();

const jwtSecret = process.env.JWT_SECRET;                           //To generate token for sessions

const router = express.Router()                                                      // router used to splitting routes into separate file which is call by app.use()\

router.post("/createUser", [                                                        //Route to Signs in new user to save data in mongo
    body('email').isEmail(),
    body('name').isLength({ min: 6 }),
    body('password', 'Incorrect password').isLength({ min: 6 })]
    , async (req, res) => {
        const error = validationResult(req);
        if (!error.isEmpty()) {
            return res.status(400).json({ errors: error.array() });
        }

        const salt= await bcrypt.genSalt(10);
        let setPassword=await bcrypt.hash(req.body.password,salt)
        try {
            let existingUser = await User.findOne({ email: req.body.email });
        if (existingUser) {
            return res.status(400).json({ success: false, message: "Email already exists. Please log in.(Already a User)" });
        }
            await User.create({
                name: req.body.name,
                password: setPassword,
                email: req.body.email,
                location: req.body.location
            })
            res.json({ success: true });
        } catch (error) {
            console.log(error)
            res.json({ success: fail });
        }
    })

router.post("/loginUser", [                                                        //Route to login user cheking password in mongo
    body('email').isEmail(),
    body('password', 'Incorrect password').isLength({ min: 6 })]
    , async (req, res) => {
        const error = validationResult(req);
        if (!error.isEmpty()) {
            return res.status(400).json({ errors: error.array() });
        }
        let email = req.body.email;
        try {
            let userData = await User.findOne({ email });
            if (!userData) {                                              //checks if data is in mongo user exist
                return res.status(400).json({ errors: "Try Login with correct credentials" });
            }

            const pwdCompare=await bcrypt.compare(req.body.password,userData.password);       
            if (!pwdCompare) {                //checks if password correct
                return res.status(400).json({ errors: "Try Login with correct credentials" });
            }
            
            const data={
                user:{
                    id:userData.id
                }
            }

            const authToken = jwt.sign(data,jwtSecret)
            res.json({ success: true,authToken:authToken });
        } catch (error) {
            console.log(error)
            res.json({ success: fail });
        }
    })

export default router;
