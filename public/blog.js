function displayPost(post){
    let body = document.getElementById('blog-container')
    let card = document.createElement('div')
    let title = document.createElement('h2')
    let edit = document.createElement('button')
    let deleteBtn = document.createElement('button')
    let bodyText = document.createElement('p')
    let buttonsContainer = document.createElement('div')
    buttonsContainer.id = 'buttons-container'
    title.textContent = post.title
    bodyText.textContent = post.body
    card.appendChild(title)
    card.appendChild(bodyText)
    card.appendChild(buttonsContainer)
    buttonsContainer.appendChild(edit)
    buttonsContainer.appendChild(deleteBtn)
    body.appendChild(card)
    card.classList.add('card')
    card.id = `post${post.postId}`
    title.classList.add('display-6')
    deleteBtn.id = post.postId
    deleteBtn.classList = "delete-blog"
    deleteBtn.addEventListener('click', deletePost)
    deleteBtn.textContent = 'Delete'
    edit.classList = "edit-blog"
    edit.id = post.postId
    edit.addEventListener('click', editPost)
    edit.textContent = 'Edit'
}

function editPost(event){
    let container = document.getElementById('blog-container')
    let post = document.getElementById(`post${event.target.id}`)
    let postEdit = document.createElement('div')
    postEdit.innerHTML = `
    <input type="text" id="editTitle" placeholder="Title">
    <input type="text" id="editBody" placeholder="Body">
    <button type="submit" id="submitPost">Submit</button>`

    container.replaceChild(postEdit, post)

    let editTitle = document.getElementById(`editTitle`)
    let editBody = document.getElementById(`editBody`)
    let submitPost = document.getElementById(`submitPost`)

    submitPost.addEventListener('click', () => {
        let body = {
            title: editTitle.value,
            body: editBody.value,
        }
        axios.put(`http://localhost:4000/api/posts/${event.target.id}`, body).then(res => {
            location.reload()
        })
    })
    
}

function deletePost(){
    axios.delete(`http://localhost:4000/api/posts/${event.target.id}`).then(res => location.reload())
}

function getAllPosts(){
    axios.get('http://localhost:4000/api/posts').then(res => res.data.forEach(element => {
        displayPost(element)
    }))
}

function getTopTwo(){
    axios.get('http://localhost:4000/api/homeposts').then(res => res.data.forEach(element => {
        displayItem(element)
    }))
}

function showInputs(){
    let inputForm = document.getElementById('inputForm')
    inputForm.classList.remove('invisible')
}

function addNewPost(){
    let titleInput = document.getElementById('createTitle')
    let bodyInput = document.getElementById('createBody')

    axios.post('http://localhost:4000/api/posts', {
        title: titleInput.value,
        body: bodyInput.value,
    }).then(() => location.reload())
}



// Event listeners
document.getElementById('addPost').addEventListener('click', showInputs)
document.getElementById('submitNewPost').addEventListener('click', addNewPost)
getAllPosts()