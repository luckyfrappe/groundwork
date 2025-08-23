// =========================================================
//  Global Variables & DOM Element Selection
// =========================================================

// Navigation buttons and progress indicators
const nextButton = document.querySelector(".btn-next");
const prevButton = document.querySelector(".btn-prev");
const submitButton = document.querySelector(".btn-submit");
const steps = document.querySelectorAll(".step");
const form_steps = document.querySelectorAll(".form-step");
const howManyWorksites = document.querySelector(".card-radio-group");
const addSiteBtn = document.getElementById("addSiteBtn");

// Active step counter for progress bar and navigation
let active = 1;

// =========================================================
//  Utility Functions
// =========================================================

/**
 * Updates the width of the progress bar based on the
 * current active step.
 */
function updatedProgressBar() {
  // Update the progress bar width, suggested by Copilot
  const progressBarFill = document.querySelector(".progress-bar-fill");
  progressBarFill.style.width = `${(active / steps.length) * 100}%`;
}

/**
 * Controls the disabled state of the "Next" and "Previous" buttons
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
  let acc = document.getElementsByClassName("accordion");
  let index;

  for (index = 0; index < acc.length; index += 1) {
    acc[index].addEventListener("click", function (event) {
      // Prevent the button click from submitting the form
      // or triggering validation
      event.preventDefault();

      /* Toggle between adding and removing the "active" class,
      to highlight the button that controls the panel */
      event.currentTarget.classList.toggle("active-accordion");

      /* Toggle between hiding and showing the active panel */
      var panel = event.currentTarget.nextElementSibling;
      if (panel.style.display === "block") {
        panel.style.display = "none";
      } else {
        panel.style.display = "block";
      }
    });
  }
}

/**
 * Ensures the "Delete" button on the first worksite field is
 * hidden if it's the only one.
 */
function checkTheFirstDeleteButton() {
  const worksiteFields = document.querySelector(".worksite-fields");
  const deleteBtn = worksiteFields.querySelector(".delete-worksite-btn");
  if (worksiteFields.children.length === 1) {
    deleteBtn.classList.add("hide");
  } else {
    deleteBtn.classList.remove("hide");
  }
  return project.worksites;
}

// =========================================================
//  Buttons form control
// =========================================================

// Event listener for the "Next" button click
nextButton.addEventListener("click", (event) => {
  event.preventDefault(); // Prevent default form submission
  let currentForm = document.querySelector(".form-step.active");
  let currentStep = document.querySelector(".step.active");
  let nextSiblingForm = currentForm.nextElementSibling;
  let nextStep = currentStep.nextElementSibling;

  // Validate the current form before proceeding
  // Initial brainstorming idea with ChatGPT, fully rewritten and implemented by the author
  try {
    validation(currentForm, nextSiblingForm, nextStep, currentStep);
  } catch (error) {
    alert(error.message);
    return; // stop further execution if validation fails
  }

  buttonControls();
});

function validation(currentForm, nextSiblingForm, nextStep, currentStep) {
  const requiredFields = currentForm.querySelectorAll(
    "input[required], select[required], textarea[required]"
  );

  handleNextStep(currentForm, requiredFields);

  if (nextSiblingForm && nextSiblingForm.classList.contains("form-step")) {
    currentForm.classList.remove("active");
    currentStep.classList.remove("active");
    nextSiblingForm.classList.add("active");
    nextStep.classList.add("active");
    active += 1;
    // Reference: https://developer.mozilla.org/en-US/docs/Web/API/Window/scrollTo#Example
    window.scrollTo({ top: 0, behavior: "smooth" });
    updatedProgressBar();
  }
}

// Event listener for the "Previous" button click
prevButton.addEventListener("click", () => {
  let currentForm = document.querySelector(".form-step.active");
  let currentStep = document.querySelector(".step.active");
  let prevSiblingForm = currentForm.previousElementSibling;
  let prevStep = currentStep.previousElementSibling;

  if (prevSiblingForm && prevSiblingForm.classList.contains("form-step")) {
    currentForm.classList.remove("active");
    currentStep.classList.remove("active");
    prevSiblingForm.classList.add("active");
    prevStep.classList.add("active");
    active -= 1;
    updatedProgressBar();
  }
  buttonControls();
});

// Event listener for the "Add Site" button
addSiteBtn.addEventListener("click", addWorksite);

// Event listener for the "siteCount" radio buttons
howManyWorksites.addEventListener("change", howManyWorksitesChange);

// Event listener for the "consent" checkbox
document.querySelector("#consent").addEventListener("change", (e) => {
  e.preventDefault();
  project.contact[e.target.value] = e.target.checked;
});

