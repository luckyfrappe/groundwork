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
  function updatedProgressBar() {
    // Update the progress bar width, suggested by Copilot
    const progressBarFill = document.querySelector('.progress-bar-fill');
    progressBarFill.style.width = `${(active / steps.length) * 100}%`;
  }

  updatedProgressBar();

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
      updatedProgressBar()
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
      updatedProgressBar()
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
  addWorksite(); // Add the first worksite field automatically
  /**
   * Allows to add more worksite fields
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

  // Add site button functionality
  // This button allows users to add more worksite fields dynamically, added delete button with help from ChatGPT
  addSiteBtn.addEventListener('click', addWorksite);
  function addWorksite() {
    const worksiteFields = document.querySelector('.worksite-fields');

    // Create a new worksite container
    const newWorksite = document.createElement('div');
    newWorksite.classList.add('worksite-field');

    // Add inner HTML + delete button in the same div
    newWorksite.innerHTML = `
    <label for="worksiteName">Worksite Name / Identifier</label>
    <input type="text" name="worksiteName" placeholder="Site A, North Wing, etc." required/>
    <button type="button" class="delete-worksite-btn">Delete</button>`;

    // Append to container
    worksiteFields.appendChild(newWorksite);

    const worksite = {
      name: "",
      siteArea_m2: 0,
      terrain: "",
      soilType: "",
      groundwater: "",
      access: "",
      obstacles: "",
      services: {
        excavation: false,
        pilingPerPile: false,
        pilingPerMeter: false,
        concreteSlabs: false,
        drainage: false,
        frostInsulation: false,
        shoring: false,
        rockBlasting: false,
        siteSetup: true,
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
        soilRemovalPct: 0,
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
    });
    checkTheFirstDeleteButton();
  };

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

  function updateWorksiteServices() {
    console.log("updateWorksiteServices is running. Current project:", project);
    const servicesForm = document.querySelector(".form-three");
    // Clear the existing services
    servicesForm.innerHTML = `<h2>Required Services</h2>
                            <p>Site Setup & Management is always included.</p>`;
    console.log(project.worksites);
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
            <input type="checkbox" name="services" value="piling" />
            <i class="fas fa-hammer"></i>
            Piling / Foundation
        </label>
        <label>
            <input type="checkbox" name="services" value="slab" />
            <i class="fas fa-cube"></i>
            Concrete Slab / Foundation
        </label>
        <label>
            <input type="checkbox" name="services" value="shoring" />
            <i class="fas fa-building"></i>
            Shoring / Retaining Walls
        </label>
        <label>
            <input type="checkbox" name="services" value="rock" />
            <i class="fas fa-mountain"></i>
            Rock Breaking / Blasting
        </label>
        <label>
            <input type="checkbox" name="services" value="drainage" />
            <i class="fas fa-water"></i>
            Drainage System
        </label>
        <label>
            <input type="checkbox" name="services" value="frost" />
            <i class="fas fa-snowflake"></i>
            Frost Insulation
        </label>
        <label>
            <input type="checkbox" name="services" value="rush" />
            <i class="fas fa-bolt"></i>
            Rush Delivery
        </label>
        <label>
            <input type="checkbox" name="services" value="siteSetup" checked disabled />
            <i class="fas fa-tools"></i>
            Site Setup & Management
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

  //Function is remade by ChatGPT in order to show only selected services
  function updateWorksiteSpecifications() {
  console.log("updateWorksiteSpecifications is running. Current project:", project);
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
        <!-- Always show site area -->
        <label for="siteArea_${site.name}">Total Site Area (m²) <sup>*</sup></label>
        <input type="number" id="siteArea_${site.name}" name="siteArea" min="1" required placeholder="e.g. 500"/>
    `;

    // Show Excavation fields if excavation is selected
    if (site.services.excavation) {
      specsHTML += `
        <label for="excavationDepth_${site.name}">Excavation Depth (m) <sup>*</sup></label>
        <input type="number" step="0.1" id="excavationDepth_${site.name}" name="excavationDepth" min="0" placeholder="e.g. 1.5"/>
      `;
    }

    // Show Piling fields if piling is selected
    if (site.services.piling) {
      specsHTML += `
        <label for="numPiles_${site.name}">Number of Piles</label>
        <input type="number" id="numPiles_${site.name}" name="numPiles" min="1" placeholder="e.g. 100"/>

        <label>
            <input type="checkbox" id="unsurePiles_${site.name}"/> Estimate piles based on site area
        </label>

        <label for="pilesLength_${site.name}">Total Pile Length (m)</label>
        <input type="number" id="pilesLength_${site.name}" name="pilesLength" min="0" placeholder="e.g. 200"/>
      `;
    }

    // Show Slab fields if slab is selected
    if (site.services.slab) {
      specsHTML += `
        <label for="slabArea_${site.name}">Slab Area (m²)</label>
        <input type="number" id="slabArea_${site.name}" name="slabArea" min="0" placeholder="e.g. 250"/>

        <label for="slabThickness_${site.name}">Slab Thickness (cm)</label>
        <input type="number" id="slabThickness_${site.name}" name="slabThickness" step="0.1" min="0" placeholder="e.g. 15"/>
      `;
    }

    // Show Drainage fields if drainage is selected
    if (site.services.drainage) {
      specsHTML += `
        <label for="drainageLength_${site.name}">Drainage Length (m)</label>
        <input type="number" id="drainageLength_${site.name}" name="drainageLength" min="0" placeholder="e.g. 150"/>
      `;
    }

    // Show Frost Insulation fields if frost is selected
    if (site.services.frost) {
      specsHTML += `
        <label for="frostArea_${site.name}">Frost Insulation Area (m²) <sup>*</sup></label>
        <input type="number" id="frostArea_${site.name}" name="frostArea" min="1" placeholder="e.g. 500"/>
      `;
    }

    // Always show these general fields
    specsHTML += `
      <label for="soilRemovalPct_${site.name}">Soil Removal (% of total excavated volume)</label>
      <input type="number" id="soilRemovalPct_${site.name}" name="soilRemovalPct" min="0" max="100" placeholder="e.g. 25"/>

      <label for="materialVolumes_${site.name}">Material Volumes (list materials and quantities)</label>
      <textarea id="materialVolumes_${site.name}" name="materialVolumes" placeholder="Example: Gravel - 20m³, Concrete - 15m³"></textarea>

      <label for="notes_${site.name}">Additional Notes / Special Requirements</label>
      <textarea id="notes_${site.name}" name="notes" placeholder="Any details that could affect pricing"></textarea>
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


  // Accordion code from https://www.w3schools.com/howto/howto_js_accordion.asp made as function, called when worksites are created
  function wrapAccordions() {
    var acc = document.getElementsByClassName("accordion");
    var index;

    for (index = 0; index < acc.length; index++) {
      acc[index].addEventListener("click", function() {
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

});