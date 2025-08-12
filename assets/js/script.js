  document.addEventListener('DOMContentLoaded', () => {
  
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

  const nextButton = document.querySelector('.btn-next');
  const prevButton = document.querySelector('.btn-prev');
  const submitButton = document.querySelector('.btn-submit');
  const steps = document.querySelectorAll(".step");
  const form_steps = document.querySelectorAll(".form-step");
  let active = 1;

  nextButton.addEventListener('click', () => {
    let currentForm = document.querySelector('.form-step.active');
    let nextSibling = currentForm.nextElementSibling;

    if (nextSibling && nextSibling.classList.contains('form-step')) {
      currentForm.classList.remove('active');
      nextSibling.classList.add('active');
      active++;
    }
    buttonControls();
  })

  prevButton.addEventListener('click', () => {
    let currentForm = document.querySelector('.form-step.active');
    let prevSibling = currentForm.previousElementSibling;

    if (prevSibling && prevSibling.classList.contains('form-step')) {
      currentForm.classList.remove('active');
      prevSibling.classList.add('active');
      active--;
    }
    buttonControls();
  })

  function buttonControls() {
    if (active === 1) {
      prevButton.disabled = true;
    } else {
      prevButton.disabled = false;
    }

    if (active === steps.length) {
      nextButton.disabled = true;
      submitButton.disabled = false;
    } else {
      nextButton.disabled = false;
      submitButton.disabled = true;
    }
  }





});