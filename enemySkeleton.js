class Enemy {

  constructor(){
    this.name = 'Skeleton';
    this.health = 100;
    this.enemy = $('<div>').addClass('enemy');
    this.img = $('<img>').attr('src','images/enemy.gif').addClass('enemyImg');
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
    let checkhero = setInterval(function () {
      let delta = ($('#hero').width() + $(".enemyImg").width()) * 0.5 ;
      let x1 = $('#hero').offset().left;
      let y1 = $('#hero').offset().top;
      if(localStorage.getItem('level3-completed') === 'true'){
        var x2 = $(".enemyImg").offset().left+160;
      }else{
        var x2 = $(".enemyImg").offset().left+10;
      }
      let y2 = $(".enemyImg").offset().top;
      if (
           x1 >= x2 - delta &&
           x1 <= x2 + delta &&
           y1 >= y2 - delta &&
           y1 <= y2 + delta
       ) {
         // let heroHit = ($('#hero').position().left - 50) + 'px';
         // $('#hero').css('left', heroHit);
         player.hit();
       }
    }, 10);
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

//Create enemies
const skully = new Enemy();
const skully2 = new Enemy();
const skully3 = new Enemy();
const skully4 = new Enemy();
const skully5 = new Enemy();
const skully6 = new Enemy();
const skully7 = new Enemy();
const skully8 = new Enemy();
