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
  function updatepdateProgressBar() {
  // Update the progress bar width, suggested by Copilot
  const progressBarFill = document.querySelector('.progress-bar-fill');
      progressBarFill.style.width = `${(active / steps.length) * 100}%`;
  }

  updatepdateProgressBar();

  nextButton.addEventListener('click', () => {
    let currentForm = document.querySelector('.form-step.active');
    let currentStep = document.querySelector('.step.active');
    let nextSiblingForm = currentForm.nextElementSibling;
    let nextStep = currentStep.nextElementSibling;


    if (nextSiblingForm && nextSiblingForm.classList.contains('form-step')) {
      currentForm.classList.remove('active');
      currentStep.classList.remove('active');
      nextSiblingForm.classList.add('active');
      nextStep.classList.add('active');
      active++;
      updatepdateProgressBar()
    }
    buttonControls();
  })

  prevButton.addEventListener('click', () => {
    let currentForm = document.querySelector('.form-step.active');
    let currentStep = document.querySelector('.step.active');
    let prevSiblingForm = currentForm.previousElementSibling;
    let prevStep = currentStep.previousElementSibling;

    if (prevSiblingForm && prevSiblingForm.classList.contains('form-step')) {
      currentForm.classList.remove('active');
      currentStep.classList.remove('active');
      prevSiblingForm.classList.add('active');
      prevStep.classList.add('active');
      active--;
      updatepdateProgressBar()
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