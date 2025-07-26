let basket = [];
let budget = 50;

window.onload = () => {
    var c = document.getElementById("logo");
    var ctx = c.getContext("2d");
    ctx.font = "30px Arial";
    ctx.fillText("Food Shop", 10, 30);
    document.getElementById("budget-display").textContent = budget;
    }

const prices = {
    apple: 1,
    orange: 2
};

// HTML content to display the user's money.
const budgetDisplay = document.getElementById("budget-display");

// Display the user's basket contents as a HTML list.
function displayBasket() {
    const basketList = document.getElementById("basket-list");
    basketList.innerHTML = "";
    basket.forEach(item => {    // Create a list element for each item in the basket array and add it's content to the list entry.
        let li = document.createElement("li");
        li.innerText = item;
        basketList.appendChild(li);
    });
}

function purchase(product) {
    const stockElement = document.getElementById(`stock-${product}`);   // Get the DOM element that shows the stock for the chosen product.
    let stock = parseInt(stockElement.textContent);
    if (stock > 0 && budget >= prices[product]) {
        budget -= prices[product];
        stock -= 1;

        stockElement.textContent = stock;   // Update the displayed stock for the chosen product.
        document.getElementById("budget-display").textContent = budget;
        basket.push(product);
    }
    else if (stock == 0) {
        alert(`There are no ${product}s available at the moment.`)  // Alert the user that the product is out of stock.
    }
}