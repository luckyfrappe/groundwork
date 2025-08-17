# Groundwork Solutions

This website provides an instant preliminary cost estimate for construction groundwork projects, specifically for **Groundwork Solutions Ltd.** The primary goal is to streamline the initial client interaction by offering a transparent and efficient way for potential customers to get an early understanding of project costs.

![Mockup image of Groundwork Solutions Ltd. website on different devices](assets/images/responsive.png)

🔗 **Live site:** <https://luckyfrappe.github.io/groundwork/>

---

## Contents

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

---

## User Experience (UX)

### Business Goals

- Provide clients with an instant preliminary cost estimate for construction groundwork projects.
- Serve as a professional web-based Minimum Viable Product (MVP) to support lead generation.
- Clearly communicate Groundwork Solutions Ltd.'s value and services.
- Encourage visitors to take action through clear Call to Actions (CTAs) to obtain an estimation.

### User Stories

**As a first-time visitor, I want the site to be easy to access and navigate.**

- Works seamlessly across desktop, tablet, and mobile devices.
- Navigation is clear and simple, with a responsive layout.

**As a potential client, I want to quickly get a cost estimate for my groundwork project.**

- Features an interactive, multi-step form.
- A live estimation engine calculates costs.
- Provides a cost breakdown and total estimated range.

**As a potential client, I want to understand what services are offered.**

- A dedicated section lists main services with clear titles and descriptions.

**As a decision-maker, I want to know the company is reliable.**

- "About Us" section details the company's approach and expertise.

**As a lead, I want to easily reach out for a finalized quote.**

- Clear CTA provided at the end of the form.
- Contact section with essential details.

**As a returning visitor, I want to quickly find contact details.**

- Contact information is accessible via a dedicated section and footer.

---

## Design

### Color Scheme

Professional and clean palette reflecting the robustness of the construction industry while keeping a modern look.

### Typography

