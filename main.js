const resultEl = document.getElementById('result')
const lengthEl = document.getElementById('length')
const uppercaseEl = document.getElementById('uppercase')
const lowercaseEl = document.getElementById('lowercase')
const numbersEl = document.getElementById('numbers')
const symbolsEl = document.getElementById('symbols')
const generateEl = document.getElementById('generate')
const clipboardEl = document.getElementById('clipboard')

const modalOverlayEl = document.getElementById('modal-overlay')
const modalMessageEl = document.getElementById('message')
const modalButton = document.getElementById('close-modal')

const randomFunc = {
  upper: getRandomUpper,
  lower: getRandomLower,
  number: getRandomNumber,
  symbol: getRandomSymbol
}

function generatePassword(upper, lower, number, symbol, length) {
  let generatedPasswordArray = []
  let finalPassword = ''

  const typesCount = upper + lower + number + symbol
  const typesArray = [{upper}, {lower}, {number}, {symbol}].filter(item => Object.values(item)[0])

  if (typesCount === 0 ) {
    showModal('Can\'t generate password without types.')
    return ''
  }

  for (let i = 0; i < length; i += typesCount) {
    typesArray.forEach(type => {
      const funcName = Object.keys(type)[0]
      const key = randomFunc[funcName]()

      Math.round(Math.random()) ? generatedPasswordArray.unshift(key) : generatedPasswordArray.push(key)
    })
  }

  generatedPasswordArray.forEach(key => finalPassword += key)

  return finalPassword
}

function getRandomLower() {
  return String.fromCharCode(Math.floor(Math.random() * 26) + 97)
}

function getRandomUpper() {
  return String.fromCharCode(Math.floor(Math.random() * 26) + 65)
}

function getRandomNumber() {
  return String.fromCharCode(Math.floor(Math.random() * 10) + 48)
}

function getRandomSymbol() {
  const symbols = '!@#$%^&*(){}[]=<>/,.'
  return symbols[Math.floor(Math.random() * symbols.length)]
}

function showModal(message) {
  modalMessageEl.innerText = message
  modalOverlayEl.classList.add("show-modal")
}

clipboardEl.addEventListener('click', () => {
  const textarea = document.createElement('textarea')
  const password = resultEl.innerText

  if (!password) {
    showModal("Generate a password before copy.")
    return
  }

  textarea.value = password

  document.body.appendChild(textarea)
  textarea.select()
  document.execCommand('copy')
  textarea.remove()
  showModal('Password copied to clipboard!')
})

generateEl.addEventListener('click', () => {
  const length = Number(lengthEl.value)
  const hasUpper = uppercaseEl.checked
  const hasLower = lowercaseEl.checked
  const hasNumber = numbersEl.checked
  const hasSymbol = symbolsEl.checked

  resultEl.innerText = generatePassword(hasUpper, hasLower, hasNumber, hasSymbol, length)
})

modalButton.addEventListener('click', () => modalOverlayEl.classList.contains('show-modal') ? modalOverlayEl.classList.remove('show-modal') : '')