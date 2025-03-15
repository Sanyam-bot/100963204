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
        let name = customName.value !== "" ? customName.value: "Bob"
        let ukQuantities = document.getElementById("uk").checked
        let weight = ukQuantities ? Math.round(300 / 14) + " stone" : 300 + " pounds";
        let temperature = ukQuantities ? Math.round((94 - 32) * (5 / 9)) + " centigrade" : 94 + " fahrenheit";
        
        let xItem = randomValueFromArray(insertX);
        let yItem = randomValueFromArray(insertY);
        let zItem = randomValueFromArray(insertZ);

        let newStory = storyText;
        newStory = newStory.replaceAll(":insertx:", xItem)
        newStory = newStory.replaceAll(":inserty:", yItem)
        newStory = newStory.replaceAll(":insertz:", zItem)
        newStory = newStory.replaceAll(":name:", name)
        newStory = newStory.replaceAll(":temperature:", temperature)
        newStory = newStory.replaceAll(":weight:", weight)

        story.textContent = newStory;
        story.style.visibility = 'visible';
    }
})