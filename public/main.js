function displayPost(post){
    const main = document.getElementById('topblog')
    const card = document.createElement('div')
    const title = document.createElement('h4')
    const bodyText = document.createElement('p')
    title.textContent = post.title
    bodyText.textContent = post.body
    card.appendChild(title)
    card.appendChild(bodyText)
    main.appendChild(card)
    title.classList.add('display-6')
    card.classList.add('card')
    card.id = `post${post.postId}`
}

function displayItem(item){
    const main = document.getElementById('topwishlist')
    const card = document.createElement('div')
    const name = document.createElement('h4')
    const description = document.createElement('p')
    const price = document.createElement('h4')
    const linkContainer = document.createElement('p')
    const link = document.createElement('a')
    const linkText = document.createElement('h5')
    linkContainer.appendChild(link)
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
    main.appendChild(card)
    name.classList.add('display-6')
    card.classList.add('card')
    card.id = `item${item.productId}`
    price.class = 'price'
}

function getTopTwo(){
    axios.get('http://localhost:4000/api/homeposts').then(res => res.data.forEach(element => {
        displayPost(element)
    }))
}

function getTopThree(){
    axios.get('http://localhost:4000/api/homeitems').then(res => res.data.forEach(element => {
        displayItem(element)
    }))
}

getTopThree()
getTopTwo()