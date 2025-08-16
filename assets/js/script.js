// =========================================================
//  Global Variables & DOM Element Selection
// =========================================================

// Animations code from Beyond Fireship
const observer = new IntersectionObserver((entries) => {
  entries.forEach((entry) => {
    if (entry.isIntersecting) {
      entry.target.classList.add('show');
    } else {
      entry.target.classList.remove('show');
    }
  });
});

const hiddenElements = document.querySelectorAll('.hidden');
hiddenElements.forEach((el) => observer.observe(el));

// Navigation buttons and progress indicators
const nextButton = document.querySelector('.btn-next');
const prevButton = document.querySelector('.btn-prev');
const submitButton = document.querySelector('.btn-submit');
const steps = document.querySelectorAll(".step");
const form_steps = document.querySelectorAll(".form-step");
const howManyWorksites = document.querySelector('.card-radio-group');
const addSiteBtn = document.getElementById('addSiteBtn');

// Active step counter for progress bar and navigation
let active = 1;

// =========================================================
//  Utility Functions
// =========================================================

/**
 * Toggles the sidebar visibility to "flex".
 */
function showSidebar() {
  const sidebar = document.querySelector('.sidebar');
  sidebar.style.display = "flex";
}

/**
 * Toggles the sidebar visibility to "none".
 */
function hideSidebar() {
  const sidebar = document.querySelector('.sidebar');
  sidebar.style.display = "none";
}

/**
 * Updates the width of the progress bar based on the
 * current active step.
 */
function updatedProgressBar() {
  // Update the progress bar width, suggested by Copilot
  const progressBarFill = document.querySelector('.progress-bar-fill');
  progressBarFill.style.width = `${(active / steps.length) * 100}%`;
}

/**
 * Controls the disabled state of the 'Next' and 'Previous' buttons
 * based on the current step.
 */
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

/**
 * Toggles the accordion panel visibility. This function is
 * wrapped to handle multiple accordions.
 */
function wrapAccordions() {
  // Accordion code from https://www.w3schools.com/howto/howto_js_accordion.asp made as function, called when worksites are created
  var acc = document.getElementsByClassName("accordion");
  var index;

  for (index = 0; index < acc.length; index++) {
    acc[index].addEventListener("click", function () {
      /* Toggle between adding and removing the "active" class,
      to highlight the button that controls the panel */
      this.classList.toggle("active-accordion");

      /* Toggle between hiding and showing the active panel */
      var panel = this.nextElementSibling;
      if (panel.style.display === "block") {
        panel.style.display = "none";
      } else {
        panel.style.display = "block";
      }
    });
  }
}

/**
 * Ensures the 'Delete' button on the first worksite field is
 * hidden if it's the only one.
 */
function checkTheFirstDeleteButton() {
  const worksiteFields = document.querySelector('.worksite-fields');
  const deleteBtn = worksiteFields.querySelector('.delete-worksite-btn');
  if (worksiteFields.children.length === 1) {
    deleteBtn.classList.add('hide');
  } else {
    deleteBtn.classList.remove('hide');
  }
  return project.worksites;
}

// =========================================================
//  Buttons form control
// =========================================================

// Event listener for the "Next" button click

