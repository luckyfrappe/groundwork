// =========================================================
//  Utility Functions
// =========================================================

// Animations code from Beyond Fireship
// Modified and integrated into project by me
const observer = new IntersectionObserver((entries) => {
  entries.forEach((entry) => {
    if (entry.isIntersecting) {
      entry.target.classList.add("show");
    }
  });
});

const hiddenElements = document.querySelectorAll(".hidden");
hiddenElements.forEach((el) => observer.observe(el));

// Navbar functions made by Coding2GO
// Modified and integrated into project by me
/**
 * Toggles the sidebar visibility to "flex".
 */
function showSidebar() {
  const sidebar = document.querySelector(".sidebar");
  sidebar.style.display = "flex";
}

/**
 * Toggles the sidebar visibility to "none".
 */
const navLinks = document.querySelectorAll(".sidebar a");
navLinks.forEach(link => link.addEventListener("click", hideSidebar));
function hideSidebar() {
  const sidebar = document.querySelector(".sidebar");
  sidebar.style.display = "none";
}