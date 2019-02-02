// Your code goes here
const logo = document.querySelector(".logo-heading");
const page = document.querySelector("body");
const navLinks = Array.from(document.querySelector("nav").children);
const paragraphs = Array.from(document.querySelectorAll("p"));
const images = Array.from(document.querySelectorAll("img"));

let rotations = {};
let myIntervals = {};
let imageIDs = 0;

// #1, change the color of the logo as the page scrolls
window.addEventListener("scroll", e => {
  // get a color code based on the scroll position
  const colorCode = 255 * (window.scrollY / 1131);

  // change color as the page scrolls
  logo.style.color = `rgb(${colorCode}, 0, 0)`;
});

// #2,  enlarge text when mouseover
paragraphs.forEach(paragraph =>
  paragraph.addEventListener("mouseover", e => {
    e.target.style.fontSize = "2.4rem";
  })
);

// #3, reduce text when mouse out
paragraphs.forEach(paragraph =>
  paragraph.addEventListener("mouseleave", e => {
    e.target.style.fontSize = "1.6rem";
  })
);

// #4, pic spins on click
images.forEach(image =>
  image.addEventListener("click", e => {
    if (!e.target.id) {
      imageIDs++;
      e.target.id = "id" + imageIDs;
    }
    if (!myIntervals[e.target.id]) {
      rotations[e.target.id] = 0;
      //e.target.style.zIndex = "0";
      document.querySelector("header").style.zIndex = "10";
      myIntervals[e.target.id] = setInterval(() => {
        rotate(e.target.id);
      }, 2);
    }
  })
);

// prevent page from refreshing when clicking links
navLinks.forEach(link =>
  link.addEventListener("click", e => {
    e.preventDefault();
    e.stopPropagation();
  })
);

// helper methods

// This function rotates the image 2 degs, called by setInterval with the element ID as the
// parameter
const rotate = elementId => {
  const element = document.querySelector(`#${elementId}`);
  if (rotations[elementId] < 360) {
    rotations[elementId] += 2;
    element.style.transform = `rotate(${rotations[elementId]}deg)`;
  } else {
    // clear the interval once the image has rotated 360 degrees
    clearInterval(myIntervals[elementId]);
    myIntervals[elementId] = null;
    rotations[elementId] = 0;
  }
};
