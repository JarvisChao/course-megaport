/* ----------------------------------- */
/* ------ Custom ------ */
/* ----------------------------------- */
// -- Detect Browser
// 偵測瀏覽器加入對應 js 文件
function isMobile() {
  try { document.createEvent('TouchEvent'); return true; }
  catch (e) { return false; }
}
if (!isMobile()) {
  let explorer = navigator.userAgent
  if (explorer.indexOf('Firefox') >= 0) {
    document.write('<script async src="js/smooth-scrolling-chrome.js"></script>')
  } else if (explorer.indexOf('Chrome') >= 0) {
    document.write('<script async src="js/smooth-scrolling-chrome.js"></script>')
  } else if (explorer.indexOf('Safari') >= 0) {
    document.write('<script async src="js/smooth-scrolling-safari.js"></script>')
  }
}
// -- Hover Mobile
$(function() {
  if (isMobile()) {
    $('.u-hover-mobile').css({
      display: "block"
    })
  } else {
    $('.u-hover-mobile').css({
      display: "none"
    })
  }
})

//-- Btn Tag
// 抓取檔名
$(function() {
  let url = location.href
  $('a').each(function() {
    let aHref = $(this).attr('href').split('/')
    let aValue = aHref[aHref.length - 1] || ' '
    if (url.indexOf(aValue) > -1 && aValue !== '##') {
      $(this).addClass('is-active')
    }
  })
})

// -- burger
$(function() {
  let isOpened = false
  $('.o-burger').click(function() {
    if (isOpened === false) {
      $('.o-burger').addClass('is-opened')
      $('.c-navbar').addClass('is-opened')
      setTimeout(function () {
        $('.c-navbar__body').css({
          overflow: 'auto'
        })
      }, 1000);
      isOpened = true
    } else if (isOpened === true) {
      $('.o-burger').removeClass('is-opened')
      $('.c-navbar').removeClass('is-opened')
      $('.c-navbar__body').css({
        overflow: 'hidden'
      })
      isOpened = false
    }
  })
  $(window).on('resize load', function() {
    let self = this
    // 防止持續執行（防抖）
    let debounce = null
    if (debounce) clearTimeout(debounce)
    debounce = setTimeout(function() {
      if (self.matchMedia("(max-width: 767.98px)").matches) {
        $('.c-navbar').addClass('is-burger')
      } else {
        $('.c-navbar').removeClass('is-burger')
      }
    }, 1000)
  })
})

// -- navbar
$(function () {
  if (!$('#app').hasClass('is-home')) {
    $('.c-navbar').addClass('is-fixed')
  }
  let lastScrollY = 0
  $(window).scroll(function() {
    let firstScrollY = this.scrollY || this.pageYOffset
    if ($('.c-navbar').hasClass('is-fixed')) {
      // 向上滾動
      if (firstScrollY > lastScrollY) {
        $('.c-navbar').addClass('is-scrolling')
      } else {
        $('.c-navbar').removeClass('is-scrolling')
      }
    }
    lastScrollY = firstScrollY

    if ($('#app').hasClass('is-home')) {
      if ($(this).scrollTop() > $('.l-header').outerHeight() / 2) {
        $('.c-navbar').addClass('is-fixed')
      } else {
        $('.c-navbar').removeClass('is-fixed')
      }
    }
  })
})

// 滾動至 news 時改變背景顏色
$(function() {
  $(window).scroll(function() {
    if ($('.l-news')[0] !== undefined) {
      let $news = $('.l-news')
      let newsTop = $news.offset().top - 60
      let newsBottom = $news.offset().top + $news.outerHeight() / 1.4
      if (this.scrollY > newsTop && this.scrollY < newsBottom) {
        $('body').addClass('is-news-active')
      } else {
        $('body').removeClass('is-news-active')
      }
    }
  })
})

// go top
$(function() {
  let gotop = false
  $('.o-gotop').click(function() {
    if (gotop === false) {
      $('html, body').stop().animate({
        scrollTop: 0
      }, 300)
      gotop = true
      setTimeout(function() {
        gotop = false
      }, 1000);
    }
  })
})

/* ----------------------------------- */
/* ------ Plugin ------ */
/* ----------------------------------- */
$(function() {

  // -- anime.js
  let shapePoints = [
    { points: '1500.08226 188 1283 780.934362 0 846.020306 111.931394 0' },
    { points: '1500 0 1283 869.477229 96.6496463 741 0 188' },
    { points: '1500.08226 94.0370968 1455.02864 791.163534 49.3561018 897.504525 244 50' }
  ]
  function shapeAni(index) {
    anime({
      targets: '#banner-shape',
      points: [
        { value: shapePoints[index].points }
      ],
      duration: 1600,
      // direction: 'alternate',
      easing: 'easeOutQuad',
      autoplay: true,
      // loop: true
    })
  }

  // swiper
  if (new Swiper() !== undefined) {
    const headerSwiper = new Swiper('.l-header__swiper', {
      effect: 'fade',
      fadeEffect: {
        crossFade: true
      },
      longSwipesRatio: 0.1,
      loop: true,
      speed: 1600,
      autoplay: {
        delay: 3000,
        disableOnInteraction: false,
      },
      on: {
        slideChange: function () {
          // alert(this.realIndex)
          let shapeIndex = this.realIndex + 1
          if (this.realIndex + 1 > 2) shapeIndex = 0
          shapeAni(shapeIndex)
        },
      },
    })

    let swiperNews = new Swiper('.l-news__swiper', {
      longSwipesRatio: 0.1,
      loop: true,
      speed: 1200,
      slidesPerView: 1,
      spaceBetween: 4,
      breakpoints: {
        1366: {
          slidesPerView: 4,
          spaceBetween: 30
        },
        1024: {
          slidesPerView: 3,
          spaceBetween: 20
        },
        576: {
          slidesPerView: 2,
          spaceBetween: 15
        }
      },
      navigation: {
        prevEl: '.l-news__btn-swiper.--pre',
        nextEl: '.l-news__btn-swiper.--next',
      }
    })
  }
})

// -- parallax
$(function() {
  let jsParallax = [];
  $('.js-parallax').each(function () {
    jsParallax.push(new Parallax(this, {
      // 滑鼠進入元素內才生效
      hoverOnly: true,
      // 滑鼠相對於指定元素（預設為可視區）
      relativeInput: true
    }))
  })
})