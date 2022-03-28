import "./index.scss";
// import './node_modules/flickity/css/flickity.css';
import "./node_modules/swiper/dist/css/swiper.css";
import { gsap, TimelineMax } from "gsap";
import scrollMonitor from "scrollmonitor";
import { imagesLoaded } from "imagesloaded";
import Masonry from "masonry-layout";

import Swiper from "swiper";
import { Timeline } from "gsap/gsap-core";

// const iframe1 = document.querySelectorAll("iframe")[0];
// const iframe2 = document.querySelectorAll("iframe")[1];
// const iframe3 = document.querySelectorAll("iframe")[2];
const iframe = document.querySelectorAll("iframe")[0];
const video1 = document.querySelectorAll(".videos__item")[0];
const video2 = document.querySelectorAll(".videos__item")[1];
const video3 = document.querySelectorAll(".videos__item")[2];
const url1 = "https://www.youtube.com/embed/W4SGLaF_JSQ";
const url2 = "https://www.youtube.com/embed/Ejq4QE9Dt9I";
const url3 = "https://www.youtube.com/embed/keUsyfBR4FQ";

video1.addEventListener("click", () => {
  document
    .querySelectorAll(".videos__item.active")[0]
    .classList.remove("active");
  video1.classList.add("active");
  iframe.src = url1;
  // Array.from(document.querySelectorAll("iframe")).forEach((iframe) => {
  //   iframe.classList.remove("hidden");
  //   iframe.classList.add("hidden");
  //   iframe.contentWindow.postMessage(
  //     JSON.stringify({ event: "command", func: "stopVideo" }),
  //     "*"
  //   );
  // });
  // iframe1.classList.remove("hidden");
});

video2.addEventListener("click", () => {
  document
    .querySelectorAll(".videos__item.active")[0]
    .classList.remove("active");
  video2.classList.add("active");
  iframe.src = url2;
  // Array.from(document.querySelectorAll("iframe")).forEach((iframe) => {
  //   iframe.classList.remove("hidden");
  //   iframe.classList.add("hidden");
  // });
  // iframe2.classList.remove("hidden");
});

video3.addEventListener("click", () => {
  document
    .querySelectorAll(".videos__item.active")[0]
    .classList.remove("active");
  video3.classList.add("active");
  iframe.src = url3;
  // Array.from(document.querySelectorAll("iframe")).forEach((iframe) => {
  //   iframe.classList.remove("hidden");
  //   iframe.classList.add("hidden");
  // });
  // iframe3.classList.remove("hidden");
});

(function (d, s, id) {
  var js,
    fjs = d.getElementsByTagName(s)[0];
  if (d.getElementById(id)) return;
  js = d.createElement(s);
  js.id = id;
  js.src = "https://connect.facebook.net/en_US/sdk/xfbml.customerchat.js";
  fjs.parentNode.insertBefore(js, fjs);
})(document, "script", "facebook-jssdk");

if ("serviceWorker" in navigator) {
  window.addEventListener("load", () => {
    navigator.serviceWorker
      .register("/sw.js")
      .then((registration) => {
        console.log("SW registered: ", registration);
      })
      .catch((registrationError) => {
        console.log("SW registration failed: ", registrationError);
      });
  });
}

export { Masonry, imagesLoaded };

const map = (x, a, b, c, d) => ((x - a) * (d - c)) / (b - a) + c;

const lerp = (a, b, n) => (1 - n) * a + n * b;

const calcWinsize = () => {
  return { width: window.innerWidth, height: window.innerHeight };
};

const getRandomNumber = (min, max) =>
  Math.floor(Math.random() * (max - min + 1) + min);

const getMousePos = (e) => {
  let posx = 0;
  let posy = 0;
  if (!e) e = window.event;
  if (e.pageX || e.pageY) {
    posx = e.pageX;
    posy = e.pageY;
  } else if (e.clientX || e.clientY) {
    posx = e.clientX + body.scrollLeft + document.documentElement.scrollLeft;
    posy = e.clientY + body.scrollTop + document.documentElement.scrollTop;
  }
  // console.log(posx, posy);
  return { x: posx, y: posy };
};

