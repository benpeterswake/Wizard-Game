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
  }
  generateEnemy(speed){
    let start = ($( window ).width() + 'px');
    let end = ("-=" + $( window ).width() + 'px');
    this.enemy.append(this.img);
    this.enemy.css('margin-left', start);
    this.enemy.animate({
    marginLeft: end,
    }, speed);
    $('#game-board').append(this.enemy);
  }

  hit(){
    this.health -= 20;
    if(this.health<=0){
      this.img.remove();
    }else{
      console.log('still alive');
    }
  }
}

//Create hero object and enemy
const player = new Hero();
const skully = new Enemy();
const skully2 = new Enemy();
//Start game
const startGame = () => {
  $('#createPlayer').show('slow');
  $('#hero').hide();
  $('#mark').hide();
  $('#game-board').hide();
  $('#button').on('click', () => {
    //get username
    player.name = $('#name').val()
    //Hide name-input and show player
    $('#createPlayer').hide();
    $('#game-board').show();
    setTimeout(()=>{
      $('#mark').show();
      $('#hero').show('slow');
    }, 100);
    //Show opening text
    const $div = $('<div>').addClass('start').text('You awake in a field...');
    $div.show('slow');
    setTimeout(() => {
      $div.text('..with no memory of how you got there.');
    },2500);
    setTimeout(() => {
      $div.text('In the distance you see a forrest and a mountain range...');
    },7500);
    setTimeout(() => {
      $div.text('..Where are you? And what happened?!');
    },11500);
    setTimeout(() => {
      $div.text('You need to look around and see if you can find any clues..');
    },14500);
    setTimeout(() => {
      $div.hide('slow');
      $('#mark').hide('slow');
      displayInfo();
      displayClues();
    },19500);

    $('body').prepend($div);
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
    $defendbtn.text('Use Arrow keys to move');
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
  },300);
}

//move and attack with character
const moveCharacter = () => {
  $(document).keydown(function(event){
    let $hero = $('#hero');
    let $board = $('#game-board');
    if(($hero.css('left') > '0px') && ($hero.css('left') !==  (($( window ).width()-100)+'px'))){
      //hero1
      if(event.which == "37"){
        $hero.css('transform', 'scaleX(1)');
        $hero.animate({left: "-=8"}, 0);
        if($('#hero').css('left') <= $('.spellbook').css('left')){
          $('.how-to').hide();
          $('.spellbook').css('margin-top','-120px');
          $('.spellbook').css('left','50%')
          $('.spellbook').css('width','80px');
          $('.start').text('You found a spellbook!').show('slow');
          setTimeout(() => {
              $('.spellbook').remove();
          },3000)
          setTimeout(() => {
            $('.start').text('Inside the book, you find that most the pages are empty...').show();
          },3000);
          setTimeout(() => {
            $('.start').text('...You finally find a page with the header "Fireball attack."').show();
          },8000);
          setTimeout(() => {
            $('.start').text('As you read, you realize that you are already fimilar with the instructions...').show();
          },12000);
          setTimeout(() => {
            $('.start').text('You decide to try to cast the spell...').show();
          },17000);
          setTimeout(() => {
            $('.how-to p').text('Press A to cast a fireball');
            $('.how-to').show();
            $('.start').hide();
          },20000);
        }
      }
      if(event.which == "39") {
        $hero.css('transform', 'scaleX(-1)');
        $hero.animate({left: "+=8"}, 0);
      }
      if(event.which == "68"){
        $('.defend').remove();
        const $defend = $('<div>').addClass('defend');
        const $img = $('<img>').attr('src','images/fire.png').addClass('shield');
        $defend.append($img)
        $hero.prepend($defend);
        setTimeout(() => {
            $('.defend').remove();
        }, 4000);
      }
      //Attack with fireball
      if(event.which == "65"){
        console.log($('.emenyImg').position());
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
        setInterval(function collision() {
          var delta = ($attack.width() + $(".enemyImg").width()) * 0.5 ;
          var x1 = $attack.offset().left;
          var y1 = $attack.offset().top;
          var x2 = $(".enemyImg").offset().left;
          var y2 = $(".enemyImg").offset().top;
          if (
               x1 >= x2 - delta &&
               x1 <= x2 + delta &&
               y1 >= y2 - delta &&
               y1 <= y2 + delta
           ) {
              $attack.hide();
              skully.hit();
              if(skully.health <=0 ){
                console.log(skully.health);
                skully2.hit();
              }
           } else {
              clearInterval(collision);
           }
        }, 50000);

      }
    }else if($hero.css('left') < '0px'){
      //hero1
      if(event.which == "37"){
        $hero.css('transform', 'scaleX(-1)');
        $hero.animate({left: "-=0"}, 0);
      }
      if(event.which == "39") {
        $hero.css('transform', 'scaleX(-1)');
        $hero.animate({left: "+=8"}, 0);
      }
      if(event.which == "68"){
          $('.defend').remove();
        const $defend = $('<div>').addClass('defend');
        const $img = $('<img>').attr('src','images/fire.png').addClass('shield');
        $defend.append($img)
        $hero.prepend($defend);
        setTimeout(() => {
            $('.defend').remove();
        }, 4000)
      }
    }else if($hero.css('left') <= (($( window ).width()-100)+'px')){
      //hero1
      if(event.which == "37"){
        $hero.css('transform', 'scaleX(-1)');
        $hero.animate({left: "-=8"}, 0);
      }
      if(event.which == "39") {
        $hero.css('transform', 'scaleX(-1)');
        $hero.animate({left: "+=0"}, 0);
      }
      if(event.which == "68"){
          $('.defend').remove();
        const $defend = $('<div>').addClass('defend');
        const $img = $('<img>').attr('src','images/fire.png').addClass('shield');
        $defend.append($img)
        $hero.prepend($defend);
        setTimeout(() => {
            $('.defend').remove();
        }, 4000)
      }
    }
  });
}
const battle1 = () => {
  skully.generateEnemy(15000);
  skully2.generateEnemy(17000);
}

$(() => {
    startGame();
    moveCharacter();

});
