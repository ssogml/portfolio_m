document.addEventListener("DOMContentLoaded", () => {
gsap.registerPlugin(ScrollTrigger, SplitText);


    const tl_02 = gsap.timeline({
        scrollTrigger: {
            scrub: 1,
            pin: true,
            pinSpacing: false,
            trigger: ".visual",
            start: "top+=50 top",
            end: "bottom 50%",
            //markers: true,
            invalidateOnRefresh: true,
        },
    });

    tl_02
        .fromTo(".visual_img",
            { y: 0 },
            { y: -500 }
        )
        .fromTo(".visual_txt p, .visual_txt h1",
            { y: 0 },
            { y: -400 },
            0
        );


    /* ---------- move_txt 흘러가는 텍스트 ---------- */
    const tl_03 = gsap.timeline({
        scrollTrigger: {
            scrub: true,
            trigger: ".move_txt",
            start: "-40% 50%",
            end: "bottom 20%",
            anticipatePin: 1,
        },
    });

    tl_03.fromTo(".move_txt",
        { xPercent: 0 },
        { xPercent: -80 }
    );


    /* ---------- about 섹션 fadeUp ---------- */
    function fadeUp(targets, options = {}) {
        gsap.from(targets, {
            opacity: 0,
            y: options.y || 50,
            duration: options.duration || 1,
            ease: "power3.out",
            stagger: options.stagger || 0,
            scrollTrigger: {
                trigger: options.trigger || targets,
                start: "top 80%",
                once: true
            }
        });
    }

    fadeUp(".about_left .about_txt h4");
    fadeUp(".about_left .about_txt p", { y: 60 });
    fadeUp(".about_left .about_img", { y: 60 });
    fadeUp(".about_right .exp", { y: 60 });
    fadeUp(".about_right .edu", { y: 60 });
    fadeUp(".about_right .skills", { y: 60 });




    /* ---------- projects fadeIn ---------- */
    function fadeIn(targets, options = {}) {
        gsap.fromTo(targets,
            {
                opacity: 0,
                x: options.x || 0,
                y: options.y || 0
            },
            {
                opacity: 1,
                x: 0,
                y: 0,
                duration: options.duration || 1.2,
                ease: "power3.out",
                stagger: options.stagger || 0,
                scrollTrigger: {
                    trigger: options.trigger || targets,
                    start: "top 80%",
                    once: true
                }
            }
        );
    }

    fadeIn(".projects h2", { x: -80 });
    fadeIn(".pj-left .pj_thumb", { x: 80 });
    fadeIn(".pj-left .pj_txt", { y: 50, delay: 0.2 });
    fadeIn(".pj-right .pj_thumb", { x: -80 });
    fadeIn(".pj-right .pj_txt", { y: 50, delay: 0.2 });

    document.querySelectorAll(".pj_txt").forEach(txt => {
        gsap.from(txt.querySelectorAll(".txt_top span, .txt_top h3"), {
            opacity: 0,
            y: 30,
            stagger: 0.05,
            duration: 0.8,
            ease: "power3.out",
            scrollTrigger: {
                trigger: txt,
                start: "top 75%",
                once: true
            }
        });

        gsap.from(txt.querySelector(".txt_bottom"), {
            opacity: 0,
            y: 40,
            duration: 1,
            delay: 0.5,
            ease: "power3.out",
            scrollTrigger: {
                trigger: txt,
                start: "top 70%",
                once: true
            }
        });
    });


    /* ---------- vision SplitText ---------- */
    document.fonts.ready.then(() => {
        gsap.set(".vision p", { opacity: 1 });

        let split;

        ScrollTrigger.create({
            trigger: ".vision",
            start: "top 80%",
            once: true,
            onEnter: () => {
                if (split) return;

                SplitText.create(".vision p", {
                    type: "words,lines",
                    linesClass: "line",
                    autoSplit: true,
                    mask: "lines",
                    onSplit: (self) => {
                        split = gsap.from(self.lines, {
                            duration: 1.2,
                            yPercent: 100,
                            opacity: 0,
                            stagger: 0.2,
                            ease: "expo.out"
                        });
                        return split;
                    }
                });
            }
        });
    });

    /* gd */
const gd_list = new Swiper(".gd_list", {
    loop: true,
    slidesPerView: 1,
    speed: 1300,

    centeredSlides: false,
    
    navigation: {
        nextEl: ".swiper-button-next",
        prevEl: ".swiper-button-prev",
    },
    autoplay: {
        delay: 5000,
        disableOnInteraction: false,
    }
});
    
const lightbox = GLightbox({
  selector: ".glightbox",
  closeButton: true,
  touchNavigation: true,
  keyboardNavigation: true,
  closeOnOutsideClick: true,
  loop: true
});

}); // DOMContentLoaded 종료 

