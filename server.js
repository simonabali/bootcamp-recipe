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
debugger
//SET Recipes Route
app.get("/recipes/:ingredient", function (req, response) {
    const ingredient = req.params.ingredient
    //console.log(ingredient)
    // response.send(`Here's a fucking ${ingredient} mate!`)

    request(`https://recipes-goodness.herokuapp.com/recipes/${ingredient}`, function (error, res, body) {
        //You'll receive an object that looks like { result: [RECIPES] }
        console.log("error:", error);
        console.log("statusCode:", res && res.statusCode);
        console.log("body:", body)

        // //received string that needs to be parsed
        let data = JSON.parse(body)
        //console.log(data)
        let recipeList = []

        let result = data.results.filter(r => {
            //r.ingredients.includes(ingredient))
            let joinedArrayIngr = r.ingredients.join(" ")
            return joinedArrayIngr.includes(ingredient)
        })
        result.forEach(re => {
            recipe = { 
                title: re.title,
                strArea: re.strArea,
                ingredients: re.ingredients,
                image: re.href
             }
            console.log(recipe)
            recipeList.push(recipe)
        })

        response.send(recipeList)
    })

})




//Set-up the Server Port and make it listen
const port = 8080
app.listen(port, function () {
    console.log("This server runs on " + port)
})