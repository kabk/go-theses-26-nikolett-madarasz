document.addEventListener("DOMContentLoaded", () => {
  const floatingTitle = document.getElementById("floating-title");
  const sections = Array.from(document.querySelectorAll("main h2[id]"));
  if (!floatingTitle || sections.length === 0) return;
  const SWITCH_LINE_PX_FROM_TOP = 180; // adjust if needed
 function updateFloatingTitle() {
  const trackY = window.scrollY + SWITCH_LINE_PX_FROM_TOP;
  let current = sections[0];
  for (const section of sections) {
    if (section.offsetTop <= trackY) current = section;
    else break;
  }
  const showFloating = trackY >= sections[0].offsetTop;
  if (!showFloating) {
    floatingTitle.style.opacity = "0";
    document.body.classList.remove("floating-title-active");
    return;
  }
  floatingTitle.textContent = current.textContent.trim();
  floatingTitle.style.opacity = "1";
  document.body.classList.add("floating-title-active");
}

  updateFloatingTitle();
  window.addEventListener("scroll", updateFloatingTitle, { passive: true });
  window.addEventListener("resize", updateFloatingTitle);
});

document.addEventListener("DOMContentLoaded", () => {
  const curtain = document.getElementById("curtain");
  if (!curtain) return;

  let opened = false;

  function openCurtain() {
    if (opened) return;
    opened = true;
    document.body.classList.add("show-curtain");
    setTimeout(() => {
      curtain.classList.add("open");
    }, 50);
  }

  function cleanupListeners() {
    window.removeEventListener("scroll", handleFirstScroll);
    window.removeEventListener("wheel", handleFirstScroll);
    window.removeEventListener("touchmove", handleFirstScroll);
  }

  function handleFirstScroll() {
    if (window.scrollY > 8) {
      openCurtain();
      cleanupListeners();
    }
  }

  document.body.classList.add("show-curtain");

  if (window.scrollY > 8) {
    curtain.classList.add("open");
    opened = true;
    return;
  }

  window.addEventListener("scroll", handleFirstScroll, { passive: true });
  window.addEventListener("wheel", handleFirstScroll, { passive: true });
  window.addEventListener("touchmove", handleFirstScroll, { passive: true });
});