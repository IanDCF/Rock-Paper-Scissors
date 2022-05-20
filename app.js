// const domElement = document.getElementById("selector-id");
// const domElement1 = document.querySelector("#id-name");
// const domElement2 = document.querySelector(".class-name");
// const domElement3 = document.querySelectorAll(".class-name");
// const domElement4 = document.getElementByClassName("class-name");

// const element2Children = Array.from(domElement2.children); // creates array from E2 children
// element2Children.forEach(function); // calls function on each child of E2

const userDisplay1 = document.getElementById("user1");
const userDisplay2 = document.getElementById("user2");
const resultDisplay = document.getElementById("result");

const user1Choice = document.querySelectorAll(".u1choice");
let choice1;

user1Choice.forEach(choice => choice.addEventListener('click', (e) => {
    choice1 = e.target.id;
    userDisplay1.innerHTML = choice1;
}))

const user2Choice = document.querySelectorAll(".u2choice");
let choice2;

user2Choice.forEach(choice => choice.addEventListener('click', (e) => {
    choice2 = e.target.id;
    userDisplay2.innerHTML = choice2;
}))

const shoot = document.getElementById("shoot");
let result;
shoot.addEventListener('click', () => {
    if(choice1 && choice2) {
        getResult()
    }
})


function getResult() {
    if (choice1 === choice2) {
        result = 'It\'s a DRAW!';
    }
    if (choice1 == 'rock' && choice2 == 'paper') {
        result = 'User 2 is the WINNER'
    }
    if (choice1 == 'rock' && choice2 == 'scissors') {
        result = 'User 1 is the WINNER'
    }
    if (choice1 == 'paper' && choice2 == 'rock') {
        result = 'User 1 is the WINNER'
    }
    if (choice1 == 'paper' && choice2 == 'scissors') {
        result = 'User 2 is the WINNER'
    }
    if (choice1 == 'scissors' && choice2 == 'rock') {
        result = 'User 2 is the WINNER'
    }
    if (choice1 == 'scissors' && choice2 == 'paper') {
        result = 'User 1 is the WINNER'
    }

    resultDisplay.innerHTML = result;
}