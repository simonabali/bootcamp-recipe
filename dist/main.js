
//handlebar manager or render
let handlebarManager = function (data) {
    const source = $('#recipe-template').html();
    const template = Handlebars.compile(source);
    let newHTML = template({ data })
    $('#resultsArea').append(newHTML)
}

//function invoked when button clicked
const getRecipes = function () {  
    let food = $("#input").val()
    $.get(`/recipes/${food}`, function (data) {
        handlebarManager(data)
    })
}

//button clicked
$("button").on("click", function () {
    getRecipes($("#input").val())
})