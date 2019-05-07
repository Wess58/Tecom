// $(window).scroll(function(){
//      var scroll = $(window).scrollTop();
//      if(scroll < 400){
//          $('.fixed-top').css('background', 'transparent');
//          $('.nav-link').css('color', '#fff')
//
//      } else{
//          $('.fixed-top').css('background', '#fff');
//
//      }
//  });


//NAVBAR SCROLL EFFECT
$(function() {
  var header = $(".navbar");
  var navAText = $(".nav-link");

  $(window).scroll(function() {
    var scroll = $(window).scrollTop();
    if (scroll >= 600) {
      header.addClass("scrolled");
      navAText.addClass("navA");

    } else {
      header.removeClass("scrolled");
      navAText.removeClass("navA");

    }
  });

});

//ONSCROLL OPACITY
$(document).ready(function() {
  $(window).scroll(function() {
    $('.Welcome').css("opacity", 1 - $(window).scrollTop() / 620)
  });
});

// ON SCROLL SHOW TO TOP BUTTON START -->
window.onscroll = function() {
  scrollFunction()
};

function scrollFunction() {
  if (document.body.scrollTop > 200 || document.documentElement.scrollTop > 200) {
    document.getElementById("myBtn").style.display = "block";
  } else {
    document.getElementById("myBtn").style.display = "none";
  }
}

// When the user clicks on the button, scroll to the top of the document
function topFunction() {
  document.body.scrollTop = 0;
  document.documentElement.scrollTop = 0;
}

// ON SCROLL SHOW TO TOP BUTTON END <---

//INITIALIZE SLICK SLIDER
$(document).ready(function() {
  $('.autoplay').slick({
    infinite: true,
    arrows: false,
    slidesToShow: 5,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 2000,
    responsive: [{
      breakpoint: 600,
      settings: {
        slidesToShow: 2,
        slidesToScroll: 2
      }
    }, {
      breakpoint: 480,
      settings: {
        autoplaySpeed: 2500,
        slidesToShow: 2,
        slidesToScroll: 1
      }
    }]
  });
});
