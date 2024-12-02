$(document).ready(function() {
    const circle = document.getElementById('circle');

    document.addEventListener('mousemove', (event) => {
        circle.style.left = `${event.clientX - circle.offsetWidth / 2}px`;
        circle.style.top = `${event.clientY - circle.offsetHeight / 2}px`;
    });

    gsap.registerPlugin(ScrollTrigger, ScrollToPlugin);
    const sections = document.querySelectorAll("section");

    const scrolling = {
        enabled: true,
        events: "scroll,wheel,touchmove,pointermove".split(","),
        prevent: e => e.preventDefault(),
        disable() {
            if (scrolling.enabled) {
                scrolling.enabled = false;
                window.addEventListener("scroll", gsap.ticker.tick, {passive: true});
                scrolling.events.forEach((e, i) => (i ? document : window).addEventListener(e, scrolling.prevent, {passive: false}));
            }
        },
        enable() {
            if (!scrolling.enabled) {
                scrolling.enabled = true;
                window.removeEventListener("scroll", gsap.ticker.tick);
                scrolling.events.forEach((e, i) => (i ? document : window).removeEventListener(e, scrolling.prevent));
            }
        }
    };

    const goToSection = (section, anim, i) => {
        if (scrolling.enabled) { // skip if a scroll tween is in progress
            scrolling.disable();
            gsap.to(window, {
                scrollTo: {y: section, autoKill: false},
                onComplete: scrolling.enable,
                duration: 1
            });
        
            anim && anim.restart();
        }
    }

    sections.forEach((section, i) => {
        const emailAnim = gsap.from(section.querySelector(".email"), {yPercent: 50, duration: 1, paused: true});
        const logoAnim = gsap.from(document.getElementById("logo"), {scale: .8, duration: 1, paused: true});
        
        ScrollTrigger.create({
          trigger: section,
          start: "top bottom-=1",
          end: "bottom top+=1",
          onEnter: () => goToSection(section, emailAnim),
          onEnterBack: () => goToSection(section)
        });
       
    });
});