document.documentElement.classList.add('motion-ready');

const observer = new IntersectionObserver((entries) => {
  entries.forEach((entry) => {
    if (entry.isIntersecting) {
      entry.target.classList.add('is-visible');
      observer.unobserve(entry.target);
    }
  });
}, { threshold: 0.15 });

document.querySelectorAll('.reveal').forEach((element) => observer.observe(element));

const treatmentAtlas = document.querySelector('.treatment-atlas');
const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

if (treatmentAtlas && window.gsap && !reducedMotion) {
  const treatmentFeatures = Array.from(treatmentAtlas.querySelectorAll('.treatment-feature'));
  const treatmentHeading = document.querySelector('.treatment-heading');

  window.gsap.set(treatmentHeading, { autoAlpha: 0, y: 14 });
  window.gsap.set(treatmentFeatures, { autoAlpha: 0, y: 22 });

  const atlasObserver = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (!entry.isIntersecting) return;

      const sequence = window.gsap.timeline({
        defaults: { duration: 0.52, ease: 'power3.out' },
      });

      sequence
        .addLabel('treatments')
        .to(treatmentHeading, { y: 0, autoAlpha: 1, clearProps: 'transform,opacity,visibility' }, 'treatments')
        .to(treatmentFeatures, {
          y: 0,
          autoAlpha: 1,
          stagger: { each: 0.075, from: 'start' },
          clearProps: 'transform,opacity,visibility',
        }, 'treatments+=0.06');

      atlasObserver.unobserve(entry.target);
    });
  }, { threshold: 0.22 });

  atlasObserver.observe(treatmentAtlas);
}

const testimonialCarousel = document.querySelector('.testimonial-carousel');

if (testimonialCarousel) {
  const slides = Array.from(testimonialCarousel.querySelectorAll('.testimonial-slide'));
  const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  let activeIndex = 0;
  let timer;

  const showSlide = (index) => {
    activeIndex = (index + slides.length) % slides.length;
    slides.forEach((slide, slideIndex) => {
      const active = slideIndex === activeIndex;
      slide.classList.toggle('is-active', active);
      slide.setAttribute('aria-hidden', String(!active));
    });
  };

  const stopRotation = () => window.clearInterval(timer);
  const startRotation = () => {
    if (!reduceMotion) {
      stopRotation();
      timer = window.setInterval(() => showSlide(activeIndex + 1), 6500);
    }
  };

  testimonialCarousel.addEventListener('mouseenter', stopRotation);
  testimonialCarousel.addEventListener('mouseleave', startRotation);
  testimonialCarousel.addEventListener('focusin', stopRotation);
  testimonialCarousel.addEventListener('focusout', startRotation);
  startRotation();
}