nextButton.addEventListener('click', () => {
  let currentForm = document.querySelector('.form-step.active');
  let currentStep = document.querySelector('.step.active');
  let nextSiblingForm = currentForm.nextElementSibling;
  let nextStep = currentStep.nextElementSibling;

  const requiredFields = currentForm.querySelectorAll('[required]');
  let allFilled = true;

  // An array to store unique accordion buttons that need to be opened, debugged with Gemini by Google
  const accordionsToOpen = new Set();

  requiredFields.forEach(input => {
    if (input.value.trim() === '') {
      allFilled = false;
      input.style.border = '2px solid red';

      // Find the parent accordion button and add it to the set
      let parentAccordion = input.closest('.specifications-accordions');
      if (parentAccordion) {
        let accordionButton = parentAccordion.querySelector('.accordion');
        if (accordionButton) {
          accordionsToOpen.add(accordionButton);
        }
      }
    } else {
      input.style.border = '';
    }
  });

  if (!allFilled) {
    // Open all the accordions that contain empty fields
    accordionsToOpen.forEach(accordion => {
      accordion.classList.add("active-accordion");
      const panel = accordion.nextElementSibling;
      panel.style.display = "block";
    });
    alert("Please fill all required fields before proceeding.");
    return; // Stop form from moving to next step
  };

  // Additional validation for services form, rewritten to check at least one service per worksite with Gemini by Google
  if (currentForm.classList.contains('form-three')) {

    let allSitesHaveService = false;
    for (const site of project.worksites) {

      // Get the corresponding form card for the current site
      const siteCard = document.querySelector(`.services-form-cards[data-site-name="${site.name}"]`);
      let atLeastOneChecked = false;

      // Check if any service is selected for the current site
      for (const service in site.services) {
        if (service !== 'rush' && site.services[service]) {
          atLeastOneChecked = true;
          break;
        }
      }

      // Stop form from moving to next step
      if (!atLeastOneChecked) {
        alert("Please select at least one service for each worksite.");
        return;
      }
    }
  }

  // Additional validation for contact form
  if (currentForm.classList.contains('form-one')) {
    const emailInput = currentForm.querySelector('#email');

    // Simple email regex pattern from Stack Overflow
    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (!emailPattern.test(emailInput.value)) {
      alert("Please enter a valid email address.");
      emailInput.style.border = '2px solid red';
      return;
    } else {
      emailInput.style.border = '';
    }
  }

  if (nextSiblingForm && nextSiblingForm.classList.contains('form-step')) {
    currentForm.classList.remove('active');
    currentStep.classList.remove('active');
    nextSiblingForm.classList.add('active');
    nextStep.classList.add('active');
    active++;
    updatedProgressBar()
    if (nextSiblingForm.classList.contains('summaryForm')) {
      updateContactSection();
      updateDetailsSection();
      calculateTotal();
    }
  }
  buttonControls();
})

// Event listener for the "Previous" button click
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
    updatedProgressBar()
  }
  buttonControls();
});

// Event listener for the "Add Site" button
addSiteBtn.addEventListener('click', addWorksite);

// Event listener for the "siteCount" radio buttons
howManyWorksites.addEventListener('change', howManyWorksitesChange);

// Event listener for the "consent" checkbox
document.querySelector('#consent').addEventListener('change', (e) => {
  project.contact[e.target.value] = e.target.checked;
});

// =========================================================
//  Project Data & Price Constants
// =========================================================

/**
 * Stores all project data, including contact info, project details,
 * and dynamic worksite information.
 */
const project = {
  contact: {
    fullName: '',
    companyName: '',
    email: '',
    phone: '',
    consent: false
  },
  details: {
    projectType: '',
    projectLocation: '',
    projectReference: '',
    siteUpload: ''
  },
  worksites: []
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
    min: 20,
    max: 40
  },
  pilingPerPile: {
    unit: "pile",
    min: 1500,
    max: 2000
  },
  concreteSlabs: {
    unit: "m2",
    min: 120,
    max: 150
  },
  drainage: {
    unit: "lm",
    min: 80,
    max: 150
  },
  frostInsulation: {
    unit: "m2",
    min: 35,
    max: 50
  },
  shoring: {
    unit: "m2",
    min: 250,
    max: 350
  },
  rockBlasting: {
    unit: "m3",
    min: 60,
    max: 100
  },
  rushSurcharge: {
    multiplier: 1.20
  },
  soilRemoval: {
    unit: "m3",
    min: 30,
    max: 50
  }
};

// =========================================================
//  Dynamic Content & Data Handling Functions
// =========================================================

/**
 * Handles the logic for adding or removing worksite fields
 * based on the selected radio button.
 */
function howManyWorksitesChange() {
  // Checks what siteCount is selected
  const selected = howManyWorksites.querySelector('input[name="siteCount"]:checked');
  // If multiple selected - add more worksite fields
  if (selected.value === 'multiple') {
    addSiteBtn.classList.remove('hide');
    addWorksite(); // Add the first worksite field automatically
  } else if (selected.value === 'single') {
    addSiteBtn.classList.add('hide');
    // If single selected - remove all but the first worksite field
    const worksiteFields = document.querySelector('.worksite-fields');
    const worksiteFieldsArray = Array.from(worksiteFields.children);
    worksiteFieldsArray.slice(1).forEach(field => field.remove());
    checkTheFirstDeleteButton();
  }
}

/**
 * Dynamically adds a new worksite field and its corresponding
 * data object to the project.
 */
