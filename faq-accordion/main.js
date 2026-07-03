function init() {
  const faqList = document.querySelector("#faq-list")

  function handleClick(event) {
    const currentBtn = event.target.closest(".faq-question");

    if(!currentBtn) return;

    const faqItem = currentBtn.closest(".faq-item");

    if(!faqItem) return;

    const iconEl = faqItem.querySelector(".faq-icon");

  }


  faqList.addEventListener("click", handleClick)
}

init();