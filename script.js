const gameContainer = document.getElementById("game");

const COLORS = [
  "red",
  "blue",
  "green",
  "orange",
  "purple",
  "red",
  "blue",
  "green",
  "orange",
  "purple"
];

// here is a helper function to shuffle an array
// it returns the same array with values shuffled
// it is based on an algorithm called Fisher Yates if you want ot research more
function shuffle(array) {
  let counter = array.length;

  while (counter > 0) {
    let index = Math.floor(Math.random() * counter);

    counter--;

    // And swap the last element with it
    let temp = array[counter];
    array[counter] = array[index];
    array[index] = temp;
  }

  return array;
}

let shuffledColors = shuffle(COLORS);

// this function loops over the array of colors
// it creates a new div and gives it a class with the value of the color
// it also adds an event listener for a click for each card
function createDivsForColors(colorArray) {
  for (let color of colorArray) {

    const newDiv = document.createElement("div");

    newDiv.classList.add(color);

    newDiv.addEventListener("click", handleCardClick);

    gameContainer.append(newDiv);
  }
}

let count = 0;
let firstColor = null;
let secondColor = null;
let firstCard = null;
let secondCard = null;
let flippedCards = 0;
let clickLeft = 'true';
let score = 0;

// TODO: Implement this function!
function handleCardClick(event) {
  if (!clickLeft) return;
  if (event.target.classList.contains("flipped")) return;

  let currentColor = event.target;
  currentColor.setAttribute('data-status', 'flipped');
  count++;
  
  if (count === 1) {
    firstCard = currentColor;
    firstColor = firstCard.classList.value;
    event.target.style.backgroundColor = firstColor;
  } else if (count === 2 && currentColor !== firstCard) {
    secondCard = currentColor;
    secondColor = secondCard.classList.value;
    event.target.style.backgroundColor = secondColor;
    clickLeft = false;
    if (firstColor === secondColor) {
      flippedCards +=2;
      score += 25
      firstCard.removeEventListener("click", handleCardClick);
      secondCard.removeEventListener("click", handleCardClick);
      firstCard = null;
      secondCard = null;
      firstColor = null;
      secondColor = null;
      clickLeft = true;
    } else {
      setTimeout(function() {  firstCard.style.backgroundColor = '';
      secondCard.style.backgroundColor = '';
      firstCard.removeAttribute("data-status");
      secondCard.removeAttribute("data-status");
      // firstCard = null;
      // secondCard = null;
      // firstColor = null;
      // secondColor = null;
      clickLeft = true;}, 1000)
    }
    count = 0;
  } else {
    count--;
    return;
  };

  let scoreBoard = document.getElementById('score')
  scoreBoard.innerText = score;
  if (flippedCards === COLORS.length) {
  setTimeout(function() {
    alert(`Game over man! Game over! Your score is ${score}`);
  }, 1000)}
  
}

// when the DOM loads
createDivsForColors(shuffledColors);


//make sure only works if you click DIFFERENT cards