function addWorksite() {
  const worksiteFields = document.querySelector('.worksite-fields');

  // Create a new worksite container
  const newWorksite = document.createElement('div');
  newWorksite.classList.add('worksite-field');

  // Add inner HTML + delete button in the same div
  // This button allows users to add more worksite fields dynamically, added delete button with help from ChatGPT
  newWorksite.innerHTML = `
    <label for="worksiteName">Worksite Name / Identifier <sup>*</sup></label>
    <input type="text" name="worksiteName" placeholder="Site A, North Wing, etc." required/>
    <button type="button" class="delete-worksite-btn">Delete</button>`;

  // Append to container
  worksiteFields.appendChild(newWorksite);

  const worksite = {
    name: "",
    services: {
      excavation: false,
      pilingPerPile: false,
      concreteSlabs: false,
      drainage: false,
      frostInsulation: false,
      shoring: false,
      rockBlasting: false,
      rush: false
    },
    specs: {
      siteArea: 0,
      excavationDepth: 0,
      numPiles: 0,
      pilesLength: 0,
      slabArea: 0,
      slabThickness: 0,
      drainageLength: 0,
      frostArea: 0,
      rockVolume: 0,
      soilVolume: 0,
      materialVolumes: {},
      notes: ""
    }
  };

  project.worksites.push(worksite);

  const input = newWorksite.querySelector('input[name="worksiteName"]');
  input.addEventListener("input", (e) => {
    worksite.name = e.target.value;
    updateWorksiteServices();
  });

  // Delete button logic
  const deleteBtn = newWorksite.querySelector('.delete-worksite-btn');
  deleteBtn.addEventListener('click', () => {
    // Remove from project array 
    const index = project.worksites.indexOf(worksite);
    if (index > -1) {
      project.worksites.splice(index, 1);
    }
    // Remove from UI
    newWorksite.remove();
    checkTheFirstDeleteButton();
    console.log("After deletion:", project);
    updateWorksiteServices();
    updateWorksiteSpecifications();
  });
  checkTheFirstDeleteButton();
};

/**
 * Populates the contact information form fields and
 * binds them to the project data object.
 */
function updateContactDetails() {
  //Add contact info and project details:
  const contactForm = document.querySelector(".form-one");
  // Clear the existing contact form
  contactForm.innerHTML =
    `<div class="bg-svg"></div>
      <h2>Contact Information</h2>
      <p>Please provide your details so we can send your estimate.</p>
      <div>
          <label for="fullName">Full Name <sup>*</sup></label>
          <input type="text" id="fullName" name="fullName" required placeholder="Alex Johnson"/>
      </div>
      <div>
          <label for="companyName">Company / Organisation</label>
          <input type="text" id="companyName" name="companyName"
              placeholder="Your company (optional)"/>
      </div>
      <div>
          <label for="email">Email Address <sup>*</sup></label>
          <input type="email" id="email" name="email" required placeholder="example@mail.com"/>
      </div>
      <div>
          <label for="phone">Phone Number</label>
          <input type="number" id="phone" name="phone" placeholder="+46 70 123 4567"/>
      </div>`;

  // Bind number inputs to project object
  contactForm.querySelectorAll('input[type="number"], input[type="text"], input[type="email"], input[type="tel"]').forEach(input => {
    input.addEventListener('input', (e) => {
      const key = e.target.name;
      project.contact[key] = e.target.value;
    });
  });
}

/**
 * Populates the project details form fields and
 * binds them to the project data object.
 */
function updateProjectDetails() {
  const projectDetailsForm = document.querySelector(".form-two");
  // Clear the existing contact form
  projectDetailsForm.innerHTML =
    `<div class="bg-svg"></div>
      <h2>Project Basics</h2>
      <p>Tell us about this project.</p>
      <div>
          <label for="projectType">Project Type <sup>*</sup></label>
          <select id="projectType" name="projectType" required>
              <option value="">-- Select project type --</option>
              <option value="Data Center">Data Center</option>
              <option value="Logistics Warehouse">Logistics Warehouse</option>
              <option value="Residential Housing">Residential Housing</option>
              <option value="Office Building">Office Building</option>
              <option value="Industrial Facility">Industrial Facility</option>
              <option value="Infrastructure">Road / Bridge / Civil Works</option>
              <option value="Other">Other</option>
          </select><br>
      </div>
      <div>
          <label for="projectLocation">Project City / Country <sup>*</sup></label>
          <input type="text" id="projectLocation" name="projectLocation" required
              placeholder="Stockholm" />
      </div>
      <div>
          <label for="projectReference">Reference / Internal Code</label>
          <input type="text" id="projectReference" name="projectReference"
              placeholder="Optional reference" />
      </div>
      <div>
          <label for="siteUpload">Upload Site Plan / Photo (optional)</label>
          <input type="file" id="siteUpload" name="siteUpload" accept=".jpg,.jpeg,.png,.pdf" />
      </div>`;

  // Bind number inputs to project object
  projectDetailsForm.querySelectorAll('select, input[type="text"], input[type="file"]').forEach(input => {
    input.addEventListener('input', (e) => {
      const key = e.target.name;
      project.details[key] = e.target.value;
    });
  });
}

