const userModel = require('../models/user');
const formidable = require('express-formidable');


exports.get_home_page = (req,res)=>{
    res.render('login');  
  }
exports.processLogin = (req,res)=>{
  const form = new formidable.IncomingForm();
  username = userModel.login.Username;
  password = userModel.login.Password;
  userModel.login(username, password, (status)=>{
    if(status){  
      req.session.username = usernameGetFromLoginForm;
      res.redirect('/read');  
    }else{  
      res.status(500).render('fail', "fail message");
    }
  });
}