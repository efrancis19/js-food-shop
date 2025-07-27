let basket = JSON.parse(localStorage.getItem("basket")) || [];
let budget = parseInt(localStorage.getItem("budget")) || 50;

window.onload = () => {
    var c = document.getElementById("logo");
    var ctx = c.getContext("2d");
    ctx.font = "30px Arial";
    ctx.fillText("Food Shop", 10, 30);
    document.getElementById("budget-display").textContent = budget;
    displayProducts();
    };

const products = JSON.parse(localStorage.getItem("products")) || [
    {name: 'apple', price: 1, stock: 5},
    {name: 'orange', price: 2, stock: 5}
    ];

// Save data regardless of which page the user is on.
function saveData() {
    localStorage.setItem("products", JSON.stringify(products));
    localStorage.setItem("basket", JSON.stringify(basket));
    localStorage.setItem("budget", budget.toString());
}

// HTML content to display the user's money.
const budgetDisplay = document.getElementById("budget-display");

function displayProducts() {
    const productSection = document.getElementById("product-section");
    productSection.innerHTML = "";

    products.forEach((product, index) => {
        const section = document.createElement("section");
        section.className = "section";

        section.innerHTML = `
            <h2>${product.name}</h2>
            <p>Price: $${product.price}</p>
            <p>Stock: <span id="stock-${product.name}">${product.stock}</span></p>

            <div>
                <button onclick="decreaseQuantity(${index})">-</button>
                <span id="quantity-${index}">1</span>
                <button onclick="increaseQuantity(${index})">+</button>
            </div>

            <button onclick="purchase('${product.name}', ${index})">Purchase</button>
        `;

        productSection.appendChild(section);
    });
}

function increaseQuantity(index) {
    const quantity = document.getElementById(`quantity-${index}`);
    if (quantity) {
    let current = parseInt(quantity.textContent);
    if (current < 10) {
        quantity.textContent = current + 1;
    }
}
    else {
        alert(`Cannot purchase any more than 10 ${product.name}s at a time.`);
    }
};

function decreaseQuantity(index) {
    const quantity = document.getElementById(`quantity-${index}`);
    if (quantity) {
    let current = parseInt(quantity.textContent);
    if (current >= 1) {
    quantity.textContent = current - 1
    }
}
    else {
        alert(`Cannot decrease the quantity of ${product.name}s any further.`);
    }
};

// Display the user's basket contents as a HTML list.
function displayBasket() {
    const basketList = document.getElementById("basket-list");
    basketList.innerHTML = "";
    basket.forEach((item, index) => {    // Create a list element for each item in the basket array and add it's content to the list entry.
        const li = document.createElement("li");
    li.innerHTML = `
      ${item} 
      <button onclick="remove(${index})">Remove</button>
    `;
    basketList.appendChild(li);
  });
}

function purchase(productName, index) {
    console.log("Purchase clicked for:", productName, "index:", index);
    const product = products.find(p => p.name === productName);
    const quantity = parseInt(document.getElementById(`quantity-${index}`).textContent);
    const totalCost = quantity * product.price;

    const stockElement = document.getElementById(`stock-${product.name}`);   // Get the DOM element that shows the stock for the chosen product.
    let stock = parseInt(stockElement.textContent);

    if (stock >= quantity && budget >= totalCost) {
        product.stock -= quantity;
        budget -= totalCost;
        stock -= quantity;

        stockElement.textContent = product.stock;   // Update the displayed stock for the chosen product.
        document.getElementById("budget-display").textContent = budget;
        for (let i = 0; i < quantity; i++) {
        basket.push(product.name);
        }
        saveData();
        displayBasket();
    }
    else if (product.stock == 0) {
        alert(`There are no ${product.name}s available at the moment.`);  // Alert the user that the product is out of stock.
    }
    else {
        alert(`Not enough budget to buy a ${product.name}.`);
    }
}

function remove(index) {
    basket.splice(index, 1);
    displayBasket();
}

// Add new products to the existing list
function addProduct() {
    const newProduct = document.getElementById("new-product").value;
    const newProductEntry = {name: newProduct, price: 1, stock: 5};
    products.push(newProductEntry);
    saveData();
    displayProducts();
    document.getElementById("new-product").value = '';
}

// Reset all data to the default
function resetData() {
    localStorage.removeItem("products");
    localStorage.removeItem("basket");
    localStorage.removeItem("budget");
    location.reload();
}