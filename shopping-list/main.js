function init() {
  const shoppingFormEl = document.querySelector("#shopping-form")
  const itemInputEl = document.querySelector("#item-input")
  const formErrorEl = document.querySelector("#form-error");
  const shoppingListEl = document.querySelector("#shopping-list")
  const emptyStateEl = document.querySelector("#empty-state")
  const totalCountEl = document.querySelector("#total-count")
  const completedCountEl = document.querySelector("#completed-count")
  const cleanBtnEl = document.querySelector("#clear-btn")

  let productList = getLocalStorageList() ?? [];

  const uniqueId = () => {
    const dateString = Date.now().toString(36);
    const randomness = Math.random().toString(36).substr(2);
    return dateString + randomness;
  };

  function saveLocalStorageList() {
    localStorage.setItem("list", JSON.stringify(productList));
  }

  function getLocalStorageList() {
    return JSON.parse(localStorage.getItem("list"));
  }

  function createItem(product) {
    if (!product) return;

    const li = document.createElement("li");
    const span = document.createElement("span");
    const div = document.createElement("div");
    const buttonComplete = document.createElement("button");
    const buttonDelete = document.createElement("button");

    li.classList.add("shopping-item");
    li.classList.toggle("completed", product.completed)
    li.dataset.id = product.id;

    span.classList.add("item-name");
    span.textContent = product.name;

    div.classList.add("item-actions");

    buttonComplete.classList.add("item-btn", "complete-btn");
    buttonComplete.type = "button";
    buttonComplete.textContent = "Kupione";
    buttonComplete.dataset.action = "complete"

    buttonDelete.classList.add("item-btn", "delete-btn");
    buttonDelete.type = "button";
    buttonDelete.textContent = "Usuń";
    buttonDelete.dataset.action = "delete"

    div.appendChild(buttonComplete)
    div.appendChild(buttonDelete)
    li.appendChild(span);
    li.appendChild(div);
    shoppingListEl.appendChild(li);
  }

  function updateCounters() {
    const allItemsLength = productList.length;
    const completedItemsLength = productList.filter(product => product.completed).length;

    totalCountEl.textContent = allItemsLength;
    completedCountEl.textContent = completedItemsLength;
  }

  function deleteItem(targetItemId) {
    productList = productList.filter(product => product.id !== targetItemId);
  }

  function toggleCompleted(targetItemId) {
    const item = productList.find(product => product.id === targetItemId);

    if (!item) return;

    item.completed = !item.completed;
  }

  function renderList() {
    const listLength = productList.length;
    shoppingListEl.textContent = "";

    updateCounters();
    saveLocalStorageList();

    if (listLength === 0) {
      emptyStateEl.classList.remove("hidden");
      cleanBtnEl.disabled = true;
      return;
    }

    const sortedList = productList.toSorted((p1, p2) => p1.completed === p2.completed ? 0 : p1.completed ? 1 : -1);

    cleanBtnEl.disabled = false;
    emptyStateEl.classList.add("hidden");
    sortedList.forEach(createItem)

  }

  function clearList() {
    productList = [];
    localStorage.removeItem("list");
    renderList();
  }

  function handleAddProduct(e) {
    e.preventDefault();

    const productName = itemInputEl.value.trim();

    if (!productName) {
      itemInputEl.classList.add("error");
      formErrorEl.textContent = "Invalid product name! Please try again!"
      return;
    }

    const isSimilarProduct = productList.some(product => product.name?.toLowerCase() === productName?.toLowerCase());

    if (isSimilarProduct) {
      itemInputEl.classList.add("error");
      formErrorEl.textContent = "This product is already in the list!"
      return;
    }

    const newProductItem = {
      id: uniqueId(),
      name: productName,
      completed: false,
    }

    productList.push(newProductItem);
    itemInputEl.value = "";

    itemInputEl.classList.remove("error");
    formErrorEl.textContent = ""

    renderList();
  }

  function handleAction(event) {
    const button = event.target.closest("button");
    if (!button) return;

    const btnAction = button.dataset.action;
    const closestListItem = button.closest(".shopping-item");

    if (!closestListItem) return;

    const closestListItemId = closestListItem.dataset.id

    switch (btnAction) {
      case "complete":
        toggleCompleted(closestListItemId);
        break;
      case "delete":
        deleteItem(closestListItemId);
        break;
      default:
    }

    renderList();
  }

  shoppingFormEl.addEventListener("submit", handleAddProduct);
  shoppingListEl.addEventListener("click", handleAction);
  cleanBtnEl.addEventListener("click", clearList);


  renderList();
};


init();




