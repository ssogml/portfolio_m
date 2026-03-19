AOS.init({
    duration: 2000,
    once: true,
});

//visual

const visual_list = new Swiper(".visual_list", {
    loop: true,
    navigation: {
        nextEl: ".swiper-button-next",
        prevEl: ".swiper-button-prev",
    },
    autoplay: {
        delay: 3000,
        disableOnInteraction: false,
    }
});

//menu
const menu_list = new Swiper(".menu_list", {
    slidesPerView: 1.5, //0px 이상에서 보이는 슬라이드 갯수
    centeredSlides: true,
    loop: true,
    breakpoints: {
        1200: { slidesPerView: 4.5 }, //breadkpoints수치 px값 -> 1200px이상에서 보이는 슬라이드 갯수
        650: { slidesPerView: 4 },
        450: { slidesPerView: 2 },
    },
    autoplay: { //자동넘김
        delay: 3000,
        disableOnInteraction: false,
    }
});
