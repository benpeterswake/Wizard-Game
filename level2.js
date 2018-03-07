const startLevel2 = () => {
  //Enter view with new background
  localStorage.setItem('boss-convo-completed', 'false')
  $('#hero').fadeIn();
  $('.heroImg').attr('src', 'images/herobook.png').addClass('herobook');
  $('.endArrow').hide();
  $('#createPlayer').hide();
  $('#mark').hide();
  $('html').css('background', 'url(images/background2.png)');
  $('#hero').css('left', '2%');
  $('#hero').css('top','520px');
  $('.enemy').css('margin-top', '373px');
  //Display player info bar
  player.name = localStorage.getItem('name');
  displayInfo();
  $('.how-to').hide();
  const $level2Text = $('<div>').attr('id','level2text').addClass('start');
    $level2Text.text('You walk for serveral hours...');
  setTimeout(() => {
    $level2Text.text('..until you come to an opening in the forest.');
  }, 2500);
  setTimeout(() =>{
    $level2Text.hide();
    $('.enemy').css('margin-top', '535px');
  },5500);
  $('body').prepend($level2Text);
  $(document).keydown((event)=>{
    if(event.which == 39){
        if($('#hero').position().left >= 400 && localStorage.getItem('boss-convo-completed') == 'false'){
          bossConversation();
        }
        if($('#hero').position().left >= $(window).width()-50){
          localStorage.setItem('level2-completed','true');
          alert('Level 1 part 2 completed! All your progress has been saved');
          $('.endArrow').hide();
          $('.info').hide();
          $('#hero').hide();
          $('html').css('background', 'url(images/loading.gif) no-repeat center center');
          $('html').css('background-color', 'rgb(25,31,38)');
          setTimeout(() => {
            window.location.reload(false);
          },3500);
        }
    }
  });
  useFrostbolt();
}
const bossConversation = () => {
  const $audio = $('<audio>').attr('id','audio');
  $audio.attr('src','audio/alert.mp3');
  $audio.attr('autoplay','true');
  $('body').append($audio)
  let audio = document.getElementById("audio");
  audio.volume = 0.4;
  localStorage.setItem('boss-convo-completed', 'true')
  const $div = $('<div>').addClass('boss-container');
  const $boss = $('<img>').attr('src','images/boss.gif').addClass('boss');
  const $speech = $('<div>').addClass('speechBubble');
  setTimeout(() => {
    $('#mark').show()
    $speech.text("Hello again, " + player.name + "! Ha! Look at you now! So small and weak! And to think that everyone believed you were the one to fulfill the prophecy! ...");
    $div.prepend($speech);
    $div.append($boss);
    $('#game-board').append($div);
      console.log($('.boss').position().left);
  },100);
  setTimeout(() => {
    $speech.text("You are not the one to bring me down my old friend...")
  }, 8000);
  setTimeout(() => {
    $div.hide('slow');
    setTimeout(() => {
      $div.remove();
    },200)
    $('#mark').hide();
  }, 13000);
  setTimeout(() => {
    $('#level2text').text('Who was that?! What was he talking about?! What prophecy?').show();
  }, 14000);
  setTimeout(() => {
    $('#level2text').text('I need to get to that mountain village and see if I can get some help!');
  }, 19000);
  setTimeout(() => {
    $('#level2text').hide('slow');
    $('.endArrow').css('margin-top','-90px')
    $('.endArrow').show();
  }, 24000);
}

const useFrostbolt = () => {
  let $hero = $('#hero');
  let $board = $('#game-board');
  $(document).keydown(function(event){
    $hero.css('transform', 'scaleX(-1)');
    let width = ("+=" + $( window ).width() + 'px');
    let location = $hero.css('left');
    $('#game-board .attack').eq(10).remove();
  //S key secondary frostbolt
    if(event.which == "83"){
      if($('.boss').position() != undefined){
      console.log('button disabled');
    }else {
      $hero.css('transform', 'scaleX(-1)');
      let width = ("+=" + $( window ).width() + 'px');
      let location = $hero.css('left');
      $('#game-board .attack').eq(10).remove();
      const $second = $('<div>').addClass('attack');
      const $img = $('<img>').attr('src','images/frostbolt.png').addClass('frostbolt');
        $second.append($img);
        $board.prepend($second);
        $second.css('margin-left', location);
        $(".attack").animate({
            left: width,
        }, 1500);
      }
    }
  });
}
