import { tabsData as tabs } from "./tabs.js";

function init() {
  const tabsContainerEl = document.querySelector("#tabs");
  const tabPanelEl = document.querySelector("#tab-panel");

  let activeTab = "overview";


  function handleActiveTab() {
    const currentActiveTab = tabsContainerEl.querySelector(`[data-tab="${activeTab}"]`)
    currentActiveTab.classList.add("active");
  }

  function handlePreviousTab() {
    const previousActiveTab = tabsContainerEl.querySelector(`[data-tab="${activeTab}"]`)
    previousActiveTab.classList.remove("active");
  }

  function createPanelContent(content) {
    const headerEl = document.createElement("div");
    headerEl.classList.add("panel-header");

    const headingWrapperEl = document.createElement("div");

    const titleEl = document.createElement("h2");
    titleEl.classList.add("panel-title");
    titleEl.textContent = content.title;

    const subtitleEl = document.createElement("p");
    subtitleEl.classList.add("panel-subtitle");
    subtitleEl.textContent = content.subtitle;

    headingWrapperEl.appendChild(titleEl);
    headingWrapperEl.appendChild(subtitleEl);

    headerEl.appendChild(headingWrapperEl);

    const badgeEl = document.createElement("span");
    badgeEl.classList.add("panel-badge");
    badgeEl.textContent = content.badge;

    headerEl.appendChild(badgeEl);

    const listEl = document.createElement("ul");
    listEl.classList.add("panel-list");


    content.items.forEach(item => {
      const liEl = document.createElement("li");
      liEl.textContent = item;

      listEl.appendChild(liEl);
    })

    const footerEl = document.createElement("p");
    footerEl.classList.add("panel-footer");
    footerEl.textContent = content.footer;

    tabPanelEl.appendChild(headerEl);
    tabPanelEl.appendChild(listEl);
    tabPanelEl.appendChild(footerEl);
  }

  function handleRenderContent() {
    const tabContent = tabs[activeTab];

    tabPanelEl.textContent = "";

    createPanelContent(tabContent);
  }

  function handleTabClick(event) {
    const tabBtn = event.target.closest(".tab-btn");

    if (!tabBtn) return;

    const clickedTab = tabBtn.dataset.tab;

    if (clickedTab === activeTab) return;

    const tabContent = tabs[clickedTab];

    if (!tabContent) return;

    handlePreviousTab();
    activeTab = clickedTab;
    handleActiveTab();
    handleRenderContent();
  }

  tabsContainerEl.addEventListener("click", handleTabClick)
  handleRenderContent();
};

init();