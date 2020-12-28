const express = require('express');
const app = express();
const session = require('cookie-session');
const userController = require('./controllers/userController');
const restaurantController = require('./controllers/restaurantController');
const formidable = require('express-formidable');

const key1 = "key1";
const key2 = "key2";

app.use(formidable());
app.set('view engine', 'ejs');

app.get('/', userController.get_home_page);

app.use('*', (req,res,next)=>{
    if(req.session.userid){
      next();  
    }else{
      req.session = null;  
      res.redirect('/');  
    }   
  });

app.use(session({
    name: 'search',
    keys: [key1,key2],
    maxAge: 1*60*1000
}));

app.get('/read', restaurantController.handle_read);

app.get('/edit', restaurantController.handle_edit);

app.post('/update', restaurantController.handle_update);

app.get('/delete',restaurantController.handle_delete);
    

app.get('/*', (req,res) => {
    res.status(404).render('fail', {message: `${req.path} - Unknown request!` });
})

app.listen(app.listen(process.env.PORT || 8099));