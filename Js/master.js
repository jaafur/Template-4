let backgroundOp = true;

// Set The Main Color From Local Storage

let mainColor = localStorage.getItem("colorOption");

// console.log(mainColor);

document.documentElement.style.setProperty("--main-color", mainColor);
if (mainColor != null) {
  document.querySelectorAll(".colors-list li").forEach((element) => {
    element.classList.remove("active");
    if (element.dataset.color === mainColor) {
      element.classList.add("active");
    }
  });
}

//Start Sitting Box

document.querySelector(".icon i").onclick = function () {
  // Toggle For Icon

  this.classList.toggle("fa-spin");

  // Toggle For Sitting Box

  document.querySelector(".sitting-box").classList.toggle("open");
};

// Changing color

const colorsli = document.querySelectorAll(".colors-list li");
colorsli.forEach((li) => {
  li.addEventListener("click", (e) => {
    document.documentElement.style.setProperty(
      "--main-color",
      e.currentTarget.dataset.color
    );

    // Store The Color in The Local Storage

    localStorage.setItem("colorOption", e.currentTarget.dataset.color);

    // Remove Active Class

    handleActive(e);
  });
});

// Store The Bacckground Color In Local Storage

let backgroundOption = localStorage.getItem("backgroundOpt");
if (backgroundOption !== null) {
  if (backgroundOption === "true") {
    backgroundOp = true;
  } else {
    backgroundOp = false;
  }
}
document.querySelectorAll(".random-background span").forEach((element) => {
  element.classList.remove("active");
});
if (backgroundOption === "true") {
  document.querySelector(".yes").classList.add("active");
} else {
  document.querySelector(".no").classList.add("active");
}

// Changing Background

let randomBgOpt = document.querySelectorAll(".random-background span");
randomBgOpt.forEach((span) => {
  span.addEventListener("click", (e) => {
    // handleActive(e);
    e.target.parentElement.querySelectorAll(".active").forEach((element) => {
      element.classList.remove("active");
    });
    e.target.classList.add("active");

    if (e.currentTarget.dataset.background === "yes") {
      backgroundOp = true;
      NormanlizeImages();
      localStorage.setItem("backgroundOpt", true);
    } else {
      backgroundOp = false;
      clearInterval(clearInt);
      localStorage.setItem("backgroundOpt", false);
    }
  });
});

// Function For Background Sitting

let landPage = document.querySelector(".landing-page");
let imageArr = ["pic1.jpg", "pic0.jpg", "pic5.jpg"];
let clearInt;
function NormanlizeImages() {
  if (backgroundOp === true) {
    clearInt = setInterval(() => {
      let randomNumber = Math.floor(Math.random() * imageArr.length);
      landPage.style.backgroundImage =
        'url("images/' + imageArr[randomNumber] + '")';
    }, 1000);
  }
}
NormanlizeImages();

//End Sitting Box
// Scrolling
let ourSkills = document.querySelector(".skills");
window.onscroll = function () {
  let skillsOffsetTop = ourSkills.offsetTop;
  let skillsOffsetHeight = ourSkills.offsetHeight;
  let windowHeight = this.innerHeight;
  let windowScroll = this.scrollY;
  if (windowScroll > skillsOffsetTop + skillsOffsetHeight - windowHeight) {
    let allSkills = document.querySelectorAll(
      ".skill-box .skill-progress span"
    );
    allSkills.forEach((element) => {
      element.style.width = element.dataset.progress;
    });
  }
};
// Start Popup-box
let ourGallery = document.querySelectorAll(".gallery img");
ourGallery.forEach((img) => {
  img.addEventListener("click", (e) => {
    // Create OverLay Element
    let overLay = document.createElement("div");

    // Class Name for OverLay Element
    overLay.className = "popup-overlay";

    // Add OverLay Element To Body
    document.body.appendChild(overLay);

    // Create PopupBox Element
    let popupBox = document.createElement("div");

    // Add Class Top PopupBox Element
    popupBox.className = "popup-box";

    // Testing Alt in Image Tag
    if (img.alt !== null) {
      // Creat Alt Element To The Image
      let altImage = document.createElement("h3");

      // Add Alt Text to Alt Element
      let altText = document.createTextNode(img.alt);

      // Add Alt Text to Alt Element
      altImage.appendChild(altText);

      // Add Alt Element To PopupBox Element
      popupBox.appendChild(altImage);
    }

    // Add Close Span
    let closeButton = document.createElement("span");

    // Add Class Name To CloseButton Element
    closeButton.className = "close-button";

    // Add Text To CloseButton Element
    let closeText = document.createTextNode("X");

    // Add Text Element To Close Span Element
    closeButton.appendChild(closeText);

    // Add Close Span Element To popupBox Element
    popupBox.appendChild(closeButton);

    // Creat Image Elemant
    let popupImage = document.createElement("img");

    // Add Src of Chosen Image To Src of Image Element
    popupImage.src = img.src;

    // Add Image Element To popupBox Element
    popupBox.appendChild(popupImage);

    // Add PopupBox Element To Body
    document.body.appendChild(popupBox);

    // Create Event Listener To Click On Close Button
    document.addEventListener("click", (e) => {
      if (e.target.className == "close-button") {
        // Remove popup-box Class
        document.querySelector(".popup-box").remove();
        // Remove popup-overlay Class
        document.querySelector(".popup-overlay").remove();
      }
    });
  });
});
// Select All Bullets
const allBullets = document.querySelectorAll(".nav-bullets .bullet");
// allBullets.forEach((bullet) => {
//   bullet.addEventListener("click", (e) => {
//     document.querySelector(e.currentTarget.dataset.section).scrollIntoView({
//       behavior: "smooth",
//     });
//   });
// });
// Select All Links
let allLinks = document.querySelectorAll(".links a");
// allLinks.forEach((a) => {
//   a.addEventListener("click", (e) => {
//     e.preventDefault();
//     document.querySelector(e.target.dataset.section).scrollIntoView({
//       behavior: "smooth",
//     });
//   });
// });
// function For Scrolling
function scrollToSection(elements) {
  elements.forEach((element) => {
    element.addEventListener("click", (e) => {
      e.preventDefault();
      document.querySelector(e.target.dataset.section).scrollIntoView({
        behavior: "smooth",
      });
    });
  });
}
scrollToSection(allBullets);
scrollToSection(allLinks);
// Function For Handle Active Element
function handleActive(el) {
  el.target.parentElement.querySelectorAll(".active").forEach((element) => {
    element.classList.remove("active");
  });
  el.target.classList.add("active");
}
// Reset Box
document.querySelector(".reset-box").onclick = function () {
  // We Use Clear To Clear All Item From Local Storage
  // localStorage.clear();

  // Clear Specific Item From Local Storage
  localStorage.removeItem("colorOption");
  localStorage.removeItem("backgroundOpt");

  // Reload The Page
  window.location.reload();
};
// Select Button
let toggleBtn = document.querySelector(".toggle-menu");
// Select Links
let tlinks = document.querySelector(".links");
// Function For Toggle Button And Links
toggleBtn.onclick = function (e) {
  e.stopPropagation();
  this.classList.toggle("menu-active");
  tlinks.classList.toggle("open");
};
// Event Listener For CLosing The list When I Click Out Of it
document.addEventListener("click", (e) => {
  if (e.target != toggleBtn && e.target != tlinks) {
    console.log("I Am Out Of ");
    if (tlinks.classList.contains("open")) {
      toggleBtn.classList.toggle("menu-active");
      tlinks.classList.toggle("open");
    }
  }
});

tlinks.onclick = function (e) {
  // Remove Propaganda
  e.stopPropagation();
};
