const displayedImage = document.querySelector('.displayed-img');
const thumbBar = document.querySelector('.thumb-bar');

const btn = document.querySelector('button');
const overlay = document.querySelector('.overlay');

/* Declaring the array of image filenames */
const images = ["pic1.jpg", "pic2.jpg", "pic3.jpg", "pic4.jpg", "pic5.jpg"]

/* Declaring the alternative text for each image file */
const alts = ["Human eye", "Beach", "Flowers", "Picture from Egypt", "Butterfly"]

/* Looping through images */

for (let i = 0; i < images.length; i++) {
    const newImage = document.createElement('img');
    newImage.setAttribute('src', `images/${images[i]}`);
    newImage.setAttribute('alt', alts[i]);
    thumbBar.appendChild(newImage);
}

// Changes the displayed image's src and alt, whenever thunmBar is Clicked
thumbBar.addEventListener("click", function(event) {
    if (event.target.tagName === "IMG") {
        displayedImage.src = event.target.src;
        displayedImage.alt = event.target.alt;    
    }
})

/* Wiring up the Darken/Lighten button */
btn.addEventListener("click", function() {
    if (btn.getAttribute("class") === "dark") {
        btn.setAttribute("class", "light");
        btn.textContent = "Lighten";
        overlay.style.backgroundColor = "rgb(0 0 0 / 50%)";
    } else {
        btn.setAttribute("class", "dark");
        btn.textContent = "Darken";
        overlay.style.backgroundColor = "rgb(0 0 0 / 0%)";
    }
})