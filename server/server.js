const express = require('express')
const cors = require('cors')

const app = express()

const { 
    getItems,
    updateItem,
    createItem,
    deleteItem,
    getTopThree
} = require('./controller.js')

app.use(express.json())

app.use(cors())

//Endpoints

app.get('/api/items', getItems)
app.post('/api/items', createItem)
app.put('/api/items/:id', updateItem)
app.delete('/api/item/:id', deleteItem)

app.get('/api/homeitems', getTopThree)

app.listen(4000, () => console.log('Up on 4000'))