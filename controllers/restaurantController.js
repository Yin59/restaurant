const formidable = require('express-formidable');
const express = require('express');
const app = express();
const fs = require('fs');
const MongoClient = require('mongodb').MongoClient;
const ObjectID = require('mongodb').ObjectID;
const { readRestaurant, updateRestaurant } = require('../models/restaurant');
const mongourl = 'mongodb+srv://Marcocheung898:Marcocheung898@cluster0.odcke.mongodb.net/restaurants?retryWrites=true&w=majority';
const dbName = 'restaurants';




exports.handle_create = (req,res) => {
    const form = new formidable.IncomingForm();
    const client = new MongoClient(mongourl);
    console.log("Connected successfully to server");
    const db = client.db(dbName);

    createRestaurant = (criteria, callback) => {
        client.close();
        console.log("Closed DB connection");
        res.status(200).render('create',{nRestaurants:docs.length, restaurants: docs});
    };
};

exports.handle_read = (req,res) => {
    const form = new formidable.IncomingForm();
    const client = new MongoClient(mongourl);
    console.log("Connected successfully to server");
    const db = client.db(dbName);

    readRestaurant(db, criteria, (docs) => {
        client.close();
        console.log("Closed DB connection");
        res.status(200).render('read',{nRestaurants:docs.length, restaurants: docs});
    });
};

exports.handle_edit = (req,res) => {
    const form = new formidable.IncomingForm();
    const client = new MongoClient(mongourl);
    console.log("Connected successfully to server");
    const db = client.db(dbName);

    updateRestaurant(criteria, updateDoc, (docs) => {
        client.close();
        console.log("Closed DB connection");
        res.status(200).render('edit',{nRestaurants:docs.length, restaurants: docs} );
    });
};


exports.handle_delete = (req,res) => {
    const form = new formidable.IncomingForm();
    const client = new MongoClient(mongourl);
    console.log("Connected successfully to server");
    const db = client.db(dbName);

    deleteRestaurant(criteria,(docs)=>{
        client.close();
        console.log("Closed DB connection");
        res.status(200).render();
    })
}