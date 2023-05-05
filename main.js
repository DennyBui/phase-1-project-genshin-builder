let buildCharacter = false;
function createCardElement(character) {
  let card = document.createElement('div')
  card.classList.add('card')
  let h2 = document.createElement('h2')
  h2.textContent = character.name
}
document.addEventListener("DOMContentLoaded", () => {
  fetch('http://localhost:3000/characters')
  .then(res => res.json())
  .then(characters => characters.forEach(character => createCardElement(character)));
})