function handleNextStep(currentForm, requiredFields, allFilled) {
  switch (true) {
    case currentForm.classList.contains("form-zero"):
      allRequiredFilled(requiredFields);
      updateContactDetails();
      break;

    case currentForm.classList.contains("form-one"):
      allRequiredFilled(requiredFields);
      validateContactForm(currentForm);
      updateProjectDetails();
      break;

    case currentForm.classList.contains("form-two"):
      allRequiredFilled(requiredFields);
      updateWorksiteServices();
      break;

    case currentForm.classList.contains("form-three"):
      validateServicesForm();
      break;

    case currentForm.classList.contains("form-four"):
      handleSpecificationsForm(requiredFields);
      break;

    default:
      break;
  }
}

function allRequiredFilled(requiredFields) {
  let validationErrors = [];
  for (const input of requiredFields) {
    if (input.value.trim() === "") {
      input.style.border = "2px solid red";
      restoreOption(input);
      validationErrors.push(`Field "${getLabelText(input)}" is required.`);
    }
  }
  if (validationErrors.length > 0) {
    throw new Error(validationErrors.join("\n"));
  }
}

// Initial brainstorming idea with ChatGPT, fully rewritten and implemented by the author
function getLabelText(input) {
  const label = document.querySelector(`label[for="${input.id}"]`);
  return label ? label.innerText.replace("*", "").trim() : input.id;
}

// Restores grey border once user starts typing.
function restoreOption(input) {
  input.addEventListener("input", () => {
    input.style.border = "2px solid grey";
  });
}

function validateContactForm(currentForm) {
  const emailInput = currentForm.querySelector("#email");
  const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailPattern.test(emailInput.value)) {
    emailInput.style.border = "2px solid red";
    throw new Error(`Field "${emailInput.name || emailInput.id}" is invalid.`);
  }
}

function validateServicesForm() {
  let errorMessages = [];
  for (const site of project.worksites) {
    const siteCard = document.querySelector(
      `.services-form-cards[data-site-name="${site.name}"]`
    );
    let atLeastOneChecked = false;

    for (const service in site.services) {
      if (service !== "rush" && site.services[service]) {
        atLeastOneChecked = true;
        updateWorksiteSpecifications();
        break;
      }
    }

    if (!atLeastOneChecked) {
      errorMessages.push(
        `Please select at least one service for worksite "${site.name}". Rush is not a service on its own.`
      );
    }
  }

  if (errorMessages.length > 0) {
    throw new Error(errorMessages.join("\n"));
  }
}

function handleSpecificationsForm(requiredFields) {
  const accordionsToOpen = new Set();

  registerEmptyAccordions(requiredFields, accordionsToOpen);

  // Check if there are any validation errors.

  // Open all the accordions for the empty fields.

  openAccordions(accordionsToOpen);
  allRequiredFilled(requiredFields);

  // If validation passes, proceed with other updates.
  updateContactSection();
  updateDetailsSection();
  calculateTotal();

  return true; // All fields are filled.
}

function registerEmptyAccordions(
  requiredFields,
  accordionsToOpen,
  validationErrors
) {
  for (const input of requiredFields) {
    if (input.value.trim() === "") {
      input.style.border = "2px solid red";
      let parentAccordion = input.closest(".specifications-accordions");
      if (parentAccordion) {
        let accordionButton = parentAccordion.querySelector(".accordion");
        if (accordionButton) {
          accordionsToOpen.add(accordionButton);
        }
      }
    } else {
      input.style.border = "";
    }
  }
}

function openAccordions(accordionsToOpen) {
  accordionsToOpen.forEach((accordion) => {
    accordion.classList.add("active-accordion");
    const panel = accordion.nextElementSibling;
    panel.style.display = "block";
  });
}

// =========================================================
//  Project Data & Price Constants
// =========================================================

/**
 * Stores all project data, including contact info, project details,
 * and dynamic worksite information.
 */
const project = {
  contact: {
    fullName: "",
    companyName: "",
    email: "",
    phone: "",
    consent: false,
  },
  details: {
    projectType: "",
    projectLocation: "",
    projectReference: "",
    siteUpload: "",
  },
  worksites: [],
};

