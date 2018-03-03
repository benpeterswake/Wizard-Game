class Hero {
  constructor(name){
    this.name = name;
    this.health = 100;
  }
}

const startGame = () => {
  startCompleted = true;
  $('#createPlayer').show('slow');
  $('#button').on('click', () => {
    let name = $('#name').val()
    const player = new Hero(name);
    console.log(player);
    $('#createPlayer').hide();
    const $div = $('<div>').addClass('start').text('You awake in a field...');
    $div.show('slow');
    setTimeout(() => {
      $div.text('..with no memory of how you go there.');
    },2500);
    setTimeout(() => {
      $div.hide('slow');
    },7000);
    $('body').prepend($div);
  });
}

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
        }, 4000)
      }
      if(event.which == "65"){
        let width = ("+=" + $( window ).width() + 'px');
        setTimeout(() => {
          $('.attack').remove(1);
        },10000);
        const $attack = $('<div>').addClass('attack');
        const $img = $('<img>').attr('src','images/fire.png').addClass('fireball');
        $attack.append($img);
        $board.prepend($attack);
        $(".attack").animate({
        marginLeft: width,
        }, 1000);
      }
    }else if($hero.css('left') < '0px'){
      //hero1
      if(event.which == "37"){
        $hero.css('transform', 'scaleX(1)');
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
        $hero.css('transform', 'scaleX(1)');
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
$(() => {
  let startCompleted = Boolean;
  startGame();
  moveCharacter();

});
