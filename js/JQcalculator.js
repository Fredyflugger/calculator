class JQCalculator {
    constructor() {
        this.numOne = undefined
        this.numTwo = undefined
        this.mathType = ""
        this.tempNum = 0
        this.opEnded = false
        this.decimal = false
    }

    calculatorLayout() {
        self = this
        let buttonsText = ['x^2', 'sqrt(x)', 'c', '/', '7', '8', '9', 'x', '4', '5', '6', '-', '1', '2', '3', '+', '<-', '0', '.', '=']

        // Создаём доп. окно вывода
        $(`<input type="text">`).attr({
            "disabled" : true,
            "id" : "support-screen",
            "class" : "screen",
        }).val("").appendTo("#calculator")

        // Создаём основное окно вывода
        $(`<input type="text">`).attr({
            "disabled" : true,
            "id" : "screen",
            "class" : "screen",
        }).val("0").appendTo("#calculator")

        // Создаём врап для кнопочек
        $(`<div></div>`).attr({
            "id" : "btnsWrap",
            "class" : "btnsWrap",
        }).appendTo("#calculator")

        // Создаём кнопочки
        for (let i = 0; i < 20; i++) {
            $(`<div></div>`).attr({
                "class" : "calcButton",
                "id" : 'button_' + i,
            }).hover(this.mouseover, this.mouseout).on("click", function() {
                self.onclick(this)
            }).text(buttonsText[i]).appendTo("#btnsWrap")
        }
    }

    // Функция для маусовер ивента
    mouseover() {
        $(this).css({
            "cursor" : "pointer",
            "transition" : "background-color 0.3s",
            "backgroundColor" : "lightgray",
        })
    }

    // Функция для маусаут ивента
    mouseout() {
        $(this).css({
            "cursor" : "",
            "backgroundColor" : "",
        })
    }

    // Функция вывода на экран
    input(screen, newNum) {
        let screenVal = screen.val()
        let newNumSplit = (screenVal + "").split(".");
        if (screenVal === "0" || this.opEnded === true) {
            screen.val(newNum)
            this.opEnded = false
        } else if (screenVal.length < 17 && this.decimal === false) {
            screen.val(screenVal += `${newNum}`) 
        } else if (this.decimal === true && newNumSplit[1].length < 6 && screenVal.length < 17) {
            screen.val(screenVal += `${newNum}`)
        }
    }

    // Вывод на доп. окно
    screenMath(math, supScreen, inputWindow) {
        let inputWindowVal = inputWindow.val()
        let supScreenVal = supScreen.val()
        if (inputWindowVal === undefined || inputWindowVal === NaN || inputWindowVal === "Invalid input") {
            return "Invalid input"
        }
        this.mathType = math
        supScreen.val(inputWindowVal + ' ' + this.mathType)
        this.numOne = parseFloat(inputWindowVal)
        inputWindow.val(0)
        this.decimal = false
    }
    // Математика для кнопочек
    makingSweetSweetMath(numOne, numTwo, mathType) {
        numOne *= 1000000
        numTwo *= 1000000
        this.opEnded = true
        this.decimal = false
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
    // функция ивента на клике, ну или сам калькулятор в целом. Так уж вышло.
    onclick(that) {
        // Ищем айди кнопочки, на которую нажали. А так же оба экрана.
        let targetBtnId = $(that).attr("id")
        let inputWindow = $('#screen')
        let inputWindowVal = inputWindow.val()
        let supScreen = $('#support-screen')
        let supScreenVal = supScreen.val()
        // Душа калькулятора! 
        switch (targetBtnId) {
            case "button_0": // square
                if (inputWindowVal === undefined || inputWindowVal === NaN || inputWindowVal === "Invalid input") {
                    break
                }
                this.numOne = parseFloat(inputWindowVal)
                supScreenVal = `${this.numOne}^2`
                inputWindow.val(this.makingSweetSweetMath(this.numOne, 0, "square")) 
                this.mathType = "square"
                this.opEnded = true
                break
            case "button_1": // square root
                if (inputWindowVal === undefined || inputWindowVal === NaN || inputWindowVal === "Invalid input") {
                    break
                }
                this.numOne = parseFloat(inputWindowVal)
                supScreen.val(`sqrt(${this.numOne})`) 
                inputWindow.val(this.makingSweetSweetMath(this.numOne, 0, "sqrt"))
                this.mathType = "sqrt"
                this.opEnded = true
                break
            case "button_2": // clear screen
                inputWindow.val("0")
                supScreen.val("")
                this.mathType = ""
                this.numOne = 0
                this.numTwo = 0
                this.opEnded = false
                this.decimal = false
                break
            case "button_3": // division
                this.screenMath("/", supScreen, inputWindow)
                break
            case "button_4":
                this.input(inputWindow, 7)
                break
            case "button_5":
                this.input(inputWindow, 8)
                break
            case "button_6":
                this.input(inputWindow, 9)
                break
            case "button_7": // multiplication
                this.screenMath("x", supScreen, inputWindow)
                break
            case "button_8":
                this.input(inputWindow, 4)
                break
            case "button_9":
                this.input(inputWindow, 5)
                break
            case "button_10":
                this.input(inputWindow, 6)
                break
            case "button_11": // subtraction
                this.screenMath("-", supScreen, inputWindow)
                break
            case "button_12":
                this.input(inputWindow, 1)
                break
            case "button_13":
                this.input(inputWindow, 2)
                break
            case "button_14":
                this.input(inputWindow, 3)
                break
            case "button_15": // addition
                this.screenMath("+", supScreen, inputWindow)
                break
            case "button_16": // backspace
                if (inputWindowVal == "Invalid input" || inputWindowVal == undefined) {
                    break
                }
                if (inputWindowVal.length > 1) {
                    inputWindow.val(inputWindowVal.slice(0, -1))
                } else {
                    inputWindow.val("0")
                }
                break
            case "button_17":
                this.input(inputWindow, 0)
                break
            case "button_18": // dot
                if (this.decimal === false && this.opEnded === false) {
                    inputWindow.val(inputWindowVal += ".") 
                    this.decimal = true
                }
                break
                
            case "button_19": // equals
                this.numTwo = parseFloat(inputWindowVal)
                if (supScreenVal === "" || this.numTwo === undefined) {
                    break
                }
                if (inputWindowVal == "Invalid input" || inputWindowVal == undefined) {
                    inputWindow.val("0")
                    supScreen.val("")
                    this.mathType = ""
                    this.numOne = 0
                    this.numTwo = 0
                    this.opEnded = false
                    break
                }
                if (this.opEnded === true) {
                    if (this.mathType === "sqrt") {
                        supScreen.val("sqrt(" + inputWindowVal + ")")
                    } else if (this.mathType === "square") {
                        supScreen.val(inputWindowVal + "^2")
                    } else {
                        supScreen.val(inputWindowVal + ` ${this.mathType} ` + this.tempNum)
                    }
                    this.numOne = parseFloat(inputWindowVal)
                    inputWindow.val(this.makingSweetSweetMath(this.numOne, this.tempNum, this.mathType))
                    break
                }
                this.tempNum = this.numTwo
                supScreen.val(supScreenVal + ' ' + inputWindowVal)
                inputWindow.val(this.makingSweetSweetMath(this.numOne, this.numTwo, this.mathType))
                break
        }
    }
}

const calculator = new JQCalculator()
calculator.calculatorLayout()