let winsize = calcWinsize();
window.addEventListener("resize", () => (winsize = calcWinsize()));

let mousepos = { x: winsize.width / 2, y: winsize.height / 2 };
window.addEventListener("mousemove", (ev) => (mousepos = getMousePos(ev)));

let translationVals = {
  tx: 0,
  ty: 0,
};

const xStart = getRandomNumber(10, 12);
const yStart = getRandomNumber(10, 12);

let headerMain = document.querySelector(".header-main");

function move(element) {
  let translationVals = { tx: 0, ty: 0 };
  const xstart = getRandomNumber(10, 12);
  const ystart = getRandomNumber(10, 12);

  const render = () => {
    translationVals.tx = lerp(
      translationVals.tx,
      map(mousepos.x, 0, winsize.width, -xstart, xstart),
      0.07
    );
    translationVals.ty = lerp(
      translationVals.ty,
      map(mousepos.y, 0, winsize.height, -ystart, ystart),
      0.07
    );

    gsap.set(element, {
      x: translationVals.tx,
      y: translationVals.ty,
    });
    requestAnimationFrame(render);
  };
  requestAnimationFrame(render);
}

move(headerMain);

// if( !(/Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent)) ) {
// move(headerMain);
// }

// Scroll Monitor
const servicesSvg = document.querySelector(".services__underline");
const elServices = document.querySelector(".services__title");
let servicesSvgWatcher = scrollMonitor.create(elServices);
servicesSvgWatcher.enterViewport(() => {
  console.log("services reveiled");
  servicesSvg.style.display = "block";
});

const ourWorkSvg = document.querySelector(".our-work__underline");
const elOurWork = document.querySelector(".our-work__title");
const ourWorkSvgWatcher = scrollMonitor.create(elOurWork);
ourWorkSvgWatcher.enterViewport(() => {
  // console.log('entered viewport');
  ourWorkSvg.style.display = "block";
});

const ourClientsSvg = document.querySelector(".our-clients__underline");
const elOurClients = document.querySelector(".our-clients__title");
const ourClientsSvgWatcher = scrollMonitor.create(elOurClients);
ourClientsSvgWatcher.enterViewport(() => {
  console.log("Aloha there <<<");
  ourClientsSvg.style.display = "block";
});

const ourCoursesSvg = document.querySelector(".our-courses__underline");
const elOurCourses = document.querySelector(".our-courses__title");
const ourCoursesSvgWatcher = scrollMonitor.create(elOurCourses);
ourCoursesSvgWatcher.enterViewport(() => {
  console.log("Aloha there <<<");
  ourCoursesSvg.style.display = "block";
});

// const testimonialsSvg = document.querySelector('.testimonials__underline');
// const elTestimonials = document.querySelector('.testimonials__title');
// const testimonialsSvgWatcher = scrollMonitor.create(elTestimonials);
// testimonialsSvgWatcher.enterViewport(() => {
//     console.log('Aloha there <<<');
//     testimonialsSvg.style.display = 'block';
// });

// const testimonialsCarousel = new Flickity('.testimonials__content', {
//    wrapAround: true,
//    pageDots: false,
//    autoPlay: true,
//    pauseAutoPlayOnHover: true,
//    adaptiveHeight: true,
//    cellAlign: 'right'
// });

document.querySelector(".learn-more-course-1").addEventListener("click", () => {
  document.querySelector(".course1-modal").style.display = "block";
  document.querySelector(".container").dataset.state = "focus";
});

document.querySelector(".learn-more-course-2").addEventListener("click", () => {
  document.querySelector(".course2-modal").style.display = "block";
  document.querySelector(".container").dataset.state = "focus";
});

document.querySelector(".learn-more-course-3").addEventListener("click", () => {
  document.querySelector(".course3-modal").style.display = "block";
  document.querySelector(".container").dataset.state = "focus";
});

document.querySelector(".learn-more-course-4").addEventListener("click", () => {
  document.querySelector(".course4-modal").style.display = "block";
  document.querySelector(".container").dataset.state = "focus";
});

