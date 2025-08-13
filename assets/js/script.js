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

  // Project object:
  const project = {
    contact: {
      name: '',
      company: '',
      email: '',
      phone: '',
      consent: false
    },
    worksites: [],
    options: {
      currency: 'EUR',
      proMode: false
    }
  };

  /** 
 * Groundwork Price Constants (EUR) 
 * All prices are indicative values for MVP based on EU civil works data gathered from ChatGPT prompt.
 * Units: 
 * - "per m3" = cubic meter
 * - "per m2" = square meter
 * - "per lm" = linear meter
 * - "per pile" = each pile
 * - "fixed" = one-off cost per site
 */
  const costs = {
    excavation: {
      unit: "m3",
      min: 12,
      max: 60
    },
    pilingPerPile: {
      unit: "pile",
      min: 800,
      max: 2000
    },
    pilingPerMeter: {
      unit: "m",
      min: 400,
      max: 700
    },
    concreteSlabs: {
      unit: "m2",
      min: 50,
      max: 150
    },
    drainage: {
      unit: "lm",
      min: 10,
      max: 200
    },
    frostInsulation: {
      unit: "m2",
      min: 20,
      max: 60
    },
    shoring: {
      unit: "m2",
      min: 150,
      max: 400
    },
    rockBlasting: {
      unit: "m3",
      min: 40,
      max: 120
    },
    siteSetup: {
      unit: "fixed",
      min: 20000,
      max: 200000
    },
    rushSurcharge: {
      multiplier: 1.20
    }
  };

  /**
   * Condition Coefficients
   * Multipliers applied to base min/max service totals
   */
  const coefficients = {
    soilType: {
      sand: 1.0,
      loam: 1.05,
      clay: 1.15,
      rocky: 1.25,
      unknown: 1.1
    },
    terrain: {
      flat: 1.0,
      slope: 1.05,
      complex: 1.15,
      terraced: 1.15 // treated same as complex for MVP
    },
    groundwater: {
      low: 1.0,
      medium: 1.05,
      high: 1.15,
      unknown: 1.0
    },
    access: {
      good: 1.0,
      fair: 1.05,
      limited: 1.1,
      narrow: 1.1 // same as limited for MVP
    }
  };

  // Start section
  const howManyWorksites = document.querySelector('.card-radio-group');
  howManyWorksites.addEventListener('change', howManyWorksitesChange);
  const addSiteBtn = document.getElementById('addSiteBtn');

  /**
   * Allows to add more worksite fields
   */
  function howManyWorksitesChange() {
    // Checks what siteCount is selected
    const selected = howManyWorksites.querySelector('input[name="siteCount"]:checked');
    // If multiple selected - add more worksite fields
    if (selected.value === 'multiple') {
      addSiteBtn.classList.remove('hide');
    } else if (selected.value === 'single') {
      addSiteBtn.classList.add('hide');
      // If single selected - remove all but the first worksite field
      const worksiteFields = document.querySelector('.worksite-fields');
      const worksiteFieldsArray = Array.from(worksiteFields.children);
      worksiteFieldsArray.slice(1).forEach(field => field.remove());
    }
  }

  // Add site button functionality
  // This button allows users to add more worksite fields dynamically, added delete button with help from ChatGPT
  addSiteBtn.addEventListener('click', () => {
    const worksiteFields = document.querySelector('.worksite-fields');

    // Create a new worksite container
    const newWorksite = document.createElement('div');
    newWorksite.classList.add('worksite-field-new');

    // Add inner HTML + delete button in the same div
    newWorksite.innerHTML = `
    <label for="worksiteName">Worksite Name / Identifier</label>
    <input type="text" name="worksiteName" placeholder="Site A, North Wing, etc." />
    <button type="button" class="delete-worksite-btn">Delete</button>
  `;

    // Append to container
    worksiteFields.appendChild(newWorksite);

    // Add event listener to the delete button that attaches to the new worksite div
    const deleteBtn = newWorksite.querySelector('.delete-worksite-btn');
    deleteBtn.addEventListener('click', () => {
      newWorksite.remove(); // Remove this specific worksite div
    });
  });










});