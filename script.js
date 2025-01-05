// This is the boilerplate code given for you
// You can modify this code
// Product data
const products = [
  {"id":1,"name":"Product 1","price":10},{"id":5,"name":"Product 5","price":50},{"id":1,"name":"Product 1","price":10},
  { id: 2, name: "product 2", price: 20 },
  { id: 3, name: "product 3", price: 30 },
  { id: 4, name: "product 4", price: 40 },
  { id: 5, name: "product 5", price: 50 },
];

// DOM elements
const productList = document.getElementById("product-list");
const cartList = document.getElementById("cart-list");
const clearCartBtn = document.getElementById("clear-cart-btn");

// Render product list
function renderProducts() {
  products.forEach((product) => {
    const li = document.createElement("li");
    li.innerHTML = `${product.name} - $${product.price} <button class="add-to-cart-btn" data-id="${product.id}">Add to Cart</button>`;
    productList.appendChild(li);
  });
}

// Render cart list
function renderCart() {
  // Clear the current cart list
  cartList.innerHTML = '';

  // Get cart from session storage
  const cart = getCart();

  // Render each cart item
  cart.forEach((item) => {
    const li = document.createElement("li");
    li.innerHTML = `${item.name} - $${item.price} (x${item.quantity}) <button class="remove-from-cart-btn" data-id="${item.id}">Remove</button>`;
    cartList.appendChild(li);
  });
}

// Get cart from session storage
function getCart() {
  const cart = sessionStorage.getItem('cart');
  return cart ? JSON.parse(cart) : [];
}

// Save cart to session storage
function saveCart(cart) {
  sessionStorage.setItem('cart', JSON.stringify(cart));
}

// Add item to cart
function addToCart(productId) {
  const product = products.find((p) => p.id === productId);
  if (product) {
    let cart = getCart();
    const existingItem = cart.find((item) => item.id === productId);
    if (existingItem) {
      existingItem.quantity += 1;
    } else {
      cart.push({ ...product, quantity: 1 });
    }
    saveCart(cart);
    renderCart();
  }
}

// Remove item from cart
function removeFromCart(productId) {
  let cart = getCart();
  cart = cart.filter((item) => item.id !== productId);
  saveCart(cart);
  renderCart();
}

// Clear cart
function clearCart() {
  sessionStorage.removeItem('cart');
  renderCart();
}

// Initial render
renderProducts();
renderCart();

// Event delegation for adding to cart
document.body.addEventListener('click', (event) => {
  if (event.target.classList.contains('add-to-cart-btn')) {
    const productId = parseInt(event.target.getAttribute('data-id'));
    addToCart(productId);
  }

  if (event.target.classList.contains('remove-from-cart-btn')) {
    const productId = parseInt(event.target.getAttribute('data-id'));
    removeFromCart(productId);
  }
});

// Clear cart button
clearCartBtn.addEventListener('click', clearCart);