document.querySelector(".learn-more-course-5").addEventListener("click", () => {
  document.querySelector(".course5-modal").style.display = "block";
  document.querySelector(".container").dataset.state = "focus";
});

document.querySelector(".quit-modal-course1").addEventListener("click", () => {
  console.log("aloha");
  document.querySelector(".course1-modal").style.display = "none";
  document.querySelector(".container").dataset.state = "default";
});
document.querySelector(".quit-modal-course2").addEventListener("click", () => {
  document.querySelector(".course2-modal").style.display = "none";
  document.querySelector(".container").dataset.state = "default";
});
document.querySelector(".quit-modal-course3").addEventListener("click", () => {
  document.querySelector(".course3-modal").style.display = "none";
  document.querySelector(".container").dataset.state = "default";
});
document.querySelector(".quit-modal-course4").addEventListener("click", () => {
  document.querySelector(".course4-modal").style.display = "none";
  document.querySelector(".container").dataset.state = "default";
});
document.querySelector(".quit-modal-course5").addEventListener("click", () => {
  document.querySelector(".course5-modal").style.display = "none";
  document.querySelector(".container").dataset.state = "default";
});

// hamburger
// const elhamburger = document.querySelector('.hamburger');
// elhamburger.addEventListener('click', () => {
//    elhamburger.classList.toggle('is-opened-navi');
// });

// sidebar
const hamburger = document.querySelector(".hamburger");
const sideBar = document.querySelector(".side-bar");
const mobileNav = document.querySelector(".mobile-nav");
const getInTouch = document.querySelector(".get-in-touch");

const hamburgerLines = document.querySelectorAll(".hamburger__line");

// const onComplete = () => {
//   setTimeout(() => {
//     sideBar.style.display == "block"
//       ? (sideBar.style.display = "none")
//       : (sideBar.style.display = "block");
//   }, 100);
// };

const sideBarTl = new Timeline({ paused: true, reversed: true });
// const contentTl = new Timeline({ paused: true });

sideBarTl
  .to(".side-bar", 0.2, { x: 0 })
  .to(".mobile-nav", 0.2, { opacity: 1 }, "<")
  .to(".get-in-touch", 0.2, { opacity: 1 }, "<");

// const tl1 = new TimelineMax({ paused: true, reversed: true });
// const tl2 = new TimelineMax({ paused: true, reversed: true, onComplete });
// // const tl2 = new TimelineMax({ paused: true, reversed: true });

// tl1
//   .to(".side-bar__background", 0.2, { scale: 200, yoyo: true })
//   .to(".nav-item", 0.2, {
//     x: 0,
//     opacity: 1,
//     stagger: 0.1,
//     delay: 0.1,
//     yoyo: true,
//   })
//   .to(".get-in-touch", 0.2, { y: 0, opacity: 1, delay: -0.1, yoyo: true });

// tl2
//   .to(".side-bar__background", 0.2, { scale: 1, yoyo: true })
//   .to(".nav-item", 0.1, {
//     x: "-2rem",
//     opacity: 0,
//     stagger: { each: 0.1, from: "end" },
//     yoyo: true,
//     delay: -0.15,
//   })
//   .to(".get-in-touch", 0.2, { y: "1rem", opacity: 0, yoyo: true, delay: -0.1 });

// const play = () => {
//   // console.log('play1');
//   // tl.reversed() ? tl.play() : tl.reverse();
//   // console.log(tl2.isActive());
//   if (!tl1.isActive()) {
//     // console.log('triggered');
//     tl1.progress() === 1 ? tl1.restart() : tl1.play();
//   }
// };

// const play2 = () => {
//   // console.log('play2');
//   // console.log(tl2.isActive());
//   if (!tl1.isActive()) {
//     // console.log('triggered');
//     tl2.progress() === 1 ? tl2.restart() : tl2.play();
//   }
// };

