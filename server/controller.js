const globalID = 5
const products = [
    {
        productId: 1,
        name: 'Red Dead Redemption 2',
        description: 'Winner of over 175 Game of the Year Awards and recipient of over 250 perfect scores, RDR2 is the epic tale of outlaw Arthur Morgan and the infamous Van der Linde gang, on the run across America at the dawn of the modern age. Also includes access to the shared living world of Red Dead Online.',
        price: 60, 
        location: 'https://store.steampowered.com/app/1174180/Red_Dead_Redemption_2/'
    },
    {
        productId: 2,
        name: 'TOURTECH TT-22M Electronic Drum Kit with Mesh Heads',
        description: 'The TourTech TT-22M Electric Drum Kit combines responsive mesh heads, innovative technology and an impressive array of preset sounds to deliver pro-level response for the home or studio.',
        price: 521.32,
        location: 'https://www.pmtonline.co.uk/tourtech-tt-22m-electric-drum-kit-with-mesh-head'
    },
    {
        productId: 3,
        name: 'Tokyo-H Dragon Ball Fusion Potara Earring Cosplay Costume',
        description: 'High Quality Original Titanium Steel Earring. Goku black Zamas Kaioshin Vegito Gogeta Kibito Kefla Supreme Kai Gowasu.',
        price: 13.50,
        location: 'https://www.amazon.com/Tokyo-H-Dragon-Earrings-Cosplay-Costume/dp/B081ZFVQ6L/ref=asc_df_B081ZFVQ6L/?tag=hyprod-20&linkCode=df0&hvadid=430938287403&hvpos=&hvnetw=g&hvrand=2960361081265600560&hvpone=&hvptwo=&hvqmt=&hvdev=c&hvdvcmdl=&hvlocint=&hvlocphy=9029741&hvtargid=pla-901634410248&psc=1&tag=&ref=&adgrpid=98871180663&hvpone=&hvptwo=&hvadid=430938287403&hvpos=&hvnetw=g&hvrand=2960361081265600560&hvqmt=&hvdev=c&hvdvcmdl=&hvlocint=&hvlocphy=9029741&hvtargid=pla-901634410248'
    },
    {
        productId: 4,
        name: 'Berserk Deluxe Volume 2 Hardcover',
        description: 'The reigning king of adult fantasy manga now in deluxe 7x10 hardcover editions! Born in tragedy, raised in abuse and neglect, young Guts is hardened into a warrior of fearsome prowess and fearless will, drawing the attention of the charismatic Griffith, commander of the elite mercenary legion, the Band of the Hawk. This crossroad will take Guts to fame and glory . . . and to damnation!',
        price: 34,
        location: 'https://www.amazon.com/gp/product/1506711995/ref=ewc_pr_img_2?smid=ATVPDKIKX0DER&psc=1'
    }
]

module.exports = {
    // product funtions
    getItems: (req, res) => {
        res.status(200).send(products)
    },
    getTopThree: (req, res) => {
        res.status(200).send([products[1], products[2]])
    },

    deleteItem: (req, res) => {
        let index = products.findIndex(item => item.productId === +req.params.productId)
        products.splice(index, 1)
        res.status(200).send(products)
    },

    createItem: (req, res) => {
        let { name, description, price, location } = req.body
        let newItem = {
            productId: globalID,
            name,
            description,
            price,
            location
        }
        products.push(newItem)
        res.status(200).send(products)
        globalID++
    },

    updateItem: (req, res) => {
        const { name, description, price, location } = req.body
        let index = products.findIndex(item => item.productId === +req.params.id)
        
        if(index !== -1){
            products[index].name = name ? name : products[index].name
            products[index].description = description ? description : products[index].description
            products[index].price = price ? price : products[index].price
            products[index].location = location ? location : products[index].price
            return res.status(200).send(products)
        }

        res.status(400).send('Unable to edit item')
    }

    // blog functions
}