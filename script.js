// Array to store cart items
let cart = [];
let cartBadge = document.querySelector('.badge');
let subtotalElement = document.createElement('div');
subtotalElement.classList.add('subtotal');

// Add event listener to all "Add to Cart" buttons
document.querySelectorAll('.add-to-cart').forEach(button => {
    button.addEventListener('click', function() {
        let product = this.closest('.product-card');
        let productName = product.querySelector('.fs-sm').innerText;
        let productPrice = product.querySelector('.h5').innerText;

        addToCart(productName, productPrice);
        updateCart();
    });
});

// Function to add item to cart
function addToCart(name, price) {
    let item = cart.find(item => item.name === name);

    if (item) {
        item.quantity += 1; // If item exists, increase quantity
    } else {
        cart.push({
            name: name,
            price: parseFloat(price.replace('$', '')),
            quantity: 1
        });
    }
}

// Function to update cart UI and badge
function updateCart() {
    let cartContainer = document.querySelector('.offcanvas-body');
    cartContainer.innerHTML = ''; // Clear previous items
    
    cart.forEach((item, index) => {
        let itemHTML = `
            <div class="d-flex justify-content-between align-items-center">
                <div>
                    <span>${item.name}</span>
                    <br>
                    <span>$${item.price.toFixed(2)} x ${item.quantity}</span>
                </div>
                <div>
                    <button class="btn btn-sm btn-outline-secondary" onclick="incrementItem(${index})">+</button>
                    <button class="btn btn-sm btn-outline-secondary" onclick="decrementItem(${index})">-</button>
                    <button class="btn btn-sm btn-danger" onclick="removeItem(${index})">Remove</button>
                </div>
            </div>
            <hr>
        `;
        cartContainer.innerHTML += itemHTML;
    });

    updateBadge();
    updateSubtotal(cartContainer);
}

// Function to update badge with total item count
function updateBadge() {
    let totalItems = cart.reduce((total, item) => total + item.quantity, 0);
    cartBadge.textContent = totalItems;
}

// Function to calculate and display subtotal
function updateSubtotal(cartContainer) {
    let subtotal = cart.reduce((total, item) => total + (item.price * item.quantity), 0);
    subtotalElement.innerHTML = `<h5>Subtotal: $${subtotal.toFixed(2)}</h5>`;
    cartContainer.appendChild(subtotalElement);
}

// Increment item quantity
function incrementItem(index) {
    cart[index].quantity += 1;
    updateCart();
}

// Decrement item quantity
function decrementItem(index) {
    if (cart[index].quantity > 1) {
        cart[index].quantity -= 1;
    } else {
        removeItem(index);
    }
    updateCart();
}

// Remove item from cart
function removeItem(index) {
    cart.splice(index, 1);
    updateCart();
}