/**
 * Populates the services form dynamically based on the number
 * of worksites in the project data.
 */
function updateWorksiteServices() {
  const servicesForm = document.querySelector(".form-three");
  // Clear the existing services
  servicesForm.innerHTML = `<h2>Required Services</h2>
                            <p>Please select the services you require for each worksite.</p>`;
  for (const site of project.worksites) {
    // Create a new worksite container
    const worksiteServices = document.createElement('div');
    worksiteServices.classList.add('services-form-cards');

    // Add inner HTML + delete button in the same div
    worksiteServices.innerHTML =
      `<p>Services for Worksite: ${site.name}</p>
        <label>
            <input type="checkbox" name="services" value="excavation" />
            <i class="fas fa-digging"></i>
            Excavation & Site Prep
        </label>
        <label>
            <input type="checkbox" name="services" value="pilingPerPile" />
            <i class="fas fa-hammer"></i>
            Piling / Foundation
        </label>
        <label>
            <input type="checkbox" name="services" value="concreteSlabs" />
            <i class="fas fa-cube"></i>
            Concrete Slabs / Foundation
        </label>
        <label>
            <input type="checkbox" name="services" value="shoring" />
            <i class="fas fa-building"></i>
            Shoring / Retaining Walls
        </label>
        <label>
            <input type="checkbox" name="services" value="rockBlasting" />
            <i class="fas fa-mountain"></i>
            Rock Breaking / Blasting
        </label>
        <label>
            <input type="checkbox" name="services" value="drainage" />
            <i class="fas fa-water"></i>
            Drainage System
        </label>
        <label>
            <input type="checkbox" name="services" value="frostInsulation" />
            <i class="fas fa-snowflake"></i>
            Frost Insulation
        </label>
        <label>
            <input type="checkbox" name="services" value="rush" />
            <i class="fas fa-bolt"></i>
            Rush Delivery
        </label>`;

    // Add event listeners to link checkboxes with the current site's services, code from ChatGPT
    worksiteServices.querySelectorAll('input[type="checkbox"]').forEach(checkbox => {
      checkbox.addEventListener('change', (e) => {
        site.services[e.target.value] = e.target.checked;
        console.log("Updated worksite services:", site);
        updateWorksiteSpecifications();
      });
    });

    // Append the whole services section to the form
    servicesForm.appendChild(worksiteServices);
  }
}

/**
 * Populates the specifications form dynamically, showing only
 * fields for selected services.
 */
