function init() {
  const MAX_MESSAGE_LENGTH = 120;
  const MIN_MESSAGE_LENGTH = 10;


  const formEl = document.querySelector("#message-form");
  const inputEl = document.querySelector("#message");
  const submitBtnEl = document.querySelector("#submit-btn");

  const feedbackEl = document.querySelector("#feedback");
  const counterEl = document.querySelector(".counter");
  const counterCharEl = document.querySelector("#characters-left")
  const successMessEl = document.querySelector("#success-message");

  function getValidationOptions() {
    const rawLength = inputEl.value.length;
    const trimmedLength = inputEl.value.trim().length;
    const availableCharacters = MAX_MESSAGE_LENGTH - rawLength;
    const isMinValid = trimmedLength >= MIN_MESSAGE_LENGTH;
    const isMaxValid = rawLength <= MAX_MESSAGE_LENGTH;
    const isMessageValid = isMinValid && isMaxValid;

    return {
      isMessageValid,
      availableCharacters,
      isMinValid,
      isMaxValid
    }
  }

  function handleValidation() {
    const {isMessageValid, availableCharacters, isMaxValid, isMinValid} = getValidationOptions();

    if(successMessEl.textContent.length > 0) successMessEl.textContent = ""

    counterCharEl.textContent = availableCharacters;

    feedbackEl.classList.toggle("valid", isMessageValid);
    feedbackEl.classList.toggle("error", !isMessageValid);

    inputEl.classList.toggle("valid", isMessageValid);
    inputEl.classList.toggle("error", !isMessageValid);

    counterEl.classList.toggle("error", !isMaxValid);


    submitBtnEl.disabled = !isMessageValid;

    if(!isMinValid) feedbackEl.textContent = "Wpisz minimum 10 znaków"
    else if (!isMaxValid) feedbackEl.textContent = "Wiadomość jest za długa"
    else feedbackEl.textContent = "Wiadomość może zostać wysłana"
  }

  function handleSubmit(e) {
    e.preventDefault();

    const {isMessageValid} = getValidationOptions();

    if( !isMessageValid) return;

    successMessEl.textContent = "Wysłaliśmy twoją wiadomość! Dziękujemy za kontakt, odpowiemy tak szybko jak to możliwe!";
  } 

  inputEl.addEventListener("input", handleValidation);
  formEl.addEventListener("submit", handleSubmit);

  handleValidation();
}

init();