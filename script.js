/* =========================================
   Virtual Dog Park - script.js
   Plain JavaScript, no frameworks or libraries.
   ========================================= */

// The key we use to save the dog in the browser's localStorage.
// localStorage lives INSIDE the visitor's own browser, tied to this
// website's address. Nothing is sent to a server. Open DevTools ->
// Application -> Local Storage to see it.
const STORAGE_KEY = "virtualDogParkPetV1";

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
const growthFill = document.getElementById("growth-fill");

const feedBtn = document.getElementById("feed-btn");
const playBtn = document.getElementById("play-btn");
const nextDayBtn = document.getElementById("nextday-btn");
const resetBtn = document.getElementById("reset-btn");

// Map each breed to its SVG picture file and a description for screen readers.
const breedPictures = {
  "Beagle":           { file: "assets/beagle.svg",           alt: "Illustration of a Beagle" },
  "Golden Retriever": { file: "assets/golden-retriever.svg", alt: "Illustration of a Golden Retriever" },
  "Poodle":           { file: "assets/poodle.svg",           alt: "Illustration of a Poodle" }
};

// ---- Small helpers ----

// Work out the growth stage from the day number.
function getStage(day) {
  if (day === 1) return "Puppy";        // Day 1
  if (day <= 3) return "Young Dog";     // Days 2 and 3
  return "Adult Dog";                    // Day 4 and beyond
}

// Work out how full the growth bar should be (a simple visual cue).
function getGrowthPercent(day) {
  if (day === 1) return 33;
  if (day <= 3) return 66;
  return 100;
}

// Save the current dog to localStorage (only ONE dog is stored at a time).
function saveDog() {
  if (!dog) return;
  localStorage.setItem(STORAGE_KEY, JSON.stringify(dog));
}

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
    happiness: 50
  };

  // Show the correct picture for the chosen breed.
  const picture = breedPictures[breed];
  dogImage.src = picture.file; // relative path, e.g. assets/beagle.svg
  dogImage.alt = picture.alt;  // meaningful alt text for the image

  saveDog();            // save right after adoption
  renderDog();          // fill in the stats
  dogCard.hidden = false; // make the dog card visible
  showMessage("");       // clear any old message
  nameInput.value = "";  // reset the box for next time
}

// ---- Function 2: renderDog ----
// Updates the on-screen text and bar so they match the dog's current state.
// We use textContent (NOT innerHTML) so a dog name is always shown as
// plain text and can never break or change the page.
function renderDog() {
  if (!dog) return;
  statName.textContent = dog.name;            // SAFE: plain text only
  statBreed.textContent = dog.breed;
  statDay.textContent = dog.day;
  statStage.textContent = getStage(dog.day);  // text states the stage
  statHappiness.textContent = dog.happiness;
  growthFill.style.width = getGrowthPercent(dog.day) + "%"; // visible growth
}

// ---- Function 3: careForDog (Feed + Play) ----
// Used by BOTH Feed and Play. Raises happiness by 10,
// but never lets it go above 100.
function careForDog() {
  if (!dog) return;
  dog.happiness = dog.happiness + 10;
  if (dog.happiness > 100) {
    dog.happiness = 100; // cap it at 100
  }
  saveDog();   // save after every Feed / Play
  renderDog(); // show the new happiness
}

// ---- Function 4: nextDay ----
// Moves the dog forward one day: day + 1, happiness - 5 (never below 0).
function nextDay() {
  if (!dog) return;
  dog.day = dog.day + 1;
  dog.happiness = dog.happiness - 5;
  if (dog.happiness < 0) {
    dog.happiness = 0; // floor it at 0
  }
  saveDog();   // save after every Next Day
  renderDog();
}

// ---- Function 5: startOver ----
// Asks for confirmation, then deletes the saved dog and returns to the form.
// If the visitor cancels, the dog is kept.
function startOver() {
  const sure = window.confirm("Start over? This will delete your dog and all saved progress.");
  if (!sure) return; // visitor cancelled: keep the dog
  localStorage.removeItem(STORAGE_KEY);
  dog = null;
  dogCard.hidden = true; // back to the adoption form
  showMessage("");
}

// ---- Helper: showMessage ----
// Puts a helpful note on the page, or clears it when passed "".
function showMessage(text) {
  messageEl.textContent = text;
}

// ---- Function 6: loadDog ----
// Runs once when the page loads. If a dog was saved earlier, bring it back.
function loadDog() {
  const saved = localStorage.getItem(STORAGE_KEY);
  if (!saved) return; // nothing saved yet
  try {
    const data = JSON.parse(saved);
    dog = data;
    const picture = breedPictures[dog.breed];
    if (picture) {
      dogImage.src = picture.file;
      dogImage.alt = picture.alt;
    }
    renderDog();
    dogCard.hidden = false; // show the restored dog
  } catch (e) {
    // If the saved text is somehow broken, just ignore it.
  }
}

// ---- Wire up the buttons ----
// "submit" fires when the Adopt button (type="submit") is clicked.
adoptForm.addEventListener("submit", handleAdopt);
// Feed and Play each call the same care function.
feedBtn.addEventListener("click", careForDog);
playBtn.addEventListener("click", careForDog);
// Next Day and Start Over.
nextDayBtn.addEventListener("click", nextDay);
resetBtn.addEventListener("click", startOver);

// ---- Restore any saved dog when the page loads ----
loadDog();
