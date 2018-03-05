class Hero {
  constructor(name){
    this.name = name;
    this.health = 100;
  }
}

class Enemy {

  constructor(){
    this.name = 'Skeleton';
    this.health = 100;
    this.enemy = $('<div>').addClass('enemy');
    this.img = $('<img>').attr('src','images/enemy.png').addClass('enemyImg');
    this.healthBar = $('<div>').addClass('healthBar');
  }
  generateEnemy(speed){
    let start = ($( window ).width() + 'px');
    let end = ("-=" + $( window ).width() + 'px');
    this.healthBar.text(this.health);
    this.enemy.append(this.img, this.healthBar);
    this.enemy.css('margin-left', start);
    this.enemy.animate({
    marginLeft: end,
    }, speed);
    $('#game-board').append(this.enemy);
  }

  hit(){
    this.healthBar.empty();
    this.health -= 20;
    this.healthBar.text(this.health);
    if(this.health<=0){
      this.enemy.stop();
      this.img.attr('src', 'images/hit.png').addClass('hit');
      this.healthBar.remove()
      setTimeout(() => {
      this.enemy.addClass('dead');
      this.enemy.remove();
      },200);
    }else{
      console.log('still alive');
    }
  }
}

//Create hero object and enemy
const player = new Hero();
const skully = new Enemy();
const skully2 = new Enemy();
const skully3 = new Enemy();
const skully4 = new Enemy();
const skully5 = new Enemy();
const skully6 = new Enemy();
const skully7 = new Enemy();
const skully8 = new Enemy();

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
    },7500);
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
    $defendbtn.text('Hold down Arrow keys to move');
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

const findBook = () => {
  if($('#hero').position().left <= $('.spellbook').position().left){
    $('.how-to').hide();
    $('.spellbook').css('margin-top','-500px');
    $('.spellbook').css('left','45%')
    $('.spellbook').css('width','80px');
    $('.start').text('You found a spellbook!').show('slow');
    $('#hero img').attr('src', 'images/herobook.png').addClass('herobook');
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
        $hero.css('transform', 'scaleX(1)');
        $hero.animate({left: "-=8"}, 0);
        findBook();
      }
      //right arrow
      if(event.which == "39") {
        $hero.css('transform', 'scaleX(-1)');
        $hero.animate({left: "+=8"}, 0);
      }
      //Attack with fireball
      if(event.which == "65"){
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
          if(localStorage.getItem('level1-completed' === 'false')){
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
                    $('.start').text('You see a small village in the distance... ');
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
        alert('Intro completed! All your progress has been saved!');
        $('.endArrow').hide();
        $('.info').hide();
        $('#hero').hide();
        $('html').css('background', 'url(images/loading.gif) no-repeat center');
        $('html').css('background-color', 'rgb(25,31,38)')
        setTimeout(() => {
          window.location.reload(false);
        },4000);
      }else{
      //right arrow
        $hero.css('transform', 'scaleX(-1)');
        $hero.animate({left: "-=8"}, 0);
      }
    }
  });
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

const startLevel2 = () => {
  //Enter view with new background
  $('#hero').fadeIn();
  $('#hero img').attr('src', 'images/herobook.png').addClass('herobook');
  $('.endArrow').hide();
  $('#createPlayer').hide();
  $('#mark').hide();
  $('html').css('background', 'url(images/background2.png)');
  $('#hero').css('left', '2%');
  $('#hero').css('top','520px');
  $('.enemy').css('margin-top', '535px');
  //Display player info bar
  player.name = localStorage.getItem('name');
  displayInfo();
  $('.how-to').hide();
  const $level2Text = $('<div>').addClass('start');
  $level2Text.text('You walk for serveral hours...');
  setTimeout(() => {
  $level2Text.text('..until you come to an opening in the forrest.');
  }, 2500);
  setTimeout(() => {
  $level2Text.text('You have almost made it to the village!');
  }, 6000);
  $('body').prepend($level2Text);
}

$(() => {
  if(localStorage.getItem('level1-completed') === 'true'){
    startLevel2();
    useCharacter();
  }else{
    startGame();
    useCharacter();
  }
});
