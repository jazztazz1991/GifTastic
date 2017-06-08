var topics = ["Finding Nemo","Finding Dory","Lilo and Stitch","Shrek"];
var queryURL;

 
btnCreate();
gifFind();
clickEvent();
//functions
function btnCreate(){
    $("#nav").empty();
    for(var i = 0; i < topics.length; i++){
        var topicBtn = $("<button>");
        queryURL = "http://api.giphy.com/v1/gifs/search?q="+topics[i]+"&api_key=dc6zaTOxFJmzC&limit=100&rating=pg&sort=relative";        
        topicBtn.addClass("topic-button");
        topicBtn.attr("data-URL", queryURL);
        topicBtn.html(topics[i]);
        $("#nav").append(topicBtn);
    }
}
function gifFind(){
$("#find-gif").on("click", function(event) {
    event.preventDefault();
    var userGif = $("#gif-input").val().trim();
    topics.push(userGif);
    console.log(topics);
    btnCreate();
    clickEvent();
 });
}
function clickEvent(){
$(".topic-button").on("click",function(){ 
    $("#gifs").empty()
    var myUrl = $(this).attr("data-URL");
        $.ajax({
                url: myUrl,
                method: "GET"
            }).done(function(response){
                for(var j = 0; j < 10; j++){
                $("#gifs").append("<div class='gifDiv'> <img src='"+response.data[j].images.fixed_height_still.url+"' class='gif'> <p>rating: "+response.data[j].rating+"</p>  </div>");
                }
            });
});
}