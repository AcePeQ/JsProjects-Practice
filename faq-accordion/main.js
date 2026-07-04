// function init() {
//   const faqList = document.querySelector("#faq-list")

//   function handleClick(event) {
//     const currentBtn = event.target.closest(".faq-question");

//     if(!currentBtn) return;
//     const faqItem = currentBtn.closest(".faq-item");



//     if(!faqItem) return;
//     const iconEl = faqItem.querySelector(".faq-icon");

//     faqItem.classList.toggle("open");
//     const isElementOpen = faqItem.classList.contains("open");

//     iconEl.textContent = isElementOpen ? "-" : "+";
//   }


//   faqList.addEventListener("click", handleClick)
// }

// init();


function init() {
  const faqList = document.querySelector("#faq-list")

  function handleClick(event) {
    const currentBtn = event.target.closest(".faq-question");

    if (!currentBtn) return;

    const faqItem = currentBtn.closest(".faq-item");
    const iconEl = faqItem.querySelector(".faq-icon");

    if (faqItem.classList.contains("open")) {
      faqItem.classList.remove("open");
      iconEl.textContent = "+";
      return;
    }

    const openedElementsList = Array.from(faqList.querySelectorAll(".faq-item.open"));
    openedElementsList.forEach((item) => {
      item.classList.remove("open");
      const iconEl = item.querySelector(".faq-icon");
      iconEl.textContent = "+";
    })

    faqItem.classList.add("open");
    iconEl.textContent = "-";
  }


  faqList.addEventListener("click", handleClick)
}

init();