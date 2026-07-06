import { products } from "./products.js"

function init() {
  const productGridEl = document.querySelector("#products-grid");
  const searchFilterEl = document.querySelector("#search-input");
  const categoryFilterEl = document.querySelector("#category-select");
  const maxPriceFilterEl = document.querySelector("#max-price-input");
  const sortFilterEl = document.querySelector("#sort-select");
  const counterEl = document.querySelector("#results-count");
  const resetFilterBtn = document.querySelector("#reset-btn")
  const emptyStateEl = document.querySelector("#empty-state");

  function createProductCard(product) {
    const article = document.createElement("article");
    article.classList.add("product-card");
    article.dataset.id = product.id;

    const prodCategory = document.createElement("span");
    prodCategory.classList.add("product-category");
    prodCategory.textContent = categoryMap(product.category);

    const prodName = document.createElement("h2");
    prodName.classList.add("product-name");
    prodName.textContent = product.name;

    const prodDescription = document.createElement("p");
    prodDescription.classList.add("product-description");
    prodDescription.textContent = product.description;

    const prodFooter = document.createElement("div");
    prodFooter.classList.add("product-footer");

    const prodPrice = document.createElement("span");
    prodPrice.classList.add("product-price");
    prodPrice.textContent = product.price + " zł";

    const prodRating = document.createElement("span");
    prodRating.classList.add("product-rating");
    prodRating.textContent = "⭐ " + product.rating;

    prodFooter.appendChild(prodPrice);
    prodFooter.appendChild(prodRating);

    article.appendChild(prodCategory);
    article.appendChild(prodName);
    article.appendChild(prodDescription);
    article.appendChild(prodFooter);

    productGridEl.appendChild(article);
  }

  function categoryMap(category) {
    let normalizedCategory = "";

    switch (category) {
      case "electronics":
        normalizedCategory = "Elektronika";
        break;
      case "accessories":
        normalizedCategory = "Akcesoria";
        break;
      case "office":
        normalizedCategory = "Biuro";
        break;
      default:
        normalizedCategory = category;
    }

    return normalizedCategory;
  }

  function handleSortList() {
    let productList = [...products];

    const searchFilterValue = searchFilterEl.value.trim().toLowerCase();
    const categoryFilterValue = categoryFilterEl.value;
    const maxPriceFilterValue = maxPriceFilterEl.value;
    const sortFilterValue = sortFilterEl.value;

    productList = productList.filter(product => searchFilterValue !== "" ? product.name.toLowerCase().includes(searchFilterValue) : true);
    productList = productList.filter(product => categoryFilterValue !== "all" ? (product.category.toLowerCase() === categoryFilterValue) : true);
    productList = productList.filter(product => maxPriceFilterValue !== "" ? Number(product.price) <= Number(maxPriceFilterValue) : true);

    if (sortFilterValue !== "default") {
      productList.sort((p1, p2) => sortFilterValue === "price-asc" ? p1.price - p2.price : p2.price - p1.price);
    }


    return productList;
  }

  function resetFilters() {
    searchFilterEl.value = "";
    maxPriceFilterEl.value = "";

    categoryFilterEl.value = "all";
    sortFilterEl.value = "default";

    renderList()
  }

  function renderList() {
    const sortedList = handleSortList();

    const listLength = sortedList.length;

    productGridEl.textContent = "";
    counterEl.textContent = listLength;

    if (listLength === 0) {
      emptyStateEl.classList.remove("hidden");
      return;
    }

    emptyStateEl.classList.add("hidden");
    sortedList.forEach(createProductCard)
  }

  searchFilterEl.addEventListener("input", renderList);
  categoryFilterEl.addEventListener("change", renderList);
  maxPriceFilterEl.addEventListener("input", renderList);
  sortFilterEl.addEventListener("change", renderList);
  resetFilterBtn.addEventListener("click", resetFilters);

  renderList();
}

init();