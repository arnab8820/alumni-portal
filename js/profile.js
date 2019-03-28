var url_string = window.location.href; // www.test.com?filename=test
var url = new URL(url_string);
var id = url.searchParams.get("id");

var base_url = "profile.html?id=";

$.ajax({
	url: "scripts/fetch_profile.php",
	type: "POST",
	data: {"id" : id},
	dataType: "json",
	cache : false,
	success: function(data) {
		// body...
		console.log(data);
		if(data["error"])
		{
			$(".container").css("display", "none");
			$(".not-found").css("display", "block");
		}
		else
		{
			$("#user-image").html("<img src=\"images/alumni/"+data["personal"][0]["image"]+"\" class=\"user-icon\">");
			$("#name").html(data["personal"][0]["name"]);
			$("title").html(data["personal"][0]["name"]);
			$("#academic").html("<p>Course: "+data["personal"][0]["degree"]+"<br>Passed: "+data["personal"][0]["yop"]+"</p>");
			var contact_html = "<p>Phone: "+data["personal"][0]["country_code"]+" "+data["personal"][0]["phone1"];
				if(data["personal"][0]["phone2"] == 0)
				{
					contact_html=contact_html+"<br>Email: "+data["personal"][0]["email"]+"</p>";
				}
				else
				{
					contact_html=contact_html+", "+data["personal"][0]["country_code"]+" "+data["personal"][0]["phone2"]+"<br>Email: "+data["personal"][0]["email"]+"</p>";
				}
			$("#contact").html(contact_html);
			if(data["working"])
			{
				console.log(data["work"].length);
				$("#post").html(data["work"][data["work"].length - 1]["designation"]+" at "+data["work"][data["work"].length - 1]["company"])
				for (var i = 0; i <data["work"].length; i++) {
					$(".work-timeline").append("<div class=\"work-item\">"+
						"<h6>"+data["work"][i]["yoj"]+"</h6>"+
						"<span><p>Joined "+data["work"][i]["company"]+" as "+data["work"][i]["designation"]+"</p></span>"+
					"</div><br>");
				}
			}
			else
			{
				$("#post").html("Not yet working");
				$(".work-timeline").html("No information found!");
				$(".work-timeline").css({"color":"white", "padding":"15px"});
			}
			//$(".container").fadeIn(1500);
		}
	}
});