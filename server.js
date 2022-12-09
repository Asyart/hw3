const templateEngin = require('nunjucks')
const express = require('express')
const { body, validationResult } = require('express-validator');
const { getAllRecipes, getRecipeDetail, getComments, addComment } = require("./models/recipe_mode");
const bodyParser = require('body-parser')
const app = express()

const sqlite3 = require('sqlite3').verbose();

// connect to db 
const db = new sqlite3.Database('recipes_store.db3', sqlite3.OPEN_READWRITE, (err) => {
    if (err) return console.error(err.message);
    else return console.log('connected');
})

//static files that will be used by the rendered html files
app.use(express.static('public'))

// nunjacks
app.use(express.urlencoded({ extended: false }))
templateEngin.configure('views', {
    express: app
});

app.get("/", async (req, res) => {
    res.render('index.html', { Recipes: await getAllRecipes() })
})

app.get("/recipe/:recipe_id", async (req, res) => {
    console.log(req.params.recipe_id);
    res.render('recipe.html', { recipeDetails: await getRecipeDetail(req.params.recipe_id), allComments: await getComments(req.params.recipe_id) })
    //let recipeDetails= await getRecipeDetail(req.params.recipe_id)
    //console.log(recipeDetails)
})

// app.get('/recipe/:recipe_id/comments', async(req,res)=>{
//     res.render('recipe.html',{allComments: await getComments(req.params.recipe_id)})
//     //let allComments= await getComments(req.params.recipe_id)
//     //console.log(allComments[1].id)
// })

//send a JSON encoding of the list of comments returned by the getComments(recipe_id)
app.get("/recipe/:recipe_id/comments", async (req, res) => {
    res.json({ Comments: await getComments(req.params.recipe_id) })
})

app.post("/recipe", async (req, res) => {
    console.log(addComment(1, req.body));
    // let recivedComments = addComment //receiving the comments 

})

//app.post('/', (req,res))
app.listen(5000, () => {
    console.log('listening on http://127.0.0.1:5000')
})
