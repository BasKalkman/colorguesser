// Initial values and start game
var colors = [];
var pickedColor = '';
const blocks = document.querySelectorAll('.colorblock');
var difficulty = 6;
setBlockColors();

// LISTENERS FOR DIFFICULTY SELECTION
const easyDifficulty = document.querySelector('#easyDifficulty');
const hardDifficulty = document.querySelector('#hardDifficulty');
easyDifficulty.addEventListener('click', setDifficulty);
hardDifficulty.addEventListener('click', setDifficulty);


// FUNCTIONS
function generateColor() {
    let colorString = `rgb(${randColorNum()}, ${randColorNum()}, ${randColorNum()})`;
    return colorString;
}

function setDifficulty() {
    if (this.id === "easyDifficulty") {
        difficulty = 3;
        easyDifficulty.classList.add("selected");
        hardDifficulty.classList.remove("selected");
        setBlockColors();
    } else {
        difficulty = 6;
        easyDifficulty.classList.remove("selected");
        hardDifficulty.classList.add("selected");
        setBlockColors();
    }
}

function randColorNum() {
    return Math.floor(Math.random() * 256);
}

function populateColorArray(num) {
    colors = [];
    for (let i = 0; i < num; i++) {
        colors.push(generateColor());
    }
}

function setBlockColors() {
    // Populate the colors array based on difficulty
    blocks.forEach(function(e) {e.classList.remove('hiddenblock')}) // Reset from easy difficulty
    
    populateColorArray(difficulty);
    
    // Set target value
    pickedColor = colors[Math.floor(Math.random() * colors.length)];
    document.querySelector(".header").style.backgroundColor = "darkblue"; // Reset to default
    document.querySelector("#messageDisplay").textContent = ""; // reset to default
    document.getElementById('newgame').textContent = "New game"; // reset to default
    
    // Loop through the blocks
    for (let i = 0; i < blocks.length; i++) {
        // Set colors of blocks, hide if redundant by difficulty
        if (colors[i]) {
            blocks[i].style.backgroundColor = colors[i];
        } else {
            blocks[i].classList.add('hiddenblock');
        }
        // Set listeners
        blocks[i].addEventListener('click', checkChoice)
    }

    // Set target value in span
    document.querySelector("#headerColor").textContent = pickedColor;
}

function checkChoice() {
    if (this.style.backgroundColor === pickedColor) {
        for (let i = 0; i < blocks.length; i++) {
            blocks[i].style.backgroundColor = pickedColor;
        }
        document.querySelector(".header").style.backgroundColor = pickedColor;
        document.getElementById("messageDisplay").textContent = "Correct!";
        document.getElementById('newgame').textContent = "Play again?";
    } else {
        document.getElementById('messageDisplay').textContent = "Try again";
        this.style.backgroundColor = '#232323';
    }
}