function updateWorksiteSpecifications() {
  //Function is remade by ChatGPT in order to show only selected services
  const specificationsForm = document.querySelector(".form-four");

  // Clear the existing specs
  specificationsForm.innerHTML =
    `<h2>Specifications</h2>
    <p>Enter details for the services you selected.</p>`;

  for (const site of project.worksites) {
    const worksiteSpecs = document.createElement('div');
    worksiteSpecs.classList.add('specifications-accordions');

    let specsHTML = `
      <button class="accordion">Specs for Worksite: ${site.name}</button>
      <div class="panel">
        <label for="siteArea_${site.name}">Total Site Area (m²) <sup>*</sup></label>
        <input type="number" id="siteArea_${site.name}" name="siteArea" min="1" required placeholder="e.g. 500"/>
    `;

    // Show Excavation fields if excavation is selected
    if (site.services.excavation) {
      specsHTML += `
        <label for="excavationDepth_${site.name}">Excavation Depth (m) <sup>*</sup></label>
        <input type="number" step="0.1" id="excavationDepth_${site.name}" name="excavationDepth" min="0" placeholder="e.g. 1.5" required/>
      `;
    }

    // Show Piling fields if piling is selected
    if (site.services.pilingPerPile) {
      specsHTML += `
        <label for="numPiles_${site.name}">Number of Piles <sup>*</sup></label>
        <input type="number" id="numPiles_${site.name}" name="numPiles" min="1" required placeholder="e.g. 100"/>

        <label for="pilesLength_${site.name}">Total Pile Length (m) <sup>*</sup></label>
        <input type="number" id="pilesLength_${site.name}" name="pilesLength" min="0" required placeholder="e.g. 200"/>
      `;
    }

    // Show Slab fields if concreteSlabs are selected
    if (site.services.concreteSlabs) {
      specsHTML += `
        <label for="slabArea_${site.name}">Slab Area (m²) <sup>*</sup></label>
        <input type="number" id="slabArea_${site.name}" name="slabArea" min="0" required placeholder="e.g. 250"/>

        <label for="slabThickness_${site.name}">Slab Thickness (cm) <sup>*</sup></label>
        <input type="number" id="slabThickness_${site.name}" name="slabThickness" step="0.1" min="0" required placeholder="e.g. 15"/>
      `;
    }
    // Show Rock Blasting fields if rockBlasting is selected
    if (site.services.rockBlasting) {
      specsHTML += `
        <label for="rockVolume_${site.name}">Rock Volume (m³) <sup>*</sup></label>
        <input type="number" id="rockVolume_${site.name}" name="rockVolume" min="0" required placeholder="e.g. 100"/>
      `;
    }
    // Show Drainage fields if drainage is selected
    if (site.services.drainage) {
      specsHTML += `
        <label for="drainageLength_${site.name}">Drainage Length (m) <sup>*</sup></label>
        <input type="number" id="drainageLength_${site.name}" name="drainageLength" min="0" required placeholder="e.g. 150"/>
      `;
    }

    // Show frostInsulation Insulation fields if frostInsulation is selected
    if (site.services.frostInsulation) {
      specsHTML += `
        <label for="frostArea_${site.name}">Frost Insulation Area (m²) <sup>*</sup></label>
        <input type="number" id="frostArea_${site.name}" name="frostArea" min="1" required placeholder="e.g. 500"/>
      `;
    }

    // Show shoring fields if shoring is selected
    if (site.services.shoring) {
      specsHTML += `
        <label for="shoringLength_${site.name}">Shoring Length (m) <sup>*</sup></label>
        <input type="number" id="shoringLength_${site.name}" name="shoringLength" min="0" required placeholder="e.g. 100"/>
      `;
    }

    // Always show these general fields
    specsHTML += `
      <label for="soilVolume_${site.name}">Soil Volume (m³)</label>
      <input type="number" id="soilVolume_${site.name}" name="soilVolume" min="0" max="100" placeholder="e.g. 25"/>

      <label for="materialVolumes_${site.name}">Material Volumes (list materials and quantities)</label>
      <textarea id="materialVolumes_${site.name}" name="materialVolumes" placeholder="Example: Gravel - 20m³, Concrete - 15m³" style = "height: 40px;"></textarea>

      <label for="notes_${site.name}">Additional Notes / Special Requirements</label>
      <textarea id="notes_${site.name}" name="notes" placeholder="Any details that could affect pricing" style = "height: 100px;"></textarea>
      </div>
    `;

    worksiteSpecs.innerHTML = specsHTML;

    // Bind number inputs to project object
    worksiteSpecs.querySelectorAll('input[type="number"], textarea').forEach(input => {
      input.addEventListener('input', (e) => {
        const key = e.target.name;
        site.specs[key] = e.target.value;
        console.log("Updated worksite specs:", site);
      });
    });

    specificationsForm.appendChild(worksiteSpecs);
  }

  wrapAccordions();
}

/**
 * Updates the contact details section on the summary page.
 * Populates the summary form with user-provided contact info.
 */
function updateContactSection() {
  const contactSection = document.querySelector('#summaryContact');

  // Update contact information
  contactSection.innerHTML = `
    <h3>Contact Information</h3>
    <p>Name: ${project.contact.fullName}</p>
    <p>Company: ${project.contact.companyName || 'N/A'}</p>
    <p>Email: ${project.contact.email}</p>
    <p>Phone: ${project.contact.phone || 'N/A'}</p>
  `;
}

