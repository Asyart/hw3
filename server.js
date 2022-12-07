const templateEngin = require('nunjucks')
const express = require('express')
const {body, validationResult} = require('express-validator');
const {getAllTasks} = require("./models/recipe_mode");
const app = express()

const sqlite3 = require('sqlite3').verbose();
let sql;

 // connect to db 
const db = new sqlite3.Database('recipes_store.db3', sqlite3.OPEN_READWRITE,(err)=>{
if (err) return console.error(err.message);
else return console.log('connected');
})

//sql = `SELECT * FROM recipes`;

app.use(bodyParser.json);
app.post('/', (req,res))

