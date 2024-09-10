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

// Navbar
let isNavOpened = false;
const $body = document.body;
const $nav = document.querySelector('.c-nav');
const $burger = document.querySelector('.o-burger');
function toggleNav() {
  if (!isNavOpened) {
    // $body.style.overflow = 'hidden';
    lenis.stop();
    $nav.classList.add('is-opened');
    $burger.classList.add('is-opened');
    isNavOpened = true;
  } else {
    // $body.style.overflow = '';
    lenis.start();
    $nav.classList.remove('is-opened');
    $burger.classList.remove('is-opened');
    isNavOpened = false;
  }
}
window.matchMedia('(min-width: 1400px)').addEventListener('change', function(e) {
  if (isNavOpened) {
    if (e.matches) {
      lenis.start();
    } else {
      lenis.stop();
    }
  }
})

// 滾動至 news 時改變背景顏色
const $news = document.querySelector('.l-news');
window.addEventListener('scroll', function() {
  if ($news !== null) {
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
// function gotop(y, duration = 1000) {
//   const initialY = document.documentElement.scrollTop || document.body.scrollTop;
//   const baseY = (initialY + y) * 0.5;
//   const difference = initialY - baseY;
//   const startTime = performance.now();
//   const step = () => {
//     let normalizedTime = (performance.now() - startTime) / duration;
//     if (normalizedTime > 1) {
//       normalizedTime = 1;
//     }
//     window.scrollTo(0, baseY + difference * Math.cos(normalizedTime * Math.PI));
//     if (normalizedTime < 1) window.requestAnimationFrame(step);
//   };
//   window.requestAnimationFrame(step);
// }

/* ----------------------------------- */
/* ------ Plugin ------ */
/* ----------------------------------- */
const $lazyImgs = document.querySelectorAll('img.js-lazy');
$lazyImgs.forEach(function(item) {
  // https://png-pixel.com/
  item.setAttribute(
    'src',
    'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAQAAAC1HAwCAAAAC0lEQVR42mNkYAAAAAYAAjCB0C8AAAAASUVORK5CYII='
  );
});
// https://github.com/verlok/vanilla-lazyload
const lazyLoad = new LazyLoad({
  elements_selector: '.js-lazy',
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

//-- Parallax
const $parallaxes = document.querySelectorAll('.js-parallax');
$parallaxes.forEach(function(item) {
  new Parallax(item, {
    // 滑鼠進入指定元素內才生效
    hoverOnly: true,
    // 滑鼠相對於指定元素（false 預設為可視區）
    relativeInput: true,
  })
});

gsap.registerPlugin(ScrollTrigger);
const tl = gsap.timeline({
  scrollTrigger: {
    trigger: '.c-blockade', // 觸發點
    start: 'top center', // 觸發點上方、視窗中心交會時觸發
    end: 'bottom 20%', // 觸發點底部、視窗 20% 處交會時結束
    scrub: true, // 隨滑鼠滾動
  },
  ease: 'none'
});

const $blockadeTexts = document.querySelectorAll('.c-blockade__text');
tl.fromTo($blockadeTexts[0], { x: '70vw' }, { x: '-110vw' }, 'startLabel');
tl.fromTo($blockadeTexts[1], { x: '-50vw' }, { x: '100vw' }, 'startLabel+=5%');
tl.fromTo($blockadeTexts[2], { x: '100vw' }, { x: '-60vw' }, 'startLabel+=5%');
tl.fromTo($blockadeTexts[3], { x: '-100vw' }, { x: '90vw' }, 'startLabel+=10%');
