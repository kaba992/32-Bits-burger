
// BURGER MENU DYNAMIC CONTENT
const burger_title = document.querySelector(".burger_title");
const burger_description = document.querySelector(".burger_description");
const price_simple = document.querySelector(".price-simple");
const price_double = document.querySelector(".price-double");
const burger_img = document.querySelector(".burger-img");
const arrow_left = document.querySelector(".fa-arrow-left");
const arrow_right = document.querySelector(".fa-arrow-right");
const TLAnim = new TimelineMax();
const tl = new TimelineLite({ paused: true });



let burgers_arr = [];
burgers_arr = menuData.burgers;

let current_index = 0;
function refresh() {
  burger_title.innerHTML = burgers_arr[current_index].burger_names;
  price_simple.innerHTML = burgers_arr[current_index].price_simple;
  price_double.innerHTML = burgers_arr[current_index].price_double || "";
  burger_img.src = burgers_arr[current_index].img;
  const burgerDescTag = burgers_arr[current_index].burger_desc.map((desc) => `<li class="burger_description_item"><i class="fa-solid fa-alien-8bit"></i>${desc}</li>`).join("");
  burger_description.insertAdjacentHTML("beforeend", burgerDescTag);
  burger_title.setAttribute("title", `${burger_title.innerHTML}`);
}
refresh();
const swipe = (direction) => {

  let burger_size = burgers_arr.length;

  if (direction === 'right') {
    current_index = current_index + 1;
    if (current_index >= burger_size) {
      current_index = 0;
    }
  } else {
    current_index = current_index - 1;
    if (current_index < 0) {
      current_index = burger_size - 1;
    }
  }
  burger_title.innerHTML = burgers_arr[current_index].burger_names;
  price_simple.innerHTML = burgers_arr[current_index].price_simple;
  price_double.innerHTML = burgers_arr[current_index].price_double || "";
  const emptyPrice = document.querySelector(".price2");
  if (price_double.innerHTML === "") {
    emptyPrice.classList.add("empty_price");
  } else {
    emptyPrice.classList.remove("empty_price");
  }
  burger_img.src = burgers_arr[current_index].img;
  burger_title.setAttribute("title", `${burger_title.innerHTML}`);
}

const bannerContent = document.querySelectorAll(".burger_description li");
const priceAnim = document.querySelectorAll(".banne-price-wrapper .price");
const menuAnim = () => {
  TLAnim.fromTo(".burger-img", { scale: 0 }, { scale: 1, ease: Back.easeOut });
  TLAnim.fromTo(".title-wrapper", { scale: 0 }, { scale: 1, ease: Back.easeOut });
  TLAnim.fromTo(bannerContent, 1, { x: "-100%", stagger: 0.05 }, { x: "0%", stagger: 0.05, ease: Back.easeOut });
  TLAnim.fromTo(priceAnim, { opacity: 0 }, { opacity: 1, ease: Back.easeOut });
}
arrow_left.addEventListener("click", () => {
  menuAnim();
  swipe('left');
});
arrow_right.addEventListener("click", () => {
  menuAnim();
  swipe('right')
});



//ANIMATION BURGER MENU

const hamburger = document.querySelector(".hamburger");

TweenLite.set('.line01', { x: 40 });
TweenLite.set('.line03', { x: -40 });
TweenLite.set('.navigation', { xPercent: -50, yPercent: -50 })
TweenLite.set('.navigation li', { x: "-100%" });

const hamburgerMotion = new TimelineMax()
  .to('.line03', 0.4, { x: '-=40' }, 0)
  .to('.line01', 0.4, { x: '+=40' }, 0)
  .to('.menu', 0.4, { autoAlpha: 1 }, 0)
  .staggerTo('.navigation li', 0.4, { x: 0, ease: Sine.easeOut }, 0.2, 0.5)
  .to('.navigation li', 1, { marginBottom: '40px', ease: Power1.easeOut })
  .reverse()

hamburger.addEventListener('click', () => {
  hamburgerMotion.reversed(!hamburgerMotion.reversed());
});

const allBandes = document.querySelectorAll('.bande');
const wipe = document.querySelector('.wipe-transition');

const navLink = document.querySelectorAll(".navbar_item_link");
const mobLink = document.querySelectorAll(".mobile_menu_link");

// Navigation au click 
const scrollLink = (e) => {
  e.forEach((link, i) => {
    link.addEventListener("click", () => {
      //Permet de s'arreter à la slide souhaitée
      link.id = "Dot" + i;
      tl.seek(link.id).pause();
      TLAnim.to(allBandes, { height: '100%', stagger: 0.05 });
      TLAnim.to(allBandes, { height: '0%', stagger: 0.05 });
      TLAnim.fromTo(wipe, 0.5, { left: '0%', ease: Back.easeOut }, { left: '100%', ease: Back.easeOut });
      TLAnim.set(wipe, { left: '-100%', ease: Back.easeOut });
      hamburgerMotion.reversed(!hamburgerMotion.reversed());

    });
  });
}
scrollLink(navLink);
scrollLink(mobLink);

/* a Pen by Diaco m.lotfollahi  : https://diacodesign.com */

TweenLite.set('body', { perspective: 700 });
var slides = document.querySelectorAll('.slide');

for (let i = 0; i < slides.length; i++) {

  if (i != 0) { tl.addPause("Dot" + i) }
  if (i != slides.length - 1) {
    tl.to(slides[i], 0.5, { scale: .8, ease: Back.easeOut })
      .to(slides[i], 0.7, { xPercent: -100, rotationY: 80 }, 'L' + i)
      .from(slides[i + 1], 0.7, { xPercent: 100, rotationY: -80 }, 'L' + i)
      .from(slides[i + 1], 0.5, { scale: .8, ease: Back.easeIn })
  }
}
function GO(e) {
  var SD = isNaN(e) ? e.wheelDelta || -e.detail : e;
  if (SD < 0) { tl.play() } else { tl.reverse() }
}

document.addEventListener("mousewheel", GO);
document.addEventListener("DOMMouseScroll", GO);

/* a Pen by Diaco m.lotfollahi  : https://diacodesign.com */



// ANIMATION SVG
function setTextAnimation(delay, duration, strokeWidth, timingFunction, strokeColor, repeat) {
  let paths = document.querySelectorAll("path");
  let mode = repeat ? 'infinite' : 'forwards'
  for (let i = 0; i < paths.length; i++) {
    const path = paths[i];
    const length = path.getTotalLength();
    path.style["stroke-dashoffset"] = `${length}px`;
    path.style["stroke-dasharray"] = `${length}px`;
    path.style["stroke-width"] = `${strokeWidth}px`;
    path.style["stroke"] = `${strokeColor}`;
    path.style["animation"] = `${duration}s svg-text-anim ${mode} ${timingFunction}`;
    path.style["animation-delay"] = `${i * delay}s`;
  }
}
setTextAnimation(0.1, 6, 1, 'ease-in-out', '#ffffff', false);

TLAnim.fromTo(".svg-container", 1.5, { y: "-100%", opacity: 0, scale: 0, ease: Back.easeOut },
  { y: 0, opacity: 1, scale: 1, ease: Back.easeOut })
