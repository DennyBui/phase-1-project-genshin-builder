document.addEventListener("DOMContentLoaded", () => {
  fetch('http://localhost:3000/characters')
  .then(res => res.json())
  .then(characters => characters.forEach(character => createCardElement(character)));
})