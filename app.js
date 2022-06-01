// const domElement = document.getElementById("selector-id");
// const domElement1 = document.querySelector("#id-name");
// const domElement2 = document.querySelector(".class-name");
// const domElement3 = document.querySelectorAll(".class-name");
// const domElement4 = document.getElementByClassName("class-name");

// const element2Children = Array.from(domElement2.children); // creates array from E2 children
// element2Children.forEach(function); // calls function on each child of E2

const mainContainer = document.getElementById("container")
let result
let players = [
    { name: 'Player1', choice:'', score: 0},
    { name: 'Player2', choice:'', score: 0}
]
let headers = ['Name', 'Score']

// Render Result Page __________________________________________
const renderResult = (ch1, ch2) => {
    
    const resultContainer = document.createElement("div")
    // Display Text
    const resultText = document.createElement("h3")
    resultText.innerText = getResult(ch1, ch2)
    console.log(result)
    resultContainer.appendChild(resultText)

    // Image Element
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

    // Score Board 
    const scoreBoard = document.createElement("table")
    const headerRow = document.createElement("tr")

    headers.forEach( header => {
        const column = document.createElement("th")
        const textNode = document.createTextNode(header)
        column.appendChild(textNode)
        headerRow.appendChild(column)
    })
    scoreBoard.appendChild(headerRow)

    players.forEach( player => {
        const row = document.createElement("tr")

        Object.values(player).forEach( text => {
            const cell = document.createElement("td")
            const textNode = document.createTextNode(text)
            cell.appendChild(textNode)
            row.appendChild(cell)
        })
        scoreBoard.appendChild(row)
    })

    // New Game Button
    const btnContainer = document.createElement("div")

    const newGameButton = document.createElement("button")
    newGameButton.classList.add("new-game-btn")
    const btnText = document.createElement("h4")
    btnText.innerText = "New Game"
    newGameButton.appendChild(btnText)
    btnContainer.appendChild(newGameButton)
    
    const newGameClick = () => {
        mainContainer.removeChild(resultContainer)
        mainContainer.removeChild(btnContainer)
        mainContainer.removeChild(scoreBoard)
        players[0].choice = ""
        players[1].choice = ""
        result = null
        renderStart()
    }

    newGameButton.onclick = newGameClick

    // Reset Button
    const resetButton = document.createElement("button")
    const scoreBtnText = document.createElement("h4")
    scoreBtnText.innerText = "Reset"
    resetButton.appendChild(scoreBtnText)
    btnContainer.appendChild(resetButton)

    const resetClick = () => {
        mainContainer.removeChild(resultContainer)
        mainContainer.removeChild(btnContainer)
        mainContainer.removeChild(scoreBoard)
        players[0].name = "Player1"
        players[1].name = "Player2"
        players[0].score = 0
        players[1].score = 0
        players[0].choice = ""
        players[1].choice = ""
        result = null
        renderStart()
    }

    resetButton.onclick = resetClick

    
    // Append all child elements to main Container
    mainContainer.appendChild(resultContainer)
    mainContainer.appendChild(scoreBoard)
    mainContainer.appendChild(btnContainer)
}

// Render Prompt after Player1's choice___________________________________
const renderPrompt = () => {
    const prompt = document.createElement("h3")
    prompt.classList.add("prompt")
    prompt.innerText = `${players[0].name}'s choice locked and loaded. ${players[1].name}, it's your turn.`

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

// Render Choices Page__________________________________________________
const renderChoices = () => {

    // Display Player Name
    const nameContainer = document.createElement("div")
    nameContainer.classList.add("name-container")

    const playerName = document.createElement("h3")
    playerName.classList.add("player-name")
    playerName.innerText = players[0].choice.length ? players[1].name : players[0].name
    nameContainer.appendChild(playerName)
    
    // Custom Name Functionality
    const inputName = document.createElement("input")
    inputName.setAttribute("type", "text")
    inputName.setAttribute("id", "player-name")
    nameContainer.appendChild(inputName)

    const okButton = document.createElement("button")
    okButton.classList.add("name-btn")
    const inputText = document.createElement("h4")
    inputText.innerText = "OK"
    okButton.appendChild(inputText)
    nameContainer.appendChild(okButton)

    const setName = () => {
        if (players[0].choice.length) {
            players[1].name = document.getElementById("player-name").value 
        } else {
            players[0].name = document.getElementById("player-name").value
        }
        playerName.innerText = document.getElementById("player-name").value
        document.getElementById("player-name").value = null
    }

    okButton.onclick = setName

    // Rock, Paper, Scissors Buttons
    const choiceContainer = document.createElement("div")
    choiceContainer.classList.add("choice-container")

    const handleClick = (choice) => {
        players[0].choice.length ? players[1].choice = choice : players[0].choice = choice
        mainContainer.removeChild(choiceContainer)
        mainContainer.removeChild(nameContainer)
        if (!players[1].choice) {
            return renderPrompt()
        } else {
            renderResult(players[0].choice, players[1].choice)
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


    mainContainer.appendChild(nameContainer)
    mainContainer.appendChild(choiceContainer)
}

// Render Start Page____________________________________________________
const renderStart = () => {
    // Start Game Button
    const startButton = document.createElement("button")
    startButton.classList.add("start-btn")

    const buttonText = document.createElement("h3")
    buttonText.innerText = "Start Game"
    startButton.appendChild(buttonText)

    const handleClick = () => {
      mainContainer.removeChild(startButton);
      renderChoices()
    }

    startButton.onclick = handleClick


    mainContainer.appendChild(startButton)
}

// Call to render Start Page___________________________________________
renderStart()



// Logic ___________________________________________________________
function getResult(p1, p2) {
    if (p1 === p2) {
        result = 0
        return 'It\'s a DRAW!';
    }
    if (p1 == 'rock' && p2 == 'paper') {
        result = 2
        players[1].score++
        return `${players[1].name} is the WINNER`
    }
    if (p1 == 'rock' && p2 == 'scissors') {
        result = 1
        players[0].score++
        return `${players[0].name} is the WINNER`
    }
    if (p1 == 'paper' && p2 == 'rock') {
        result = 1
        players[0].score++
        return `${players[0].name} is the WINNER`
    }
    if (p1 == 'paper' && p2 == 'scissors') {
        result = 2
        players[1].score++
        return `${players[1].name} is the WINNER`
    }
    if (p1 == 'scissors' && p2 == 'rock') {
        result = 2
        players[1].score++
        return `${players[1].name} is the WINNER`
    }
    if (p1 == 'scissors' && p2 == 'paper') {
        result = 1
        players[0].score++
        return `${players[0].name} is the WINNER`
    }
}