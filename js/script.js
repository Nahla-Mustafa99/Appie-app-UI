const btnNavEl = document.querySelector(".nav-mobile-btn");
const headerEl = document.querySelector(".header");
btnNavEl.addEventListener("click", function () {
  // No .nav-open because it will put it as .nav-open in header
  headerEl.classList.toggle("nav-open");
});

// // //
// Handle scrolling to be smooth on safari, edge browsers
// all anchor tags that has the href attribute
// query selector (All!!)
const allLinks = document.querySelectorAll("a:link");
allLinks.forEach(function (link) {
  link.addEventListener("click", function (e) {
    e.preventDefault();
    const href = link.getAttribute("href");
    // Scroll to top
    if (href == "#") {
      window.scrollTo({
        top: 0,
        behavior: "auto",
      });
    }
    // or href[0] == "#" start(s)With
    else if (href != "#" && href.startsWith("#")) {
      const el = document.querySelector(href);
      // into not to
      el.scrollIntoView({
        behavior: "smooth",
      });
    }

    // maobile:nav close the nav when you navigate to other section/page
    if (link.classList.contains("header-navigation-links")) {
      if (headerEl.classList.contains("nav-open"))
        headerEl.classList.toggle("nav-open");
    }
  });
});

// Handle observer to make sticky nav if the hero section outside the viewport
const heroSectionEl = document.querySelector(".hero-section");
const observer = new IntersectionObserver(
  function (entries) {
    // there are list of entries foe every thresold
    //something called an array of entries.And there's gonna be one entries for each threshold value.
    //But here we just have one and so, we can just say that constant is equal the very first entry.
    const ent = entries[0];
    if (ent.isIntersecting == false) {
      // select with dot add or rempve without dot
      document.querySelector(".header").classList.add("sticky");
    }
    // as we enter it, we will get a new event. And so now, is intersecting is back to being true.
    // else {
    if (ent.isIntersecting)
      document.querySelector(".header").classList.remove("sticky");
  },
  {
    // viewport -> root
    root: null,
    // No intersection 0 < threshold < 1 (fully inside vw)
    // we want to get an event as soon as the hero section moves out completely of the view port.
    threshold: 0,
    /* And so that margin is then basically, applied outside of this root. So here we can say minus 80 pixels.
   So here it has to be pixels, it doesn't work to use percentages or rem. And it needs to be a string like this.
   So inside of quotes. And so here, we use these 80 pixels because that's exactly what we set the height of 
   the navigation bar to.
   So these eight ram here are basically 80 pixels. And so this is the reason why it was important to set the height 
   here manually.
   So that then right here, we could use that 80 pixels. */
    rootMargin: "-50px",
  }
);
observer.observe(heroSectionEl);
