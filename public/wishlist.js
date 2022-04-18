function displayItem(item){
    let body = document.getElementById('wishlist-container')
    console.log(body)
    let card = document.createElement('div')
    let name = document.createElement('h2')
    let edit = document.createElement('button')
    let deleteBtn = document.createElement('button')
    let description = document.createElement('p')
    let price = document.createElement('h4')
    let link = document.createElement('a')
    let linkText = document.createElement('h4')
    let buttonsContainer = document.createElement('div')
    buttonsContainer.id = 'buttons-container'
    link.appendChild(linkText)
    link.setAttribute('href', `${item.location}`)
    linkText.textContent = 'Find Here'
    price.textContent = `$${item.price}`
    name.textContent = item.name
    description.textContent = item.description
    card.appendChild(name)
    card.appendChild(description)
    card.appendChild(price)
    card.appendChild(link)
    card.appendChild(buttonsContainer)
    buttonsContainer.appendChild(edit)
    buttonsContainer.appendChild(deleteBtn)
    body.appendChild(card)
    name.classList.add('display-6')
    card.classList.add('card')
    card.id = `item${item.productId}`
    price.class = 'price'
    deleteBtn.classList = "delete-blog"
    deleteBtn.id = item.productId
    deleteBtn.addEventListener('click', deleteItem)
    deleteBtn.textContent = 'Delete'
    edit.classList = "edit-blog"
    edit.id = item.productId
    edit.addEventListener('click', editItem)
    edit.textContent = 'Edit'
}

function editItem(event){
    let container = document.getElementById('wishlist-container')
    let item = document.getElementById(`item${event.target.id}`)
    let itemEdit = document.createElement('div')
    itemEdit.innerHTML = `
    <input type="text" id="editName" placeholder="Item Name">
    <input type="text" id="editDescription" placeholder="Item Description">
    <input type="text" id="editPrice" placeholder="Item Price">
    <input type="text" id="editLink" placeholder="Link To Item">
    <button type="submit" id="submitItem">Submit</button>`

    container.replaceChild(itemEdit, item)

    let editName = document.getElementById(`editName`)
    let editDescription = document.getElementById(`editDescription`)
    let editPrice = document.getElementById(`editPrice`)
    let editLink = document.getElementById(`editLink`)
    let submitItem = document.getElementById(`submitItem`)

    submitItem.addEventListener('click', () => {
        let body = {
            name: editName.value,
            description: editDescription.value,
            price: editPrice.value,
            location: editLink.value
        }
        axios.put(`http://localhost:4000/api/items/${event.target.id}`, body).then(res => {
            location.reload()
        })
    })
    
}

function deleteItem(){
    axios.delete(`http://localhost:4000/api/items/${event.target.id}`).then(res => location.reload())
}

function getAllItems(){
    axios.get('http://localhost:4000/api/items').then(res => res.data.forEach(element => {
        displayItem(element)
    }))
}

function getTopThree(){
    axios.get('http://localhost:4000/api/homeitems').then(res => res.data.forEach(element => {
        displayItem(element)
    }))
}

function showInputs(){
    let inputForm = document.getElementById('inputForm')
    inputForm.classList.remove('invisible')
}

function addNewItem(){
    let nameInput = document.getElementById('createName')
    let descriptionInput = document.getElementById('createDescription')
    let priceInput = document.getElementById('createPrice')
    let linkInput = document.getElementById('createLink')

    axios.post('http://localhost:4000/api/items', {
        name: nameInput.value,
        description: descriptionInput.value,
        price: priceInput.value,
        location: linkInput.value
    }).then(() => location.reload())
}



// Event listeners
document.getElementById('addItem').addEventListener('click', showInputs)
document.getElementById('submitNewItem').addEventListener('click', addNewItem)

getAllItems()