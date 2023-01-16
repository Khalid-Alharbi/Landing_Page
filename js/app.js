/**
 *
 * Manipulating the DOM exercise.
 * Exercise programmatically builds navigation,
 * scrolls to anchors from navigation,
 * and highlights section in viewport upon scrolling.
 *
 * Dependencies: None
 *
 * JS Version: ES2015/ES6
 *
 * JS Standard: ESlint
 *
 */
// make sure the js file is connected to the html file
console.log("the js file is connected");

/**
 * Comments should be present at the beginning of each procedure and class.
 * Great to have comments before crucial code sections within the procedure.
 */

/**
 * Define Global Variables
 *
 */
// defining a section variable to go through them

const fragment = document.createDocumentFragment();
const sections = document.querySelectorAll('section');
const navBar = document.getElementById('navbar__list')

/**
 * End Global Variables
 * Start Helper Functions
 * 
*/

function createNavItemHTML(id, name){
    const itemHTML = `<a class ="menu__link" data-id="${id}">${name}</a>`;
    return itemHTML;
}
function isInViewport (elem) {
    const bounding = elem.getBoundingClientRect();
    return (
        bounding.top >= 0 &&
        bounding.left >= 0 &&
        bounding.bottom <= (window.innerHeight || document.documentElement.clientHeight) &&
        bounding.right <= (window.innerWidth || document.documentElement.clientWidth)
    );
};

/**
 * End Helper Functions
 * Begin Main Functions
 * 
*/


// build the nav
function navBuilder(){
    for (let i=0; i < sections.length; i++){
        const newMenuItem = document.createElement('li');
        const sectionName = sections[i].getAttribute('data-nav')
        const sectionId = sections[i].getAttribute('id')
        newMenuItem.innerHTML = createNavItemHTML(sectionId, sectionName)
         fragment.appendChild(newMenuItem);
    }
    const navBar = document.getElementById('navbar__list')
    navBar.appendChild(fragment);
}



// Add class 'active' to section when near top of viewport
function setActiveClass(){
    for (let i=0; i < sections.length; i++){
        if (isInViewport(sections[i])){
            sections[i].classList.add("your-active-class");
        }else{
            sections[i].classList.remove("your-active-class");
        }
    }
}


// Scroll to anchor ID using scrollTO event
function scrollToElement(event){
    if(event.target.nodeName === 'A'){
        const sectionId = event.target.getAttribute('data-id');
        const section = document.getElementById(sectionId);
        section.scrollIntoView({behavior: "smooth"});
    }
}



/**
 * End Main Functions
 * Begin Events
 * 
*/
document.addEventListener('scroll', function(){
    setActiveClass();
});

navBar.addEventListener('click', function(event){
    scrollToElement(event)
})
// Build menu 
navBuilder()

