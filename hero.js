
class Hero {
  constructor(name){
    this.name = name;
    this.health = 100;
  }
  hit(){
    this.health -= 100;
    if(this.health <= 0){
        alert('You died... Returning to last save point');
        $('.enemyImg').remove();
        $('.healthBar').remove();
        location.reload(false);
    }
  }
}

const player = new Hero();
