/* ----------------------------------- */
/* ------ Custom ------ */
/* ----------------------------------- */
// -- Detect Browser
// 偵測瀏覽器加入對應 js 文件
function isMobile() {
  try {
    document.createEvent('TouchEvent')
    return true;
  } catch (e) {
    return false;
  }
}
if (!isMobile()) {
  let explorer = navigator.userAgent
  if (explorer.indexOf('Firefox') > -1) {
    $('body').append('<script async src="js/smooth-scrolling-chrome.js"></script>')
  } else if (explorer.indexOf('Chrome') > -1) {
    $('body').append('<script async src="js/smooth-scrolling-chrome.js"></script>')
  } else if (explorer.indexOf('Safari') > -1) {
    $('body').append('<script async src="js/smooth-scrolling-safari.js"></script>')
  }
}
// -- Hover Mobile
$(function () {
  if (isMobile()) {
    $('.u-hover-mobile').css({
      display: 'block',
    })
  } else {
    $('.u-hover-mobile').css({
      display: 'none',
    })
  }
})

//-- Btn Tag
// 抓取檔名
$(function () {
  let pathname = location.pathname;
  $('a').each(function () {
    let aHref = $(this).attr('href')
    if (pathname.indexOf(aHref) > -1) {
      $(this).addClass('is-active')
    }
  })
})

// -- navbar
$(function () {
  if (!$('#app').hasClass('is-home')) {
    $('.c-navbar').addClass('is-fixed')
  }
  $(window).scroll(function () {
    if ($('#app').hasClass('is-home')) {
      if ($(this).scrollTop() > $('.l-header').outerHeight() / 2) {
        $('.c-navbar').addClass('is-fixed')
      } else {
        $('.c-navbar').removeClass('is-fixed')
      }
    }
  })
  let debounce;
  $(window).on('resize load', function () {
    let self = this;
    // 防止持續執行（防抖）
    if (debounce) clearTimeout(debounce)
    debounce = setTimeout(function () {
      console.log('change!!!')
      if (self.matchMedia('(max-width: 767.98px)').matches) {
        $('.c-navbar').addClass('is-burger')
      } else {
        $('.c-navbar').removeClass('is-burger')
      }
    }, 100)
  })
})

// -- burger
let isOpened = false;
function handleBurger() {
  if (isOpened === false) {
    $('.o-burger').addClass('is-opened')
    $('.c-navbar').addClass('is-opened')
    setTimeout(function () {
      $('.c-navbar__body').css({
        overflow: 'auto',
      })
    }, 1000)
    isOpened = true;
  } else if (isOpened === true) {
    $('.o-burger').removeClass('is-opened')
    $('.c-navbar').removeClass('is-opened')
    $('.c-navbar__body').css({
      overflow: 'hidden',
    })
    isOpened = false;
  }
}

// 滾動至 news 時改變背景顏色
$(function () {
  $(window).scroll(function () {
    if ($('.l-news')[0] !== undefined) {
      let $news = $('.l-news')
      let newsTop = $news.offset().top - 60;
      let newsBottom = $news.offset().top + $news.outerHeight() / 1.4;
      if (this.scrollY > newsTop && this.scrollY < newsBottom) {
        $('body').addClass('is-news-active')
      } else {
        $('body').removeClass('is-news-active')
      }
    }
  })
})

// go top
$(function () {
  let gotop = false;
  $('.o-gotop').click(function () {
    if (gotop === false) {
      $('html, body').animate({
          scrollTop: 0,
        }, 1000)
      gotop = true;
      setTimeout(function () {
        gotop = false;
      }, 1000)
    }
  })
})

/* ----------------------------------- */
/* ------ Plugin ------ */
/* ----------------------------------- */
$(function () {
  // https://png-pixel.com/
  $('img.js-lazy').attr(
    'src',
    'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAZAAAAEsCAQAAABHvi1JAAACNUlEQVR42u3TMQEAAAgDINc/mLE0gZ8ndCA9BRwiCAgCgoAgIAgIAoKAICAICAIIAoKAICAICAKCgCAgCAgCggCCgCAgCAgCgoAgIAgIAoIAgoAgIAgIAoKAICAICAKCgCCAICAICAKCgCAgCAgCgoAggCAgCAgCgoAgIAgIAoKAICAIIAgIAoKAICAICAKCgCAgCCAICAKCgCAgCAgCgoAgIAgIAggCgoAgIAgIAoKAICAICAKCCAKCgCAgCAgCgoAgIAgIAoIAgoAgIAgIAoKAICAICAKCgCCAICAICAKCgCAgCAgCgoAggCAgCAgCgoAgIAgIAoKAICAIIAgIAoKAICAICAKCgCAgCCAICAKCgCAgCAgCgoAgIAgIAggCgoAgIAgIAoKAICAICAIIAoKAICAICAKCgCAgCAgCggCCgCAgCAgCgoAgIAgIAoKAIIKAICAICAKCgCAgCAgCgoAggCAgCAgCgoAgIAgIAoKAICAIIAgIAoKAICAICAKCgCAgCCAICAKCgCAgCAgCgoAgIAgIAggCgoAgIAgIAoKAICAICAIIAoKAICAICAKCgCAgCAgCggCCgCAgCAgCgoAgIAgIAoIAgoAgIAgIAoKAICAICAKCgCCAICAICAKCgCAgCAgCgoAgIIggIAgIAoKAICAICAKCgCAgCCAICAKCgCAgCAgCgoAgIAgIAggCgoAgIAgIAoKAICAICAIIAoKAICAICAKCgCAgCAgCggCCgCDwZwF2ixVTTYF0mAAAAABJRU5ErkJggg=='
  )
  // https://github.com/verlok/vanilla-lazyload
  let lazyLoadImgs = new LazyLoad({
    elements_selector: 'img.js-lazy',
    // 設定距離可視區(視窗)底部多遠觸發
    threshold: 500,
    callback_loaded: function () {
      AOS.refresh()
    },
  })

  // -- gsap.js
  let shapePath = [
    { d: 'M101.984 0L1486.33 178.762L1270.23 788.591L0 829.293L101.984 0Z' },
    { d: 'M0 182.409L1498.74 0L1292.37 872.121L89.854 756.921L0 182.409Z' },
    { d: 'M188.265 0L1441.82 45.919L1399.71 744.419L0 846.809L188.265 0Z' },
  ];
  function shapeAni(index) {
    gsap.to('#banner-shape path', {
      attr: { d: shapePath[index].d },
      duration: 1.6,
      ease: 'power1.out',
    })
  }

  // swiper
  if (new Swiper() !== undefined) {
    let headerSwiper = new Swiper('.l-header__swiper', {
      effect: 'fade',
      fadeEffect: {
        crossFade: true,
      },
      // 緩慢施放
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
          shapeAni(this.realIndex)
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
          spaceBetween: 30,
        },
        1024: {
          slidesPerView: 3,
          spaceBetween: 20,
        },
        576: {
          slidesPerView: 2,
          spaceBetween: 15,
        },
      },
      on: {
        init: function () {
          lazyLoadImgs.update()
        },
      },
      navigation: {
        prevEl: '.l-news__btn-swiper.--pre',
        nextEl: '.l-news__btn-swiper.--next',
      },
    })
  }
})

// -- parallax
$(function () {
  let jsParallax = [];
  $('.js-parallax').each(function () {
    jsParallax.push(
      new Parallax(this, {
        // 滑鼠進入元素內才生效
        hoverOnly: true,
        // 滑鼠相對於指定元素（預設為可視區）
        relativeInput: true,
      })
    )
  })
})
