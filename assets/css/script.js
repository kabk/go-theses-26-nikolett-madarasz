document.addEventListener("DOMContentLoaded", () => {
  const floatingTitle = document.getElementById("floating-title");
  const sections = Array.from(document.querySelectorAll("main h2[id]"));
  if (!floatingTitle || sections.length === 0) return;
  // Adjust this number if you want the title to switch earlier/later.
  // It represents a point (in px) from the top of the page we "track".
  const SWITCH_LINE_PX_FROM_TOP = 160;
  function updateFloatingTitle() {
    const trackY = window.scrollY + SWITCH_LINE_PX_FROM_TOP;
    let current = sections[0];
    for (const section of sections) {
      if (section.offsetTop <= trackY) current = section;
      else break;
    }
    floatingTitle.textContent = current.textContent.trim();
  }
  updateFloatingTitle();
  window.addEventListener("scroll", updateFloatingTitle, { passive: true });
  window.addEventListener("resize", updateFloatingTitle);
});