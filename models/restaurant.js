const assert = require('assert');

const dbName = 'restaurants';
const MongoClient = require('mongodb').MongoClient;

const mongourl = 'mongodb+srv://Marcocheung898:Marcocheung898@cluster0.odcke.mongodb.net/restaurants?retryWrites=true&w=majority';





exports.createRestaurant = (criteria, callback) => {
        db.collection('restaurants').inserOne(criteria, (err,docs)=>{
        assert.equal(err,null);
        console.log("inserted one document " + JSON.stringify(doc));
        const restaurant_id = docs.ops[0]._id;  
      callback(restaurant_id);
    });
  }

  
  exports.readRestaurant = (criteria, projection, callback) => {
    let cursor = db.collection('restaurants').find(criteria, projection);
    console.log(`findDocument: ${JSON.stringify(criteria)}`);
    cursor.toArray((err,docs)=>{
        assert.equal(err,null);
        console.log("Connected successfully to server");
        let DOCID = {};
        DOCID['_id'] = ObjectID(criteria._id)
        findDocument(db, DOCID, (docs) => { 
            client.close();
            console.log("Closed DB connection");
            res.status(200).render('searchresult', {restaruant: docs[0]});
        });

        callback(docs);
    });
  }

  exports.updateRestaurant = (criteria, action, callback)=>{
    let cursor = db.collection('restaurants').updateOne(criteria, action,(err,result)=>{
        assert.equal(err,null);
        var DOCID = {};
        var updateDoc = {};
        DOCID['_id'] = ObjectID(req.fields._id);
        updateDoc['name'] = req.fields.name;
        updateDoc['borough'] = req.fields.borough;
        updateDoc['cuisine'] = req.fields.cuisine;
        updateDoc['street'] = req.fields.address.street;
        updateDoc['building'] = req.fields.address.building;
        updateDoc['zipcode'] = req.fields.address.zipcode;
        updateDoc['owner'] = req.fields.owner;
        if (req.files.filetoupload.size > 0) {
            fs.readFile(req.files.filetoupload.path, (err,data) => {
                assert.equal(err,null);
                updateDoc['photo'] = new Buffer.from(data).toString('base64');
                updateRestaurant(DOCID, updateDoc,(results) => {
                    res.status(200).render('message',{message: `Updated ${results.result.nModified} document(s)`})
                })
            }
            )}else{
                updateDocument(DOCID, updateDoc, (results) => {
                    res.status(200).render('message', {message: `Updated ${results.result.nModified} document(s)`})
                }
                )};
        console.log("update was successful");
        callback(!!result.matchedCount);  
    });
  }

  exports.deleteRestaurant = (criteria, callback) => {
    db.collection('restaurants').deleteOne(criteria, (err,obj)=>{
        assert.equal(err,null);
        var DOCID = {};
        var updateDoc = {};
        DOCID['_id'] = ObjectID(req.fields._id);
        callback(!!obj.deletedCount);  
    });
  }