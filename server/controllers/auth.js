import Jwt from "jsonwebtoken";
import bcrypt from 'bcryptjs';
import users from '../models/auth.js'


export const signup = async(req,res)=>{
    const { name, email, password} = req.body;
    try{
        const existinguser = await users.findOne({email})
        if(existinguser){
            return res.status(404).json({ message: "User already Exits."})
        }

        const hashedpassword= await bcrypt.hash( password, 12)
        const newUser= await users.create({ name,email,password: hashedpassword})
        const token= Jwt.sign({ email: newUser.email, id: newUser._id}, process.env.JWT_SECRET, { expiresIn: '1h'})
        res.status(200).json({ result: newUser, token})
    }catch(error){
        res.status(500).json("Something went wrong...")
    }
}

export const login = async(req,res)=>{
    const { email, password} = req.body;
    try{
        const existinguser = await users.findOne({email});
        if(!existinguser){
            return res.status(404).json({ message: "User don't Exit."})
        }

        const isPassowrdCrt= await bcrypt.compare(password, existinguser.password)
        if(!isPassowrdCrt){
            return res.status(400).json({ message: "Invalid credentials"})
        }

        const token= Jwt.sign({ email: existinguser.email, id: existinguser._id}, process.env.JWT_SECRET, { expiresIn: '1h'})
        res.status(200).json({ result: existinguser, token})
    }catch(error){
        res.status(500).json("Something went wrong...")
    }
}