function createCardElement(character) {
  let card = document.createElement('div')
  card.classList.add('card')
  let h2 = document.createElement('h2')
  h2.textContent = character.name
  let p = document.createElement('p')
  p.textContent = `Rarity: ${character.rarity}`
  let img = document.createElement('img')
  img.src = character.image
  img.classList.add("character-portrait")
  let button = document.createElement('button')
  button.textContent = "Build Character"
  button.addEventListener("click", () => {
    p.textContent = "Recommended"
    character.recommendedArtifacts.forEach(artifact => {
      let artifactImg = document.createElement("img")
      artifactImg.src = artifact['artifact-image']
      artifactImg.alt = artifact.name
      artifactImg.classList.add('recommended-artifact-image')
      card.appendChild(artifactImg)
      let artifactName = document.createElement("h3")
      artifactName.textContent = artifact.name
      artifactName.classList.add('artifact-name')
      card.appendChild(artifactName)
      let artifactDesc = document.createElement('p')
      artifactDesc.textContent = artifact.description
      artifactDesc.classList.add('recommended-artifact-description')
      card.appendChild(artifactDesc)
      let artifactFour = document.createElement('p')
      artifactFour.textContent = artifact.fourPC
      artifactFour.classList.add('recommended-artifact-four')
      card.appendChild(artifactFour)
    })  
  })
  button.classList.add('build-character')
  button.id = character.id
  card.append(h2, img, p, button)
  document.getElementById('cards-container').appendChild(card)
}

fetch('http://localhost:3000/characters')
  .then(res => res.json())
  .then(characters => {
    characters.forEach(character => createCardElement(character));
    search();
  });

const search = () => {
  const searchForm = document.querySelector('form');
  searchForm.addEventListener('submit', (event) => {
    event.preventDefault();
    const input = document.querySelector('input#searchByName');
    fetch(`http://localhost:3000/characters`)
      .then (res => res.json())
      .then((character) => {
            const title = document.querySelector("section#characterDetails h2");
            const summary = document.querySelector("section#characterDetails p");
            title.innerText = character.name;
            summary.innerText = character.recommendedArtifacts;
      })
  })
}
document.addEventListener('DOMContentLoaded', search)
