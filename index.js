// BURGER MENU DYNAMIC CONTENT
console.log(menuData);
const burger_title = document.querySelector(".burger_title");
const burger_description = document.querySelector(".burger_description");
const price_simple = document.querySelector(".price-simple");
const price_double = document.querySelector(".price-double");
const burger_img = document.querySelector(".burger-img");
const arrow_left = document.querySelector(".fa-arrow-left");
const arrow_right = document.querySelector(".fa-arrow-right");
const TLAnim = new TimelineMax();

let burgers_arr = [];
burgers_arr = menuData.burgers;

let current_index = 0;
function refresh() {
  burger_title.innerHTML = burgers_arr[current_index].burger_names;
  price_simple.innerHTML = burgers_arr[current_index].price_simple;
  price_double.innerHTML = burgers_arr[current_index].price_double || "";
  burger_img.src = burgers_arr[current_index].img;
  burger_description.innerHTML = burgers_arr[current_index].burger_desc.map((desc) => `<li class="burger_description_item"><i class="fa-solid fa-alien-8bit"></i>${desc}</li>`).join("");
  burger_title.setAttribute("title", `${burger_title.innerHTML}`);
}
refresh();

const bannerContent = document.querySelector(".banner_content");
const bannerItems = document.querySelectorAll(".burger_description_item");
arrow_left.addEventListener("click", () => {

  TLAnim.to(bannerContent, 0.6,{ x: "-100%" });
  TLAnim.to(bannerContent,0.6, { x: "0%", ease: Sine.easeOut });
  swipe('left')
});
arrow_right.addEventListener("click", () => {
  TLAnim.to(bannerContent, { x: "-100%"});
  TLAnim.to(bannerContent, { x: "0%", ease: Sine.easeOut });
  swipe('right')
});
bannerContent.addEventListener("animationend", () => {
  bannerContent.classList.remove("slide_right") || bannerContent.classList.remove("slide_left");
});
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
  refresh();

}

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

hamburger.addEventListener('click', function (e) {
  hamburgerMotion.reversed(!hamburgerMotion.reversed());
});




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
