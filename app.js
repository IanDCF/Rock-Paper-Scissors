// const domElement = document.getElementById("selector-id");
// const domElement1 = document.querySelector("#id-name");
// const domElement2 = document.querySelector(".class-name");
// const domElement3 = document.querySelectorAll(".class-name");
// const domElement4 = document.getElementByClassName("class-name");

// const element2Children = Array.from(domElement2.children); // creates array from E2 children
// element2Children.forEach(function); // calls function on each child of E2

const mainContainer = document.getElementById("container")
let player1 = ""
let player2 = ""
let result

const renderResult = (ch1, ch2) => {
    
    const resultContainer = document.createElement("div")
    const resultText = document.createElement("h3")
    resultText.innerText = getResult(ch1, ch2)
    console.log(result)
    resultContainer.appendChild(resultText)

    const img = document.createElement("img")
    img.classList.add("result-img")
    if (result === 0) {
        img.src = "https://images.unsplash.com/photo-1638262052640-82e94d64664a?crop=entropy&cs=tinysrgb&fm=jpg&ixlib=rb-1.2.1&q=80&raw_url=true&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1740"
    } else if (result === 1 || result === 2) {
        img.src = "https://images.unsplash.com/photo-1578269174936-2709b6aeb913?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1171&q=80"
    }
    img.style.boder = "1px solid orange"
    img.style.borderRadius = "2px"
    resultContainer.appendChild(img)

    const newGameButton = document.createElement("button")
    newGameButton.classList.add("new-game-btn")
    const btnText = document.createElement("h4")
    btnText.innerText = "New Game"
    newGameButton.appendChild(btnText)
    
    const handleClick = () => {
        mainContainer.removeChild(resultContainer)
        mainContainer.removeChild(newGameButton)
        player1 = ""
        player2 = ""
        result = null
        renderStart()
    }

    newGameButton.onclick = handleClick

    mainContainer.appendChild(resultContainer)
    mainContainer.appendChild(newGameButton)

}

const renderPrompt = () => {
    const prompt = document.createElement("h3")
    prompt.classList.add("prompt")
    prompt.innerText = "Player 1 choice locked and loaded. Player 2, it's your turn."

    const promptButton = document.createElement("button")
    promptButton.classList.add("prompt-btn")
    promptButton.innerText = "Ready"

    const handleClick = () => {
        mainContainer.removeChild(prompt)
        mainContainer.removeChild(promptButton)
        renderChoices()
    }

    promptButton.onclick = handleClick

    mainContainer.appendChild(prompt)
    mainContainer.appendChild(promptButton)
}

const renderChoices = () => {
    const choiceContainer = document.createElement("div")
    choiceContainer.classList.add("choice-container")

    const playerName = document.createElement("h3")
    playerName.classList.add("player-name")
    playerName.innerText = player1.length ? "Player 2" : "Player 1"
    choiceContainer.appendChild(playerName)

    const handleClick = (choice) => {
        player1.length ? player2 = choice : player1 = choice
        mainContainer.removeChild(choiceContainer)
        if (!player2) {
            return renderPrompt()
        } else {
            console.log(player1, player2)
            renderResult(player1, player2)
        }
    }
    
    const choices = ["rock", "paper", "scissors"]
    choices.forEach(choice => {
        const button = document.createElement("button")
        button.classList.add("choice-btn")

        const buttonText = document.createElement("h4")
        buttonText.innerText = choice
        button.appendChild(buttonText)

        button.onclick = () => handleClick(choice)

        choiceContainer.appendChild(button)
    })

    mainContainer.appendChild(choiceContainer)
}

const renderStart = () => {

    const startButton = document.createElement("button")
    startButton.classList.add("start-btn")

    const handleClick = () => {
      mainContainer.removeChild(startButton);
      renderChoices()
    }
    startButton.onclick = handleClick

    const buttonText = document.createElement("h3")
    buttonText.innerText = "Start Game"
    startButton.appendChild(buttonText)

    mainContainer.appendChild(startButton)
}

renderStart()




function getResult(choice1, choice2) {
    if (choice1 === choice2) {
        result = 0
        return 'It\'s a DRAW!';
    }
    if (choice1 == 'rock' && choice2 == 'paper') {
        result = 2
        return 'Player 2 is the WINNER'
    }
    if (choice1 == 'rock' && choice2 == 'scissors') {
        result = 1
        return 'Player 1 is the WINNER'
    }
    if (choice1 == 'paper' && choice2 == 'rock') {
        result = 1
        return 'Player 1 is the WINNER'
    }
    if (choice1 == 'paper' && choice2 == 'scissors') {
        result = 2
        return 'Player 2 is the WINNER'
    }
    if (choice1 == 'scissors' && choice2 == 'rock') {
        result = 2
        return 'Player 2 is the WINNER'
    }
    if (choice1 == 'scissors' && choice2 == 'paper') {
        result = 1
        return 'Player 1 is the WINNER'
    }
}