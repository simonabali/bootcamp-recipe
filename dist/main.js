$("#search").on("click", input, function(){
    let searchedTerm = $("input").val()
    $.get(`/${searchedTerm}`, function(result){
//not finished
    })
})


let handlebarManager= function () {
const source = $('#recipe-template').html();
const template = Handlebars.compile(source);
let newHTML = template({//not finished})
$('#resultsArea').append(newHTML);  
}