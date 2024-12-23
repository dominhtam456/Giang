$(document).ready(function() {

  var $clickMe = $('.click-icon'),
      $card = $('.card');
  
  $card.on('click', function() {

    $(this).toggleClass('is-opened');
    $clickMe.toggleClass('is-hidden');

  });

});

var slideIndex = 1;
showSlides(slideIndex);

function plusSlides(n) {
  if ((slideIndex == 1 && n == -1) || (slideIndex == 5 && n == 1)) {
    return;
  }
  showSlides(slideIndex += n);
  if (slideIndex == 1 || slideIndex == 4 || slideIndex == 5) {
    animateText(slideIndex);
  }
}

function currentSlide(n) {
  showSlides(slideIndex = n);
}

function showSlides(n) {
  var i;
  var slides = document.getElementsByClassName("mySlides");
  if (n > slides.length) {slideIndex = 1}    
  if (n < 1) {slideIndex = slides.length}
  for (i = 0; i < slides.length; i++) {
      slides[i].style.display = "none";  
  }
  slides[slideIndex-1].style.display = "block";  
}

/* Flip book */
var right = document.getElementsByClassName("right");
  var si = right.length;
  var z=1;
  function turnRight()
  {
    if (si == 0) {
      return;
    }
      if(si>=1){
          si--;
      }
      else{
          si=right.length-1;
          function sttmot(i){
              setTimeout(function(){right[i].style.zIndex="auto";},300);
          }
          for(var i=0;i<right.length;i++){
              right[i].className="right";
              sttmot(i);
              z=1;
          }
      }
      right[si].classList.add("flip");
      z++;
      right[si].style.zIndex=z;
  }
  function turnLeft()
  {
    if (si == right.length) {
      return;
    }
      if(si<right.length){
          si++;
      }
      else{
          si=1;
          for(var i=right.length-1;i>0;i--){
              right[i].classList.add("flip");
              right[i].style.zIndex=right.length+1-i;
          }
      }
      right[si-1].className="right";
      setTimeout(function(){right[si-1].style.zIndex="auto";},350);
  }

var flag = true;


function animateText(n) {
  var P = $('.n' + n + '> p');

  // Reset text to its original state before splitting and animating
  var originalText = P.data('originalText') || P.text();
  P.data('originalText', originalText); // Save the original text
  P.html(originalText); // Reset the paragraph content

  // Split text into spans
  P.contents().each(function () {
      var Words;
      if (this.nodeType === 3) { // Text node
          Words = '<span>' + this.data.split(/\s+/).join('</span> <span>') + '</span>';
          $(this).replaceWith(Words);
      } else if (this.nodeType === 1) { // Element node
          this.innerHTML = '<span>' + this.innerHTML.split(/\s+/).join('</span> <span>') + '</span>';
      }
  });
  
  if (flag) {
    setTimeout(function(){
      P.find('span').css('opacity', 0).each(function (i) {
        $(this).delay(150 * i).animate({ opacity: 1 }, 800); // Fade in each word
    });}, 4000);
    flag = false;
  } else {
    // Animate each word
    P.find('span').css('opacity', 0).each(function (i) {
        $(this).delay(150 * i).animate({ opacity: 1 }, 800); // Fade in each word
    });
  }
}

animateText(1);
$('.triggerAnimation').on('click', animateText);

var audio = document.getElementById("bgAudio");
audio.volume = 0.4;
audio.play();