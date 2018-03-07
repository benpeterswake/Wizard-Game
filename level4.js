const startLevel4 = () => {
  //Enter view with new background
  $('#hero').fadeIn();
  $('.heroImg').attr('src', 'images/hero.png');
  $('.heroImg').css('width', '105px');
  $('.endArrow').hide();
  $('#createPlayer').hide();
  $('#mark').hide();
  $('html').css('background', 'url(images/swamp.gif) no-repeat center');
  $('html').css('background-size','cover');
  $('html').css('height', '95%')
  $('html').css('background-color','black');
  $('#hero').css('left', '5%');
  $('#hero').css('top','79%');
  $('.enemy').css('margin-top', '43%');
  localStorage.setItem('battle2-completed','false');//change to false
  localStorage.setItem('altar-convo-completed','false');
  const $level3Text = $('<div>').attr('id','level3text');
  $level3Text.text('You follow the trail east for several hours...');
  $('body').prepend($level3Text);
  setTimeout(() => {
    $level3Text.text('..until you come to a dark swampy forest.');
  }, 2500);
  setTimeout(() => {
    $level3Text.text('Something doesn\'t seem right...');
  }, 6500);
  setTimeout(() => {
    $level3Text.text('Oh no, There\'s something charging at you!');
  }, 8500);
  setTimeout(() => {
    $level3Text.text('Prepare to fight!');
  }, 10500);
  setTimeout(() => {
    $level3Text.hide();
    skully.generateEnemy(7000);
    skully2.generateEnemy(9000);
    skully3.generateEnemy(11000);
    skully4.generateEnemy(12000);
    skully5.generateEnemy(13000);
    skully6.generateEnemy(14000);
    skully.img.attr('src','images/enemy3.gif');
    skully2.img.attr('src','images/enemy3.gif');
    skully3.img.attr('src','images/enemy3.gif');
    skully4.img.attr('src','images/enemy3.gif');
    skully5.img.attr('src','images/enemy3.gif');
    skully6.img.attr('src','images/enemy3.gif');
    $('.enemyImg').css('width','250px');
    $('.enemyImg').css('margin-top','-40px');
    $('.enemyImg').css('margin-left', '-50px');
  },12000);
  setTimeout(() => {
    localStorage.setItem('battle2-completed','true');
    $level3Text.text('Woah, those things definitley didn\'t want me to be here!').show();
  },22000);
  setTimeout(() => {
    $level3Text.hide()
  },26000)
  $(document).keydown(() => {
    if($('#hero').position().left >= ($( window ).width()-100) && localStorage.getItem('altar-convo-completed') === 'true'){
      alert('level 1 part 4 completed! All your progress has been saved');
      localStorage.setItem('level4-completed','true');
      $('.endArrow').hide();
      $('.info').hide();
      $('#hero').hide();
      $('html').css('background', 'url(images/loading.gif) no-repeat center center');
      $('html').css('background-color', 'rgb(25,31,38)');
      setTimeout(() => {
          window.location.reload(false);
      },3000);
    }
    if(event.which == '39'){
      if($('#hero').position().left >= 300 && localStorage.getItem('battle2-completed') === 'true' && localStorage.getItem('altar-convo-completed') === 'false'){
        const $div = $('<div>').addClass('altar');
        const $altar = $('<img>').attr('src','images/altar.gif').addClass('altarImg');
        const $speech = $('<div>').addClass('altarBubble');
        const $button = $('<button>').addClass('accept').text('Tell Altar what happened');
        $speech.css('height','100px');
        $speech.css('padding','20px');
        $speech.hide();
        $div.prepend($speech);
        $div.append($altar);
        $div.css('left','100%');
        $div.animate({
            left: "75%",
        }, 3000);
        setTimeout(() => {
          $speech.text('Who dares to disturb my slumper?! Leave here at once!').show();
        }, 4000);
        setTimeout(() => {
          $speech.text('Wait what?! ... Is that.. is that you ' + localStorage.getItem('name') + '? This can not be... you... you died.. so long ago... This must be a hallucination?');
        }, 9000);
        setTimeout(() => {
          $speech.text('What happened to you...?')
          $speech.append($button);
        }, 18000)

        $('#game-board').append($div);
        localStorage.setItem('altar-convo-completed','true');
        $button.on('click', () => {
          $speech.text(localStorage.getItem('name') + ', my old friend. Is that really you? Come with me, I think I can help to fill in some of the piece to this puzzle.');
          setTimeout(() => {
            $speech.hide();
            $div.animate({
                left: "100%",
            }, 3500);
            $('.endArrow').css('margin-top','-70px')
            $('.endArrow').show();
            localStorage.setItem('level4-completed', 'true');
          },8000);
        });
      }
    }
  });
}
