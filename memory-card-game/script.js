function init() {
  const cardValues = ["🍎", "🍌", "🍇", "🍒", "🥝", "🍍"];

  const boardGameEl = document.querySelector("#memory-grid");
  const movesCountEl = document.querySelector("#moves-count");
  const pairsCountEl = document.querySelector("#pairs-count");
  const messageStatusEl = document.querySelector("#status-message");
  const resetBtnEl = document.querySelector("reset-btn");

  let cards = [];
  let firstCard = null;
  let secondCard = null;

  let moves = 0;
  let matchedPairs = 0;

  let isBoardLocked = false;
  let isGameFinished = false;

  function createCardPairs() {





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

}

init();