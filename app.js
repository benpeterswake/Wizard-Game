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
  }
}

//Create hero object
const player = new Hero();

//Start game
const startGame = () => {
  $('#createPlayer').show('slow');
  $('#hero').hide();
  $('#game-board').hide();
  $('#button').on('click', () => {
    //get username
    player.name = $('#name').val()
    //Hide name-input and show player
    $('#createPlayer').hide();
    $('#game-board').show()
    $('#hero').show('slow');
    //Show opening text
    const $div = $('<div>').addClass('start').text('You awake in a field...');
    $div.show('slow');
    setTimeout(() => {
      $div.text('..with no memory of how you got there.');
    },2500);
    setTimeout(() => {
      $div.hide('slow');
      displayInfo();
      generateEnemy(15000);
      generateEnemy(12000);
    },7000);
    $('body').prepend($div);
  });
}

//display the user info bar at top of screen
const displayInfo = () => {
    const $infobar = $('<div>').addClass('info');
    const $name = $('<h3>');
    const $health = $('<p>');
    $name.text(player.name);
    $health.text('Health: ' + player.health);
    $infobar.append($name, $health);
    $('body').prepend($infobar);
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
      if(event.which == "65"){
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
        marginLeft: width,
        }, 1500);
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
    }else if($hero.css('left') == (($( window ).width()-100)+'px')){
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

const generateEnemy = (speed) => {
  const skully = new Enemy();
  let start = ($( window ).width() + 'px');
  let end = ("-=" + $( window ).width() + 'px');
  const $enemy = $('<div>').addClass('enemy');
  const $img = $('<img>').attr('src','images/enemy.png').addClass('enemyImg');
  $enemy.append($img);
  $enemy.css('margin-left', start);
  $enemy.animate({
  marginLeft: end,
  }, speed);
  $('#game-board').append($enemy);
}

function collision($div1, $div2) {
    var x1 = $div1.offset().left;
    var y1 = $div1.offset().top;
    var h1 = $div1.outerHeight(true);
    var w1 = $div1.outerWidth(true);
    var b1 = y1 + h1;
    var r1 = x1 + w1;
    var x2 = $div2.offset().left;
    var y2 = $div2.offset().top;
    var h2 = $div2.outerHeight(true);
    var w2 = $div2.outerWidth(true);
    var b2 = y2 + h2;
    var r2 = x2 + w2;

    if (b1 < y2 || y1 > b2 || r1 < x2 || x1 > r2){
     console.log('collision');
    }else{
     console.log('hmm');
    }
}

$(() => {
    startGame();
    moveCharacter();
});
