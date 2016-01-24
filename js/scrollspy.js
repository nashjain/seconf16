(function($){
  $(document).ready(function(){
    //console.log('hello divi');
    $('.et_pb_scroll_top').hide();

    $('.js-schedule-content').hide();

    $('#js-toggle-day1').click(function(){
      $(this).toggleClass('schedule-toggler-open');
      $('#js-day1-content').slideToggle();
    });

    $('#js-toggle-day2').click(function(){
      $(this).toggleClass('schedule-toggler-open');
      $('#js-day2-content').slideToggle();
    });

    $('#js-toggle-day3').click(function(){
      $(this).toggleClass('schedule-toggler-open');
      $('#js-day3-content').slideToggle();
    });

    $('.burger').click(function(){
      $('.mobile-nav-links').slideToggle();
    });
    $('.mobile-nav-link').click(function(){
      $('.mobile-nav-links').slideToggle();
    });

    // $('.scroll-link').click(function(e){
    //   // e.preventDefault();
    //   // var $to = $($(this).data('scrollto'));
    //   // console.log($to);
    //   // smoothScroll($to);
    // });

    $('.popup-trigger').click(function(e){
      var who = $(this);
      e.preventDefault();
      generatePopup(who);
    });

    $(document).keyup(function(e) {
      if (e.keyCode == 27) {
        hidePopup();
      }
    });

    $('html').attr('style','margin-top:0px!important');
    $('#wpadminbar').remove();


  });

  function showPopup(who) {
    $(who).show();
  }

  function hidePopup(who) {
    $('.scpopup').remove();
    $('.popup-bg').remove();
    $('body').removeClass('noScroll');
  }

  function generatePopup($trigger){

    var popupType = $trigger.data('popup_type');
    //console.log(popupType);

    var $body = $('body');
    var $popupbg = $(document.createElement('div')).addClass('popup-bg');

    var $popup = $(document.createElement('div')).addClass('scpopup');
    var $close = $(document.createElement('div')).addClass('close-popup').html('');
    $popup.append($close);

    var $img = $trigger.find('img');
    var $popupImg = '';

    var popupImgUrl = $trigger.data('popup_img');

    if($img.length > 0 || popupImgUrl){
      var imgSrc = '';
      if(popupImgUrl){
        imgSrc = popupImgUrl;
      } else {
        imgSrc = $img.attr('src')
      }
      $popupImg = $(document.createElement('img')).attr('src',imgSrc).addClass('popup-image');
      $popup.append($popupImg);
      if(popupType == 'sponsor') {
        $popupImg.addClass('popup-image-sponsor');
      }
      if(popupType == 'speaker') {
        $popupImg.addClass('popup-image-speaker');
      }
    } else {
      $popup.addClass('popup-noimg');
    }

    var $titleWrap = $(document.createElement('div')).addClass('popup-titleWrap');
    if($trigger.data('popup_title')){
      var $title = $(document.createElement('p')).html($trigger.data('popup_title')).addClass('popup-title');
      $titleWrap.append($title);
    }
    if($trigger.data('popup_subtitle')){
      var $subtitle = $(document.createElement('p')).html($trigger.data('popup_subtitle')).addClass('popup-subtitle');
      $titleWrap.append($subtitle);
    }
    if($trigger.data('popup_twitter')){
      var handle = $trigger.data('popup_twitter');
      var $twitter = $(document.createElement('a')).text(handle).attr('href','https://twitter.com/'+handle).attr('target','_blank').addClass('popup-social').addClass('popup-twitter');
      $titleWrap.append($twitter);
    }

    if($trigger.data('popup_github')){
      var handle = $trigger.data('popup_github');
      var $github = $(document.createElement('a')).text(handle).attr('href','https://github.com/'+handle).attr('target','_blank').addClass('popup-social').addClass('popup-github');
      $titleWrap.append($github);
    }

    if($trigger.data('popup_url')){
      var href = $trigger.data('popup_url');
      var text = href.split('//')[1].replace('/','');
      var $url = $(document.createElement('a')).text(text).attr('href',href).attr('target','_blank').addClass('popup-url-sponsor');
      $titleWrap.append($url);
    }

    if(popupType == 'sponsor') {
      $titleWrap.addClass('popup-titleWrap-sponsor');
    }

    $popup.append($titleWrap);

    if($trigger.data('popup_paragraph')){
      var $content = $(document.createElement('p')).html($trigger.data('popup_paragraph')).addClass('popup-content');
      $popup.append($content);
    }
    if($trigger.data('popup_content')){
      var $content = $(document.createElement('p')).html(decodeURI($trigger.data('popup_content'))).addClass('popup-content');
      $popup.append($content);
    }


    //create the socials
    //github


    $body.append($popupbg).append($popup).addClass('noScroll');


    $('.close-popup').click(function(){
      hidePopup();
    });

    $('.popup-bg').click(function(){
      hidePopup();
    });
    window.setTimeout(function(){
      $('.popup-bg').addClass('popup-bg--active');
    }, 0);



  }

})(jQuery);


(function($){

  $(document).ready(function(){
    checkForLazyness();
    $('.sneaky-load').each(function(){
      cacheBust($(this));
    });
  });

  $(window).scroll(function(){
    checkForLazyness();
  });

  function checkForLazyness() {
    $('.sneaky-load').each(function(){
      if(inView($(this)[0].getBoundingClientRect())){
        //console.log('found one in view');
        showTheImage($(this));
      } else {
        // console.log('not in view');
      }
    });
  }

  function inView(coords) {
    return ((coords.top >= 0 && coords.left >= 0 && coords.top) <= (window.innerHeight || document.documentElement.clientHeight));
  }

  function showTheImage($img) {

    $img.removeClass('sneaky-load');

  }

  function cacheBust($img) {
    var src = $img.attr('src');
    $img.attr('src',src + '?t=' + Math.random());
  }

  // Set scrollspy parameters
        var lastId,
        topMenu = $(".scrollspy-navigation"),
        topMenuHeight = topMenu.outerHeight()+15,
        menuItems = topMenu.find("li.scrollspy-item").find('a'),
        scrollItems = menuItems.map(function(){
          var item = $($(this).attr("href"));
          if (item.length) { return item; }
        });

        // Scroll event trigger
        $(window).scroll(function(event) {
            var fromTop = $(this).scrollTop()+topMenuHeight;
            // Get id of current scroll item
            var cur = scrollItems.map(function(){
                if ($(this).offset().top < fromTop)
                    return this;
            });
           
            // Get the id of the current element
            cur = cur[cur.length-1];
            var id = cur && cur.length ? cur[0].id : "";
           
            if (lastId !== id) {
                lastId = id;
                // Set/remove active class
                menuItems
                    .parent().removeClass("nav-selected")
                    .end().filter("[href=#"+id+"]").parent().addClass("nav-selected");
            }                   
        });

})(jQuery);