function init() {
  const cardValues = ["🍎", "🍌", "🍇", "🍒", "🥝", "🍍"];

  const MAX_GAME_PAIRS = cardValues.length;

  const boardGameEl = document.querySelector("#memory-grid");
  const movesCountEl = document.querySelector("#moves-count");
  const pairsCountEl = document.querySelector("#pairs-count");
  const messageStatusEl = document.querySelector("#status-message");
  const resetBtnEl = document.querySelector("#reset-btn");

  let cards = [];
  let firstCard = null;
  let secondCard = null;

  let moves = 0;
  let matchedPairs = 0;

  let isBoardLocked = false;
  let isGameFinished = false;

  let timeoutId = null;

  function createCardPairs() {
    const arr1 = cardValues.slice();
    const arr2 = cardValues.slice();

    const newPairsCards = arr1.concat(arr2).map((card, index) => ({
      id: index,
      value: card,
      matched: false,
    })).sort(() => Math.random() - 0.5);

    cards = Array.from(newPairsCards);
  }

  function renderCard(card) {
    const button = document.createElement("button");
    button.classList.add("memory-card");
    button.type = "button";
    button.dataset.id = card.id;

    const cardFrontSpan = document.createElement("span");
    cardFrontSpan.classList.add("card-front");
    cardFrontSpan.textContent = card.value;

    const cardBackSpan = document.createElement("span");
    cardBackSpan.classList.add("card-back");
    cardBackSpan.textContent = "?";

    button.appendChild(cardFrontSpan);
    button.appendChild(cardBackSpan);

    boardGameEl.appendChild(button);
  }

  function createCards() {
    cards.forEach(renderCard)
  }

  function checkForMatch() {
    moves++;

    const firstCardToFlip = firstCard;
    const secondCardToFlip = secondCard;

    const firstCardId = Number(firstCard.dataset.id);
    const secondCardId = Number(secondCard.dataset.id);

    const firstCardObj = cards.find(card => card.id === firstCardId);
    const secondCardObj = cards.find(card => card.id === secondCardId);

    const firstButtonValue = firstCardObj.value;
    const secondButtonValue = secondCardObj.value;

    const isValueMatch = firstButtonValue === secondButtonValue;

    if (!isValueMatch) {
      isBoardLocked = true;
      updateStats()

      timeoutId = setTimeout(() => {
        flipCard(firstCardToFlip);
        flipCard(secondCardToFlip);

        isBoardLocked = false;
        firstCard = null;
        secondCard = null;
      }, 800)
      return;
    }

    firstCard.classList.add("matched");
    secondCard.classList.add("matched");


    firstCardObj.matched = true;
    secondCardObj.matched = true;

    matchedPairs++;
    firstCard = null;
    secondCard = null

    updateStats()

    if (matchedPairs === MAX_GAME_PAIRS) {
      isGameFinished = true;
      messageStatusEl.textContent = "Congrats! You've won the game!"
      messageStatusEl.classList.add("success");
    }
  }

  function flipCard(button) {
    const isCardFlipped = button.classList.contains("flipped");
    button.classList.toggle("flipped", !isCardFlipped);
  }

  function updateStats() {
    movesCountEl.textContent = moves;
    pairsCountEl.textContent = matchedPairs;
  }

  function handleClick(event) {
    if (isBoardLocked || isGameFinished) return;

    const clickedCard = event.target.closest(".memory-card");

    if (!clickedCard) return;
    const cardId = Number(clickedCard.dataset.id);
    const cardObj = cards.find(card => card.id === cardId);

    if (!cardObj) return;

    const isCardMatched = cardObj.matched;

    if (isCardMatched) return;

    const isCardFlipped = clickedCard.classList.contains("flipped");

    if (isCardFlipped) return;

    if (firstCard === null) {
      firstCard = clickedCard
      flipCard(clickedCard);
    } else {
      secondCard = clickedCard;
      flipCard(clickedCard);
    }

    if (firstCard && secondCard) {
      checkForMatch();
    }
  }

  function handleGame() {
    boardGameEl.textContent = ""

    createCardPairs();
    createCards();
  }

  function resetGame() {
    clearTimeout(timeoutId);
    timeoutId = null;

    cards = [];
    firstCard = null;
    secondCard = null;

    moves = 0;
    matchedPairs = 0;

    isBoardLocked = false;
    isGameFinished = false;

    messageStatusEl.textContent = "";
    messageStatusEl.classList.remove("success");

    updateStats();
    handleGame();
  }

  boardGameEl.addEventListener("click", handleClick);
  resetBtnEl.addEventListener("click", resetGame);

  handleGame();
}

init();