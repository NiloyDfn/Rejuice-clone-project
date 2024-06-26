function locomotiveAnimation() {
  gsap.registerPlugin(ScrollTrigger);

  // Using Locomotive Scroll from Locomotive https://github.com/locomotivemtl/locomotive-scroll

  const locoScroll = new LocomotiveScroll({
    el: document.querySelector(".main"),
    smooth: true,
  });
  // each time Locomotive Scroll updates, tell ScrollTrigger to update too (sync positioning)
  locoScroll.on("scroll", ScrollTrigger.update);

  // tell ScrollTrigger to use these proxy methods for the ".main" element since Locomotive Scroll is hijacking things
  ScrollTrigger.scrollerProxy(".main", {
    scrollTop(value) {
      return arguments.length
        ? locoScroll.scrollTo(value, 0, 0)
        : locoScroll.scroll.instance.scroll.y;
    }, // we don't have to define a scrollLeft because we're only scrolling vertically.
    getBoundingClientRect() {
      return {
        top: 0,
        left: 0,
        width: window.innerWidth,
        height: window.innerHeight,
      };
    },
    // LocomotiveScroll handles things completely differently on mobile devices - it doesn't even transform the container at all! So to get the correct behavior and avoid jitters, we should pin things with position: fixed on mobile. We sense it by checking to see if there's a transform applied to the container (the LocomotiveScroll-controlled element).
    pinType: document.querySelector(".main").style.transform
      ? "transform"
      : "fixed",
  });
  // each time the window updates, we should refresh ScrollTrigger and then update LocomotiveScroll.
  ScrollTrigger.addEventListener("refresh", () => locoScroll.update());

  // after everything is set up, refresh() ScrollTrigger and update LocomotiveScroll because padding may have been added for pinning, etc.
  ScrollTrigger.refresh();
}
locomotiveAnimation();

function cursorAnimation() {
  let page1Con = document.querySelector(".page1-content");
  let cursor = document.querySelector(".cursor");

  page1Con.addEventListener("mousemove", (dets) => {
    gsap.to(cursor, {
      x: dets.x - 60,
      y: dets.y - 45,
    });
  });

  page1Con.addEventListener("mouseenter", () => {
    gsap.to(cursor, {
      scale: 1,
      opacity: 1,
    });
  });
  page1Con.addEventListener("mouseleave", () => {
    gsap.to(cursor, {
      scale: 0,
      opacity: 0,
    });
  });
}
cursorAnimation();
function page2Animation() {
  gsap.from(".page2-part1 h3,.page2-part1 h4", {
    y: 120,
    stagger: 0.2,
    opacity: 0,
    duration: 2,
    scrollTrigger: {
      trigger: ".page2",
      scroller: ".main",
      start: "top 47%",
      end: "top 46%",
      scrub: 2,
    },
  });
  gsap.from(".page2-part2 h4", {
    y: -120,
    stagger: 0.3,
    opacity: 0,
    duration: 1,
    scrollTrigger: {
      trigger: ".page2",
      scroller: ".main",
      start: "top 47%",
      end: "top 46%",
      scrub: 2,
    },
  });
}
page2Animation();
function page4Animation() {
  gsap.from(".p4-p1 h2,.p4-p2 h1", {
    y: 120,
    stagger: 0.2,
    opacity: 0,
    duration: 2.4,
    scrollTrigger: {
      trigger: ".page4",
      scroller: ".main",
      start: "top 47%",
      end: "top 46%",
      scrub: 2,
    },
  });
}
page4Animation();

function swiperAnimation() {
  var swiper = new Swiper(".mySwiper", {
    spaceBetween: 30,
    centeredSlides: true,
    autoplay: {
      delay: 2500,
      disableOnInteraction: false,
    },
    autoplay: {
      delay: 2000,
      disableOnInteraction: true,
    },
  });
}
swiperAnimation();

let tl = gsap.timeline();

tl.from(".loader h3", {
  x: 50,
  opacity: 0,
  duration: 1,
  stagger: 0.3,
});
tl.to(".loader h3", {
  opacity: 0,
  x: -30,
  stagger: 0.1,
  duration: 1,
});
tl.to(".loader", {
  x: -1500,
  duration: 2,
});
tl.to(".loader", {
  opacity: 0,
});
tl.to(".loader", {
  display: "none",
});
tl.from(".page1-content h1 span", {
  y: 200,
  stagger: 0.3,
  duration: 0.5,
  opacity: 0,
});
tl.from(".nav h3,.nav h4", {
  y: 50,
  opacity: 0,
  stagger: 0.3,
  duration: 0.5,
});