/**
 * Groundwork Price Constants (EUR)
 * All prices are indicative values for MVP based on EU civil works
 * Data gathered from ChatGPT prompt.
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
    max: 40,
  },
  pilingPerPile: {
    unit: "pile",
    min: 1500,
    max: 2000,
  },
  concreteSlabs: {
    unit: "m2",
    min: 120,
    max: 150,
  },
  drainage: {
    unit: "lm",
    min: 80,
    max: 150,
  },
  frostInsulation: {
    unit: "m2",
    min: 35,
    max: 50,
  },
  shoring: {
    unit: "m2",
    min: 250,
    max: 350,
  },
  rockBlasting: {
    unit: "m3",
    min: 60,
    max: 100,
  },
  rushSurcharge: {
    multiplier: 1.2,
  },
  soilRemoval: {
    unit: "m3",
    min: 30,
    max: 50,
  },
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
  const selected = howManyWorksites.querySelector(
    'input[name="siteCount"]:checked'
  );
  // If multiple selected - add more worksite fields
  if (selected.value === "multiple") {
    addSiteBtn.classList.remove("hide");
    addWorksite(); // Add the first worksite field automatically
  } else if (selected.value === "single") {
    addSiteBtn.classList.add("hide");
    // If single selected - remove all but the first worksite field
    const worksiteFields = document.querySelector(".worksite-fields");
    const worksiteFieldsArray = Array.from(worksiteFields.children);
    worksiteFieldsArray.slice(1).forEach((field) => field.remove());
    checkTheFirstDeleteButton();
  }
}

function addWorksite() {
  const worksiteFields = document.querySelector(".worksite-fields");

  // Create element for worksite
  const newWorksite = createWorksiteElement();
  worksiteFields.appendChild(newWorksite);

  // Create worksite data object
  const worksite = createWorksiteData();
  project.worksites.push(worksite);

  // Setup listeners for input and delete button
  setupWorksiteListeners(newWorksite, worksite);

  checkTheFirstDeleteButton();
}

// Creates the DOM element for a new worksite
// Initial brainstorming idea for the delete button with ChatGPT
// Fully rewritten and implemented by the author
function createWorksiteElement() {
  const newWorksite = document.createElement("div");
  newWorksite.classList.add("worksite-field");

  newWorksite.innerHTML = `
    <label for="worksiteName">Worksite Name / Identifier <sup>*</sup></label>
    <input
      type="text"
      name="worksiteName"
      placeholder="Site A, North Wing, etc."
      id="worksiteName"
      required
    />
    <button
      type="button"
      class="delete-worksite-btn"
      aria-label="Clear Worksite Name input"
      aria-controls="worksiteName"
    >Delete
    </button>`;

  return newWorksite;
}

// Creates the initial worksite object
// Inspired by project structure and fully customized by the author
function createWorksiteData() {
  return {
    name: "",
    services: {
      excavation: false,
      pilingPerPile: false,
      concreteSlabs: false,
      drainage: false,
      frostInsulation: false,
      shoring: false,
      rockBlasting: false,
      rush: false,
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
      notes: "",
    },
  };
}

// Sets up event listeners for the new worksite
// Input change and delete button logic
function setupWorksiteListeners(newWorksite, worksite) {
  // Input listener: updates worksite.name dynamically
  const input = newWorksite.querySelector('input[name="worksiteName"]');
  input.addEventListener("input", (e) => {
    worksite.name = e.target.value;
  });

  // Delete button logic
  const deleteBtn = newWorksite.querySelector(".delete-worksite-btn");
  deleteBtn.addEventListener("click", () => {
    // Remove from project array
    const index = project.worksites.indexOf(worksite);
    project.worksites.splice(index, 1);

    // Remove from UI
    newWorksite.remove();
    checkTheFirstDeleteButton();
  });
}

/**
 * Populates the contact information form fields and
 * binds them to the project data object.
 */
function updateContactDetails() {
  //Add contact info and project details:
  const contactForm = document.querySelector(".form-one");
  // Clear the existing contact form
  contactForm.innerHTML = createContactFormHTML();

  // Bind input fields to project object
  contactForm.querySelectorAll("input").forEach((input) => {
    input.addEventListener("input", (e) => {
      const key = e.target.name;
      project.contact[key] = e.target.value;
    });
  });
}

function createContactFormHTML() {
  return `
    <h2>Contact Information</h2>
    <p>Please provide your details so we can send your estimate.</p>
    <div>
      <label for="fullName">Full Name <sup>*</sup></label>
      <input
        type="text"
        id="fullName"
        name="fullName"
        required
        placeholder="Alex Johnson"
      />
    </div>
    <div>
      <label for="companyName">Company / Organisation</label>
      <input
        type="text"
        id="companyName"
        name="companyName"
        placeholder="Your company (optional)"
      />
    </div>
    <div>
      <label for="email">Email Address <sup>*</sup></label>
      <input
        type="email"
        id="email"
        name="email"
        required
        placeholder="example@mail.com"
      />
    </div>
    <div>
      <label for="phone">Phone Number</label>
      <input
        type="number"
        id="phone"
        name="phone"
        placeholder="+46 70 123 4567"
      />
    </div>
  `;
}

/**
 * Populates the project details form fields and
 * binds them to the project data object.
 */
function updateProjectDetails() {
  const projectDetailsForm = document.querySelector(".form-two");
  // Clear the existing contact form
  projectDetailsForm.innerHTML = createDetailsFormHTML();

  // Bind number inputs to project object
  projectDetailsForm
    .querySelectorAll('select, input[type="text"], input[type="file"]')
    .forEach((input) => {
      input.addEventListener("input", (e) => {
        const key = e.target.name;
        project.details[key] = e.target.value;
      });
    });
}