hamburger.addEventListener("click", () => {
  // if (!tl1.isActive() && !tl2.isActive()) {
  //   sideBar.classList.toggle("opened");
  //   hamburger.classList.toggle("is-opened-navi");
  //   if (Array.from(sideBar.classList).indexOf("opened") != -1) {
  //     console.log("open");
  //     sideBar.style.display = "block";
  //     play();
  //   } else {
  //     console.log("close");
  //     play2();
  //   }
  // }

  if (Array.from(sideBar.classList).indexOf("opened") === -1) {
    sideBar.classList.toggle("opened");
    hamburger.classList.toggle("is-opened-navi");
    sideBarTl.play();
  } else {
    sideBar.classList.toggle("opened");
    hamburger.classList.toggle("is-opened-navi");
    sideBarTl.reverse();
  }
});

const mobileNavItems = document.querySelectorAll(".nav-item");

mobileNavItems.forEach((item) => {
  item.addEventListener("click", () => {
    sideBar.classList.toggle("opened");
    hamburger.classList.toggle("is-opened-navi");
    // play2();
    sideBarTl.reverse();
  });
});

// marquee effect
// const marqueeContainer = document.querySelector('.marquee');
// for (let i = 0; i < 3; i++) {
//    marqueeContainer.appendChild(marqueeContainer.children[i].cloneNode(true));
// }

/////////////////////////////////////////////////////////
// services timeline

console.log(scrollMonitor);
console.log(document.querySelector(".services__list"));

const servicesTl = new TimelineMax({ paused: true });

servicesTl.from(".services__item", 0.4, {
  y: "2rem",
  opacity: 0,
  stagger: 0.3,
  ease: "ease",
});

const servicesListWatcher = scrollMonitor.create(
  document.querySelector(".services__list"),
  -400
);

console.log(servicesListWatcher);

servicesListWatcher.enterViewport(() => {
  console.log("services revealed");
  servicesTl.play();
});

// const videosTl1 = new TimelineMax({ paused: true });
// videosTl1
//   .from(".video1", 0.7, { x: "-1rem", opacity: 0 })
//   .from(".video1-title", 0.7, { x: "1rem", opacity: 0 });

// const videosTl2 = new TimelineMax({ paused: true });
// videosTl1
//   .from(".video2", 0.7, { x: "-1rem", opacity: 0 })
//   .from(".video2-title", 0.7, { x: "1rem", opacity: 0 });

// scrollMonitor.create(".wrapper1", -200).enterViewport(() => videosTl1.play());

// scrollMonitor.create(".wrapper2", -200).enterViewport(() => videosTl2.play());

//////////////////////////////////////////////////////////////////////////
// revealers

let pageDiagonal = Math.sqrt(
  Math.pow(winsize.width, 2) + Math.pow(winsize.height, 2)
);
let widthVal, heightVal, transform;
widthVal = heightVal = pageDiagonal + "px";

transform =
  "translate3d(-50%,-50%,0) rotate3d(0,0,1,-135deg) translate3d(0," +
  pageDiagonal +
  "px,0)";

const ElLayers = document.querySelectorAll(".revealers__layer");

console.log(ElLayers);

const viewMoreBtn = document.querySelector(".view-more");

console.log(viewMoreBtn);

viewMoreBtn.addEventListener("click", () => {
  ElLayers[0].classList.toggle("animate1");
  ElLayers[1].classList.toggle("animate2");
  ElLayers[2].classList.toggle("animate3");
  document.querySelector("#app").style.opacity = 0;
  setTimeout(() => {
    //  window.location.replace("http://localhost:9000/all-work.html");
    window.location.replace(
      location.href.substr(0, location.href.indexOf("/")) + "all-work.html"
    );
  }, 500);
});

////////////////////////////////////////////////
// marquee effect

const marquee = new Swiper(".swiper-container", {
  spaceBetween: 0,
  centeredSlides: true,
  speed: 3000,
  autoplay: {
    delay: 1000,
  },
  loop: true,
  slidesPerView: "auto",
  // preventInteractionOnTransition: true,
  // touchRatio: 0,
  noSwipingClass: "swiper-container",
  observeParents: true,
  observer: true,
  observeSlideChildren: true,
  // allowTouchMove: false,
  // allowTouchMove: false,
  // disableOnInteraction: true,
});

//////////////////////////////////////
