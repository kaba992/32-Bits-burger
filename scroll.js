// (function () {
//   "use strict";
//   /*[pan and section_wrapper CSS scrolls]*/
//   var section = document.querySelectorAll('section.section').length,
//     scdir, hold = false;

//   function _scrollY(obj) {
//     var slength, plength, pan, step = 100,
//       vh = window.innerHeight / 100,
//       vmin = Math.min(window.innerHeight, window.innerWidth) / 100;
//     console.log(this);
//     if ((this !== undefined && this.id === 'section_wrapper') || (obj !== undefined && obj.id === 'section_wrapper')) {
//       pan = this || obj;
//       plength = parseInt(pan.offsetHeight / vh);
//     }
//     if (pan === undefined) {
//       return;
//     }
//     plength = plength || parseInt(pan.offsetHeight / vmin);
//     slength = parseInt(pan.style.transform.replace('translateY(', ''));
//     if (scdir === 'up' && Math.abs(slength) < (plength - plength / section)) {
//       slength = slength - step;
//     } else if (scdir === 'down' && slength < 0) {
//       slength = slength + step;
//     } else if (scdir === 'top') {
//       slength = 0;
//     }
//     if (hold === false) {
//       hold = true;
//       pan.style.transform = 'translateY(' + slength + 'vh)';
//       setTimeout(function () {
//         hold = false;
//       }, 1000);
//     }
//     console.log(scdir + ':' + slength + ':' + plength + ':' + (plength - plength / section));
//   }
//   /*[swipe detection on touchscreen devices]*/
//   function _swipe(obj) {
//     var swdir,
//       sX,
//       sY,
//       dX,
//       dY,
//       threshold = 100,
//       /*[min distance traveled to be considered swipe]*/
//       slack = 50,
//       /*[max distance allowed at the same time in perpendicular direction]*/
//       alT = 500,
//       /*[max time allowed to travel that distance]*/
//       elT, /*[elapsed time]*/
//       stT; /*[start time]*/
//     obj.addEventListener('touchstart', function (e) {
//       var tchs = e.changedTouches[0];
//       swdir = 'none';
//       sX = tchs.pageX;
//       sY = tchs.pageY;
//       stT = new Date().getTime();
//       //e.preventDefault();
//     }, false);

//     obj.addEventListener('touchmove', function (e) {
//       e.preventDefault(); /*[prevent scrolling when inside DIV]*/
//     }, false);

//     obj.addEventListener('touchend', function (e) {
//       var tchs = e.changedTouches[0];
//       dX = tchs.pageX - sX;
//       dY = tchs.pageY - sY;
//       elT = new Date().getTime() - stT;
//       if (elT <= alT) {
//         if (Math.abs(dX) >= threshold && Math.abs(dY) <= slack) {
//           swdir = (dX < 0) ? 'left' : 'right';
//         } else if (Math.abs(dY) >= threshold && Math.abs(dX) <= slack) {
//           swdir = (dY < 0) ? 'up' : 'down';
//         }
//         if (obj.id === 'section_wrapper') {
//           if (swdir === 'up') {
//             scdir = swdir;
//             _scrollY(obj);
//           } else if (swdir === 'down' && obj.style.transform !== 'translateY(0)') {
//             scdir = swdir;
//             _scrollY(obj);

//           }
//           e.stopPropagation();
//         }
//       }
//     }, false);
//   }
//   /*[assignments]*/
//   var section_wrapper = document.getElementById('section_wrapper');
//   section_wrapper.style.transform = 'translateY(0)';
//   section_wrapper.addEventListener('wheel', function (e) {
//     if (e.deltaY < 0) {
//       scdir = 'down';
//     }
//     if (e.deltaY > 0) {
//       scdir = 'up';
//     }
//     e.stopPropagation();
//   });
//   section_wrapper.addEventListener('wheel', _scrollY);
//   _swipe(section_wrapper);

// })();

gsap.registerPlugin(ScrollTrigger);

let panels = gsap.utils.toArray(".panel"),
    scrollTween;

function goToSection(i) {
  scrollTween = gsap.to(window, {
    scrollTo: {y: i * innerHeight, autoKill: false},
    duration: 0.5,
    onComplete: () => scrollTween = null,
    overwrite: true
  });
}

panels.forEach((panel, i) => {
  ScrollTrigger.create({
    trigger: panel,
    start: "top bottom",
    end: "+=200%",
    onToggle: self => self.isActive && !scrollTween && goToSection(i)
  });
});

// just in case the user forces the scroll to an inbetween spot (like a momentum scroll on a Mac that ends AFTER the scrollTo tween finishes):
ScrollTrigger.create({
  start: 0,
  end: "max",
  snap: 1 / (panels.length - 1)
})

// Scroll Trigger
// gsap.registerPlugin(ScrollTrigger);


tl.to(".burger_description li", {
  scrollTrigger: {
    trigger: "#menu",
    start: "top center",
    toggleActions: "restart pause reverse pause"
  },
  x: -900,
  duration: 2
});

const tl = new TimelineMax();

tl.fromTo(".svg-container", 1.5, { y: -600, opacity: 0, scale: 0.5 },
  {  y: 0, opacity: 1, scale: 1 })
  // ease: Elastic.easeOut,
