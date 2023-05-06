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
      let artifactDescription = document.createElement('p')
      artifactDescription.textContent = artifact.fourPC
      artifactDesc.classList.add('recommended-artifact-description-four')
      card.appendChild(artifactDescription)
    })  
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