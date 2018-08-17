// Initial values and start game
var colors = [];
var pickedColor = '';
const blocks = document.querySelectorAll('.colorblock');
var difficulty = "hard";
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
        difficulty = "easy";
        easyDifficulty.classList.add("selected");
        hardDifficulty.classList.remove("selected");
        setBlockColors();
    } else {
        difficulty = "hard";
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
        let color = generateColor();
        colors.push(color);
    }
}

function setBlockColors() {
    // Populate the colors array based on difficulty
    if (difficulty === 'hard') {
        blocks.forEach(function(e) {e.classList.remove('hiddenblock')}) // Reset from easy difficulty
        populateColorArray(6);
    } else {
        populateColorArray(3);
    }

    // Set target value
    pickedColor = colors[Math.floor(Math.random() * colors.length)];
    document.querySelector(".header").style.backgroundColor = "darkblue"; // Reset to default
    document.querySelector("#messageDisplay").textContent = ""; // reset to default
    
    // Loop through the blocks
    for (let i = 0; i < blocks.length; i++) {
        // Set colors of blocks, hide if redundant by difficulty
        if (i >= colors.length) {
            blocks[i].classList.add('hiddenblock');
        } else {
            blocks[i].style.backgroundColor = colors[i];
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
    } else {
        document.getElementById('messageDisplay').textContent = "Try again";
        this.style.backgroundColor = '#232323';
    }
}