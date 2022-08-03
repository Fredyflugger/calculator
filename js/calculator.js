const createElement = (element, className) => {
    let el = document.createElement(`${element}`)
    el.className = `${className}`

    return el
}

const calculatorLayout = () => {
    // Находим врап калькулятора
    let calcWrap = document.getElementById('calculator')
    // Создаём доп. окно вывода
    let supportScreen = createElement('input', 'screen')
    supportScreen.type = "text"
    supportScreen.value = ""
    supportScreen.disabled = true
    supportScreen.id = "support-screen"
    calcWrap.appendChild(supportScreen)
    // Создаём основное окно вывода
    let screen = createElement('input', 'screen')
    screen.type = "text"
    screen.value = 0
    screen.disabled = true
    screen.id = "screen"
    calcWrap.appendChild(screen)
    // Создаём врап для кнопочек
    let btnsWrap = createElement('div', 'btnsWrap')
    btnsWrap.id = 'btnsWrap'
    calcWrap.appendChild(btnsWrap)
    // Создаём кнопочки очень странным путём
    for (let i = 0; i < 20; i++) {
        let calcBtn = createElement('div', 'calcButton')
        calcBtn.id = 'button_' + i
        calcBtn.addEventListener("mouseover", mouseover, false)
        calcBtn.addEventListener("mouseout", mouseout, false)
        calcBtn.addEventListener("click", onclick, false)
        btnsWrap.appendChild(calcBtn);
        switch (i) {
            case 0:
                calcBtn.innerText = 'x^2'
                break
            case 1:
                calcBtn.innerText = 'sqrt(x)'
                break
            case 2:
                calcBtn.innerText = 'c'
                break
            case 3:
                calcBtn.innerText = '/'
                break
            case 4:
                calcBtn.innerText = '7'
                break
            case 5:
                calcBtn.innerText = '8'
                break
            case 6:
                calcBtn.innerText = '9'
                break
            case 7:
                calcBtn.innerText = 'x'
                break
            case 8:
                calcBtn.innerText = '4'
                break
            case 9:
                calcBtn.innerText = '5'
                break
            case 10:
                calcBtn.innerText = '6'
                break
            case 11:
                calcBtn.innerText = '-'
                break
            case 12:
                calcBtn.innerText = '1'
                break
            case 13:
                calcBtn.innerText = '2'
                break
            case 14:
                calcBtn.innerText = '3'
                break
            case 15:
                calcBtn.innerText = '+'
                break
            case 16:
                calcBtn.innerText = '<-'
                break
            case 17:
                calcBtn.innerText = '0'
                break
            case 18:
                calcBtn.innerText = '.'
                break
            case 19:
                calcBtn.innerText = '='
                break
        }
        btnsWrap.appendChild(calcBtn)
    }
}

// Функция для маусовер ивента
const mouseover = (e) => {
    e.target.style.cursor = 'pointer'
    e.target.style.transition = 'background-color 0.3s'
    e.target.style.backgroundColor = 'lightgray'
}

// Функция для маусаут ивента
const mouseout = (e) => {
    e.target.style.cursor = ''
    e.target.style.backgroundColor = ''
}

// Функция вывода на экран
const input = (screen, newNum) => {
    newNumSplit = (screen.value + "").split(".");
    if (screen.value === "0" || opEnded === true) {
        screen.value = newNum
        opEnded = false
    } else if (screen.value.length < 17 && decimal === false) {
        screen.value += `${newNum}`
    } else if (decimal === true && newNumSplit[1].length < 6 && screen.value.length < 17) {
        screen.value += `${newNum}`
    }

}

// Вывод на доп. окно
screenMath = (math, supScreen, inputWindow) => {
    if (inputWindow.value === undefined || inputWindow.value === NaN || inputWindow.value === "Invalid input") {
        return "Invalid input"
    }
    mathType = math
    supScreen.value = inputWindow.value + ' ' + mathType
    numOne = parseFloat(inputWindow.value)
    inputWindow.value = 0
    decimal = false
}

// Математика для кнопочек
const makingSweetSweetMath = (numOne, numTwo, mathType) => {
    numOne *= 1000000
    numTwo *= 1000000
    opEnded = true
    decimal = false
    switch (mathType) {
        case "+":
            return (numOne + numTwo) / 1000000
        case "-":
            return (numOne - numTwo) / 1000000
        case "x":
            return numOne * numTwo / 1000000000000
        case "/":
            return numOne / numTwo
        case "sqrt":
            if (numOne >= 0) {
                return Math.sqrt(numOne) / 1000
            } else {
                return "Invalid input"
            }
        case "square":
            return numOne * numOne / 1000000000000
        default:
            break;
    }
}