- **Headings:** [Merriweather Sans](https://fonts.google.com/specimen/Merriweather+Sans)
- **Body text:** [Roboto Flex](https://fonts.google.com/specimen/Roboto+Flex)

### Imagery

Visuals evoke professionalism and scale: construction sites, heavy machinery, diagrams. Images sourced from **Pexels**, **Unsplash**, and industry contacts. See [Credits](#credits).

### Wireframes

No formal wireframes created. The layout was built following guides and then customized for the project’s needs.

---

## Features

This website provides a seamless and professional experience for obtaining groundwork estimates.

### Common to All Pages

**Responsive Navigation Bar** with burger menu on mobile.
**Footer** with social media icons and privacy info.

**Animations**  
- On all pages, some elements appear with a smooth animation when you scroll to them.  
- When you scroll past them, the animation effect disappears.  

**Sidebar Navigation**  
- The sidebar menu can be opened and closed.  
- Clicking on any link in the sidebar automatically closes it.  
- This behavior is the same on every page.

### Page-Specific Features

**Landing Page:**

- Hero section with video, heading, and CTAs.
- Introduction section with card layout.
- Articles highlighting mission and values.
- Services teaser with summaries.
- Customer journey and contact section.

**Estimate Form (Multi-Step)**

The form is designed as a guided, step-by-step process with validation, progress tracking, and dynamic fields.

**Step 1 – Worksite Overview**  
- Start by creating at least one worksite.  
- Each worksite can be **added or deleted dynamically**.  
- Each worksite will later hold its own set of required services and specifications.

**Step 2 – Contact Information**  
- Collects name, company (optional), email, and phone number.  
- Validates email format before proceeding.  
- Includes a mandatory consent checkbox.

**Step 3 – Project Basics**  
- Captures project type (dropdown), location, and internal reference.  
- Allows optional upload of a site plan or photo.

**Step 4 – Required Services**  
- Each worksite has its own services checklist.  
- Available services:  
  - Excavation & Site Prep  
  - Piling / Foundation  
  - Concrete Slabs / Foundation  
  - Shoring / Retaining Walls  
  - Rock Breaking / Blasting  
  - Drainage System  
  - Frost Insulation  
  - Rush Delivery (+20% surcharge applied later)  
- At least one service must be selected per worksite.

**Step 5 – Specifications**  
- Expands into detailed input fields based on the services chosen.  
- Uses accordion panels for each worksite.  
- Examples:  
  - Excavation → site area + excavation depth  
  - Piling → number of piles + total pile length  
  - Concrete slabs → area + thickness  
  - Drainage, frost insulation, shoring, and rock blasting → lengths/areas/volumes as required  
- Always includes optional soil volume, material breakdown, and notes.

**Step 6 – Summary & Submission**  
- Displays collected **Contact Info** and **Project Details**  
- Shows a **Worksite-by-Worksite Cost Breakdown**, including min–max ranges  
- Applies rush surcharge if selected  
- Updates totals dynamically before submission

**Additional Features**  
- **Progress Bar:** Updates as the user moves through the steps  
- **Navigation Control:** Next/Previous buttons adapt depending on step  
- **Validation:** Required fields and at least one service per worksite must be filled before moving forward  
- **Dynamic Sites:** Users can add or remove worksites with their own services and specifications

### Future Implementations

- Use historical data for accuracy.
- Integrate supplier quote requests automatically.
- Admin dashboard for quote management.
- Dedicated “Services,” “About,” and “Articles/Portfolio” pages.
- Blog system.
- Multilingual support.
- User login for saved projects.

### Accessibility Considerations

- Semantic HTML for assistive tech.
- Descriptive `alt` text for images.
- High-contrast color choices.

---

## Technologies Used

### Languages Used

- **HTML**
- **CSS**
- **JavaScript**

### Frameworks, Libraries & Programs Used

- **Git & GitHub** – Version control and hosting.
- **Google Fonts** – Typography.
- **Google DevTools** – Development & debugging.
- **Font Awesome** – Icons via CDN.
- **FreeConvert** – Video compression.
- **Favicon.io** – Favicon generation.
- **TinyPNG** – Image optimization.
- **Polypane** – Responsive device previews.
- **Autoprefixer** – Vendor prefixes for CSS.
- **ChatGPT (OpenAI) & Gemini (Google)** – Copy assistance and debugging.
- **ColorSpace** – Palette generation.
- **JSLint** – JavaScript validation.
- **Custom JS Lint API** – <https://luckyfrappe.github.io/jsapi/>

---

## Deployment & Local Development

<details>
<summary><strong>Deployment (GitHub Pages)</strong> — click to expand</summary>

This project is deployed using **GitHub Pages**.

1. Sign in to GitHub.
2. Open the `groundwork` repository.
3. Go to **Settings → Pages**.
4. Under **Source**, choose branch: `main` and folder: `/ (root)`.
5. Click **Save**.
6. Your site will be available at: <https://luckyfrappe.github.io/groundwork/>

</details>

### Local Development

#### How to Fork the Repository

1. Log in to GitHub.
2. Go to [`luckyfrappe/groundwork`](https://github.com/luckyfrappe/groundwork).
3. Click **Fork** (top right).

#### How to Clone the Repository

1. Open your fork or the original repository.
2. Click **Code → Copy URL** (HTTPS/SSH/CLI).
3. In terminal, navigate to your desired folder:

```bash
cd Desktop/Projects
```

4. Run the clone command:

```bash
git clone https://github.com/luckyfrappe/groundwork
```

---

## Testing

See **[TESTING.md](TESTING.md)** for test cases, known issues, and resolved bugs.

---

## Credits

<details>
<summary><strong>Code Used</strong> — click to expand</summary>

- **Google Fonts** – <https://fonts.google.com/>
- **Font Awesome** – <https://fontawesome.com/>
- **Responsive Card Layout (CodeSandbox)** – <https://codesandbox.io/p/sandbox/responsive-card-layout-with-css-grid-rpfdn>
- **Responsive Navbar Concept (YouTube)** – <https://www.youtube.com/watch?v=U8smiWQ8Seg>
- **Scroll Behavior – MiladiCode (YouTube)** – <https://www.youtube.com/watch?v=ukMPKm3cLns&t=2386s>
- **Responsive Multi-Step Form – dotWebdesign (YouTube)** – <https://www.youtube.com/watch?v=M0O-vquFHto&t=2373s>
- **Progress Bar Wrapper – WeiChiaChang (Gist)** – <https://gist.github.com/WeiChiaChang/abe92ca2e8da86ef69560b63903e8764>
- **Accordion – W3Schools** – <https://www.w3schools.com/howto/howto_js_accordion.asp>
- **IntersectionObserver Guide (YouTube)** – <https://www.youtube.com/watch?v=T33NN_pPeNI>
- **Email Regex (Stack Overflow)** – <https://stackoverflow.com/questions/50330109/simple-regex-pattern-for-email>

</details>

### Content

Textual content was developed with assistance from **ChatGPT (OpenAI)** and **Gemini (Google)**, and inspired by **[gmt-ab.se](https://gmt-ab.se/)**.

<details>
<summary><strong>Media</strong> — click to expand</summary>

- **Hero Video:** Pexels – <https://www.pexels.com/video/aerial-view-of-excavator-working-at-construction-site-30911527/>
- **Images:** Provided by a construction supervisor at **[gmt-ab.se](https://gmt-ab.se/)**.
- **Favicons:** **[Favicon.io](https://favicon.io/)**
- **Color Palette:** **[ColorSpace](https://mycolor.space/)**
- **Image Optimization:** **[TinyPNG](https://tinypng.com/)**
- **Responsive Showcase:** **[Polypane](https://polypane.app/)**
- **Logo:** Created with **[Canva](https://www.canva.com/)**

</details>

### Acknowledgments

Thanks to the tutorial creators, tool authors, and my industry contact for imagery. Their work and support were instrumental in completing this project.
