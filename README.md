Virtual Dog Park
1. Project Description
Virtual Dog Park is a small, beginner-friendly website built with only HTML, CSS, and vanilla JavaScript — no frameworks, no backend, and no external libraries or image services. It has two parts:
- A Dog Encyclopedia that introduces three breeds with simple, original SVG illustrations.
- A My Virtual Dog pet feature where you adopt a dog, care for it, and watch it grow.
All data stays on your own machine.
2. Features
- Dog Encyclopedia — Beagle, Golden Retriever, and Poodle, each with notes on size, personality, and everyday care.
- Original SVG illustrations — three hand-made dog drawings created for this project (not real photographs).
- Adopt a dog — pick a breed, type a name (1–20 characters), and click Adopt.
- Care buttons — Feed and Play raise happiness.
- Next Day — advance time; the dog grows and happiness changes.
- Growth stages — Puppy → Young Dog → Adult Dog, shown as text and a growth bar.
- Start Over — delete your dog after a confirmation prompt.
- Local save — your dog's progress is saved in the browser and restored on refresh.
- Responsive layout — readable on phones and laptops.
3. Preview with a Local Server
This project uses relative paths (for example assets/beagle.svg) and the browser's localStorage, so it should be opened through a local web server rather than by double-clicking the file.
Using VS Code Live Server:
1. Put index.html, style.css, script.js, and the assets/ folder together in one project folder.
2. Open that folder in VS Code.
3. Install the "Live Server" extension if you don't already have it.
4. Right-click index.html and choose Open with Live Server (or click Go Live in the status bar).
5. The page opens at a local address such as http://127.0.0.1:5500/.
Any simple static server works too — for example, run python -m http.server inside the project folder, then open the printed address.
4. Growth and Happiness Rules
- A new dog starts on Day 1, at the Puppy stage, with happiness 50.
- Feed and Play each raise happiness by 10, but happiness never goes above 100.
- Next Day increases the day by 1 and lowers happiness by 5, but happiness never drops below 0.
- Growth stage by day:
  - Day 1 → Puppy
  - Days 2–3 → Young Dog
  - Day 4 and beyond → Adult Dog
- The growth bar fills to about one third for a Puppy, two thirds for a Young Dog, and full for an Adult Dog.
5. Where Your Pet Progress Is Stored
Your dog's progress (name, breed, day, and happiness) is saved in the browser's localStorage under the key virtualDogParkPetV1. This storage lives inside your own web browser, tied to the site's address. Nothing is uploaded to a server, and nothing is stored in a GitHub account or any cloud service.
Because the data is per-browser and per-address:
- Clearing your browser data removes the saved dog.
- Opening the page in a different browser (or from a different address) will not show the saved dog.
- To remove it on purpose, click Start Over and confirm.
6. Manual Testing Checklist
Please run through these steps in your browser (the project author did not run automated browser tests):
[ ] Page loads with the title "Virtual Dog Park" and the welcome text.
[ ] Encyclopedia shows three breeds, each with an illustration and size/personality/care notes.
[ ] Each illustration has descriptive alt text (for example "Illustration of a Beagle").
[ ] The breed dropdown and the name field each have a visible label.
[ ] Adopting with an empty or spaces-only name shows a helpful error and does not create a dog.
[ ] A name longer than 20 characters is blocked (input limit, plus a message if it slips through).
[ ] Adopting a valid name shows the dog with the correct breed picture, Day 1, Puppy, and happiness 50.
[ ] Feed and Play each raise happiness by 10 and stop at 100.
[ ] Next Day raises the day by 1, lowers happiness by 5, and never goes below 0.
[ ] The stage text changes Puppy → Young Dog → Adult Dog as days advance.
[ ] The growth bar visibly fills as the dog grows.
[ ] Refreshing the page restores the same dog (localStorage).
[ ] Start Over asks for confirmation; cancelling keeps the dog, confirming deletes it and returns to the form.
[ ] Layout looks clear on a narrow phone width and on a laptop.
Note on Illustrations
The dog pictures in assets/ are project-created SVG illustrations made for this site. They are not real dog photographs and are not taken from any external website or photo service.