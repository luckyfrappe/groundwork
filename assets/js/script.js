// Wait for the DOM to be fully loaded before executing the script
document.addEventListener("DOMContentLoaded", function() {

// Function to toggle the sidebar visibility
  function showSidebar() {
  const sidebar = document.querySelector('.sidebar');
  sidebar.style.display = "flex";
}

// Function to hide the sidebar
function hideSidebar() {
  const sidebar = document.querySelector('.sidebar');
  sidebar.style.display = "none";
}

})
