var base_url = "profile.html?id=";

var url_string = window.location.href; // www.test.com?filename=test
var url = new URL(url_string);
var bcode = url.searchParams.get("bcode");
var name = url.searchParams.get("name");
var degree = url.searchParams.get("degree");
var yop = url.searchParams.get("yop");

var limit = 20;
var offset = 0;
function load_profile(id) {
    // body...
    window.open(base_url+id, "_blank");
}
$.ajax({
	url: "scripts/search.php",
	type: "POST",
	data: {"bcode" : bcode, "name" : name, "degree" : degree, "yop" : yop, "limit" : limit, "offset" : offset},
	dataType: "json",
    cache: false,
    success: function(data){
    	console.log(data);
    	if(data["error"])
        {
            $(".page").html("Sorry! No more results found!");

        }
        else
        {
            for(i=0; i<data["result"].length; i++)
            {
                $("#results").append("<div class=\"col-md-6\">" + 
                    "<div class=\"row result\" onclick=\"load_profile("+data["result"][i]["reg_no"]+");\">" +
                        "<div class=\"col-sm-3\"><img src=\"images/alumni/" + data["result"][i]["image"] + "\" class=\"icon\"></div>" + 
                        "<div class=\"col-sm-9\"><h4>" + data["result"][i]["name"] + "</h4>" + data["result"][i]["degree"] + ", " + data["result"][i]["yop"] + "</div>" +
                    "</div>" + 
                    "</div>");
            }
            offset=offset+limit;        	
        }
    },
    error: function(request, error){
    	console.log("Error sending!");
    	console.log(arguments);
        console.log(error);
    }
});

$(window).scroll(function() {
   if($(window).scrollTop() + $(window).height() > $(document).height() - 1) {
        $.ajax({
            url: "scripts/search.php",
            type: "POST",
            data: {"bcode" : bcode, "name" : name, "degree" : degree, "yop" : yop, "limit" : limit, "offset" : offset},
            dataType: "json",
            cache: false,
            success: function(data){
                console.log(data);
                if(data["error"])
                {
                    $(".page").html("Sorry! No more results found!");
                }
                else
                {
                    for(i=0; i<data["result"].length; i++)
                    {
                        $("#results").append("<div class=\"col-md-6\">" + 
                            "<div class=\"row result\" onclick=\"load_profile("+data["result"][i]["reg_no"]+");\">" +
                                "<div class=\"col-sm-3\"><img src=\"images/alumni/" + data["result"][i]["image"] + "\" class=\"icon\"></div>" + 
                                "<div class=\"col-sm-9\"><h4>" + data["result"][i]["name"] + "</h4>" + data["result"][i]["degree"] + ", " + data["result"][i]["yop"] + "</div>" +
                            "</div>" + 
                            "</div>");
                    }
                    offset=offset+limit;           
                }
            },
            error: function(request, error){
                console.log("Error sending!");
                console.log(arguments);
                console.log(error);
            }
        });

       // getData();
   }
});