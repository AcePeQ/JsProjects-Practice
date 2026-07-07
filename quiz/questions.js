export const questions = [
  {
    id: 1,
    question: "Co zwraca metoda querySelector()?",
    answers: [
      {
        id: "a",
        text: "Wszystkie elementy pasujące do selektora",
        correct: false,
      },
      {
        id: "b",
        text: "Pierwszy element pasujący do selektora",
        correct: true,
      },
      {
        id: "c",
        text: "Tylko elementy z klasą active",
        correct: false,
      },
    ],
  },
  {
    id: 2,
    question: "Czym różni się let od const?",
    answers: [
      {
        id: "a",
        text: "let pozwala przypisać nową wartość, const nie pozwala na ponowne przypisanie",
        correct: true,
      },
      {
        id: "b",
        text: "const działa tylko w funkcjach, a let tylko w obiektach",
        correct: false,
      },
      {
        id: "c",
        text: "Nie ma żadnej różnicy",
        correct: false,
      },
    ],
  },
  {
    id: 3,
    question: "Do czego służy event.preventDefault()?",
    answers: [
      {
        id: "a",
        text: "Do zatrzymania domyślnego zachowania przeglądarki",
        correct: true,
      },
      {
        id: "b",
        text: "Do usunięcia event listenera",
        correct: false,
      },
      {
        id: "c",
        text: "Do zatrzymania działania całego JavaScriptu",
        correct: false,
      },
    ],
  },
  {
    id: 4,
    question: "Co robi metoda filter()?",
    answers: [
      {
        id: "a",
        text: "Zmienia każdy element tablicy na nowy",
        correct: false,
      },
      {
        id: "b",
        text: "Zwraca nową tablicę z elementami spełniającymi warunek",
        correct: true,
      },
      {
        id: "c",
        text: "Sortuje tablicę alfabetycznie",
        correct: false,
      },
    ],
  },
  {
    id: 5,
    question: "Co oznacza event delegation?",
    answers: [
      {
        id: "a",
        text: "Obsługę wielu elementów przez listener ustawiony na rodzicu",
        correct: true,
      },
      {
        id: "b",
        text: "Tworzenie eventów tylko dla formularzy",
        correct: false,
      },
      {
        id: "c",
        text: "Automatyczne usuwanie event listenerów",
        correct: false,
      },
    ],
  },
];