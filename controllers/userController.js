const User = require('../model/userModel');
const express = require("express");
const router = express.Router();
const bcrypt = require("bcryptjs");

const registerLoad = async (req, res) => {
  try {
    res.render('register');
  } catch (error) {
    console.log(error.message);
  }
};

const register = async (req, res) => {

try {
  console.log(req.body)
    const salt = await bcrypt.genSalt(10);
    const passwordHash = await bcrypt.hashSync(req.body.password,salt);

    const user = new User({
        name : req.body.name,
        email : req.body.email,
        image : 'images/' + req.file.filename,
        password: passwordHash
    });
    console.log(passwordHash);
    await user.save();
    res.render('register',{ message: 'registration successfully!' })

} catch (error) {
    console.log(error);
}
}

const loadLogin = async(req,res) =>{
  try {

    res.render('login');
    
  } catch (error) {
    console.log(error.message);
  }
}

const login = async(req,res) =>{
  try {
    
    const email = req.body.email;
    const password = req.body.password;

    const userData = await User.findOne({ email:email });
      if(userData){

        const passwordMatch = await bcrypt.compare(password,userData.password);

        if(passwordMatch){

            req.session.user = userData;
            res.redirect('/dashBoard');

        }else{  
          res.render('login',{message:'Email & Password is Incorrect!'});
        }

      }else{
        res.render('login',{message:'Email & Password is Incorrect!'});
      }

  } catch (error) {
    console.log(error.message);
  }
}

const logout = async(req,res) =>{
  try {

    req.session.destroy();
    res.redirect('/login');
    
  } catch (error) {
    console.log(error.message);
  }
}

const dashBoard = async(req,res) =>{
  try {
    var users = await User.find({_id: {$nin: [req.session.user._id]}})
    res.render('dashBoard',{ user: req.session.user, users:users});
    
  } catch (error) {
    console.log(error.message);
  }
}

module.exports = { register, registerLoad,dashBoard,logout,login,loadLogin };