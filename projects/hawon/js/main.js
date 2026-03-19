AOS.init({
    duration: 1500,
    once: true,
});

/* visual */
const visual_list = new Swiper(".visual_list", {
    loop: true,
    speed: 1400,
    effect: "fade",
    fadeEffect:{
        crossFade: true
    },
    pagination: {
        el: '.swiper-pagination',
        type: 'progressbar',
    },
    autoplay: {
        delay: 4000,
        disableOnInteraction: false,
    },
});

function updatePageNumberClass() {
    const startNum = document.querySelector('.page-number.start');
    const endNum = document.querySelector('.page-number.end');
    const totalSlides = visual_list.slides.length;
    const currentIndex = visual_list.realIndex + 1;

    startNum.classList.toggle('active', currentIndex === 1);
    endNum.classList.toggle('active', currentIndex === totalSlides);
}

visual_list.on("slideChange", updatePageNumberClass);
updatePageNumberClass();

/* best */
const btns = document.querySelectorAll(".best_btn button");
const ginsengTxt = document.querySelector(".ginseng_txt");
const dongquaiTxt = document.querySelector(".dongquai_txt");
const ginsengImg = document.querySelector(".best_img .ginseng");
const dongquaiImg = document.querySelector(".best_img .dongquai");

function resetBestHoverBg() {
  document.querySelectorAll(".best_img .hover_bg").forEach((bg) => {
    bg.style.opacity = 0;
  });
}

function wireBestHover(textSelector, imgSelector) {
  const links = document.querySelectorAll(textSelector);
  const imgs = document.querySelectorAll(imgSelector);

  links.forEach((link, idx) => {
    const bgImg = imgs[idx]?.querySelector?.(".hover_bg");
    if (!bgImg) return;

    const on = () => (bgImg.style.opacity = 1);
    const off = () => (bgImg.style.opacity = 0);

    link.addEventListener("mouseenter", on);
    link.addEventListener("mouseleave", off);

    // 접근성(키보드 탭 이동)까지 자연스럽게
    link.addEventListener("focus", on);
    link.addEventListener("blur", off);
  });
}

// 인삼 텍스트 ↔ 인삼 이미지
wireBestHover(".ginseng_txt .prd_name a", ".best_img .ginseng .prd_img");
// 당귀 텍스트 ↔ 당귀 이미지
wireBestHover(".dongquai_txt .prd_name a", ".best_img .dongquai .prd_img");


btns.forEach((btn, index) => {
    btn.addEventListener("click", () => {

        // 버튼 active 조정
        btns.forEach((b) => b.classList.remove("active"));
        btn.classList.add("active");

resetBestHoverBg();

        // 인삼 버튼인 경우
        if (index === 0) {
            ginsengTxt.classList.add("active");
            ginsengImg.classList.add("active");

            dongquaiTxt.classList.remove("active");
            dongquaiImg.classList.remove("active");
        }

        // 당귀 버튼인 경우
        if (index === 1) {
            dongquaiTxt.classList.add("active");
            dongquaiImg.classList.add("active");

            ginsengTxt.classList.remove("active");
            ginsengImg.classList.remove("active");
        }
    });
});



/* event */
const event_list = new Swiper(".event_list", {
    loop: true,
    centeredSlides: true,
    spaceBetween: 15,
    slidesPerView: 1.6,
    speed: 1200,
    grabCursor: true,

    navigation: {
        nextEl: ".swiper-button-next",
        prevEl: ".swiper-button-prev",
        },
    breakpoints: {
        1540: {
      spaceBetween: 40,
        },
        1024: {
      spaceBetween: 35,
        },
        850: {
            spaceBetween: 30,
        },
        0:{
            slidesPerView: 1.15,
            spaceBetween: 20
        }
    },
});

/* community */
const reviewbtns = document.querySelectorAll(".review_btn button");
const reviewImg1 = document.querySelector(".review_img1");
const reviewImg2 = document.querySelector(".review_img2");
const reviewImg3 = document.querySelector(".review_img3");

reviewbtns.forEach((btn, index) => {
    btn.addEventListener("click", () => {

        reviewbtns.forEach(b => b.classList.remove("active"));
        btn.classList.add("active");

        if (index === 0) {
            reviewImg1.classList.add("active");
            reviewImg2.classList.remove("active");
        }

        if (index === 1) {
            reviewImg2.classList.add("active");
            reviewImg1.classList.remove("active");
        }
    });
});