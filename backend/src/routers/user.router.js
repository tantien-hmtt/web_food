import { Router } from 'express'
import { sample_users } from '../data.js';
import jwt from "jsonwebtoken"
import { BAD_REQUEST } from '../constants/httpStatus.js';
import  handler  from 'express-async-handler';
import { UserModel } from '../models/user.model.js';
import bcrypt from 'bcryptjs';
import auth from "../middleware/auth.mid.js";
const PASSWORD_HASH_SALT_ROUNDS = 10;
const router = Router() ; 


router.post ('/login', handler( async  (req,res) => {
    const { email, password } = req.body;
    const user = await UserModel.findOne({email});  


    if(user && ( await bcrypt.compare(password, user.password))){
        res.send(generateTokenResponse(user)); 
        return; 
    }

    res.status(BAD_REQUEST).send("User or password is invalid");
})); 

router.post('/register', handler( async (req,res) => {
    const { username ,name, email, password, address } = req.body; 
    //{ }
    const user = await UserModel.findOne({$or: [{ email }, { username }] })
    if ( user) {
        res.status(BAD_REQUEST).send("User already exits, login"); 
        return ; 
    }

    const hashpass = await bcrypt.hash(password,PASSWORD_HASH_SALT_ROUNDS) ; 
    const newuser = {
        username,
        name, 
        email: email,
        password: hashpass, 
        address, 
    }; 

    const result = await UserModel.create(newuser); 
    res.send(generateTokenResponse(newuser)); 
    if ( result) {
        console.log("sign up success "); 
    }
}))


router.put(
    '/updateProfile',
    auth,
    handler(async (req, res) => {
      const { name, address } = req.body;
      const user = await UserModel.findByIdAndUpdate(
        req.user.id,
        { name, address },
        { new: true }
      );
  
      res.send(generateTokenResponse(user));
    })
  );
  
 

const generateTokenResponse = user => {
    const token = jwt.sign(
        {
            id: user.id, 
            email: user.email, 
            isAdmin: user.isAdmin,
        }, 
        
        process.env.JWT_SECRET, 
        {
            expiresIn: '1d', 
        },
    );

    return {
        id: user.id, 
        emai: user.email, 
        name: user.name, 
        address: user.address, 
        isAdmin: user.isAdmin, 
        token,
    }
};

export default router;