const body = document.querySelector('body')
const form = document.querySelector('form')
const email = document.querySelector('#mail')
const emailError = document.querySelector('#mail + span.error')
const zip = document.querySelector('#zip')
const zipError = document.querySelector('#zip + span.error')
const country = document.querySelector('#country')
const countryError = document.querySelector('#country + span.error')
const password = document.querySelector('#password')
const passwordError = document.querySelector('#password + span.error')
const passwordConfirm = document.querySelector('#password-confirm')
const passwordConfirmError = document.querySelector('#password-confirm + span.error')

email.addEventListener('input', () => {
  if (email.validity.valid) {
    emailError.textContent = ''
    emailError.className = 'error'
  } else {
    showEmailError()
  }
})
zip.addEventListener('input', () => {
  if (zip.validity.valid) {
    zipError.textContent = ''
    zipError.className = 'error'
  } else {
    showZipError()
  }
})
country.addEventListener('input', () => {
  if (country.validity.valid) {
    countryError.textContent = ''
    countryError.className = 'error'
  } else {
    showCountryError()
  }
})
password.addEventListener('input', () => {
  if (password.validity.valid) {
    passwordError.textContent = ''
    passwordError.className = 'error'
  } else {
    showPasswordError()
  }
})
passwordConfirm.addEventListener('input', () => {
  if (!password.validity.valid) {
    showPasswordConfirmError()
  } else if (passwordConfirm.value === password.value) {
    passwordConfirmError.textContent = ''
    passwordConfirmError.className = 'error'
  } else {
    showPasswordConfirmError()
  }
})

form.addEventListener('submit', (event) => {
  event.preventDefault()
  if (!email.validity.valid) {
    showEmailError()
  } else if (!zip.validity.valid) {
    showZipError()
  } else if (!country.validity.valid) {
    showCountryError()
  } else if (!password.validity.valid) {
    showPasswordError()
  } else if (passwordConfirm.value !== password.value) {
    showPasswordConfirmError()
  } else {
    form.remove()
    const highFive = document.createElement('div')
    highFive.textContent = 'HIGH FIVE!!!'
    highFive.style.fontSize = '300px'
    body.append(highFive)
  }
})

function showEmailError () {
  if (email.validity.valueMissing) {
    emailError.textContent = 'Enter email address'
  } else if (email.validity.typeMismatch) {
    emailError.textContent = 'Entered value needs to be email address'
  } else if (email.validity.tooShort) {
    emailError.textContent = `Entered value needs to be at least 8 characters;
    you entered: ${email.value.length}`
  }

  emailError.className = 'error active'
}
function showZipError () {
  if (zip.validity.valueMissing) {
    zipError.textContent = 'Enter zipcode'
  } else if (Number.isInteger(parseInt(zip.value)) === false) {
    zipError.textContent = 'Entered value can only contain numbers'
  } else if (zip.value.length < 5 || zip.value.length > 5) {
    zipError.textContent = `Entered value needs to be exactly 5 digits;
    you entered: ${zip.value.length}`
  }

  zipError.className = 'error active'
}
function showCountryError () {
  if (country.validity.valueMissing) {
    countryError.textContent = 'Enter country'
  } else if (country.validity.patternMismatch) {
    countryError.textContent = 'Entered value can only contain letters'
  } else if (country.validity.tooShort) {
    countryError.textContent = `Entered value needs to be at least
    ${country.minLength} characters; you entered ${country.value.length}`
  }

  countryError.className = 'error active'
}
function showPasswordError () {
  if (password.validity.valueMissing) {
    passwordError.textContent = 'Enter password'
  } else if (password.validity.tooShort) {
    passwordError.textContent = `Entered value needs to be at least
    ${password.minLength} characters; you entered ${password.value.length}`
  } else if (password.value === password.value.toLowerCase()) {
    passwordError.textContent = 'Entered value needs to contain at least one uppercase letter'
  } else if (password.value === password.value.toUpperCase()) {
    passwordError.textContent = 'Entered value needs to contain at least one lowercase letter'
  } else if (!(function hasNumber (myString) { return /\d/.test(myString) })(password.value)) {
    passwordError.textContent = 'Entered value needs to contain at least one number'
  }

  passwordError.className = 'error active'
}
function showPasswordConfirmError () {
  if (!password.value) {
    passwordConfirmError.className = 'error active'
    passwordConfirmError.textContent = 'Fill the previous field first'
    passwordConfirm.value = ''
  } else if (!password.validity.valid) {
    passwordConfirmError.className = 'error active'
    passwordConfirmError.textContent = 'Previous field is not valid; correct that first'
    passwordConfirm.value = ''
  } else if (passwordConfirm.validity.valueMissing) {
    passwordConfirmError.textContent = 'Enter password again'
  } else if (passwordConfirm.value !== password.value) {
    passwordConfirmError.textContent = 'Entered password does not match previously entered password'
  }

  passwordConfirmError.className = 'error active'
}
