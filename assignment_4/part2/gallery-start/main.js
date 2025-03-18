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
    const newImage = document.createElement('img'); // Creates a new IMG element
    newImage.setAttribute('src', `images/${images[i]}`); // Setting src attribute for new image
    newImage.setAttribute('alt', alts[i]); // Setting alt attribute for new image
    thumbBar.appendChild(newImage); // Appending that new image to thumbBar
}

// Changes the displayed image's src and alt, whenever thunmBar is Clicked
thumbBar.addEventListener("click", function(event) {
    if (event.target.tagName === "IMG") { // If the click event is targeted by clicking on IMG tag
        displayedImage.src = event.target.src; // Setting the large image's src to the src of the image that was clicked
        displayedImage.alt = event.target.alt; // Setting the large image's alt to the alt of the image that was clicked
    }
})

/* Wiring up the Darken/Lighten button */
btn.addEventListener("click", function() {
    if (btn.getAttribute("class") === "dark") { // If the button's class was dark
        btn.setAttribute("class", "light"); // Change the class name
        btn.textContent = "Lighten"; // Update the text content of the button
        overlay.style.backgroundColor = "rgb(0 0 0 / 50%)"; // Setting the overlay's background color to black with 50 % transparency
    } else { // If the button's class was light
        btn.setAttribute("class", "dark"); // Change the class name
        btn.textContent = "Darken"; // Update the text content of the button
        overlay.style.backgroundColor = "rgb(0 0 0 / 0%)"; // Setting the overlay's background color to black with 0 % transparency
    }
})