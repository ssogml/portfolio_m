/* ---------- Lenis (smooth scroll) ---------- */
let lenis = new Lenis({ autoRaf: true });

lenis.on("scroll", ScrollTrigger.update);
gsap.ticker.add((time) => { lenis.raf(time * 1000); });
gsap.ticker.lagSmoothing(0);

// 새로고침 시 맨 위에서 시작
if ("scrollRestoration" in history) {
    history.scrollRestoration = "manual";
}
window.addEventListener("load", () => {
    lenis.scrollTo(0, { immediate: true });
});

/* ---------- Intro (moved from main.js) ---------- */
if (typeof SplitText !== "undefined") {
    gsap.registerPlugin(ScrollTrigger, SplitText);
} else {
    gsap.registerPlugin(ScrollTrigger);
}

document.addEventListener("DOMContentLoaded", () => {
  // #intro가 없는 페이지(서브페이지 등)에서도 에러 안 나게 가드
  if (!document.querySelector("#intro")) return;

  $("body").addClass("intro-lock");
  lenis.stop();

  const tl_01 = gsap.timeline({
    defaults: { ease: "power3.out" },
    onComplete: () => {
      $("#intro").fadeOut(600, function () {
        $(this).remove();
      });
      $("body").removeClass("intro-lock");
      ScrollTrigger.refresh(true);
      lenis.start();
    }
  });

  tl_01
    .to("#intro", {
      duration: 1.5,
      "--r": "200vmax",
      ease: "power3.inOut",
      delay: 2.3,
    })
    .fromTo(".visual_img", {
      autoAlpha: 0,
      filter: "blur(50px)",
      scale: 1,
    }, {
      filter: "blur(0px)",
      scale: 1,
      autoAlpha: 1,
      duration: 2.5
    }, "-=0.8")
    .fromTo(".split span", {
      autoAlpha: 0,
      y: 100,
    }, {
      y: 0,
      stagger: 0.04,
      autoAlpha: 1,
      duration: 1.2
    }, "-=0.8")
    .fromTo(".visual_txt p", {
      autoAlpha: 0,
      y: -20,
    }, {
      y: 0,
      autoAlpha: 1,
      duration: 0.5
    }, "-=0.8")
    .fromTo("#header", {
      autoAlpha: 0,
      y: -100,
    }, {
      y: 0,
      autoAlpha: 1,
      duration: 0.5,
      // 인트로 끝나고 header transform 충돌 방지
      onComplete: () => gsap.set("#header", { clearProps: "transform,opacity" })
    }, "-=0.8");
});

if (!document.querySelector("#intro")) {
  gsap.set("#header", { autoAlpha: 1, y: 0 });
  gsap.set(".gotop", { autoAlpha: 1, pointerEvents: "auto" });
}

/* ---------- gnb depth2 ---------- */
$(".gnb > li").hover(function () {
    $(this).find(".depth2").toggleClass("active");
});



/* ---------- mgnb (모바일 메뉴) ---------- */
$(".mgnb_wrap").hide();

$(".btn_ham").click(function () {
    $("body").toggleClass("intro-lock");

    let txt = $(".btn_ham span").text();
    if (txt === "Menu") {
        $(".btn_ham span").text("Close").addClass("active");
    } else {
        $(".btn_ham span").text("Menu").removeClass("active");
    }
    $(".ham_bg").toggleClass("active");
    $("#header h1").toggleClass("active");
    $(".mgnb_wrap").fadeToggle();
});

$(".mgnb > li").on("mouseenter", function () {
    $(this).siblings().addClass("active");
}).on("mouseleave", function () {
    $(this).siblings().removeClass("active");
});

$(".mgnb a").on("click", function () {
    $(".mgnb_wrap").fadeOut();
    $(".ham_bg").removeClass("active");
    $("#header h1").removeClass("active");
    $(".btn_ham span").text("Menu").removeClass("active");
    $("body").removeClass("intro-lock");
});


/* ---------- gotop 초기 상태 ---------- */
gsap.set(".gotop", {
  autoAlpha: 0,
  pointerEvents: "none"
});

/* ---------- gotop : visual 섹션 지난 후 나타남 ---------- */
ScrollTrigger.create({
  trigger: ".visual",
  start: "bottom top", // visual 끝난 뒤
  onEnter: () => {
    gsap.to(".gotop", {
      autoAlpha: 1,
      pointerEvents: "auto",
      duration: 0.25,
      ease: "power2.out"
    });
  },
  onLeaveBack: () => {
    gsap.to(".gotop", {
      autoAlpha: 0,
      pointerEvents: "none",
      duration: 0.25,
      ease: "power2.out"
    });
  }
});

$(window).scroll(function () {
    let scrollposition = $(this).scrollTop();

    if (scrollposition > 150) {
        $("#header").addClass("active");
    } else {
        $("#header").removeClass("active");
    }
});

document.querySelector(".gotop").onclick = () => lenis.scrollTo(0);

/* ---------- gotop : footer_bottom에서 멈춤 ---------- */
const goTopEl = document.querySelector(".gotop");

ScrollTrigger.create({
    trigger: ".footer_bottom",
    start: "top bottom",
    end: "bottom bottom",
    onUpdate: () => {
        const footerTop = document
            .querySelector(".footer_bottom")
            .getBoundingClientRect().top;

        const gap = 20;       // footer와 50px 간격
        const fixedBottom = 24;

        const overlap =
            (window.innerHeight - (footerTop - gap)) - fixedBottom;

        gsap.set(goTopEl, {
            y: overlap > 0 ? -overlap : 0
        });
    },
    onLeaveBack: () => {
        gsap.set(goTopEl, { y: 0 });
    }
});


/* ---------- footer_bottom 도달 시 header 숨김 ---------- */

ScrollTrigger.create({
  trigger: ".footer_bottom",
  start: "top bottom",
  onEnter: () => {
    gsap.to("#header", {
      yPercent: -110,
      autoAlpha: 0,
      duration: 0.45,
      ease: "power2.out",
      overwrite: "auto"
    });
  },
  onLeaveBack: () => {
    gsap.to("#header", {
      yPercent: 0,
      autoAlpha: 1,
      duration: 0.45,
      ease: "power2.out",
      overwrite: "auto"
    });
  }
});


/* ---------- 부드러운 스크롤 (Lenis) ---------- */
document.querySelectorAll("a[href^='#']").forEach(a => {
    a.addEventListener("click", e => {
        e.preventDefault();
        lenis.scrollTo(a.getAttribute("href"));
    });
});


