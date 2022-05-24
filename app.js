const mainContainer = document.getElementById("container")
let player1Choice = ""
let player2Choice = ""

const renderPrompt = () => {
    const promptContainer = document.createElement("div")
    const prompt = document.createElement("h5")
    prompt.innerText = "Player 1 please turn around and let Player 2 make a choice"

    const promptButton = document.createElement("button")
    const promptButtonText = document.createElement("p")

    promptButtonText.innerText = "Ready!"
    promptButton.appendChild(promptButtonText)
    promptButton.onclick = () => {
        mainContainer.removeChild(promptContainer)
        renderPlayerChoice()
    }

    promptContainer.appendChild(prompt)
    promptContainer.appendChild(promptButton)

    mainContainer.appendChild(promptContainer)
}

const renderResult = () => {
    const resultContainer = document.createElement("div")
    const resultText = document.createElement("h3")
    resultText.innerText = getResult(player1Choice, player2Choice)

    const restartButton = document.createElement("button")
    const restartButtonText = document.createElement("p")
    restartButtonText.innerText = "Restart"
    restartButton.appendChild(restartButtonText)
    restartButton.onclick = () => {
        mainContainer.removeChild(resultContainer)
        player1Choice = ""
        player2Choice = ""
        renderStartGameButton()
    }
    resultContainer.appendChild(resultText)
    resultContainer.appendChild(restartButton)
    mainContainer.appendChild(resultContainer)
}

const renderPlayerChoice = () => {
    const choices = ["rock", "paper","scissors"]
    const choiceContainer = document.createElement("div")
    const playerName = document.createElement("h5")
    playerName.innerText = player1Choice.length ? "Player2" : "Player1"
    choiceContainer.classList.add("rps-choice-container")

    const handleButtonClick = (choice) => {
        player1Choice.length ? player2Choice = choice : player1Choice = choice
        mainContainer.removeChild(choiceContainer)
        mainContainer.removeChild(playerName)
        if(!player2Choice.length) return renderPrompt()
        renderResult()
    }


    choices.forEach(choice => {
        const button = document.createElement("button")
        const buttonText = document.createElement("p")
        buttonText.innerText = choice
        button.appendChild(buttonText)
        button.onclick = () => handleButtonClick(choice)

        choiceContainer.appendChild(button)
    })

    mainContainer.appendChild(playerName)
    mainContainer.appendChild(choiceContainer)
}



const renderStartGameButton = () => {
    const startGameButton = document.createElement("button")
    startGameButton.classList.add("rps-start-button")
    const handleButtonClick = () => {
        mainContainer.removeChild(startGameButton)
        renderPlayerChoice()
    }
    startGameButton.onclick = handleButtonClick

    const buttonText = document.createElement("p")
    buttonText.innerText = "Start Game"
    startGameButton.appendChild(buttonText)

    mainContainer.appendChild(startGameButton)
}




renderStartGameButton()





const getResult = (choice1, choice2) => {
    if (choice1 === choice2) {
        return 'It\'s a DRAW!';
    }
    if (choice1 === 'rock' && choice2 === 'paper') {
        return 'Player 2 is the WINNER'
    }
    if (choice1 === 'rock' && choice2 === 'scissors') {
        return 'Player 1 is the WINNER'
    }
    if (choice1 === 'paper' && choice2 === 'rock') {
        return 'Player 1 is the WINNER'
    }
    if (choice1 === 'paper' && choice2 === 'scissors') {
        return 'Player 2 is the WINNER'
    }
    if (choice1 === 'scissors' && choice2 === 'rock') {
        return 'Player 2 is the WINNER'
    }
    if (choice1 === 'scissors' && choice2 === 'paper') {
        return 'Player 1 is the WINNER'
    }
}