function createDetailsFormHTML() {
  return `
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
        <option value="Other">Other</option></select
      ><br />
    </div>
    <div>
      <label for="projectLocation">Project City / Country <sup>*</sup></label>
      <input
        type="text"
        id="projectLocation"
        name="projectLocation"
        required
        placeholder="Stockholm"
      />
    </div>
    <div>
      <label for="projectReference">Reference / Internal Code</label>
      <input
        type="text"
        id="projectReference"
        name="projectReference"
        placeholder="Optional reference"
      />
    </div>
    <div>
      <label for="siteUpload">Upload Site Plan / Photo (optional)</label>
      <input
        type="file"
        id="siteUpload"
        name="siteUpload"
        accept=".jpg,.jpeg,.png,.pdf"
      />
    </div>
  `;
}

/**
 * Populates the services form dynamically based on the number
 * of worksites in the project data.
 */
function updateWorksiteServices() {
  const servicesForm = document.querySelector(".form-three");
  // Clear the existing services
  servicesForm.innerHTML = `
    <h2>Required Services</h2>
    <p>Please select the services you require for each worksite.</p>
  `;

  createServicesPerWorksite(servicesForm);
}

function createServicesPerWorksite(servicesForm) {
  for (const site of project.worksites) {
    // Create a new worksite container
    const worksiteServices = document.createElement("div");
    worksiteServices.classList.add("services-form-cards");

    // Add inner HTML + delete button in the same div
    worksiteServices.innerHTML = getServicesHTML(site);

    //Add eventlisteners to checkboxes
    checkboxEventListeners(worksiteServices, site);

    // Append the whole services section to the form
    servicesForm.appendChild(worksiteServices);
  }
}

function getServicesHTML(site) {
  return `
      <p>Services for Worksite: ${site.name}</p>
      <label>
        <input type="checkbox" name="services" value="excavation" />
        <i class="fas fa-digging" aria-hidden="true"></i>
        Excavation & Site Prep
      </label>
      <label>
        <input type="checkbox" name="services" value="pilingPerPile" />
        <i class="fas fa-hammer" aria-hidden="true"></i>
        Piling / Foundation
      </label>
      <label>
        <input type="checkbox" name="services" value="concreteSlabs" />
        <i class="fas fa-cube" aria-hidden="true"></i>
        Concrete Slabs / Foundation
      </label>
      <label>
        <input type="checkbox" name="services" value="shoring" />
        <i class="fas fa-building" aria-hidden="true"></i>
        Shoring / Retaining Walls
      </label>
      <label>
        <input type="checkbox" name="services" value="rockBlasting" />
        <i class="fas fa-mountain" aria-hidden="true"></i>
        Rock Breaking / Blasting
      </label>
      <label>
        <input type="checkbox" name="services" value="drainage" />
        <i class="fas fa-water" aria-hidden="true"></i>
        Drainage System
      </label>
      <label>
        <input type="checkbox" name="services" value="frostInsulation" />
        <i class="fas fa-snowflake" aria-hidden="true"></i>
        Frost Insulation
      </label>
      <label>
        <input type="checkbox" name="services" value="rush" />
        <i class="fas fa-bolt" aria-hidden="true"></i>
        Rush Delivery
      </label>
    `;
}

function checkboxEventListeners(worksiteServices, site) {
  // Add event listeners to link checkboxes with the current site's services
  // Initial version generated with ChatGPT (OpenAI).
  // Implemented by me
  worksiteServices
    .querySelectorAll('input[type="checkbox"]')
    .forEach((checkbox) => {
      checkbox.addEventListener("change", (e) => {
        site.services[e.target.value] = e.target.checked;
      });
    });
}

/**
 * Populates the specifications form dynamically, showing only
 * fields for selected services.
 */
function updateWorksiteSpecifications() {
  //Function is remade by ChatGPT in order to show only selected services
  const specificationsForm = document.querySelector(".form-four");

  // Clear the existing specs
  clearSpecificationsForm(specificationsForm);

  createSpecsificationsPerWorksite(specificationsForm);

  wrapAccordions();
}

function clearSpecificationsForm(specificationsForm) {
  specificationsForm.innerHTML = `
    <h2>Specifications</h2>
    <p>Enter details for the services you selected.</p>
  `;
}

function createSpecsificationsPerWorksite(specificationsForm) {
  for (const site of project.worksites) {
    const worksiteSpecs = document.createElement("div");
    worksiteSpecs.classList.add("specifications-accordions");

    // Start building the HTML and open the accordion
    let specsHTML = startAccordionHTML(site);

    // Validate and append specific fields
    specsHTML = validateSpecificationsPerSite(site, specsHTML);

    // Always show these general fields and accordion closing tag
    specsHTML += generalFields(site);

    // Fill worksite specifications HTML
    worksiteSpecs.innerHTML = specsHTML;

    // Bind number inputs to project object
    bindListenersToInputs(worksiteSpecs, site);

    // add the worksite specifications to the form
    specificationsForm.appendChild(worksiteSpecs);
  }
}

