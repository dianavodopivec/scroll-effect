import Lenis from 'lenis';
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
gsap.registerPlugin(ScrollTrigger);


const $content = document.querySelector(".content");
const $reflection = document.querySelector(".content--reflection")
const $items = [...$content.querySelectorAll(".item__img")]
const $itemReflection = [...$reflection.querySelectorAll(".item__img")]


const initSmoothScrolling = () => {
    const lenis = new Lenis({
        lerp: 0.2, 
        smoothWheel: true 
    });

    lenis.on('scroll', () => ScrollTrigger.update);

    const scrollFn = (time) => {
        lenis.raf(time); 
        requestAnimationFrame(scrollFn); 
        $reflection.style.transform = `translateY(${-lenis.actualScroll}px)`;
    };
    
    requestAnimationFrame(scrollFn);
};

const scrollAnimations = () => {
    $items.forEach((item, index) => {
        const reflectionItem = $itemReflection[index];
        const $itemImgInner = item.querySelector(".item__img-inner");
        const $reflectionImgInner = reflectionItem.querySelector(".item__img-inner");
        
        gsap.timeline({
            scrollTrigger: {
                trigger: item,
                start: 'top bottom',
                end: 'bottom top',
                scrub: true
            }
        })
        .fromTo([item, reflectionItem], {
            transformOrigin: '50% 120%',
            filter: 'contrast(120%) brightness(130%)'
        }, {
            ease: 'power2.in',
            rotationX: 60,
            scaleY: 0.5,
            filter: 'contrast(65%) brightness(30%)',
            z: -300
        }, 0)
        .fromTo([$itemImgInner, $reflectionImgInner], {
            scale: 1
        }, {
            ease: 'back.inOut',
            scale: 1.3
        }, 0);
    });
};

const handleFunctions = () => {
    initSmoothScrolling(); 
    scrollAnimations(); 
};

handleFunctions()