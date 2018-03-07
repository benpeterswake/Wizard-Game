
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
    $speech.text('Well... Let me start from the beginning... You see, you and I grew up together in a small town not far from here...');
    setTimeout(() => {
      $speech.text('We did our wizard training together and we quickly grew to become exeptionally powerful wizards... ');
    }, 8000);
    setTimeout(() => {
      $speech.text('Amongst our classmates was another promising wizard named, Ademare...');
    }, 15000);
    setTimeout(() => {
      $speech.text('but it didn\'t take long to realize that he had a disturbing side to him... He had a fasination with death...');
    }, 21000);
    setTimeout(() => {
      $speech.text('and as time went on it only got worse... ');
    }, 28000);
    setTimeout(() => {
      $speech.text('Looking back, it seems so obvious... but Ademare grew to become more powerful then we could have ever imagined');
    }, 34000);
    setTimeout(() => {
      $speech.text('He discovered an ancient magic that allowed him to control the forces of the skeleton race and ...');
    }, 44000);
    setTimeout(() => {
      $speech.text('from then on he become known as Gravewrick... He became consumed by the dark magic... he became..truely evil... ');
    }, 51000);
    setTimeout(() => {
      $speech.text('It was too much, we had to do something... He had to be stopped... ');
    }, 59000);
    setTimeout(() => {
        $speech.text('That is when it all began...');
    }, 65000)
    setTimeout(() => {
      $('html').fadeTo('slow', 0.3, function() {
            $speech.hide();
            $('html').animate({
              marginTop:"100px"
            }, 4000);
            $(this).css('background-image', 'url(images/ending.png)');

        }).fadeTo('slow', 1);
    }, 69000)
    $('#game-board').prepend($speech);
  }, 1500);
}
