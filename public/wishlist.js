




function displayItem(item){
    const body = document.querySelector('body')
    const card = document.createElement('div')
    const name = document.createElement('h2')
    const edit = document.createElement('button')
    const deleteBtn = document.createElement('button')
    const description = document.createElement('p')
    const price = document.createElement('h4')
    const link = document.createElement('a')
    const linkText = document.createElement('h4')
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
    card.appendChild(edit)
    card.appendChild(deleteBtn)
    body.appendChild(card)
    card.classList.add('card')
    card.id = `item${item.productId}`
    body.id = 'card'
    price.class = 'price'
    deleteBtn.id = item.productId
    deleteBtn.addEventListener('click', deleteItem)
    deleteBtn.textContent = 'Delete'
    edit.id = item.productId
    edit.addEventListener('click', editItem)
    edit.textContent = 'Edit'
}

function editItem(event){
    const body = document.querySelector('body')
    const item = document.getElementById(`item${event.target.id}`)
    const itemEdit = document.createElement('div')
    itemEdit.innerHTML = `
    <input type="text" id="editName" placeholder="Item Name">
    <input type="text" id="editDescription" placeholder="Item Description">
    <input type="text" id="editPrice" placeholder="Item Price">
    <input type="text" id="editLink" placeholder="Link To Item">
    <button type="submit" id="submitItem">Submit</button>`

    body.replaceChild(itemEdit, item)

    const editName = document.getElementById(`editName`)
    const editDescription = document.getElementById(`editDescription`)
    const editPrice = document.getElementById(`editPrice`)
    const editLink = document.getElementById(`editLink`)
    const submitItem = document.getElementById(`submitItem`)

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

// window.addEventListener('DOMContentLoaded', getAllItems)
getAllItems()