let buildCharacter = false;
function createCardElement(character) {
  let card = document.createElement('div')
  card.classList.add('card')
  let h2 = document.createElement('h2')
  h2.textContent = character.name
  let p = document.createElement('p')
  p.textContent = `${character.recommended_artifacts} Recommended Artifact`
  let img = document.createElement('img')
  img.src = character.image
  img.classList.add("character-portrait")
  let button = document.createElement('button')
  button.addEventListener("click", () => {
    p.textContent = `${recommended_artifacts} Recommended Artifact`;
    
  })
  button.classList.add('build-character')
  button.id = character.id
  card.append(h2, img, p, button)
  document.getElementById('cards-container').appendChild(card)
}
document.addEventListener("DOMContentLoaded", () => {
  fetch('http://localhost:3000/characters')
  .then(res => res.json())
  .then(characters => characters.forEach(character => createCardElement(character)));
})