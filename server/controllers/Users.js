import mongoose from "mongoose";
import users from '../models/auth.js';

export const getAllUsers= async(req, res) =>{
    try {
        const allUsers= await users.find();
        
        const allUserDetails =[]
        allUsers.forEach(user => {
            allUserDetails.push(user)
        })
        res.status(200).json(allUserDetails);
    } catch (error) {
        res.status(404).json({message: error.message})
    }
}

export const updateProfile = async(req,res) => {
    const {id: _id} = req.params;
    const {name,about,tags} = req.body;

    if(!mongoose.Types.ObjectId.isValid(_id)){
        return res.status(404).send('Service Unavailable')
    }

    try {
        const updatedProfile= await users.findByIdAndUpdate(_id,{ $set: {'name': name, 'about':about, 'tags':tags}}, {new :true})
        res.status(200).json(updatedProfile)
    } catch (error) {
        res.status(405).json({message: error.message})
    }
}

export const updateLoginInfo = async(req,res) => {
    const {id: _id} = req.params;
    const {loginHistory} = req.body;
    console.log(loginHistory)
    if(!mongoose.Types.ObjectId.isValid(_id)){
        return res.status(404).send('Service Unavailable')
    }
    try {
        const loginData= await users.findById(_id);
        console.log(loginData);
        const updatedLoginHistory=loginData?.loginHistory.length > 0 ? [...loginData.loginHistory,loginHistory] : [loginHistory]
        const updateLoginHistory= await users.findByIdAndUpdate(_id,{ $set: {'loginHistory': updatedLoginHistory}}, {new :true})
        res.status(200).json(updateLoginHistory)
    } catch (error) {
        res.status(405).json({message: error.message})
    }
}