// This is the boilerplate code given for you
// You can modify this code
// Product data
const products = [
  { id: 1, name: "Product 1", price: 10 },
  { id: 2, name: "Product 2", price: 20 },
  { id: 3, name: "Product 3", price: 30 },
  { id: 4, name: "Product 4", price: 40 },
  { id: 5, name: "Product 5", price: 50 },
];


function renderProductList() {
  const productList = document.getElementById("product-list");
  products.forEach((product) => {
    const li = document.createElement("li");
    li.textContent = `${product.name} - $${product.price} `;
    const button = document.createElement("button");
    button.textContent = "Add to Cart";
    button.addEventListener("click", () => addToCart(product));
    li.appendChild(button);
    productList.appendChild(li);
  });
}


function addToCart(product) {
  let cart = JSON.parse(sessionStorage.getItem("cart")) || [];
  cart.push(product);
  sessionStorage.setItem("cart", JSON.stringify(cart));
  renderCart();
}


function renderCart() {
  const cartList = document.getElementById("cart-list");
  cartList.innerHTML = ""; 
  const cart = JSON.parse(sessionStorage.getItem("cart")) || [];
  cart.forEach((item) => {
    const li = document.createElement("li");
    li.textContent = `${item.name} - $${item.price}`;
    cartList.appendChild(li);
  });
}

function clearCart() {
  sessionStorage.removeItem("cart");
  renderCart();
}


document.getElementById("clear-cart-btn").addEventListener("click", clearCart);


window.onload = () => {
  renderProductList();
  renderCart();
};