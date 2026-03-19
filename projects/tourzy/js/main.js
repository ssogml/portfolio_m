AOS.init({
    duration: 2000,
    disable: function () {
        return window.innerWidth < 1200;
    }
});

$(function () {
    // 스크롤 이벤트 핸들러
    $(window).on('scroll', function () {
        // .visual 섹션의 높이를 가져옴 (반응형 대응)
        const visualHeight = $('.visual').outerHeight();
        const scrollTop = $(window).scrollTop();

        // 헤더의 높이만큼 미리 변화를 주려면 (visualHeight - 80) 정도로 조절 가능
        if (scrollTop >= visualHeight - 70) {
            $('#header').addClass('on');
        } else {
            $('#header').removeClass('on');
        }
    });
});

const new_list01 = new Swiper(".new_list01", {

    navigation: {
        nextEl: ".slide01-next",
        prevEl: ".slide01-prev",
    },
    pagination: {
        el: ".slide01-pagination",
        type: "bullets",
    },
});

const new_list02 = new Swiper(".new_list02", {
    direction: "vertical",
    navigation: {
        nextEl: ".slide02-next",
        prevEl: ".slide02-prev",
    },
    pagination: {
        el: ".slide02-pagination",
        type: "bullets",
    },
});

const new_list03 = new Swiper(".new_list03", {

    navigation: {
        nextEl: ".slide03-next",
        prevEl: ".slide03-prev",
    },
    pagination: {
        el: ".slide03-pagination",
        type: "bullets",
    },
});

$(".station_busan_img li:not(.active)").hide();
$(".station_busan_list li").click(function () {
    $(this).addClass("active").siblings().removeClass("active");
    let idx = $(this).index();
    $(".station_busan_img li").eq(idx).show().siblings().hide();
});
$(".station_kijang_img li:not(.active)").hide();
$(".station_kijang_list li").click(function () {
    $(this).addClass("active").siblings().removeClass("active");
    let idx = $(this).index();
    $(".station_kijang_img li").eq(idx).show().siblings().hide();
});


$(".grand_menu > div:not(.active)").hide();
$(".station_button span").click(function () {
    $(this).addClass("active").siblings().removeClass("active");
    let idx = $(this).index();
    $(".grand_menu > div").eq(idx).show().siblings().hide();

});

const review_list = new Swiper(".review_list", {
    loop: true,
    slidesPerView: 1.5,
    breakpoints: {
        560: {
            slidesPerView: 2,
        },
        750: {
            slidesPerView: 2.5,
        },
        1050: {
            spaceBetween: 20,
            slidesPerView: 3,
        },
        1250: {
            slidesPerView: 3.5,
            spaceBetween: 40,
        },
        1500: {
            slidesPerView: 4,
            spaceBetween: 60,
        },
        1750: {
            slidesPerView: 4.27,
            spaceBetween: 60,
        },
    },
    centeredSlides: true,
    spaceBetween: 20,
    speed: 8000,
    autoplay: {
        delay: 0,
    },
});

document.querySelectorAll('.gnb a').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault(); // 기본 이동 방지

        const targetId = this.getAttribute('href');
        const targetElement = document.querySelector(targetId);

        // 상단 메뉴의 높이가 있다면 그만큼 빼줍니다 (예: 80px)
        const headerOffset = 80;
        const elementPosition = targetElement.getBoundingClientRect().top;
        const offsetPosition = elementPosition + window.pageYOffset - headerOffset;

        window.scrollTo({
            top: offsetPosition,
            behavior: 'smooth' // 부드럽게 이동
        });
    });
});