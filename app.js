//Start game
const startGame = () => {
  $('#createPlayer').show('slow');
  $('#hero').hide();
  $('.endArrow').hide();
  $('#mark').hide();
  $('#game-board').hide();
  $('#button').on('click', () => {
    if($('#name').val().length === 0){
      alert('Name is required!')
    }else{
    //get username
    player.name = $('#name').val();
    localStorage.setItem('name', player.name);
    //Hide name-input and show player
    $('#createPlayer').hide();
    $('#game-board').show();
    setTimeout(()=>{
      $('#mark').show();
      $('#hero').show('slow');
    }, 100);
    //Show opening text
    const $div = $('<div>').addClass('start').text('You awake in a field...');
    setTimeout(() => {
          $('body').prepend($div);
    }, 1500);
    setTimeout(() => {
      $div.text('..with no memory of how you got there.');
    },3000);
    setTimeout(() => {
      $div.text('In the distance you see a forrest and a mountain range...');
    },6500);
    setTimeout(() => {
      $div.text('..Where are you? And what happened?!');
    },12500);
    setTimeout(() => {
      $div.text('You need to look around and see if you can find any clues...');
    },15500);
    setTimeout(() => {
      $div.hide('slow');
      $('#mark').hide('slow');``
      displayInfo();
      displayClues();
    },20500);
    }
  });
}

//display the user info bar at top of screen
const displayInfo = () => {
    const $infobar = $('<div>').addClass('info');
    const $name = $('<h3>');
    const $health = $('<p>');
    const $playbar = $('<div>').addClass('how-to');
    const $controls = $('<h3>');
    // const $attackbtn = $('<p>');
    const $defendbtn = $('<p>');
    $name.text(player.name);
    $health.text('Health: ' + player.health);
    $controls.text('How to play:');
    // $attackbtn.text('Press A: (Attack) cast fireball');
    $defendbtn.text('Use left and right Arrow keys to move');
    $playbar.append($controls,$defendbtn)
    $infobar.append($name, $health);
    $('body').prepend($infobar, $playbar);
}

const displayClues = () => {
  const $spellbook = $('<div>');
  const $img = $('<img>').attr('src','images/book.png').addClass('spellbook');
  $spellbook.append($img);
  $img.hide();
  $('#game-board').prepend($spellbook);
  setTimeout(() => {
    $img.show();
  },600);
}

const battle1 = () => {
  $('.how-to').hide();
  $('.start').show();
  $('.start').text('Oh no, There\'s no more time to mess around!');
  setTimeout(() => {
    $('.start').text('You hear something coming from the edge of the forrest!');
  },4000);
  setTimeout(() => {
    $('.start').text('A pack of Skeleton Warriors are approaching and they don\'t look friendly!');
  },8000);
  setTimeout(() => {
    $('.start').hide();
    $('.how-to').show();
    skully.generateEnemy(10000);
    skully2.generateEnemy(14000);
    skully3.generateEnemy(16000);
    skully4.generateEnemy(17000);
    skully5.generateEnemy(18000);
    skully6.generateEnemy(20000);
    skully7.generateEnemy(23000);
    skully8.generateEnemy(25000);
  },12000);
}

