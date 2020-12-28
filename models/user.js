const assert = require('assert');

const dbName = 'restaurants';
const MongoClient = require('mongodb').MongoClient;

const mongourl = 'mongodb+srv://Marcocheung898:Marcocheung898@cluster0.odcke.mongodb.net/restaurants?retryWrites=true&w=majority';




exports.login = (username, password, callback)=>{
    if((username=='student'||username=='demo') && password==''){
      callback(true);

    }else{
      callback(false);
    }
  }
  