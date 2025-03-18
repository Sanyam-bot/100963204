document.addEventListener('DOMContentLoaded', function(){
    const customName = document.getElementById('customname');
    const randomize = document.querySelector('.randomize');
    const story = document.querySelector('.story');

    const insertX = ["Willy the Goblin", "Big Daddy", "Father Christmas"]
    const insertY = ["the soup kitchen", "Disneyland", "the White House"]
    const insertZ = ["spontaneously combusted", "melted into a puddle on the sidewalk", "turned into a slug and crawled away"]

    
    const storyText = "It was :temperature: outside, so :insertx: went for a walk. When they got to :inserty:, they stared in horror for a few moments, then :insertz:. :name: saw the whole thing, but was not surprised — :insertx: weighs :weight:, and it was a hot day."


    function randomValueFromArray(array){
        const random = Math.floor(Math.random()*array.length);
        return array[random];
    }

    randomize.addEventListener('click', result);

    function result() {
        // If the the user doesn't provide a name, then the defualt is "Bob", otherwise the name provided by the user
        let name = customName.value !== "" ? customName.value: "Bob"
        // Storing whether the uk radio button was checked or not
        let ukQuantities = document.getElementById("uk").checked

        // If uk radio button was checked then convert both weight and temperature
        // to uk quantitites, otherwise US quantities
        let weight = ukQuantities ? Math.round(300 / 14) + " stone" : 300 + " pounds";
        let temperature = ukQuantities ? Math.round((94 - 32) * (5 / 9)) + " centigrade" : 94 + " fahrenheit";
        
        // Selects random value from the array, and then store it in a variable
        let xItem = randomValueFromArray(insertX);
        let yItem = randomValueFromArray(insertY);
        let zItem = randomValueFromArray(insertZ);

        let newStory = storyText; // Creates a copy of storyText, which will be updated everytime user clicks the generate button 

        // Replaces the occurence of specific strings with variables
        newStory = newStory.replaceAll(":insertx:", xItem)
        newStory = newStory.replaceAll(":inserty:", yItem)
        newStory = newStory.replaceAll(":insertz:", zItem)
        newStory = newStory.replaceAll(":name:", name)
        newStory = newStory.replaceAll(":temperature:", temperature)
        newStory = newStory.replaceAll(":weight:", weight)

        // Updating the text content of story
        story.textContent = newStory;
        // Making the story class visible
        story.style.visibility = 'visible';
    }
})