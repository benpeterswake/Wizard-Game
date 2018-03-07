
const startLevel3 = () => {
  const $audio = $('<audio>').attr('id','audio');
  $audio.attr('src','audio/snow.mp3');
  $audio.attr('autoplay','true');
  $audio.attr('loop','true')
  $('body').append($audio)
  let audio = document.getElementById("audio");
  audio.volume = 0.1;
  //Enter view with new background
  $('#hero').fadeIn();
  $('.heroImg').attr('src', 'images/hero.png');
  $('.heroImg').css('width', '110px');
  $('.endArrow').hide();
  $('#createPlayer').hide();
  $('#mark').hide();
  $('html').css('background', 'url(images/village.gif) no-repeat center');
  $('html').css('background-size','cover');
  $('#hero').css('left', '2%');
  $('#hero').css('top','69%');
  $('.enemy').css('margin-top', '373px');
  //Display player info bar
  player.name = localStorage.getItem('name');
  displayInfo();
  $('.how-to').hide();
  localStorage.setItem('helper-convo-completed', 'false');
  const $div = $('<div>').addClass('helper-container');
  const $helper = $('<img>').addClass('helper').attr('src','images/helper.gif');
  const $question = $('<img>').attr('src','images/question.gif').attr('id','question');
  const $speech = $('<div>').addClass('speechBubble');
  const $button = $('<button>').addClass('accept').text('Tell me more');
  $speech.css('height','100px');
  $speech.css('padding','20px');
  $div.prepend($question);
  $div.append($helper);
  $('#game-board').append($div);
  $(document).keydown((event) => {
    if(event.which == 39){
      console.log($('.helper').position().left);
      if($('#hero').position().left >= ($('.helper-container').position().left -40) && localStorage.getItem('helper-convo-completed') === 'false'){
        $question.hide();
        $('.helper-container').addClass('talking');
          localStorage.setItem('helper-convo-completed', 'true');
          $speech.text('Hello little wizard! You look familiar. Don\'t I know you from somewhere? Hmm...');
        setTimeout(() => {
          $speech.text('Hey, that book looks familiar too. Where\'d you get it..?');
        }, 6000);
        setTimeout(() => {
          $speech.text('Not a big talker ay? Anyways, you should grab a coffee or ale at Ole Thorin\'s Tavern here behind me.');
          $speech.append($button);
          $button.click(() => {
            $speech.text('Ok, let me buy you an ale. Something gives me the feeling that we\'ll find something to talk about...');
            setTimeout(() => {
              $helper.hide();
              $('#hero').hide();
              $speech.hide();
              $('html').css('background', 'url(images/loading.gif) no-repeat center center');
              $('html').css('background-color', 'rgb(25,31,38)');
              $('#audio').attr('src','audio/coffee.mp3');
              $('#audio').attr('autoplay','true');
              $('#audio').attr('loop','true');
              let audio = document.getElementById("audio");
              audio.volume = 0.3;
            }, 5000);
            setTimeout(() => {
              tavernScene();
            }, 7500);
          });
        }, 10000);
        $div.prepend($speech);
      }
    }
  });

}
const tavernScene = () => {

  const $button = $('<button>').addClass('accept').text('Thanks, I\'ll do that.');
  $('html').css('background', 'url(images/tavern.png) no-repeat center');
  $('html').css('background-size','cover');
  setTimeout(() => {
    $('.speechBubble').css('top', '-250px');
    $('.speechBubble').css('position', 'absolute');
    $('.speechBubble').css('left', '200px');
    $('.speechBubble').text('So you just woke up with no memory of how you got here? That certainly is strange my little friend.').show()
  }, 1000);
  setTimeout(() => {
    $('.speechBubble').text('And you say there were skeleton warriors all the way out here? Highly unlikely...');
  }, 8000);
  setTimeout(() => {
    $('.speechBubble').text('The only person who has ever been powerful enough to control the skeleton race was the Dark Wizard, Gravewrick.')
  },13500);
  setTimeout(() => {
      $('.speechBubble').text('But he was banished to the shadow realm centuries ago. Don\'t you know this story? Every wizard learns of it during their training.');
  },20000);
  setTimeout(() => {
      $('.speechBubble').text('Where did you say you were from again? Ah, that\'s right. The whole memory loss thing...');
  },28000);
  setTimeout(() => {
      $('.speechBubble').text('Well my little friend, it was nice hearing your story. Let me tell you this: if you follow the road east past the village, you will find a dark forest...');
  },34000);
  setTimeout(() => {
      $('.speechBubble').text('There you may find an old wizard named Altare. If the stories are true, then he is certainly the wisest wizard in this realm.');
  },45000);
  setTimeout(() => {
      $('.speechBubble').text('Go see if you can pay him a visit.');
      $('.speechBubble').append($button);
      $button.on('click', () => {
        $('.helper').hide();
        $('#hero').hide();
        $('.speechBubble').hide();
        $('html').css('background', 'url(images/loading.gif) no-repeat center center');
        $('html').css('background-color', 'rgb(25,31,38)');
        setTimeout(() => {
            exitTaven();
        }, 3000)
      });
  },53000);
}

const exitTaven = () => {
  $('#audio').attr('src','audio/snow.mp3');
  $('#audio').attr('autoplay','true');
  let audio = document.getElementById("audio");
  audio.volume = 0.1;
  $('#audio').attr('loop','true');
  $('html').css('background', 'url(images/village.gif) no-repeat center');
  $('html').css('background-size','cover');
  $('#hero').show('slow');
  $('.endArrow').show();
  $(document).keydown((event)=>{
    if(event.which == 39){
        if($('#hero').position().left >= $(window).width()-50){
          localStorage.setItem('level3-completed','true');
          alert('Level 1 part 3 completed! All your progress has been saved');
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
}