// Объявляем глобальные переменные
var mathType = ""
var numOne
var numTwo
var tempNum = 0
var opEnded = false
var decimal = false

// функция ивента на клике, ну или сам калькулятор в целом. Так уж вышло.
const onclick = (e) => {
    // Ищем айди кнопочки, на которую нажали. А так же оба экрана.
    let targetBtnId = e.target.id
    let inputWindow = document.getElementById("screen")
    let supScreen = document.getElementById("support-screen")
    // Душа калькулятора! 
    switch (targetBtnId) {
        case "button_0": // square
            if (inputWindow.value === undefined || inputWindow.value === NaN || inputWindow.value === "Invalid input") {
                break
            }
            numOne = parseFloat(inputWindow.value)
            supScreen.value = `${numOne}^2`
            inputWindow.value = makingSweetSweetMath(numOne, 0, "square")
            mathType = "square"
            opEnded = true
            break
        case "button_1": // square root
            if (inputWindow.value === undefined || inputWindow.value === NaN || inputWindow.value === "Invalid input") {
                break
            }
            numOne = parseFloat(inputWindow.value)
            supScreen.value = `sqrt(${numOne})`
            inputWindow.value = makingSweetSweetMath(numOne, 0, "sqrt")
            mathType = "sqrt"
            opEnded = true
            break
        case "button_2": // clear screen
            inputWindow.value = 0
            supScreen.value = ""
            mathType = ""
            numOne = 0
            numTwo = 0
            opEnded = false
            decimal = false
            break
        case "button_3": // division
            screenMath("/", supScreen, inputWindow)
            break
        case "button_4":
            input(inputWindow, 7)
            break
        case "button_5":
            input(inputWindow, 8)
            break
        case "button_6":
            input(inputWindow, 9)
            break
        case "button_7": // multiplication
            screenMath("x", supScreen, inputWindow)
            break
        case "button_8":
            input(inputWindow, 4)
            break
        case "button_9":
            input(inputWindow, 5)
            break
        case "button_10":
            input(inputWindow, 6)
            break
        case "button_11": // subtraction
            screenMath("-", supScreen, inputWindow)
            break
        case "button_12":
            input(inputWindow, 1)
            break
        case "button_13":
            input(inputWindow, 2)
            break
        case "button_14":
            input(inputWindow, 3)
            break
        case "button_15": // addition
            screenMath("+", supScreen, inputWindow)
            break
        case "button_16": // backspace
            if (inputWindow.value == "Invalid input" || inputWindow.value == undefined) {
                break
            }
            if (inputWindow.value.length > 1) {
                inputWindow.value = inputWindow.value.slice(0, -1);
            } else {
                inputWindow.value = 0
            }
            break
        case "button_17":
            input(inputWindow, 0)
            break
        case "button_18": // dot
            if (decimal === false && opEnded === false) {
                inputWindow.value += "."
                decimal = true
            }
            break
            
        case "button_19": // equals
            numTwo = parseFloat(inputWindow.value)
            if (supScreen.value === "" || numTwo === undefined) {
                break
            }
            if (inputWindow.value == "Invalid input" || inputWindow.value == undefined) {
                inputWindow.value = 0
                supScreen.value = ""
                mathType = ""
                numOne = 0
                numTwo = 0
                opEnded = false
                break
            }
            if (opEnded === true) {
                if (mathType === "sqrt") {
                    supScreen.value = "sqrt(" + inputWindow.value + ")"
                } else if (mathType === "square") {
                    supScreen.value = inputWindow.value + "^2"
                } else {
                    supScreen.value = inputWindow.value + ` ${mathType} ` + tempNum
                }
                numOne = parseFloat(inputWindow.value)
                inputWindow.value = makingSweetSweetMath(numOne, tempNum, mathType)
                break
            }
            tempNum = numTwo
            supScreen.value = supScreen.value + ' ' + inputWindow.value
            inputWindow.value = makingSweetSweetMath(numOne, numTwo, mathType)
            break
    }
}

window.onload = calculatorLayout()
