// BURGER MENU DYNAMIC CONTENT
console.log(menuData);
const burger_title = document.querySelector(".burger_title");
const burger_description = document.querySelector(".burger_description");
const price_simple = document.querySelector(".price-simple");
const price_double = document.querySelector(".price-double");
const burger_img = document.querySelector(".burger-img");
const arrow_left = document.querySelector(".fa-arrow-left");
const arrow_right = document.querySelector(".fa-arrow-right");

let burgers_arr = [];
burgers_arr = menuData.burgers;

let current_index = 0;

console.log(burgers_arr[current_index].burger_desc);
const bannerContent = document.querySelector(".banner_content");
arrow_left.addEventListener("click", () => {
    bannerContent.classList.add("slide_right");
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

    burger_title.innerHTML = burgers_arr[current_index].burger_names;
    price_simple.innerHTML = burgers_arr[current_index].price_simple;
    price_double.innerHTML = burgers_arr[current_index].price_double || "";
    burger_img.src = burgers_arr[current_index].img;
    burger_description.innerHTML = burgers_arr[current_index].burger_desc.map((desc) => `<li class="burger_description_item"><i class="fa-solid fa-alien-8bit"></i>${desc}</li>`).join("");
}

//ANIMATION BURGER MENU
const burgerIcon = document.querySelector(".burger_menu");
burgerIcon.addEventListener("click", () => {
    burgerIcon.classList.toggle("active");
    document.querySelector(".mobile_menu").classList.toggle("active");

})

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
const myFullPage = new fullpage("#fullpage", {
    //options here
    autoScrolling: true,
    navigation: true,
    anchors: ["accueil", "menus", "a_propos", "contact"],
    showActiveTooltip: false,
    licenceKey: "3C75E74C-BAB44710-B1CAFA3E-5C505438",
    slidesNavigation: true,
    controlArrows: false,
})


// TRANSITION PAGES BARBA JS GSAP


const wipe = document.querySelector('.wipe-transition');
const allBandes = document.querySelectorAll('.bande');
const TLAnim = new TimelineMax();

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
// trigger transition on click
/**
 * Updates links that point to the current page
 */