function startAccordionHTML(site) {
  return `
      <button class="accordion">Specs for Worksite: ${site.name}</button>
      <div class="panel">
        <label for="siteArea_${site.name}"
          >Total Site Area (m²) <sup>*</sup></label
        >
        <input
          type="number"
          id="siteArea_${site.name}"
          name="siteArea"
          min="1"
          required
          placeholder="e.g. 500"
        />
    `;
}

function validateSpecificationsPerSite(site, specsHTML) {
  // Show Excavation fields if excavation is selected
  if (site.services.excavation) {
    specsHTML += excavationFields(site);
  }

  // Show Piling fields if piling is selected
  if (site.services.pilingPerPile) {
    specsHTML += pilingFields(site);
  }

  // Show Slab fields if concreteSlabs are selected
  if (site.services.concreteSlabs) {
    specsHTML += concreteSlabsFields(site);
  }
  // Show Rock Blasting fields if rockBlasting is selected
  if (site.services.rockBlasting) {
    specsHTML += rockBlastingFields(site);
  }
  // Show Drainage fields if drainage is selected
  if (site.services.drainage) {
    specsHTML += drainageFields(site);
  }

  // Show frostInsulation Insulation fields if frostInsulation is selected
  if (site.services.frostInsulation) {
    specsHTML += frostInsulationFields(site);
  }

  // Show shoring fields if shoring is selected
  if (site.services.shoring) {
    specsHTML += shoringFields(site);
  }
  return specsHTML;
}

function excavationFields(site) {
  return `
      <label for="excavationDepth_${site.name}"
        >Excavation Depth (m) <sup>*</sup></label
      >
      <input
        type="number"
        step="0.1"
        id="excavationDepth_${site.name}"
        name="excavationDepth"
        min="0"
        placeholder="e.g. 1.5"
        required
      />
      `;
}

function pilingFields(site) {
  return `
        <label for="numPiles_${site.name}"
          >Number of Piles <sup>*</sup></label
        >
        <input
          type="number"
          id="numPiles_${site.name}"
          name="numPiles"
          min="1"
          required
          placeholder="e.g. 100"
        />

        <label for="pilesLength_${site.name}"
          >Total Pile Length (m) <sup>*</sup></label
        >
        <input
          type="number"
          id="pilesLength_${site.name}"
          name="pilesLength"
          min="0"
          required
          placeholder="e.g. 200"
        />
      `;
}

function concreteSlabsFields(site) {
  return `
        <label for="slabArea_${site.name}"
          >Slab Area (m²) <sup>*</sup></label
        >
        <input
          type="number"
          id="slabArea_${site.name}"
          name="slabArea"
          min="0"
          required
          placeholder="e.g. 250"
        />

        <label for="slabThickness_${site.name}"
          >Slab Thickness (cm) <sup>*</sup></label
        >
        <input
          type="number"
          id="slabThickness_${site.name}"
          name="slabThickness"
          step="0.1"
          min="0"
          required
          placeholder="e.g. 15"
        />
      `;
}

function rockBlastingFields(site) {
  return `
        <label for="rockVolume_${site.name}"
          >Rock Volume (m³) <sup>*</sup></label
        >
        <input
          type="number"
          id="rockVolume_${site.name}"
          name="rockVolume"
          min="0"
          required
          placeholder="e.g. 100"
        />
      `;
}

function drainageFields(site) {
  return `
        <label for="drainageLength_${site.name}"
          >Drainage Length (m) <sup>*</sup></label
        >
        <input
          type="number"
          id="drainageLength_${site.name}"
          name="drainageLength"
          min="0"
          required
          placeholder="e.g. 150"
        />
      `;
}

function frostInsulationFields(site) {
  return `
        <label for="frostArea_${site.name}"
          >Frost Insulation Area (m²) <sup>*</sup></label
        >
        <input
          type="number"
          id="frostArea_${site.name}"
          name="frostArea"
          min="1"
          required
          placeholder="e.g. 500"
        />
      `;
}

function shoringFields(site) {
  return `
        <label for="shoringLength_${site.name}"
          >Shoring Length (m) <sup>*</sup></label
        >
        <input
          type="number"
          id="shoringLength_${site.name}"
          name="shoringLength"
          min="0"
          required
          placeholder="e.g. 100"
        />
      `;
}

function generalFields(site) {
  return `
        <label for="soilVolume_${site.name}">Soil Volume (m³)</label>
        <input
          type="number"
          id="soilVolume_${site.name}"
          name="soilVolume"
          placeholder="e.g. 25"
        />

        <label for="materialVolumes_${site.name}"
          >Material Volumes (list materials and quantities)</label
        >
        <textarea
          id="materialVolumes_${site.name}"
          name="materialVolumes"
          placeholder="Example: Gravel - 20m³, Concrete - 15m³"
          style="height: 40px"
        ></textarea>

        <label for="notes_${site.name}"
          >Additional Notes / Special Requirements</label
        >
        <textarea
          id="notes_${site.name}"
          name="notes"
          placeholder="Any details that could affect pricing"
          style="height: 100px"
        ></textarea>
      </div>
    `;
}

