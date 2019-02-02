// Your code goes here
const logo = document.querySelector(".logo-heading");
const page = document.querySelector("body");
const navLinks = Array.from(document.querySelector("nav").children);
const paragraphs = Array.from(document.querySelectorAll("p"));
const images = Array.from(document.querySelectorAll("img"));
const header = document.querySelector("header");
const h2 = Array.from(document.querySelectorAll("h2"));
const contentPick = document.querySelector(".content-pick");
const buttons = document.querySelectorAll(".btn");

let rotations = {};
let myIntervals = {};
let imageIDs = 0;
let eggSequence = [
  "ArrowUp",
  "ArrowDown",
  "ArrowUp",
  "ArrowDown",
  "ArrowLeft",
  "ArrowRight",
  "b",
  "a"
];
let eggCorrectMatches = 0;
let visible = "1";

// #1, change the color of the logo as the page scrolls
window.addEventListener("scroll", e => {
  // get a color code based on the scroll position
  const colorCode = 255 * (window.scrollY / 1131);

  // change color as the page scrolls
  logo.style.color = `rgb(0, ${255 - colorCode}, 0)`;
  header.style.backgroundColor = `rgb(255, ${255 - colorCode}, ${colorCode})`;
});

// #2,  enlarge text when mouseover
paragraphs.forEach(paragraph =>
  paragraph.addEventListener("mouseover", e => {
    //if (e.target.className != ".content-pick")
    if (e.target.parentNode.parentNode.className != "content-pick")
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
images.forEach(image => {
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
  });
  // #8 make images invisible on double click
  image.addEventListener("dblclick", e => {
    toggleVisibility(e.target);
  });
});

// prevent page from refreshing when clicking links
navLinks.forEach(link => {
  link.addEventListener("click", e => {
    e.preventDefault();
    e.stopPropagation();
  });
  // #5 anchors get larger and change style on mouseover
  link.addEventListener("mouseover", e => {
    e.target.style.fontSize = "2.4rem";
    e.target.style.fontWeight = "stronger";
    e.target.style.color = "pink";
  });
  // #6 anchors return to previous style on mouse leave
  link.addEventListener("mouseleave", e => {
    e.target.style.fontSize = "1.6rem";
    e.target.style.color = "#212529";
    e.target.style.fontWeight = "normal";
  });
});

// #7 keystroke easter egg
page.addEventListener("keydown", e => {
  if (e.key === eggSequence[eggCorrectMatches]) {
    eggCorrectMatches++;
    if (eggCorrectMatches == eggSequence.length) {
      alert("Honk honk");
      eggCorrectMatches = 0;
    }
  } else {
    eggCorrectMatches = 0;
  }
});

// #9 & #10, animate h2 on mouseover and mouseleave
h2.forEach(tag => {
  tag.addEventListener("mouseover", e => {
    e.target.style.transform = `rotateZ(180deg)`;
  });
  tag.addEventListener("mouseleave", e => {
    e.target.style.transform = `rotateZ(0deg)`;
  });
});

// Stopping propagation
contentPick.addEventListener("click", e => {
  const red = getRandomNumberInRange(1, 255),
    blue = getRandomNumberInRange(1, 255),
    green = getRandomNumberInRange(1, 255);

  e.target.style.backgroundColor = `rgb(${red}, ${green}, ${blue})`;
});

// contentPick.addEventListener("mouseover", e => {
//   //e.target.style.fontSize = "1.6rem";
// });

buttons.forEach(btn => {
  btn.addEventListener("click", e => e.stopPropagation());
});

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

const toggleVisibility = element => {
  if (element.style.opacity === "1" || element.style.opacity === "")
    element.style.opacity = "0";
  else element.style.opacity = "1";
};

const getRandomNumberInRange = (min, max) => {
  return Math.floor(Math.random() * (max - min + 1) + min);
};
