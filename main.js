fetch("http://localhost:3000/characters")
.then(resp => resp.json())
.then(characters => {
    const container = document.querySelector('ul#genshinCharacter')
    characters.forEach(character => {
        //name, element, rarity
        //create an element to hold the name. maybe h2 or h3
        // create an element to hold element and rarity
        //create a list element
        //append elements to list item
        //append list item to container
        //add images to db.json
    createCardElement(character)})
})