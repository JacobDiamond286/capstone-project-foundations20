const express = require('express')
const cors = require('cors')

const app = express()

const { 
    getItems,
    updateItem,
    createItem,
    deleteItem,
    getTopThree,
    createPost,
    getPosts,
    getTopTwo,
    updatePost,
    deletePost

} = require('./controller.js')

app.use(express.json())

app.use(cors())

//Endpoints

app.get('/api/items', getItems)
app.post('/api/items', createItem)
app.put('/api/items/:id', updateItem)
app.delete('/api/items/:id', deleteItem)

app.get('/api/posts', getPosts)
app.post('/api/posts', createPost)
app.put('/api/posts/:id', updatePost)
app.delete('/api/posts/:id', deletePost)

app.get('/api/homeitems', getTopThree)
app.get('/api/homeposts', getTopTwo)

app.listen(4000, () => console.log('Up on 4000'))