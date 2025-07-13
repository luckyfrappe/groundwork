# Groundwork Solutions

This website provides an instant preliminary cost estimate for construction groundwork projects, specifically for Groundwork Solutions Ltd. It aims to streamline the initial client interaction by offering a transparent and efficient way to get an early understanding of project costs.

<!-- <img src="" alt="Mockup image of Groundwork Solutions Ltd. website on different devices"> -->

<a href="https://luckyfrappe.github.io/groundwork/" target="_blank" aria-label="Groundwork Solutions Ltd. website opens in a new window on Github Pages">View Groundwork Solutions Ltd. on Github Pages</a>

## CONTENTS

<!-- Test all links -->
<!-- Check _blank does not work -->
- [User Experience (UX)](#user-experience-ux)
  - [Business Goals](#business-goals)
  - [User Stories](#user-stories)
- [Design](#design)
  - [Color Scheme](#color-scheme)
  - [Typography](#typography)
  - [Imagery](#imagery)
  - [Wireframes](#wireframes)
- [Features](#features)
  - [Common to All Pages](#common-to-all-pages)
  - [Page-Specific Features](#page-specific-features)
  - [Future Implementations](#future-implementations)
  - [Accessibility Considerations](#accessibility-considerations)
- [Technologies Used](#technologies-used)
  - [Languages Used](#languages-used)
  - [Frameworks, Libraries & Programs Used](#frameworks-libraries--programs-used)
- [Deployment & Local Development](#deployment--local-development)
  - [Deployment](#deployment)
  - [Local Development](#local-development)
    - [How to Fork the Repository](#how-to-fork-the-repository)
    - [How to Clone the Repository](#how-to-clone-the-repository)
- [Testing](#testing)
- [Credits](#credits)
  - [Code Used](#code-used)
  - [Content](#content)
  - [Media](#media)
  - [Acknowledgments](#acknowledgments)

## User Experience (UX)

### Business Goals

- The main goal of this website is to provide clients with an instant preliminary cost estimate for construction groundwork projects in Sweden.
- Build a professional web-based MVP that supports lead generation.
- Clearly communicate Groundwork Solutions Ltd.'s value and services.
- Encourage visitors to take action through clear Call to Actions (CTAs) to get a finalized quote.

### User Stories

**As a first-time visitor, I want the site to be easy to access and navigate, so I want to use it.**

- Works well on desktop, tablet, and mobile.
- Clear and simple navigation.
- Layout doesn’t break or overlap at any screen size.

**As a potential client, I want to quickly get a cost estimate for my groundwork project, so I can plan my budget.**

- An interactive front-end form to input project details.
- A live estimation engine that calculates costs based on inputs.
- A results page displaying a service-by-service cost breakdown and a total estimated price range.

**As a potential client, I want to understand what services Groundwork Solutions Ltd. offers, so I can check if it fits our needs.**

- A section that lists main services with short titles and clear descriptions.

**As a decision-maker, I want to know Groundwork Solutions Ltd. is reliable, so I can feel good about using it.**

- An "About Us" section detailing the company's approach and expertise.

**As a lead, I want to easily reach out for a finalized quote, so I can get started.**

- A clear CTA on the results page to "Send us your details for a finalized quote."
- A visible contact section with essential company info and links.

**As a general and returning visitor, I want to quickly find contact details, so I can reach out.**

- A visible contact section.
- Footer with essential company info and links.

## Design

### Color Scheme

<!-- Add adobe https://color.adobe.com/create/color-wheel -->

This project's design aims for a professional and clean aesthetic, utilizing a specific color palette that reflects the construction industry's robustness while maintaining a modern feel.

### Typography

<!-- Adjust - For typography, Merriweather Sans (sourced from Google Fonts) is employed for all headings, lending a distinct yet web-friendly appeal. Roboto Flex (also from Google Fonts) is used for paragraph text, ensuring readability and a professional, modern feel. -->

### Imagery

Visual content, including images and videos, aims to evoke a sense of professionalism and the scale of groundwork projects. Imagery includes construction sites, heavy machinery, and relevant diagrams. Additional royalty-free images were sourced from Pexels and Unsplash. Full author credits for all assets can be found in the dedicated [Credits section](#credits) of this project.

### Wireframes

<!-- Project started withour wireframes -->

## Features

This website is designed to provide a seamless and professional experience for obtaining groundwork project estimates, offering a robust set of features across its key sections:

### Common to All Pages

- **Responsive Navigation Bar:** Top navigation bar ensures intuitive site navigation. It features the Groundwork Solutions Ltd. branding and essential links (Home, Services, About, Contact). <!-- For an optimal user experience on mobile devices, the navigation condenses into a universally recognized burger menu, maintaining a clean interface. -->
- **Footer:** A functional footer houses social media icon links (e.g., YouTube, Facebook, Twitter, LinkedIn, Instagram) and privacy policy information. Icons are chosen for their universal recognition and minimalist design.

### Page-Specific Features

**Landing Page:**

- **Hero Section:** An impactful introduction setting the tone for reliable groundwork solutions.
<!-- Add hero image -->
- **Introduction Section:** Briefly highlights the company's role as a trusted foundation partner.
<!-- Add introduction image -->
- **Services Teaser:** A concise overview teasing the comprehensive offerings, with a clear link to the full Services page, inviting users to explore further.
<!-- Add services image -->

<!-- Update and reconstruct the section -->
- **Customer Journey and Contact Section:** Lays out the clear steps for clients to engage with us and bridges the gap between understanding our comprehensive services and taking the next step with a clear CTA.
  <!-- Add image -->

  <!-- Add any new sections and images -->

<!-- To be created -->

**Estimate Form (Multi-Step):**

<!-- https://css-tricks.com/how-to-create-multi-step-forms-with-vanilla-javascript-and-css/ -->

- **Step 1 of 4: Project Basics:** Gathers high-level information like project type, location, and an optional project reference.
<!-- Add image -->
- **Step 2 of 4: Required Services:** Allows users to select all required services via checkboxes (Excavation & Site Prep, Piling & Foundation Reinforcement, Concrete Slab / Foundation, Shoring & Retaining Walls, Rock Handling & Blasting, Drainage System, Frost Insulation, Site Setup & Project Management).
<!-- Add image -->
- **Step 3 of 4: Project Specifications:** Dynamically displays fields based on selected services, such as site area, excavation depth, number of piles, and drainage system length. Includes an option for users to indicate if they are unsure about the number of piles.
<!-- Add image -->
- **Step 4 of 4: Timeline & Contact:** Covers project urgency (Standard or Rush with a +20% fee) and captures contact details (Full Name, Company Name, Email Address, Phone Number). Includes a consent checkbox for data storage.
<!-- Add image -->
- **Live Estimation Engine (JavaScript Logic):** Calculates costs based on user inputs and provided price ranges for each service, including excavation volume, service costs, and a fixed site management fee. Applies a +20% surcharge for "Rush" projects.
<!-- Add image -->

<!-- To be created -->
**Results & Summary Page:**

- Displays a service-by-service cost breakdown.
<!-- Add image -->
- Shows the total estimated price range (e.g., "11.8M – 25.1M SEK").
<!-- Add image -->
- Includes a clear Call to Action (CTA) like: "<!-- Send us your details for a finalized quote. -->"
<!-- Add image -->

### Future Implementations

Future implementations could include:

- **Allow users to upload historical project data for more accurate estimates.**
- **Integrate a system to automatically request quotes from suppliers.**
- **Develop an admin dashboard for Groundwork Solutions Ltd. to manage and track all quotes.**
- **Services Page - Presents a comprehensive list of Groundwork Solutions Ltd.'s services, enhanced with appropriate images.**
- **Articles/Portfolio Page**
- **Contact form page.**

### Accessibility Considerations
<!-- go through each picture and video for alt -->
  <!-- - **Semantic HTML:** Utilizing meaningful HTML tags to ensure proper document structure for assistive technologies. -->
  <!-- - **Descriptive Alt Attributes:** All images include descriptions for screen reader users. -->
  <!-- - **Color Contrast:**  -->
  <!-- - **Accessible Navigation:** Current page links are clearly marked for screen readers, enhancing navigability. -->

## Technologies Used

### Languages Used

HTML, CSS and Javascript.

### Frameworks, Libraries & Programs Used

- **Git:** For version control.
- **Github:** To save and store the files for the website.
<!-- - **Google Fonts:** Import fonts (Merriweather Sans for Headings, Roboto Flex for Paragraphs). -->
- **Google Dev Tools:** Development.
<!-- - **Font Awesome:** Import icons. -->
- **FreeConvert:** To downsize and convert the hero video.
  - **Favicon.io:** To create favicon.
  <!-- - **Tiny PNG:** To downsize the images. -->
  <!-- - **Am I Responsive?:** To showcase the website on different devices. -->
  <!-- - **Autoprefixer CSS online:** Applied to add necessary vendor prefixes to CSS properties, ensuring broader browser compatibility. -->
- **ChatGPT (by OpenAI):** Used for generating specific service and feature descriptions, ensuring industry relevance and authenticity in the website's content.
- **Gemini (by Google):** Providing extensive debugging assistance and code explanations during development.
- **ColorSpace:** Used to generate matching Color Palette 

## Deployment & Local Development

<details>
  <summary>Deployment</summary>
  <p>
    This project's live version is deployed using **GitHub Pages**. Follow these steps to deploy your own instance:

1.  **Access GitHub:** Sign in to your GitHub account.
2.  **Navigate to Repository:** Locate the `groundwork` repository for this project.
3.  **Open Settings:** Click on the "Settings" tab within the repository navigation.
4.  **Go to Pages:** In the left-hand sidebar, select the "Pages" option.
5.  **Configure Source:**
    - Under the "Source" section, choose the `main` branch from the branch dropdown menu.
    - Select `/(root)` as the folder from the adjacent dropdown.
6.  **Save Changes:** Click the "Save" button. Your live site will now be accessible at the URL provided by GitHub Pages, typically `https://github.com/luckyfrappe/groundwork`.
  </p>
</details>

### **Local Development**

To get a local copy of this project up and running on your machine, you have two primary methods: Forking and Cloning.

<details>
  <summary>How to Fork the Repository</summary>
  <p>
    Forking creates a personal copy of the repository in your GitHub account, allowing you to make changes without affecting the original project.

1.  Sign In: Log in to your GitHub account.
2.  Go to Project: Visit the `luckyfrappe/groundwork` repository.
3.  Initiate Fork: Click the "Fork" button located in the top-right corner of the page. This will create a copy under your own GitHub profile.
  </p>
</details>

<details>
  <summary>How to Clone the Repository</summary>
  <p>
    Cloning downloads a full copy of the repository to your local computer, ready for development.

1. Access GitHub: Ensure you are logged into your GitHub account.
2. Locate Repository: Navigate to the `luckyfrappe/groundwork` repository (or your forked version).
3. Copy Clone URL: Click on the green "< > Code" button. Choose your preferred method (HTTPS, SSH, or GitHub CLI) and copy the provided URL.
4. Open Terminal: Launch your terminal or command prompt (e.g., Git Bash, PowerShell, macOS Terminal).
5. Navigate to Desired Directory: Change your current working directory to where you want to store the project.
   Example: `cd Desktop/Projects`
6. Execute Clone Command: Type `git clone` followed by pasting the URL you copied in step 3. Press Enter.
Example: `git clone https://github.com/luckyfrappe/groundwork`
  </p>
</details>

## Testing

For testing details, known issues, and resolved bugs, see [TESTING.md](TESTING.md).

## Credits

### Code Used

<!-- - <a href="[https://fonts.google.com/](https://fonts.google.com/)" target="_blank" rel="noopener">Google Fonts</a>: Imported for custom typography, including Merriweather Sans (for headings) and Roboto Flex (for paragraphs). -->
<!-- - <a href="[https://fontawesome.com/](https://fontawesome.com/)" target="_blank" rel="noopener">Font Awesome</a>: Used for scalable vector icons across the site. Integrated via the Font Awesome CDN. -->
- Clippy: <a href="[https://bennettfeely.com/clippy/](https://bennettfeely.com/clippy/)" target="_blank" rel="noopener">clip-path css to clip the images</a>.
- Responsive Cards: Inspired by examples from <a href="[https://codesandbox.io/p/sandbox/responsive-card-layout-with-css-grid-rpfdn?file=%2Fstyles.css%3A82%2C1-110%2C2](https://codesandbox.io/p/sandbox/responsive-card-layout-with-css-grid-rpfdn?file=%2Fstyles.css%3A82%2C1-110%2C2)" target="_blank" rel="noopener">CodeSandbox</a>.
- Video Tutorial Guide: "Create AMAZING Gaming Websites with HTML CSS and JavaScript" by MiladiCode (https://www.youtube.com/watch?v=ukMPKm3cLns)
This tutorial provided guidance on how to create animations and build a website prototype using HTML, CSS, and JavaScript, covering topics from setting up files to implementing scroll animations and mobile responsiveness.
 <!-- https://css-tricks.com/how-to-create-multi-step-forms-with-vanilla-javascript-and-css/ -->

 https://css-tricks.com/gradient-borders-in-css/ border gradient css

 html reset and base chatgpt

 https://heropatterns.com/ - svg patterns footer

### Content

The textual content and overall narrative for this fictional website were a collaborative effort between the developer and AI.
Various service and feature descriptions, as well as general website copy, were generated with the assistance of ChatGPT (by OpenAI) and Gemini (by Google).

<!-- Add potential help from my friend who works as a construction supervisor -->

### Media

- **Hero Video:** Sourced from <a href="[https://www.pexels.com/video/aerial-view-of-excavator-working-at-construction-site-30911527/](https://www.pexels.com/video/aerial-view-of-excavator-working-at-construction-site-30911527/)" target="_blank" rel="noopener">Pexels</a>.
- **Royalty-Free Stock Images:**
  - About Section: `assets/images/about.jpeg` (A construction worker in a hard hat and safety vest, standing on a construction site with heavy machinery in the background.) Provided by a friend who works as construction supervisor.
 - services https://www.pexels.com/photo/bird-s-eye-view-photo-of-heavy-equipment-on-construction-site-1188554/
 - services https://www.pexels.com/photo/people-with-hard-hard-standing-on-the-construction-site-8961260/

  - **Favicons:** Generated using <a href="[https://favicon.io/](https://favicon.io/)" target="_blank" rel="noopener">Favicon.io</a>.
  - **Color Palette:** Generated using <a href="[https://mycolor.space/](https://mycolor.space/)" target="_blank" rel="noopener">ColorSpace</a>.
  <!-- - **Image Optimization:** Images were compressed and optimized using <a href="[https://tinypng.com/](https://tinypng.com/)" target="_blank" rel="noopener">Tiny PNG</a>. -->
  <!-- - **Responsive Showcase Image:** The screenshot demonstrating website responsiveness was created using <a href="[http://ami.responsivedesign.is/](http://ami.responsivedesign.is)" target="_blank" rel="noopener">Am I Responsive?</a>. -->

- **Hero Video Optimization:** The hero video was downsized and converted using <a href="[https://www.freeconvert.com/](https://www.freeconvert.com/)" target="_blank" rel="noopener">FreeConvert</a>.
- **Canva:** Used to create the logo.

### Acknowledgments

<!-- Add Acknowledgments -->
