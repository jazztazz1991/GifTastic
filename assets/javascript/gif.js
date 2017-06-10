var topics = ["Finding Nemo","Finding Dory","Lilo and Stitch","Shrek"];
var queryURL;
var myStills=[], myAnimated=[];
var isStill = [true,true,true,true,true,true,true,true,true,true,];

 
btnCreate();
gifFind();
clickEvent();
//functions
function btnCreate(){
    $("#nav").empty();
    for(var i = 0; i < topics.length; i++){
        var topicBtn = $("<button>");
        queryURL = "https://api.giphy.com/v1/gifs/search?q="+topics[i]+"&api_key=dc6zaTOxFJmzC&limit=100&rating=pg&sort=relative";        
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
                    $("#gifs").append("<div class='gifDiv'> <img src='"+response.data[j].images.original_still.url+"' data-index='" + j + "' class='gif'> <p>rating: "+response.data[j].rating+"</p>  </div>");
                    myStills[j] = response.data[j].images.original_still.url; //this still url;
                    myAnimated[j] = response.data[j].images.original.url; //this animated url; 
                } 
                    btnClick(); 
            });
});
}                  
//on click function
function btnClick(){
    console.log("is running");
    $(".gif").on("click",function(){
        var index = $(this).attr("data-index");
        if (isStill[index]=== true){
            //change to moving
            $(this).attr("src", myAnimated[index]);
            //update boolean
            isStill[index] = false;
        }else{
            //change to still
            $(this).attr("src", myStills[index]);
            //update boolean
            isStill[index] = true;
        }
    });
    
}