function bindListenersToInputs(worksiteSpecs, site) {
  worksiteSpecs
    .querySelectorAll('input[type="number"], textarea')
    .forEach((input) => {
      input.addEventListener("input", (e) => {
        const key = e.target.name;
        site.specs[key] = e.target.value;
      });
    });
}

/**
 * Updates the contact details section on the summary page.
 * Populates the summary form with user-provided contact info.
 */
function updateContactSection() {
  const contactSection = document.querySelector("#summaryContact");

  // Update contact information
  contactSection.innerHTML = `
    <h3>Contact Information</h3>
    <p>Name: ${project.contact.fullName}</p>
    <p>Company: ${project.contact.companyName || "N/A"}</p>
    <p>Email: ${project.contact.email}</p>
    <p>Phone: ${project.contact.phone || "N/A"}</p>
  `;
}

/**
 * Updates the project details section on the summary page.
 * Populates the summary form with user-provided project details.
 */
function updateDetailsSection() {
  const detailsSection = document.querySelector("#summaryDetails");

  // Update project details
  detailsSection.innerHTML = `
    <h3>Project Details</h3>
    <p>Project Type: ${project.details.projectType}</p>
    <p>Location: ${project.details.projectLocation}</p>
    <p>Project Reference: ${project.details.projectReference || "N/A"}</p>
    <p>Files: ${project.details.siteUpload || "None"}</p>
  `;
}

/**
 * Calculates the total estimated cost for all worksites
 * and updates the summary section.
 */
