//gnb
    $(".gnb > li").mouseenter(function () {
      $(this).find(".depth2").stop().slideDown();
    });

    $(".gnb > li").mouseleave(function () {
      $(this).find(".depth2").stop().slideUp();
    });

//mgnb
$(".btn_menu").click(function () {
    $(".mgnb_wrap").fadeIn();
    $(".rotate_txt").hide();
});

$(".mgnb_close").click(function () {
    $(".mgnb_wrap").fadeOut();
    $(".rotate_txt").show();
});

$(function () {
    $(".mdepth2").hide();
    $(".mgnb > li > a").click(function (e) {
        e.preventDefault();

        const $this = $(this);
        const $submenu = $this.next(".mdepth2");

        if ($submenu.is(":visible")) {
            $submenu.slideUp(300);
            $this.removeClass("active"); // 닫을 때
        } else {
            $(".mdepth2:visible").slideUp(300);
            $(".mgnb > li > a.active").removeClass("active");
            $submenu.slideDown(300);
            $this.addClass("active"); // 열릴 때
        }
    });
});

//gotop
$(window).scroll(function () {
    let scrollposition = $(this).scrollTop();
    console.log(scrollposition);

    // gotop 버튼 표시/숨김
    if (scrollposition > 300) {
        $(".gotop,.inquire").fadeIn();
    } else {
        $(".gotop,.inquire").fadeOut();
    }

    // 헤더에 active 클래스 추가/삭제
    if (scrollposition > 150) {
        $("#header").addClass("active");
    } else {
        $("#header").removeClass("active");
    }
});

$(".gotop").click(function () {
    $("html, body").animate({ scrollTop: 0 }, 600); // 600ms 부드러운 스크롤
});

$(".inquire").click(function () {
    window.location.href = "sub/franchise_04.html";
});