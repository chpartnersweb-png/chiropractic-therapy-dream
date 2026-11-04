import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import Lenis from 'lenis';

gsap.registerPlugin(ScrollTrigger);

const header = document.querySelector<HTMLElement>('[data-header]');
const toggle = document.querySelector<HTMLButtonElement>('[data-nav-toggle]');
const dialog = document.querySelector<HTMLDialogElement>('[data-nav-dialog]');
const closeButton = document.querySelector<HTMLButtonElement>('[data-nav-close]');
let lenis: Lenis | undefined;
let previouslyFocused: HTMLElement | null = null;

const updateHeader = () => header?.classList.toggle('is-scrolled', window.scrollY > 40);
updateHeader();
window.addEventListener('scroll', updateHeader, { passive: true });

const resetNavigation = () => {
  document.body.classList.remove('nav-open');
  toggle?.setAttribute('aria-expanded', 'false');
  toggle?.setAttribute('aria-label', 'メニューを開く');
  lenis?.start();
};

const closeNavigation = (restoreFocus = true) => {
  if (!dialog?.open) return;
  dialog.close();
  resetNavigation();
  if (restoreFocus) previouslyFocused?.focus({ preventScroll: true });
};

if (toggle && dialog) {
  toggle.hidden = false;
  document.documentElement.classList.add('has-js');
  toggle.addEventListener('click', () => {
    previouslyFocused = document.activeElement instanceof HTMLElement ? document.activeElement : toggle;
    dialog.showModal();
    document.body.classList.add('nav-open');
    toggle.setAttribute('aria-expanded', 'true');
    toggle.setAttribute('aria-label', 'メニューを閉じる');
    lenis?.stop();
    closeButton?.focus();
  });
  closeButton?.addEventListener('click', () => closeNavigation());
  dialog.addEventListener('cancel', event => {
    event.preventDefault();
    closeNavigation();
  });
  dialog.addEventListener('close', resetNavigation);
  const desktop = window.matchMedia('(min-width: 901px)');
  desktop.addEventListener('change', event => { if (event.matches) closeNavigation(); });
}

// Native links remain functional when JavaScript is unavailable.
document.querySelectorAll<HTMLAnchorElement>('a[href^="#"]').forEach(link => {
  link.addEventListener('click', event => {
    const href = link.getAttribute('href');
    if (!href || href === '#') return;
    const target = document.getElementById(href.slice(1));
    if (!target) return;
    event.preventDefault();
    closeNavigation(false);
    const offset = (header?.offsetHeight ?? 80) + 15;
    if (lenis) lenis.scrollTo(target, { offset: -offset, duration: 1 });
    else target.scrollIntoView({ behavior: window.matchMedia('(prefers-reduced-motion: reduce)').matches ? 'instant' : 'smooth', block: 'start' });
    // Move keyboard focus as well as the viewport, without a second scroll.
    const addedTabindex = !target.hasAttribute('tabindex');
    if (addedTabindex) target.setAttribute('tabindex', '-1');
    target.focus({ preventScroll: true });
    if (addedTabindex) target.addEventListener('blur', () => target.removeAttribute('tabindex'), { once: true });
    if (window.location.hash !== href) window.history.pushState(null, '', href);
  });
});

const media = gsap.matchMedia();
media.add({
  reduce: '(prefers-reduced-motion: reduce)',
  desktop: '(min-width: 901px) and (pointer: fine)',
  all: '(min-width: 0px)',
}, context => {
  const conditions = context.conditions as { reduce: boolean; desktop: boolean; all: boolean };
  if (conditions.reduce) return;

  let ticker: ((time: number) => void) | undefined;
  if (conditions.desktop) {
    const smooth = new Lenis({ autoRaf: false, duration: 1.05, smoothWheel: true, syncTouch: false, anchors: false });
    lenis = smooth;
    smooth.on('scroll', ScrollTrigger.update);
    ticker = (time: number) => smooth.raf(time * 1000);
    gsap.ticker.add(ticker);
    if (dialog?.open) smooth.stop();
  }

  const hero = document.querySelector('.hero');
  if (hero && window.scrollY < window.innerHeight) {
    gsap.fromTo('.hero__visual', { scale: 1.035 }, { scale: 1, duration: 1.5, ease: 'power2.out' });
    gsap.fromTo('.hero__copy > p, .hero h1 > span', { opacity: .3, y: 12 }, { opacity: 1, y: 0, duration: 1, stagger: .12, ease: 'power2.out', clearProps: 'transform,opacity' });
  }

  gsap.utils.toArray<HTMLElement>('[data-reveal]').forEach(element => {
    gsap.fromTo(element, { y: 16, opacity: .25 }, {
      y: 0, opacity: 1, duration: .8, ease: 'power2.out', immediateRender: false,
      scrollTrigger: { trigger: element, start: 'top 93%', once: true },
      clearProps: 'transform,opacity',
    });
  });
  gsap.utils.toArray<HTMLElement>('[data-line]').forEach(element => {
    gsap.fromTo(element, { scaleX: .2 }, { scaleX: 1, duration: 1.2, ease: 'power2.out', immediateRender: false, scrollTrigger: { trigger: element, start: 'top 90%', once: true } });
  });
  if (conditions.desktop) {
    gsap.utils.toArray<HTMLElement>('[data-parallax]').forEach(element => {
      gsap.fromTo(element, { y: -16 }, { y: 16, ease: 'none', scrollTrigger: { trigger: element.parentElement, start: 'top bottom', end: 'bottom top', scrub: 1 } });
    });
  }

  const refresh = () => ScrollTrigger.refresh();
  document.fonts.ready.then(refresh);
  document.querySelectorAll<HTMLImageElement>('img').forEach(image => {
    if (!image.complete) image.addEventListener('load', refresh, { once: true });
  });
  return () => {
    if (ticker) gsap.ticker.remove(ticker);
    lenis?.destroy();
    lenis = undefined;
  };
});

window.addEventListener('pagehide', event => {
  if (event.persisted) return;
  media.revert();
  window.removeEventListener('scroll', updateHeader);
});