function calculateTotal() {
  //Calculation functions (debugged with Gemini by Google):

  //Prepare calculation section
  let {
    summarySites,
    summaryHTML,
    totalAllMin,
    totalAllMax,
    grandMin,
    grandMax,
    id,
  } = prepareCalculationSection();

  // Calculate totals per worksite and update values
  const results = calculateOverWorksiteTotals(
    summaryHTML,
    totalAllMin,
    totalAllMax,
    id
  );
  summaryHTML = results.summaryHTML;
  totalAllMin = results.totalAllMin;
  totalAllMax = results.totalAllMax;
  id = results.id;

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
    <p class="total-price-range">
      €${totalAllMin.toFixed(2)} - €${totalAllMax.toFixed(2)}
    </p>
    <p class="summary-subtitle">
      Site Setup & Management Costs (10% - 20% of total):
    </p>
    <p class="total-price-range">
      €${siteSetupMin.toFixed(2)} - €${siteSetupMax.toFixed(2)}
    </p>
    <hr>
    <br>
    <p>
      <strong>
        Grand Total:
      </strong>
    </p>
    <p class="total-price-range">
      €${grandMin.toFixed(2)} - €${grandMax.toFixed(2)}
    </p>
  `;

  // Update the summary section with the final HTML
  summarySites.innerHTML = summaryHTML;
  wrapAccordions();
}

function prepareCalculationSection() {
  // Prepare the summary section for calculations
  let summarySites = document.querySelector("#summarySites");
  let summaryHTML = "";

  let totalAllMin = 0;
  let totalAllMax = 0;

  // Initialize grand total variables
  let grandMin = 0;
  let grandMax = 0;
  let id = 0;
  return {
    summarySites,
    summaryHTML,
    totalAllMin,
    totalAllMax,
    grandMin,
    grandMax,
    id,
  };
}

function calculateOverWorksiteTotals(
  summaryHTML,
  totalAllMin,
  totalAllMax,
  id,
  siteArea
) {
  for (const site of project.worksites) {
    let totalMin = 0;
    let totalMax = 0;
    // Rewriting to const as site name were duplicated and
    // Avoid overwriting before passing to each function
    const siteHTML = "";

    const siteAreaResult = addSiteAreaToSiteHTML(site, siteHTML, id);
    summaryHTML += siteAreaResult.siteHTML;
    siteArea = siteAreaResult.siteArea;
    id = siteAreaResult.id;

    const countResults = countWorksiteItems(
      site,
      totalMin,
      totalMax,
      siteHTML,
      siteArea
    );
    // Add the site's total to the overall grand total
    totalAllMin += countResults.totalMin;
    totalAllMax += countResults.totalMax;
    summaryHTML += countResults.summaryHTML;
  }
  return { summaryHTML, totalAllMin, totalAllMax };
}

function addSiteAreaToSiteHTML(site, siteHTML, id) {
  const siteArea = parseFloat(site.specs.siteArea);
  id += 1;
  siteHTML += `
      <h3>Worksite ${id}: ${site.name}</h3>
      <p class="summary-subtitle">Estimated cost range based on your inputs:</p>
      <button class="accordion">Summary prices</button>
      <div class="panel">
        <p>Site Area: <strong>${siteArea} m²</strong></p>
        `;
  return { siteArea, siteHTML, id };
}

function countWorksiteItems(site, totalMin, totalMax, siteHTML, siteArea) {
  let summaryHTML = "";
  if (site.services.excavation) {
    const excavationResults = calculateExcavation(siteArea, site, siteHTML);
    totalMin += excavationResults.excavationMin;
    totalMax += excavationResults.excavationMax;
    summaryHTML += excavationResults.siteHTML;
  }

  // Piling (per pile)
  if (site.services.pilingPerPile) {
    const pilingResults = calculatePiling(site, siteHTML);
    totalMin += pilingResults.pilingMin;
    totalMax += pilingResults.pilingMax;
    summaryHTML += pilingResults.siteHTML;
  }

  // Concrete slabs (per m²)
  if (site.services.concreteSlabs) {
    const concreteSlabsResults = calculateConcreteSlabs(site, siteHTML);
    totalMin += concreteSlabsResults.slabMin;
    totalMax += concreteSlabsResults.slabMax;
    summaryHTML += concreteSlabsResults.siteHTML;
  }

  // Drainage (per linear meter)
  if (site.services.drainage) {
    const drainageResults = calculateDrainage(site, siteHTML);
    totalMin += drainageResults.drainageMin;
    totalMax += drainageResults.drainageMax;
    summaryHTML += drainageResults.siteHTML;
  }

  // Frost insulation (per m²)
  if (site.services.frostInsulation) {
    const frostResults = calculateFrostInsulation(site, siteHTML);
    totalMin += frostResults.frostMin;
    totalMax += frostResults.frostMax;
    summaryHTML += frostResults.siteHTML;
  }

  // Shoring (per m²)
  if (site.services.shoring) {
    const shoringResults = calculateShoring(site, siteHTML);
    totalMin += shoringResults.shoringMin;
    totalMax += shoringResults.shoringMax;
    summaryHTML += shoringResults.siteHTML;
  }

  // Soil removal
  if (site.specs.soilVolume > 0) {
    const soilResults = calculateSoilRemoval(site, siteHTML);
    totalMin += soilResults.soilMin;
    totalMax += soilResults.soilMax;
    summaryHTML += soilResults.siteHTML;
  }

  // Rock blasting (per m³)
  if (site.services.rockBlasting) {
    const rockBlastingResults = calculateRockBlasting(site, siteHTML);
    totalMin += rockBlastingResults.rockMin;
    totalMax += rockBlastingResults.rockMax;
    summaryHTML += rockBlastingResults.siteHTML;
  }

  // Rush surcharge
  if (site.services.rush) {
    const rushResults = calculateRushSurcharge(totalMin, totalMax, siteHTML);
    totalMin += rushResults.rushMin;
    totalMax += rushResults.rushMax;
    summaryHTML += rushResults.siteHTML;
  }

  summaryHTML += siteTotal(totalMin, totalMax, site);

  // Final output for the current site
  return { totalMin, totalMax, summaryHTML };
}

// Excavation (per m³)
function calculateExcavation(siteArea, site, siteHTML) {
  const depth = parseFloat(site.specs.excavationDepth);
  const volume = siteArea * depth;
  const excavationMin = volume * costs.excavation.min;
  const excavationMax = volume * costs.excavation.max;
  siteHTML += `
        <p>Excavation Depth: <strong>${depth} m</strong></p>
        <p>Excavation Volume: <strong>${volume.toFixed(2)} m³</strong></p>
        <p>
          Excavation Cost:
        </p>
        <p>
          €${excavationMin.toFixed(2)} - €${excavationMax.toFixed(2)}
        </p>
      `;
  return { excavationMin, excavationMax, siteHTML };
}

function calculatePiling(site, siteHTML) {
  const numPiles = parseFloat(site.specs.numPiles);
  const pilingMin = numPiles * costs.pilingPerPile.min;
  const pilingMax = numPiles * costs.pilingPerPile.max;
  siteHTML += `
        <p>
          Number of Piles: <strong>${numPiles}</strong>
        </p>
        <p>
          Piling Cost:
        </p>
        <p>
          €${pilingMin.toFixed(2)} - €${pilingMax.toFixed(2)}
        </p>
      `;
  return { pilingMin, pilingMax, siteHTML };
}

function calculateConcreteSlabs(site, siteHTML) {
  const slabArea = parseFloat(site.specs.slabArea);
  const slabMin = slabArea * costs.concreteSlabs.min;
  const slabMax = slabArea * costs.concreteSlabs.max;
  siteHTML += `
        <p>
          Concrete Slab Area: <strong>${slabArea} m²</strong>
        </p>
        <p>
          Concrete Slab Cost:
        </p>
        <p>
          €${slabMin.toFixed(2)} - €${slabMax.toFixed(2)}
        </p>
            `;
  return { slabMin, slabMax, siteHTML };
}

function calculateDrainage(site, siteHTML) {
  const length = parseFloat(site.specs.drainageLength);
  const drainageMin = length * costs.drainage.min;
  const drainageMax = length * costs.drainage.max;
  siteHTML += `
        <p>
          Drainage Length: <strong>${length} m</strong>
        </p>
        <p>
          Drainage Cost:
        </p>
        <p>
          €${drainageMin.toFixed(2)} - €${drainageMax.toFixed(2)}
        </p>
      `;
  return { drainageMin, drainageMax, siteHTML };
}

function calculateFrostInsulation(site, siteHTML) {
  const frostArea = parseFloat(site.specs.frostArea);
  const frostMin = frostArea * costs.frostInsulation.min;
  const frostMax = frostArea * costs.frostInsulation.max;
  siteHTML += `
        <p>
          Frost Insulation Area: <strong>${frostArea} m²</strong>
        </p>
        <p>
          Frost Insulation Cost:
        </p>
        <p>
          €${frostMin.toFixed(2)} - €${frostMax.toFixed(2)}
        </p>
      `;
  return { frostMin, frostMax, siteHTML };
}

function calculateShoring(site, siteHTML) {
  const shoringLength = parseFloat(site.specs.shoringLength);
  const shoringMin = shoringLength * costs.shoring.min;
  const shoringMax = shoringLength * costs.shoring.max;
  siteHTML += `
        <p>
          Shoring Length: <strong>${shoringLength} m</strong>
        </p>
        <p>
          Shoring Cost:
        </p>
        <p>
          €${shoringMin.toFixed(2)} - €${shoringMax.toFixed(2)}
        </p>
      `;
  return { shoringMin, shoringMax, siteHTML };
}

function calculateSoilRemoval(site, siteHTML) {
  const volume = parseFloat(site.specs.soilVolume);
  const soilMin = volume * costs.soilRemoval.min;
  const soilMax = volume * costs.soilRemoval.max;
  siteHTML += `
        <p>
          Soil Removal Volume: <strong>${volume} m³</strong>
        </p>
        <p>
          Soil Removal Cost:
        </p>
        <p>
          €${soilMin.toFixed(2)} - €${soilMax.toFixed(2)}
        </p>
      `;

  return { soilMin, soilMax, siteHTML };
}

function calculateRockBlasting(site, siteHTML) {
  const volume = parseFloat(site.specs.rockVolume);
  const rockMin = volume * costs.rockBlasting.min;
  const rockMax = volume * costs.rockBlasting.max;
  siteHTML += `
        <p>
          Rock Blasting Volume: <strong>${volume} m³</strong>
        </p>
        <p>
          Rock Blasting Cost:
        </p>
        <p>
          €${rockMin.toFixed(2)} - €${rockMax.toFixed(2)}
        </p>
      `;
  return { rockMin, rockMax, siteHTML };
}

function calculateRushSurcharge(totalMin, totalMax, siteHTML) {
  const rushMin = costs.rushSurcharge.multiplier * totalMin - totalMin;
  const rushMax = costs.rushSurcharge.multiplier * totalMax - totalMax;
  siteHTML += `
        <p>
          Rush Surcharge (+20%) Cost:
        </p>
        <p>
          €${rushMin.toFixed(2)} - €${rushMax.toFixed(2)}
        </p>
      `;
  return { rushMin, rushMax, siteHTML };
}

function siteTotal(totalMin, totalMax, site) {
  return `
        <hr>
        <p class="total-price">
          Total for ${site.name}:
        </p>
        <p class="total-price-range">
          €${totalMin.toFixed(2)} - €${totalMax.toFixed(2)}
        </p>
      </div>
    `;
}

// Form submission
const form = document.querySelector("form");
const summaryForm = document.querySelector(".summaryForm");

form.addEventListener("submit", function (event) {
  event.preventDefault(); // stop the form from submitting
  const consentCheckbox = document.getElementById("consent");
  if (!consentCheckbox.checked) {
    alert("Please agree to the terms and conditions.");
    return; // Stop the form submission
  }

  summaryForm.innerHTML = `
    <h2>
      <i class="fas fa-check-circle" aria-hidden="true"></i> Thank you for your submission!
    </h2>
    <p>
      Your data has been received successfully.
    </p>
    <a href="index.html" class="btn">
      Return to Homepage <i class="fa-solid fa-home" aria-hidden="true"></i>
    </a>
  `;
  prevButton.disabled = true;
  nextButton.disabled = true;
  submitButton.disabled = true;
  // Reference: https://developer.mozilla.org/en-US/docs/Web/API/Window/scrollTo#Example
  window.scrollTo({ top: 0, behavior: "smooth" });
});

// =========================================================
//  Initialisation
// =========================================================

// Initialize the form state when the page loads
updatedProgressBar();
addWorksite();
