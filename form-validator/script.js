function init() {
  const formEl = document.querySelector("#signup-form")
  const userInputEl = document.querySelector("#username")
  const emailInputEl = document.querySelector("#email")
  const passInputEl = document.querySelector("#password")
  const passConfirmInputEl = document.querySelector("#confirm-password")
  const termsChboxEl = document.querySelector("#terms")

  const userErrorEl = document.querySelector("#username-error")
  const emailErrorEl = document.querySelector("#email-error")
  const passErrorEl = document.querySelector("#password-error")
  const passConfirmErrorEl = document.querySelector("#confirm-password-error")
  const termsChboxError = document.querySelector("#terms-error")

  const messageEl = document.querySelector("#success-message")

  const inputsElements = Array.from(formEl.querySelectorAll('input')).filter(input => input.type !== "checkbox");



  function getValidationRegex() {
    const usernameRegex = /^[a-zA-Z0-9_-]{3,20}$/;
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d).{8,}$/;

    return {
      usernameRegex,
      emailRegex,
      passwordRegex
    }
  }

  function validateUsername(input) {
    const { usernameRegex } = getValidationRegex();
    const inputValue = input.value.trim();

    return usernameRegex.test(inputValue)
  }

  function validateEmail(input) {
    const { emailRegex } = getValidationRegex();
    const inputValue = input.value.trim();

    return emailRegex.test(inputValue)
  }

  function validatePassword(input) {
    const { passwordRegex } = getValidationRegex();
    const inputValue = input.value.trim();

    return passwordRegex.test(inputValue)
  }

  function validateConfirmationPassword(input) {
    const passInputValue = passInputEl.value;
    const passConfirmationValue = input.value;

    return passConfirmationValue === passInputValue && passConfirmationValue.trim() !== ""
  }

  function validateTerms() {
    return termsChboxEl.checked;
  }

  function showError(input, errorElement, message) {
    input.classList.remove("valid");
    input.classList.add("error");
    errorElement.textContent = message;
  }

  function showSuccess(input, errorElement) {
    input.classList.remove("error");
    input.classList.add("valid");
    errorElement.textContent = "";
  }

  function successSend() {
    messageEl.textContent = "Formularz rejestracji został pomyślnie wysłany!";


    setTimeout(() => {
      messageEl.textContent = "";
    }, 5000)
  }


  function handleValidate(input, errorElement) {
    const inputName = input.getAttribute("name");

    switch (inputName) {
      case "username":
        const isUsernameValid = validateUsername(input);
        isUsernameValid ? showSuccess(input, errorElement) : showError(input, errorElement, "Your username is invalid!");
        break;

      case "email":
        const isEmailValid = validateEmail(input);
        isEmailValid ? showSuccess(input, errorElement) : showError(input, errorElement, "Your email is invalid!");
        break;

      case "password":
        const isPasswordValid = validatePassword(input);
        isPasswordValid ? showSuccess(input, errorElement) : showError(input, errorElement, "Your password is invalid!");
        break;

      case "confirmPassword":
        const isConfirmPasswordValid = validateConfirmationPassword(input);
        isConfirmPasswordValid ? showSuccess(input, errorElement) : showError(input, errorElement, "Your passoword doesn't match!");
        break;

      case "terms":
        const isTermsAccepted = validateTerms(input);
        isTermsAccepted ? errorElement.textContent = "" : errorElement.textContent = "Your terms aren't accepted!";
        break;

      default:
    }
  }


  function handleSubmit(e) {
    e.preventDefault();

    const isUsernameValid = validateUsername(userInputEl);
    const isEmailValid = validateEmail(emailInputEl);
    const isPasswordValid = validatePassword(passInputEl);
    const isConfirmPasswordValid = validateConfirmationPassword(passConfirmInputEl);
    const isTermsAccepted = validateTerms(termsChboxEl);

    if (isUsernameValid) showSuccess(userInputEl, userErrorEl)
    else showError(userInputEl, userErrorEl, "Your username is invalid!")

    if (isEmailValid) showSuccess(emailInputEl, emailErrorEl)
    else showError(emailInputEl, emailErrorEl, "Your email is invalid!")

    if (isPasswordValid) showSuccess(passInputEl, passErrorEl)
    else showError(passInputEl, passErrorEl, "Your password is invalid!")

    if (isConfirmPasswordValid) showSuccess(passConfirmInputEl, passConfirmErrorEl)
    else showError(passConfirmInputEl, passConfirmErrorEl, "Your passoword doesn't match!")

    if (isTermsAccepted) termsChboxError.textContent = "";
    else termsChboxError.textContent = "Your terms aren't accepted!";

    const isFormValid =
      isUsernameValid &&
      isEmailValid &&
      isPasswordValid &&
      isConfirmPasswordValid &&
      isTermsAccepted;

    if (isFormValid) {
      successSend();
    } else {
      messageEl.textContent = "";
    }
  }

  function handleInput(event) {
    const input = event.currentTarget;

    if (!input) return;

    const isCheckbox = input.type === "checkbox";

    const fieldElement = input.closest(isCheckbox ? '.terms-field' : '.field');

    if (!fieldElement) return;

    const targetInputErrorEl = fieldElement.querySelector(".field-error");

    handleValidate(input, targetInputErrorEl);

    if (input.name === "password" && passConfirmInputEl.value.trim() !== "") {
      handleValidate(passConfirmInputEl, passConfirmErrorEl);
    }
  }


  formEl.addEventListener("submit", handleSubmit);

  inputsElements.forEach(input => {
    input.addEventListener("input", handleInput)
  })

  termsChboxEl.addEventListener("change", handleInput)
};

init();