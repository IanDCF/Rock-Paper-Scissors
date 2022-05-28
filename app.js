// const domElement = document.getElementById("selector-id");
// const domElement1 = document.querySelector("#id-name");
// const domElement2 = document.querySelector(".class-name");
// const domElement3 = document.querySelectorAll(".class-name");
// const domElement4 = document.getElementByClassName("class-name");

// const element2Children = Array.from(domElement2.children); // creates array from E2 children
// element2Children.forEach(function); // calls function on each child of E2

const mainContainer = document.getElementById("container")
let p1Name = "Player1"
let p2Name = "Player2"
let choice1 = ""
let choice2 = ""
let result
var count1 = 0
var count2 = 0
let players = [
    { name: p1Name, score: count1},
    { name: p2Name, score: count2}
]
let headers = ['Name', 'Score']

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

// Score Board _________________________________________________
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


    const newGameButton = document.createElement("button")
    newGameButton.classList.add("new-game-btn")
    const btnText = document.createElement("h4")
    btnText.innerText = "New Game"
    newGameButton.appendChild(btnText)
    
    const handleClick = () => {
        mainContainer.removeChild(resultContainer)
        mainContainer.removeChild(newGameButton)
        mainContainer.removeChild(resetButton)
        mainContainer.removeChild(scoreBoard)
        choice1 = ""
        choice2 = ""
        p1Name = "Player1"
        p2Name = "Player2"
        result = null
        renderStart()
    }

    newGameButton.onclick = handleClick

    const resetButton = document.createElement("button")
    const scoreBtnText = document.createElement("h4")
    scoreBtnText.innerText = "Reset"
    resetButton.appendChild(scoreBtnText)

    

    mainContainer.appendChild(resultContainer)
    mainContainer.appendChild(scoreBoard)
    mainContainer.appendChild(newGameButton)
    mainContainer.appendChild(resetButton)
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

    const nameContainer = document.createElement("div")
    nameContainer.classList.add("name-container")

    const playerName = document.createElement("h3")
    playerName.classList.add("player-name")
    playerName.innerText = choice1.length ? p2Name : p1Name
    nameContainer.appendChild(playerName)

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
        if (choice1.length) {
            p2Name = document.getElementById("player-name").value 
        } else {
            p1Name = document.getElementById("player-name").value
        }
        playerName.innerText = document.getElementById("player-name").value
        document.getElementById("player-name").value = null
    }

    okButton.onclick = setName

    const handleClick = (choice) => {
        choice1.length ? choice2 = choice : choice1 = choice
        mainContainer.removeChild(choiceContainer)
        mainContainer.removeChild(nameContainer)
        if (!choice2) {
            return renderPrompt()
        } else {
            console.log(choice1, choice2)
            renderResult(choice1, choice2)
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




function getResult(p1, p2) {
    if (p1 === p2) {
        result = 0
        return 'It\'s a DRAW!';
    }
    if (p1 == 'rock' && p2 == 'paper') {
        result = 2
        count2++
        return `${p2Name} is the WINNER`
    }
    if (p1 == 'rock' && p2 == 'scissors') {
        result = 1
        count1++
        return `${p1Name} is the WINNER`
    }
    if (p1 == 'paper' && p2 == 'rock') {
        result = 1
        count1++
        return `${p1Name} is the WINNER`
    }
    if (p1 == 'paper' && p2 == 'scissors') {
        result = 2
        count2++
        return `${p2Name} is the WINNER`
    }
    if (p1 == 'scissors' && p2 == 'rock') {
        result = 2
        count2++
        return `${p2Name} is the WINNER`
    }
    if (p1 == 'scissors' && p2 == 'paper') {
        result = 1
        count1++
        return `${p1Name} is the WINNER`
    }
}