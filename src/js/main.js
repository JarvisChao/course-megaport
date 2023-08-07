/* ----------------------------------- */
/* ------ Custom ------ */
/* ----------------------------------- */
// 判斷是否為移動端
function isMobile() {
  try {
    document.createEvent('TouchEvent');
    return true;
  } catch (e) {
    return false;
  }
}

const lenis = new Lenis();
function raf(time) {
  lenis.raf(time);
  requestAnimationFrame(raf);
}
requestAnimationFrame(raf);

// //-- Detect Browser
// // 偵測瀏覽器加入對應 js 文件
// const $body = document.body;
// if (!isMobile()) {
//   const explorer = navigator.userAgent;
//   if (explorer.indexOf('Firefox') > -1 || explorer.indexOf('Chrome') > -1) {
//     const script = document.createElement('script');
//     script.src = 'js/SmoothScroll.min.js';
//     script.async = true;
//     $body.appendChild(script);
//   }
// }

//-- Btn Tag
// 抓取檔名
const pathname = location.pathname;
const a = document.querySelectorAll('a');
a.forEach(function(item) {
  const aHref = item.getAttribute('href');
  if (pathname.includes(aHref)) {
    item.classList.add('is-active');
  }
});

//-- Burger
let isOpened = false;
const $body = document.body;
const $navbar = document.querySelector('.l-navbar');
const $navbarBody = document.querySelector('.l-navbar__body');
const $burger = document.querySelector('.o-burger');
function handleBurger() {
  if (!isOpened) {
    $burger.classList.add('is-opened');
    $navbar.classList.add('is-opened');
    $body.style.overflow = 'hidden';
    setTimeout(function() {
      $navbarBody.style.overflow = 'auto';
    }, 1000);
    isOpened = true;
  } else {
    $burger.classList.remove('is-opened');
    $navbar.classList.remove('is-opened');
    $body.style.overflow = '';
    $navbarBody.style.overflow = 'hidden';
    isOpened = false;
  }
}

// 滾動至 news 時改變背景顏色
const $news = document.querySelector('.l-news');
window.addEventListener('scroll', function() {
  if ($news !== undefined) {
    const newsTop = this.scrollY + $news.getBoundingClientRect().top;
    const start = newsTop - 100;
    const end = newsTop + $news.offsetHeight / 1.2;
    if (this.scrollY > start && this.scrollY < end) {
      $body.classList.add('is-news-active');
    } else {
      $body.classList.remove('is-news-active');
    }
  }
});

// Go Top
function gotop(y, duration = 1000) {
  const initialY = document.documentElement.scrollTop || document.body.scrollTop;
  const baseY = (initialY + y) * 0.5;
  const difference = initialY - baseY;
  const startTime = performance.now();
  const step = () => {
    let normalizedTime = (performance.now() - startTime) / duration;
    if (normalizedTime > 1) {
      normalizedTime = 1;
    }
    window.scrollTo(0, baseY + difference * Math.cos(normalizedTime * Math.PI));
    if (normalizedTime < 1) window.requestAnimationFrame(step);
  };
  window.requestAnimationFrame(step);
}

/* ----------------------------------- */
/* ------ Plugin ------ */
/* ----------------------------------- */
const $lazyImgs = document.querySelectorAll('img.js-lazy');
$lazyImgs.forEach(function(item) {
  // https://png-pixel.com/
  item.setAttribute(
    'src',
    'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAZAAAAEsCAQAAABHvi1JAAACNUlEQVR42u3TMQEAAAgDINc/mLE0gZ8ndCA9BRwiCAgCgoAgIAgIAoKAICAICAIIAoKAICAICAKCgCAgCAgCggCCgCAgCAgCgoAgIAgIAoIAgoAgIAgIAoKAICAICAKCgCCAICAICAKCgCAgCAgCgoAggCAgCAgCgoAgIAgIAoKAICAIIAgIAoKAICAICAKCgCAgCCAICAKCgCAgCAgCgoAgIAgIAggCgoAgIAgIAoKAICAICAKCCAKCgCAgCAgCgoAgIAgIAoIAgoAgIAgIAoKAICAICAKCgCCAICAICAKCgCAgCAgCgoAggCAgCAgCgoAgIAgIAoKAICAIIAgIAoKAICAICAKCgCAgCCAICAKCgCAgCAgCgoAgIAgIAggCgoAgIAgIAoKAICAICAIIAoKAICAICAKCgCAgCAgCggCCgCAgCAgCgoAgIAgIAoKAIIKAICAICAKCgCAgCAgCgoAggCAgCAgCgoAgIAgIAoKAICAIIAgIAoKAICAICAKCgCAgCCAICAKCgCAgCAgCgoAgIAgIAggCgoAgIAgIAoKAICAICAIIAoKAICAICAKCgCAgCAgCggCCgCAgCAgCgoAgIAgIAoIAgoAgIAgIAoKAICAICAKCgCCAICAICAKCgCAgCAgCgoAgIIggIAgIAoKAICAICAKCgCAgCCAICAKCgCAgCAgCgoAgIAgIAggCgoAgIAgIAoKAICAICAIIAoKAICAICAKCgCAgCAgCggCCgCDwZwF2ixVTTYF0mAAAAABJRU5ErkJggg=='
  );
});
// https://github.com/verlok/vanilla-lazyload
const lazyLoad = new LazyLoad({
  elements_selector: 'img.js-lazy',
  // 設定距離可視區(視窗)底部多遠觸發
  threshold: 500,
  callback_loaded: function() {
    AOS.refresh();
  }
});

//-- gsap.js
// const shapePath = [
//   { d: 'M101.984 0L1486.33 178.762L1270.23 788.591L0 829.293L101.984 0Z' },
//   { d: 'M0 182.409L1498.74 0L1292.37 872.121L89.854 756.921L0 182.409Z' },
//   { d: 'M188.265 0L1441.82 45.919L1399.71 744.419L0 846.809L188.265 0Z' },
// ];
// function shapeAni(index) {
//   gsap.to('#banner-shape path', {
//     attr: { d: shapePath[index].d },
//     duration: 1.6,
//     ease: 'power1.out',
//   })
// }

//-- Swiper
if (new Swiper() !== undefined) {
  const headerSwiper = new Swiper('.l-header__swiper', {
    effect: 'fade',
    fadeEffect: {
      // crossFade: true,
    },
    // 緩慢施放
    longSwipesRatio: 0.1,
    loop: true,
    speed: 1600,
    autoplay: {
      delay: 3000,
      disableOnInteraction: false,
    },
    // on: {
    //   slideChange: function() {
    //     // alert(this.realIndex)
    //     shapeAni(this.realIndex)
    //   },
    // },
  })

  const newsSwiper = new Swiper('.l-news__swiper', {
    longSwipesRatio: 0.1,
    loop: true,
    speed: 1200,
    slidesPerView: 1,
    spaceBetween: 4,
    breakpoints: {
      1400: {
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
      init: function() {
        lazyLoad.update()
      },
    },
    navigation: {
      prevEl: '.l-news__btn-swiper.--prev',
      nextEl: '.l-news__btn-swiper.--next',
    },
  })
}

//-- Parallax
const $parallaxes = document.querySelectorAll('.js-parallax');
$parallaxes.forEach(function(item) {
  new Parallax(item, {
    // 滑鼠進入元素內才生效
    hoverOnly: true,
    // 滑鼠相對於指定元素（預設為可視區）
    relativeInput: true,
  })
});
