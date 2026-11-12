const root = document.querySelector('.prototype');
const choices = ['editorial', 'gallery', 'clinic'];

function chooseDirection(direction) {
  root.dataset.variant = choices.includes(direction) ? direction : 'gallery';
  document.querySelectorAll('[data-direction]').forEach((choice) => {
    choice.toggleAttribute('aria-current', choice.dataset.direction === root.dataset.variant);
  });
}

chooseDirection(root.dataset.variant);
document.querySelectorAll('[data-direction]').forEach((choice) => {
  choice.addEventListener('click', () => chooseDirection(choice.dataset.direction));
});

const reveal = new IntersectionObserver((entries) => {
  entries.forEach((entry) => {
    if (entry.isIntersecting) entry.target.classList.add('is-visible');
  });
}, { threshold: 0.16 });

document.querySelectorAll('.feature, .treatment-band').forEach((section) => reveal.observe(section));