const findBook = () => {
  if($('#hero').position().left <= $('.spellbook').position().left){
    $('.how-to').hide();
    $('.spellbook').css('margin-top','-500px');
    $('.spellbook').css('left','47.5%')
    $('.spellbook').css('width','80px');
    $('.start').text('You found a spellbook!').show('slow');
    $('.heroImg').attr('src', 'images/herobook.png').addClass('herobook');
    setTimeout(() => {
      $('.spellbook').remove();
    },3500)
    setTimeout(() => {
      $('.start').text('Inside the book, you find that most the pages are empty...').show();
    },3500);
    setTimeout(() => {
      $('.start').text('...however you come arcoss a page with the header "Fireball"');
    },8000);
    setTimeout(() => {
      $('.start').text('As you read, you realize that you are already fimilar with the instructions...');
    },12000);
    setTimeout(() => {
      $('.start').text('You decide to try to cast the spell...');
      localStorage.setItem('intructions-completed', 'true');
    },17000);
    setTimeout(() => {
      $('.attack').show();
      $('.fireball').show();
      $('.how-to h3').text('Cast a few Fireballs');
      $('.how-to p').text('Tap A to cast a Fireball');
      $('.how-to').show();
      $('.start').hide();
    },20000);
    setTimeout(() => {
      battle1();
    },30000);
  }
}
//move and attack with character
const useCharacter = () => {
  $(document).keydown(function(event){
    let $hero = $('#hero');
    let $board = $('#game-board');
    //If her is in the main area of screen
    if(($hero.css('left') > '0px') && ($hero.css('left') !==  (($( window ).width()-100)+'px'))){
      //hero1
      //left arrow
      if(event.which == "37"){
        if( $('.boss').position() === undefined){
          $hero.css('transform', 'scaleX(1)');
          $hero.animate({left: "-=8"}, 0);
          findBook();
        }else{
          $hero.css('transform', 'scaleX(1)');
          $hero.animate({left: "-=0"}, 0);
        }
      }
      //right arrow
      if(event.which == "39") {
        if( $('.boss').position() === undefined){
          $hero.css('transform', 'scaleX(-1)');
          $hero.animate({left: "+=8"}, 0);
        }else{
          $hero.css('transform', 'scaleX(-1)');
          $hero.animate({left: "+=0"}, 0);
        }
      }

      // A key Attack with fireball
      if(event.which == "65"){
        if($('.boss').position() != undefined || localStorage.getItem('level2-completed') === 'true'){
          console.log('attack disabled');
        }else {
        if(localStorage.getItem('intructions-completed') === 'true'){
          $hero.css('transform', 'scaleX(-1)');
          let width = ("+=" + $( window ).width() + 'px');
          let location = $hero.css('left');
          $('#game-board .attack').eq(10).remove();
          const $attack = $('<div>').addClass('attack');
          const $img = $('<img>').attr('src','images/fire.png').addClass('fireball');
            $attack.append($img);
            $board.prepend($attack);
            $attack.css('margin-left', location);
            $(".attack").animate({
                left: width,
            }, 1500);
          if(localStorage.getItem('level1-completed') === null){
          let checkattack = setInterval(function () {
            let delta = ($attack.width() + $(".enemyImg").width()) * 0.5 ;
            let x1 = $attack.offset().left;
            let y1 = $attack.offset().top;
            let x2 = $(".enemyImg").offset().left;
            let y2 = $(".enemyImg").offset().top;
            if (
                 x1 >= x2 - delta &&
                 x1 <= x2 + delta &&
                 y1 >= y2 - delta &&
                 y1 <= y2 + delta
             ) {
                $attack.hide();
                skully.hit();
                if(skully.health <=0 && (skully.enemy.hasClass('dead') === true)){
                  skully2.hit();
                }
                if(skully2.health <=0 && (skully2.enemy.hasClass('dead') === true)){
                  skully3.hit();
                }
                if(skully3.health <=0 && (skully3.enemy.hasClass('dead') === true)){
                  skully4.hit();
                }
                if(skully4.health <=0 && (skully4.enemy.hasClass('dead') === true)){
                  skully5.hit();
                }
                if(skully5.health <=0 && (skully5.enemy.hasClass('dead') === true)){
                  skully6.hit();
                }
                if(skully6.health <=0 && (skully6.enemy.hasClass('dead') === true)){
                  skully7.hit();
                }
                if(skully7.health <=0 && (skully7.enemy.hasClass('dead') === true)){
                  skully8.hit();
                }
                if(skully8.health <= 0){
                  localStorage.setItem('level1-completed', 'true');
                  setTimeout(() => {
                    $('.how-to').hide();
                    $('.start').show();
                    $('.start').text('Woah, that was a close call!');
                  },2000);
                  setTimeout(() => {
                    $('.start').text('None of this makes sense?!');
                  },4500);
                  setTimeout(() => {
                    $('.start').text('Why are there Skeleton Warriors all the way out here?!');
                  },7000);
                  setTimeout(() => {
                    $('.start').text('You see a small mountain village in the distance...');
                  },10500);
                  setTimeout(() => {
                    $('.start').text('It could be a long walk, better get moving...');
                  },13500);
                  setTimeout(() => {
                    $('.start').hide();
                    $('.endArrow').show();
                  },16500);
                }
             } else {
               console.log('Nothing hit');
             }
          }, 10);
          }
        }
      }
    }
  }
    //If hero is on left side of screen
    if($hero.css('left') <= '0px'){
      //hero1
      if(event.which == "39") {
        $hero.css('transform', 'scaleX(-1)');
        $hero.animate({left: "+=8"}, 0);
      }
    }
    //if hero is on right side of screen
    if($hero.position().left >= ($(window).width()-40)){
      //hero1
      if(skully8.health <= 0){
        $hero.animate({left: "+=8"}, 0);
        alert('Level 1 part 1 completed! All your progress has been saved!');
        $('.endArrow').hide();
        $('.info').hide();
        $('#hero').hide();
        $('html').css('background', 'url(images/loading.gif) no-repeat center center');
        $('html').css('background-color', 'rgb(25,31,38)');
        setTimeout(() => {
          window.location.reload(false);
        },3500);
      }else{
      //right arrow
        $hero.css('transform', 'scaleX(-1)');
        $hero.animate({left: "-=8"}, 0);
      }
    }
  });
}



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
        console.log($('#hero').position().left);
        console.log($(window).width()-100);
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
  }, 17000);
  setTimeout(() => {
    $('#level2text').hide('slow');
    $('.endArrow').css('margin-top','-90px')
    $('.endArrow').show();
  }, 20000);
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

const startLevel3 = () => {
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
  $('#hero').css('top','71%');
  $('.enemy').css('margin-top', '373px');
  //Display player info bar
  player.name = localStorage.getItem('name');
  displayInfo();
  $('.how-to').hide();
  const $div = $('<div>').addClass('helper-container');
  const $helper = $('<img>').addClass('helper').attr('src','images/helper.gif');
  const $question = $('<img>').attr('src','images/question.gif').attr('id','question');
  const $speech = $('<div>').addClass('speechBubble');
  const $button = $('<button>').addClass('accept').text('Tell me more');
  $speech.css('height','100px');
  $speech.css('padding','20px')
  $div.prepend($question);
  $div.append($helper);
  $('#game-board').append($div);
  $(document).keydown((event) => {
    if(event.which == 39){
      console.log($('.helper').position().left);
      if($('#hero').position().left >= ($('.helper-container').position().left -40) ){
        $question.hide();
        $('.helper-container').css('margin-top','38px');
          $speech.text('Hello little wizard! Why don\'t you come on into the taven and get some coffee, or an ale?!');
        setTimeout(() => {
          $speech.text('Hey, that book looks familiar. Where\'d you get it?');
        }, 4000);
        setTimeout(() => {
          $speech.text('Not a big talker ay? Well you should come ');
          $speech.append($button);
        }, 8000);
        $div.prepend($speech);

      }
    }
  });

}

$(() => {
  if(localStorage.getItem('level2-completed') === 'true'){
    startLevel3();
    useCharacter();

  }else if(localStorage.getItem('level1-completed') === 'true'){
    startLevel2();
    useCharacter();
  }else{
    startGame();
    useCharacter();
  }
});
