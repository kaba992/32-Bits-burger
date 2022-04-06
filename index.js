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
}
refresh();
console.log(burgers_arr[current_index].burger_desc);
const bannerContent = document.querySelector(".banner_content");
const bannerItems = document.querySelectorAll(".burger_description_item");
arrow_left.addEventListener("click", () => {
  // bannerContent.classList.add("slide_right");
  TLAnim.fromTo(bannerItems, 1, { x: "-100%", opacity: 0, scale: 0.5 },
    { x: 0, opacity: 1, scale: 1 });
  swipe('left')
});
arrow_right.addEventListener("click", () => {
  bannerContent.classList.add("slide_left");
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
TweenLite.set('.navigation li', { x: -610 });

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




// TRANSITION PAGES BARBA JS GSAP


const wipe = document.querySelector('.wipe-transition');
const allBandes = document.querySelectorAll('.bande');


function delay(n) {
  return new Promise((done) => {
    setTimeout(() => {
      done();
    }, n)
  })
}

barba.init({

  sync: true,

  transitions: [{
    async leave() {

      const done = this.async();

      TLAnim
        .to(allBandes, {
          height: '100%',
          stagger: 0.05
        })

      // TLAnim.to(wipe, {left: '0%', ease: "power2.out", duration: 0.5});

      await delay(1500);
      done();

    },
    enter() {

      // TLAnim
      // .to(wipe, {left: '100%', ease:"power2.in", duration: 0.5})
      // .set(wipe, {left: '-100%'})

      TLAnim
        .to(allBandes, {
          height: '0%',
          stagger: 0.05
        })

    }
  }]

})
// SCROLL TRIGGER ANIMATION
