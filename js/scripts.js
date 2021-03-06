$(window).scroll(function() {
  // console.log(window.screen.width);
  var topofDiv = $("#landingDiv").offset().top; //gets offset of header
  var topDivHeight = $("#landingDiv").outerHeight();
  var topTextualHeight = $(".roundedSquare1").outerHeight();
  var navHeight = $(".navbar").outerHeight();
  var finalHeight = topDivHeight - navHeight;
  // console.log('finalHeight' , finalHeight);
  var scroll = $(window).scrollTop();

  if (window.screen.width > 768) {
    if (scroll <= (topofDiv + finalHeight)) {
      $('.navbar-brand').css('visibility', 'hidden');
      $(".navbar").removeClass("scrolled");
    } else {
      $('.navbar-brand').css('visibility', 'visible');
      $(".navbar").addClass("scrolled");
    }
  }
  else{
    if (scroll <= (topofDiv + topTextualHeight)) {
      $('.navbar-brand').css('visibility', 'hidden');
      $(".navbar").removeClass("scrolled");
    } else {
      $('.navbar-brand').css('visibility', 'visible');
      $(".navbar").addClass("scrolled");
    }
  }

});


//NAVBAR SCROLL EFFECT
// $(function() {
//   var header = $(".navbar");
//   var navAText = $(".nav-link");
//   // var navbar_brand = $(".navbar-brand")
//
//   $(window).scroll(function() {
//     var scroll = $(window).scrollTop();
//     if (scroll >= 100) {
//       header.addClass("scrolled");
//       navAText.addClass("navA");
//
//       // navbar_brand.attr('style', 'color: #13d0d5 !important');
//       // navbar_brand.css('', '')
//
//     } else {
//       header.removeClass("scrolled");
//       navAText.removeClass("navA");
//
//     }
//   });
//
// });

//ONSCROLL OPACITY
// $(document).ready(function() {
//   $(window).scroll(function() {
//     $('.Welcome').css("opacity", 1 - $(window).scrollTop() / 620)
//   });
// });

// ON SCROLL SHOW TO TOP BUTTON START -->
window.onscroll = function() {
  scrollFunction()
};

function scrollFunction() {
  if (document.body.scrollTop > 1000 || document.documentElement.scrollTop > 1000) {
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



$(document).ready(function() {
  $('.topSlider').slick({
    infinite: true,
    arrows: false,
    slidesToShow: 6,
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
        slidesToShow: 4,
        slidesToScroll: 1
      }
    }]
  });
});

//INITIALIZE SLICK SLIDER
$(document).ready(function() {
  $('.autoplay').slick({
    infinite: true,
    arrows: false,
    slidesToShow: 6,
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


this.clicked = false;

function toggleIcon() {
  // console.log(this.clicked);
  if (!this.clicked) {
    $("#menuIcon").toggleClass("fa-times");
  }
}
