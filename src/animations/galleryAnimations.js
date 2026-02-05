import gsap from "gsap";
import CustomEase from "gsap/CustomEase";
import Flip from "gsap/flip";

gsap.registerPlugin(CustomEase, Flip);

export const ease = CustomEase.create("smooth", ".87,0,.13,1");

export function playGridIntro(items) {
  gsap.fromTo(
    items,
    { scale: 0.8, opacity: 0 },
    {
      scale: 1,
      opacity: 1,
      duration: 0.6,
      ease: "power2.out",
      stagger: 0.04
    }
  );
}

export function flipToOverlay(cardEl, overlayEl, onComplete) {
  const state = Flip.getState(cardEl);

  overlayEl.classList.add("active");

  Flip.from(state, {
    duration: 1.1,
    ease,
    absolute: true,
    onComplete
  });
}

export function flipBack(cardEl, overlayEl) {
  const state = Flip.getState(cardEl);

  overlayEl.classList.remove("active");

  Flip.from(state, {
    duration: 0.9,
    ease,
    absolute: true
  });
}
