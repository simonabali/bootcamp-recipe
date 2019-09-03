const express = require("express")
const path = require("path")
const request = require("request")

//DECLARE the app
const app = express()

//SERVE THE DIR CLIENT FILES 
app.use(express.static(path.join(__dirname, '/dist')))
app.use(express.static(path.join(__dirname, '/node_modules')))

//SET Root Route
app.get("/", function (req, response) { })

//SET Sanity Route
app.get("/sanity", function (req, response) {
    response.send("OK")
})

//SET Recipes Route
app.get("/recipes/:ingredient", function (req, response) {
    const ingredient = req.params.ingredient

    request(`https://recipes-goodness.herokuapp.com/recipes/${ingredient}`, function (error, res, body) {
        //You'll receive an object that looks like { result: [RECIPES] }
        //receives a string that needs to be parsed
        let data = JSON.parse(body)

        let relevantRecipes = data.results.map(r => {
            return {
                r: {
                    title: r.title,
                    ingredients: r.ingredients,
                    image: r.href
                }
            }
        })
        // why is the response.send here? inside the request and not outside it?
        response.send(relevantRecipes)
    })

})

//Set-up the Server Port and make it listen
const port = 8080
app.listen(port, function () {
    console.log("This server runs on " + port)
})