/**
 * Updates the project details section on the summary page.
 * @description Populates the summary form with user-provided project details.
 */
function updateDetailsSection() {
  const detailsSection = document.querySelector('#summaryDetails');

  // Update project details
  detailsSection.innerHTML = `
    <h3>Project Details</h3>
    <p>Project Type: ${project.details.projectType}</p>
    <p>Location: ${project.details.projectLocation}</p>
    <p>Project Reference: ${project.details.projectReference || 'N/A'}</p>
    <p>Files: ${project.details.siteUpload || 'None'}</p>
  `;
}

/**
 * Calculates the total estimated cost for all worksites
 * and updates the summary section.
 */
function calculateTotal() {
  //Calculation functions (debugged with Gemini by Google):
  const summarySites = document.querySelector("#summarySites");
  let summaryHTML = "";

  let totalAllMin = 0;
  let totalAllMax = 0;

  // Initialize grand total variables
  let grandMin = 0;
  let grandMax = 0;
  let id = 0;
  for (const site of project.worksites) {
    let totalMin = 0;
    let totalMax = 0;
    let siteHTML = "";

    const siteArea = parseFloat(site.specs.siteArea);
    id++;
    siteHTML += `
          <h3>Worksite ${id}: ${site.name}</h3>
          <p class="summary-subtitle">Estimated cost range based on your inputs:</p>
          <button class="accordion">Summary prices</button>
          <div class="panel">
            <p>Site Area: <strong>${siteArea} m²</strong></p>
        `;

    // Excavation (per m³)
    if (site.services.excavation) {
      const depth = parseFloat(site.specs.excavationDepth);

      const volume = siteArea * depth;
      const excavationMin = volume * costs.excavation.min;
      const excavationMax = volume * costs.excavation.max;
      totalMin += excavationMin;
      totalMax += excavationMax;
      siteHTML += `
              <p>Excavation Depth: <strong>${depth} m</strong></p>
              <p>Excavation Volume: <strong>${volume.toFixed(2)} m³</strong></p>
              <p>Excavation Cost: €${excavationMin.toFixed(2)} - €${excavationMax.toFixed(2)}</p>
            `;

    }

    // Piling (per pile)
    if (site.services.pilingPerPile) {
      const numPiles = parseFloat(site.specs.numPiles);
      const pilingMin = numPiles * costs.pilingPerPile.min;
      const pilingMax = numPiles * costs.pilingPerPile.max;
      totalMin += pilingMin;
      totalMax += pilingMax;
      siteHTML += `
              <p>Number of Piles: <strong>${numPiles}</strong></p>
              <p>Piling Cost: €${pilingMin.toFixed(2)} - €${pilingMax.toFixed(2)}</p>
            `;
    }

    // Concrete slabs (per m²)
    if (site.services.concreteSlabs) {
      const slabArea = parseFloat(site.specs.slabArea);
      const slabMin = slabArea * costs.concreteSlabs.min;
      const slabMax = slabArea * costs.concreteSlabs.max;
      totalMin += slabMin;
      totalMax += slabMax;
      siteHTML += `
              <p>Concrete Slab Area: <strong>${slabArea} m²</strong></p>
              <p>Concrete Slab Cost: €${slabMin.toFixed(2)} - €${slabMax.toFixed(2)}</p>
            `;
    }

    // Drainage (per linear meter)
    if (site.services.drainage) {
      const length = parseFloat(site.specs.drainageLength);
      const drainageMin = length * costs.drainage.min;
      const drainageMax = length * costs.drainage.max;
      totalMin += drainageMin;
      totalMax += drainageMax;
      siteHTML += `
              <p>Drainage Length: <strong>${length} m</strong></p>
              <p>Drainage Cost: €${drainageMin.toFixed(2)} - €${drainageMax.toFixed(2)}</p>
            `;
    }

    // Frost insulation (per m²)
    if (site.services.frostInsulation) {
      const frostArea = parseFloat(site.specs.frostArea);
      const frostMin = frostArea * costs.frostInsulation.min;
      const frostMax = frostArea * costs.frostInsulation.max;
      totalMin += frostMin;
      totalMax += frostMax;
      siteHTML += `
              <p>Frost Insulation Area: <strong>${frostArea} m²</strong></p>
              <p>Frost Insulation Cost: €${frostMin.toFixed(2)} - €${frostMax.toFixed(2)}</p>
            `;
    }

    // Shoring (per m²)
    if (site.services.shoring) {
      const shoringLength = parseFloat(site.specs.shoringLength);
      const shoringMin = shoringLength * costs.shoring.min;
      const shoringMax = shoringLength * costs.shoring.max;
      totalMin += shoringMin;
      totalMax += shoringMax;
      siteHTML += `
              <p>Shoring Length: <strong>${shoringLength} m</strong></p>
              <p>Shoring Cost: €${shoringMin.toFixed(2)} - €${shoringMax.toFixed(2)}</p>
            `;
    }
    // Soil removal percentage
    if (site.specs.soilVolume > 0) {
      const volume = parseFloat(site.specs.soilVolume);
      const soilMin = volume * costs.soilRemoval.min;
      const soilMax = volume * costs.soilRemoval.max;
      totalMin += soilMin;
      totalMax += soilMax;
      siteHTML += `
              <p>Soil Removal Volume: <strong>${volume} m³</strong></p>
              <p>Soil Removal Cost: €${soilMin.toFixed(2)} - €${soilMax.toFixed(2)}</p>
            `;
    }
    // Rock blasting (per m³)
    if (site.services.rockBlasting) {
      const volume = parseFloat(site.specs.rockVolume);
      const rockMin = volume * costs.rockBlasting.min;
      const rockMax = volume * costs.rockBlasting.max;
      totalMin += rockMin;
      totalMax += rockMax;
      siteHTML += `
              <p>Rock Blasting Volume: <strong>${volume} m³</strong></p>
              <p>Rock Blasting Cost: €${rockMin.toFixed(2)} - €${rockMax.toFixed(2)}</p>
            `;
    }

    // Rush surcharge
    if (site.services.rush) {
      const rushMin = (costs.rushSurcharge.multiplier * totalMin) - totalMin;
      const rushMax = (costs.rushSurcharge.multiplier * totalMax) - totalMax;
      totalMin += rushMin;
      totalMax += rushMax;
      siteHTML += `
            <p>Rush Surcharge (+20%) Cost: €${rushMin.toFixed(2)} - €${rushMax.toFixed(2)}</p>
          `;
    }

    // Add the site's total to the overall grand total
    totalAllMin += totalMin;
    totalAllMax += totalMax;

    // Final output for the current site
    siteHTML += `
          <hr>
          <p class="total-price">Total for ${site.name}:</p>
          <p class="total-price-range">€${totalMin.toFixed(2)} - €${totalMax.toFixed(2)}</p>
          </div>
        `;

    summaryHTML += siteHTML;
  }
  // Add site setup and management costs
  const siteSetupMin = totalAllMin * 0.1;
  const siteSetupMax = totalAllMax * 0.2;

  // Add to grand totals
  grandMin = totalAllMin + siteSetupMin;
  grandMax = totalAllMax + siteSetupMax;

  // Add grand total after the loop
  summaryHTML += `
        <hr>
        <br>
        <h3>Total for All Worksites:</h3>
        <p class="total-price-range">€${totalAllMin.toFixed(2)} - €${totalAllMax.toFixed(2)}</p>
        <p><strong>Grand Total:</strong></p>
        <p class="total-price-range">€${(grandMin).toFixed(2)} - €${(grandMax).toFixed(2)}</p>
      `;

  // Update the summary section with the final HTML
  summarySites.innerHTML = summaryHTML;
  wrapAccordions();
}

// Form submission
const form = document.querySelector("form"); // or use #myForm
const summaryForm = document.querySelector(".summaryForm");

form.addEventListener("submit", function (event) {
  event.preventDefault(); // stop the form from submitting

  summaryForm.innerHTML = `
    <h2><i class="fas fa-check-circle"></i> Thank you for your submission!</h2>
    <p>Your data has been received successfully.</p>
    <button id="goHome">Go back to home page</button>
  `;
  document.querySelector("#goHome").addEventListener("click", () => {
    window.location.href = "index.html";
  });
  prevButton.disabled = true;
  nextButton.disabled = true;
  submitButton.disabled = true;
});

// =========================================================
//  Initialisation
// =========================================================

// Initialize the form state when the page loads
updatedProgressBar();
addWorksite();
updateContactDetails();
updateProjectDetails();