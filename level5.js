
const startLevel5 = () => {
  const $audio = $('<audio>').attr('id','audio');
  $audio.attr('src','audio/default.mp3');
  $audio.attr('autoplay','true');
  $audio.attr('loop','true')
  $('body').append($audio)
  let audio = document.getElementById("audio");
  audio.volume = 0.5;
  $('.endArrow').hide();
  $('#createPlayer').hide();
  $('#hero').hide();
  $('level3text').hide();
  $('html').css('background', 'url(images/background3.jpg) no-repeat center');
  $('html').css('background-size','cover');
  $('html').css('height','100%');
    $('html').animate({
      marginTop:"-100px"
    }, 4000);
  setTimeout(() => {
    const $speech = $('<div>').addClass('speechBubble2');
    $speech.text('Well... Let me start from the beginning... You see, over a century ago, you and I held arms in countless heroic battles...');
    setTimeout(() => {
      $speech.text('We fought against the tyrannical forces of Gravewrick and his skeleton army...');
    }, 8000);
    setTimeout(() => {
      $speech.text('Back then the world was a much different place.');
    }, 8000);
    setTimeout(() => {
      $('html').fadeTo('slow', 0.3, function() {
            $speech.hide();
            $('html').animate({
              marginTop:"100px"
            }, 4000);
            $(this).css('background-image', 'url(images/ending.png)');

        }).fadeTo('slow', 1);
    }, 12000)
    $('#game-board').prepend($speech);
  }, 1500);
}
