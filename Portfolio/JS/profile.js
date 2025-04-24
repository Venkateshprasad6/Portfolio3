// =======================
// DOM SELECTORS
// =======================
const navSelectors = {
  scrollLinks: 'a[href^="#"]',
  navLink: '.nav-link',
  sections: 'section',
};

// =======================
// CONSTANTS
// =======================
const HEADER_OFFSET = 80;

// =======================
// DOM ELEMENTS
// =======================
const scrollLinks = document.querySelectorAll(navSelectors.scrollLinks);
const navLinks = document.querySelectorAll(navSelectors.navLink);
const sections = document.querySelectorAll(navSelectors.sections);

// =======================
// EVENT HANDLERS
// =======================

/**
 * Smooth scroll handler
 */
const handleSmoothScroll = (e) => {
  e.preventDefault();
  const anchor = e.currentTarget;
  const targetId = anchor.getAttribute("href");
  const target = document.querySelector(targetId);

  if (target) {
    const elementPosition = target.getBoundingClientRect().top;
    const offsetPosition = elementPosition + window.pageYOffset - HEADER_OFFSET;

    window.scrollTo({
      top: offsetPosition,
      behavior: "smooth",
    });
  }
};

/**
 * Updates nav link active class based on current scroll position
 */
const updateActiveLinkOnScroll = () => {
  let currentSectionId = "";

  sections.forEach(section => {
    const sectionTop = section.offsetTop - HEADER_OFFSET;
    const sectionHeight = section.offsetHeight;

    if (
      window.pageYOffset >= sectionTop &&
      window.pageYOffset < sectionTop + sectionHeight
    ) {
      currentSectionId = section.getAttribute("id");
    }
  });

  navLinks.forEach(link => {
    link.classList.remove("active");
    if (link.getAttribute("href") === `#${currentSectionId}`) {
      link.classList.add("active");
    }
  });
};

// =======================
// ADD EVENT LISTENERS
// =======================

const addScrollEventListeners = () => {
  scrollLinks.forEach(link => {
    link.addEventListener("click", handleSmoothScroll);
  });
  window.addEventListener("scroll", updateActiveLinkOnScroll);
};

// =======================
// REMOVE EVENT LISTENERS
// =======================

const removeScrollEventListeners = () => {
  scrollLinks.forEach(link => {
    link.removeEventListener("click", handleSmoothScroll);
  });
  window.removeEventListener("scroll", updateActiveLinkOnScroll);
};

// =======================
// BEFORE UNLOAD CLEANUP
// =======================

const handleBeforeUnload = () => {
  removeScrollEventListeners();
};

window.addEventListener("beforeunload", handleBeforeUnload);

// =======================
// INIT
// =======================
addScrollEventListeners();
