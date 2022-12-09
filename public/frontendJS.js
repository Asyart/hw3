function seeComments(recipe_id) {
    console.log(recipe_id)
    document.getElementById("block").style.display = 'block';
    //showComments(recipe_id)
}

async function showComments(recipe_id) {
    const response = await fetch(`/recipes/${recipe_id}/comments`, {
        method: "get"
    })
    return response.json()
}
async function sendComment(recipe_id) {
        let commentContainer = document.querySelector(".block")
        let commentArea = document.querySelector(".comments-p")
        let author = document.queryselectord("#author-input").value
        let comment = document.querySelector('#comment-input').value
    let data = { author: author, comment: comment }
    fetch(`/recipes/${recipe_id}/comments`,{
        method: "POST",
        headers:{ 'Content-Type': 'application/json' },
        body: JSON.stringify(data)
        }).then(()=>{
            showComments(recipe_id)
            commentArea.innerHTML=""
            commentContainer.classList.toggle('hidden')
        })}