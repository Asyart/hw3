const templateEngin = require('nunjucks')
const express = require('express')
const {body, validationResult} = require('express-validator');
const {getAllRecipes} = require("./models/recipe_mode");
const app = express()

const sqlite3 = require('sqlite3').verbose();

 // connect to db 
const db = new sqlite3.Database('recipes_store.db3', sqlite3.OPEN_READWRITE,(err)=>{
if (err) return console.error(err.message);
else return console.log('connected');
})

//static files that will be used by the rendered html files
app.use(express.static('public'))

// nunjacks
app.use(express.urlencoded({extended: false}))
templateEngin.configure('views', {
    express: app
});

app.get("/", async (req, res) => {
        res.render('index.html', {Recipes: await getAllRecipes()})
    })

app.get("/recipe.html", async (req, res) => {
        res.render('index.html', {Recipes: await getAllRecipes()})
    })

//app.use(bodyParser.json);
//app.post('/', (req,res))
app.listen(5000, () => {
    console.log('listening on http://127.0.0.1:5000')
})
