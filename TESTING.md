# Groundwork Solutions - Testing Documentation

<!-- <img src="" alt="Mockup image of FASTLANE website on different devices"> -->
<a href="https://luckyfrappe.github.io/groundwork/" target="_blank" aria-labe="Groundwork website opens in a new window on Github Pages">View Groundwork Solutions on Github Pages</a>

Testing for this project was a constant process, not just something done at the end. This was largely because we didn't have a very detailed plan or much documentation from the start. Because of that, I often had to test as I went, which led to a lot of stress and meant I sometimes had to completely rebuild parts of the website.

However, things got much easier and less stressful once I started breaking down tasks into smaller, more manageable steps. This helped me see the big picture better. Even though it was challenging, this ongoing testing helped me find and fix problems little by little. I focused mainly on making sure the website looked and worked great on all devices (responsive design) and that every feature did exactly what it was supposed to. I regularly used browser tools to quickly sort out any bugs, which really helped make the website strong and reliable in the end.

## Contents
* [Automated Testing](#automated-testing)  
* [Manual Testing](#manual-testing)
* [Full Testing](#full-testing)
* [Bugs](#bugs)  
    * [Known Bugs](#known-bugs)  
    * [Solved Bugs](#solved-bugs)  

### Automated Testing

https://www.jslint.com/ originally provided 163 Warnings mostly to use " instead of ', simple fix by searching for all ' and replacing with " down to 81 warnings.

Further reducing number of errors by formatting all Line is longer than 80 characters. reducing number of warnings.to 24. 



### Manual Testing

### Full Testing

## BUGS

Many bugs were identified and successfully resolved throughout the development process as they arose.

**Known Bugs:**
- Poor Mobile Responsiveness: The website's layout and elements don't adapt well to smaller screens. This is a top priority for improvement.
- iOS/Safari Compatibility: Animations and videos currently do not function correctly when viewed on iOS devices or in the Safari browser.
- Broken Footer: The footer section is visually disrupted and requires a complete redesign to function and display properly.
- Contact Section Display Issues: On smaller screens, the contact section doesn't display correctly, with text appearing blurred at the bottom.
- Inconsistent Spacing & Layout Issues: Due to non-standardized spacing and an overall inconsistent website structure, applying margins often throws the layout off. This requires a more systematic approach to styling.
- Non-Standardized Typography: Fonts and text sizes vary across the website, leading to a less cohesive and professional look.
- Semantic HTML Errors: The HTML structure is not fully semantically correct, which can impact accessibility and maintainability.
- Mobile Image Margin: After the "About" section, the expanding image has an unintended white margin below it on mobile screens, which can be resolved with specific CSS media queries.
- Animation shrinks to fast on tablet view when scrolling up.
- White space between picture and about section on tablets.
- Soltuions text does not shrink on mobile size.

### Solved Bugs
- Typo in hero-section: A spelling error in the hero section's code has been corrected.
- Unwanted Video Margin: A black margin appearing below the hero video has been eliminated.
- Footer Horizontal Scrolling: An unintentional margin-right: 150px on the footer, which caused horizontal scrolling, has been removed.

- The Bug: Circle Misalignment:
    The circular step numbers in the form's progress bar were not aligning vertically. Due to varying text lengths in each step, the circles were horizontally misaligned, appearing staggered instead of in a straight line.

    The Cause
    The <ul> element, which was a flex container with flex-direction: column, had its children (<li> items) horizontally centered by the align-items: center property. In a column-based flexbox, align-items controls horizontal alignment. This centering caused the list items to shift horizontally depending on the width of their text content, thus misaligning the circles.

    The Solution
    The issue was fixed by removing align-items: center from the <ul> element. The list was then wrapped in a <div> with a new align-center class to manage its overall horizontal positioning. This change allowed the list items to align to the left by default, placing all the circles in a straight vertical line.
- Description:
CSS styles targeting form elements — did not apply on the page, while other CSS styles worked fine. This caused the form elements to display with default browser styles despite defined CSS rules.

Troubleshooting Steps:
Verified CSS selectors and specificity.
Checked for CSS resets overriding styles.

Attempted using !important on styles to force application.

Used browser developer tools to inspect applied and overridden styles.

Tested applying styles inline directly in HTML to confirm correctness.

Resolution:
Applying styles inline confirmed the CSS rules were valid and effective. After removing inline styles and reinserting the same rules into the external CSS file, styles for all form elements began applying correctly.

Notes:
The root cause remains unknown(it seems our CSS form elements decided to play hide-and-seek), but reapplying styles externally resolved the problem.
Back to [README.md](README.md)

- accordion script caused unwanted behaviour like wrapping accordion into another accordion or did not displayed properly due to active class. Resolved by wrapping into function wrapAccordions and call fucntion after the worksites specifications are created. Change name of active to active-accordion. 

-I could not find a smoother way to implement registering contact info into project object so i rewrite updateWorksiteSpecifications into updateContactDetails function

 updateWorksiteSpecifications function created by ChatGPT used wrong values that are not existing in services in order to add specs questions. 

Bug 1 – Navigation button not working:
A <button> inside an <a> didn’t navigate to the home page. Fixed by using button button with window.location.href in JS.

Bug 2 – Security risk with innerHTML:
Whyle manual testing i experienced weird outcome by testing different characters inserted into Worksite name and found out that:
Displaying user input via innerHTML can execute HTML/JS Cross-Site Scripting (XSS) which is a potential security risk. Need refactoring all the user inputs, out of scope for MVP project. 


- The Problem
Clicking the accordion button triggered an error because the browser's form validator was trying to focus on a required input named 'siteArea' or other services that was not visible. Furthermore, this validation also caused the view to jump to the required consent button on the final page. This happened because:

The querySelectorAll('[required]') method was too broad, selecting invisible inputs and even buttons.

Button clicks, especially on a form, were triggering the browser's default validation and submission behavior.

The Fix
The issue was resolved by two key changes to the JavaScript code:

Refined Field Selection: The requiredFields selector was made more specific to target only form inputs (<input>, <select>, <textarea>) with the required attribute. This prevents the validation from checking non-input elements like the accordion buttons.

Prevented Default Actions: The event.preventDefault() method was added to the click listeners for both the accordion buttons and the next button. This explicitly stops the browser's default validation and submission actions, giving full control over the form's flow to your custom JavaScript logic.
