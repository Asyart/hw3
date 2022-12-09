const sqlite3 = require('sqlite3')
const sqlite = require('sqlite')
 // connect to db 
 const getDbConnection = async () => {
    return await sqlite.open({
        filename: 'recipes_store.db3',
        driver: sqlite3.Database
    })
}


async function getAllRecipes(){
    const db = await getDbConnection();
    const recipes = await db.all('SELECT * FROM recipes')
    await db.close()

    // log 
    //console.log(recipes)
    
    return recipes
}

async function getRecipeDetail(recipe_id) {
    const db = await getDbConnection();
    const recipes = await db.get(`SELECT * FROM recipes where id = ${recipe_id}`)
    const ingredients = await db.all(`SELECT * FROM ingredients where recipe_id = ${recipe_id}`)
    const method = await db.all(`SELECT * FROM method where recipe_id = ${recipe_id}`)

    await db.close()
    let recipeDetails = {
        id: recipes.id,
        title:  recipes.title,
        subtitle:  recipes.subtitle,
        make:  recipes.make,
        cook_time:  recipes.cook_time,
        difficulty:  recipes.difficulty,
        image:  recipes.image,
        ingredient:ingredients,
        step:method
      }
        //console.log(recipeDetails.step);
        //return {recipes,ingredients,method}
    return recipeDetails
}

async function getComments(recipe_id) {
    const db = await getDbConnection();
    const comments = await db.all(`SELECT * FROM comments where recipe_id = ${recipe_id}`)
    await db.close()
    let Comments = comments
    
    // log 
    //console.log(Comments)

    return Comments
}

async function addComment(recipe_id, comment) {
    const auth= comment.author;
    const text= comment.text;
    const db = await getDbConnection();
    sql=`INSERT INTO comments(author, comment ,recipe_id) VALUES (?,?,?)`
    const comments = await db.run(sql,[auth,text,recipe_id])
    await db.close()

    
    return
}
// ### the style of comment object should be like this ###
// let com={
//     auther:'adhm'
//     ,text:'adhm comment'
// }
//addComment(1,com);
//console.log(getComments(1));
module.exports = {getAllRecipes,getRecipeDetail,getComments,addComment}
//console.log(getAllRecipes());

