$(document).ready(function() {

  $.ajax({
    url: "scripts/get_message.php",
    type: "GET",
    dataType: "json",
    cache: false,
    success: function(data){
      console.log(data);
      var length = data.length;
      for (var i = 0; i < data.length; i++) {
        $("#message-board").append("<div class=\"notice-item\"><img src=\"images/message_board/"+data[i]["image"]+"\"><h5>"+data[i]["title"]+"</h5><p>"+data[i]["date"]+"</p></div>");
      }
      $("#message-board").owlCarousel({
        items: 2,
        nav : false,
        pagination : false,
        slideSpeed : 600,
        autoplay : false,
        singleItem : false,
        loop: true,
        dots: false,
        responsive:{
            0:{
                items:2,
            },
            768:{
                items:1,
            },
            992:{
                items:2,
            }
        }
      });
    }
  });
  $('.nxtbtn').click(function() {
      $("#message-board").trigger('next.owl.carousel');
  })
  $('.prvbtn').click(function() {
      $("#message-board").trigger('prev.owl.carousel');
  })
  $.ajax({
    url: "scripts/fetch_success.php",
    type: "POST",
    dataType: "json",
    cache: false,
    success: function(data){
      console.log(data);
      var length = data.length;
      for (var i = 0; i < data.length; i++) {
        $("#success-stories").append("<div class=\"row success-item\">"+
            "<div class=\"col-md-3\"><img src=\"images/alumni/"+data[i]["image"]+"\"></div>"+
            "<div class=\"col-md-9 story-text\">"+
              "<div class=\"story\">"+
                "<p>"+data[i]["story"]+"</p>"+
                "<h6>"+data[i]["name"]+" - "+data[i]["degree"]+", "+data[i]["yop"]+"</h6>"+
              "</div>"+
            "</div>"+
          "</div>");
      }
      $("#success-stories").owlCarousel({
        items: 1,
        navigation : true,
        slideSpeed : 1000,
        autoplay : true,
        singleItem : false,
        autoplaySpeed: 1000,
        autoplayHoverPause: true,
        autoplayTimeout: 5000,
        loop: true
      });
    }
  });
});