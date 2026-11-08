/* =========================================
   Virtual Dog Park - script.js
   Plain JavaScript, no frameworks or libraries.
   ========================================= */

// ---- State ----
// We keep one dog at a time. Starts as "null" (no dog yet).
let dog = null;

// ---- Connect the HTML elements to JavaScript ----
const adoptForm = document.getElementById("adopt-form");
const breedSelect = document.getElementById("breed-select");
const nameInput = document.getElementById("dog-name");
const messageEl = document.getElementById("dog-message");

const dogCard = document.getElementById("dog-card");
const dogImage = document.getElementById("dog-image");
const statName = document.getElementById("stat-name");
const statBreed = document.getElementById("stat-breed");
const statDay = document.getElementById("stat-day");
const statStage = document.getElementById("stat-stage");
const statHappiness = document.getElementById("stat-happiness");

const feedBtn = document.getElementById("feed-btn");
const playBtn = document.getElementById("play-btn");

// Map each breed to its SVG picture file and a description for screen readers.
const breedPictures = {
  "Beagle":           { file: "assets/beagle.svg",           alt: "Illustration of a Beagle" },
  "Golden Retriever": { file: "assets/golden-retriever.svg", alt: "Illustration of a Golden Retriever" },
  "Poodle":           { file: "assets/poodle.svg",           alt: "Illustration of a Poodle" }
};

// ---- Function 1: handleAdopt ----
// Runs when the form is submitted (the Adopt button is clicked).
function handleAdopt(event) {
  event.preventDefault(); // stop the browser from reloading the page

  const breed = breedSelect.value;
  const rawName = nameInput.value;
  const name = rawName.trim(); // remove spaces at the very start and end

  // Rule: the name must not be empty after trimming.
  // Spaces INSIDE the name are allowed, e.g. "Sir Bark".
  if (name === "") {
    showMessage("Please enter a name for your dog. It cannot be empty or only spaces.");
    return; // stop here; do not adopt
  }

  // Rule: limit the name to 20 characters.
  // (The input also blocks this, but we check here too to be safe.)
  if (name.length > 20) {
    showMessage("That name is too long. Please use 20 characters or fewer.");
    return;
  }

  // Create the new dog with its starting values.
  dog = {
    name: name,
    breed: breed,
    day: 1,
    stage: "Puppy",
    happiness: 50
  };

  // Show the correct picture for the chosen breed.
  const picture = breedPictures[breed];
  dogImage.src = picture.file; // relative path, e.g. assets/beagle.svg
  dogImage.alt = picture.alt;  // meaningful alt text for the image

  renderDog();          // fill in the stats
  dogCard.hidden = false; // make the dog card visible
  showMessage("");       // clear any old message
  nameInput.value = "";  // reset the box for next time
}

// ---- Function 2: renderDog ----
// Updates the on-screen text so it matches the dog's current state.
// We use textContent (NOT innerHTML) so a dog name is always shown as
// plain text and can never break or change the page.
function renderDog() {
  if (!dog) return;
  statName.textContent = dog.name;       // SAFE: plain text only
  statBreed.textContent = dog.breed;
  statDay.textContent = dog.day;
  statStage.textContent = dog.stage;
  statHappiness.textContent = dog.happiness;
}

// ---- Function 3: careForDog ----
// Used by BOTH Feed and Play. Raises happiness by 10,
// but never lets it go above 100.
function careForDog() {
  if (!dog) return;
  dog.happiness = dog.happiness + 10;
  if (dog.happiness > 100) {
    dog.happiness = 100; // cap it at 100
  }
  renderDog(); // show the new happiness
}

// ---- Helper: showMessage ----
// Puts a helpful note on the page, or clears it when passed "".
function showMessage(text) {
  messageEl.textContent = text;
}

// ---- Wire up the buttons ----
// "submit" fires when the Adopt button (type="submit") is clicked.
adoptForm.addEventListener("submit", handleAdopt);
// Feed and Play each call the same care function.
feedBtn.addEventListener("click", careForDog);
playBtn.addEventListener("click", careForDog);
