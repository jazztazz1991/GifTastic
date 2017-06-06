var topics = ["mexican+food","asian+food","bbq","italian+food"];
var queryURL;

btnCreate();
$(".topic-button").click(function(){ 
    $("#gifs").empty()
    var myUrl = $(this).attr("data-URL");
    var gif = $("<div>");
        $.ajax({
                url: myUrl,
                method: "GET"
            }).done(function(response){
                for(var j = 0; j < 10; j++){
                console.log(response.data[j].images.fixed_height.url);
                $("#gifs").append("<img src='"+response.data[j].images.fixed_height.url+"' class='gif'>");
                }
            });
    
                console.log(queryURL);
});





//functions
function btnCreate(){
    for(var i = 0; i < topics.length; i++){
        var topicBtn = $("<button>");
        queryURL = "http://api.giphy.com/v1/gifs/search?q="+topics[i]+"&api_key=dc6zaTOxFJmzC&limit=10&rating=pg&sort=relative";        
        topicBtn.addClass("topic-button");
        topicBtn.attr("data-URL", queryURL);
        topicBtn.html(topics[i]);
        $("#nav").append(topicBtn);
    }
}