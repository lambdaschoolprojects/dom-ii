// Your code goes here
const logo = document.querySelector('.logo-heading');
const page = document.querySelector('body');
const navLinks = Array.from(document.querySelector('nav').children);
const paragraphs = Array.from(document.querySelectorAll('p'));

// #1, change the color of the logo as the page scrolls
window.addEventListener('scroll', e => {
    // get a color code based on the scroll position
    const colorCode = 255 * (window.scrollY/1131);

    // change color as the page scrolls
    logo.style.color = `rgb(${colorCode}, 0, 0)`;
});

// #2,  enlarge text when mouseover
 paragraphs.forEach(paragraph => paragraph.addEventListener('mouseover', e => {
     e.target.style.fontSize = "2.4rem";
 }));

 // #3, reduce text when mouse out
paragraphs.forEach(paragraph => paragraph.addEventListener('mouseleave', e => {
     e.target.style.fontSize = "1.6rem";
}));



// prevent page from refreshing when clicking links
navLinks.forEach(link => link.addEventListener('click', e => {
    e.preventDefault();
    e.stopPropagation();
}));